import { Plugin, FileSystemAdapter, MarkdownView } from "obsidian";
import { createServer, Server, IncomingMessage, ServerResponse } from "node:http";
import { Socket } from "node:net";
import { randomUUID } from "node:crypto";
import { createHash } from "node:crypto";
import { writeFileSync, renameSync, unlinkSync, readdirSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

// ── WebSocket constants ──────────────────────────────────────────────────────

const GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const OPCODE = { TEXT: 0x1, CLOSE: 0x8, PING: 0x9, PONG: 0xa } as const;

// ── MCP HTTP server ──────────────────────────────────────────────────────────

const MCP_HTTP_PORT = 27183;

// ── Lock file ────────────────────────────────────────────────────────────────

const LOCK_DIR = join(homedir(), ".claude", "ide");

function createLockFile(port: number, pid: number, vaultPath: string, authToken: string) {
  mkdirSync(LOCK_DIR, { recursive: true });
  const tmp = join(LOCK_DIR, `${port}.lock.tmp`);
  const lockPath = join(LOCK_DIR, `${port}.lock`);
  writeFileSync(tmp, JSON.stringify({ pid, port, workspaceFolders: [vaultPath], ideName: "Obsidian", transport: "ws", authToken }));
  renameSync(tmp, lockPath);
}

function removeLockFile(port: number) {
  try { unlinkSync(join(LOCK_DIR, `${port}.lock`)); } catch { }
}

function cleanStaleLockFiles() {
  try {
    for (const file of readdirSync(LOCK_DIR).filter(f => f.endsWith(".lock"))) {
      const p = join(LOCK_DIR, file);
      try {
        const data = JSON.parse(readFileSync(p, "utf-8"));
        if (data.ideName !== "Obsidian") continue;
        process.kill(data.pid, 0);
      } catch { try { unlinkSync(p); } catch { } }
    }
  } catch { }
}

// ── WebSocket helpers ────────────────────────────────────────────────────────

function computeAcceptKey(key: string) {
  return createHash("sha1").update(key + GUID).digest("base64");
}

function parseFrame(buf: Buffer): { opcode: number; payload: Buffer; totalLength: number } | null {
  const opcode = buf[0] & 0x0f;
  const masked = (buf[1] & 0x80) !== 0;
  let len = buf[1] & 0x7f;
  let offset = 2;
  if (len === 126) { if (buf.length < 4) return null; len = buf.readUInt16BE(2); offset = 4; }
  else if (len === 127) { if (buf.length < 10) return null; len = Number(buf.readBigUInt64BE(2)); offset = 10; }
  if (masked) {
    const end = offset + 4;
    if (buf.length < end + len) return null;
    const mask = buf.subarray(offset, end);
    const payload = Buffer.alloc(len);
    for (let i = 0; i < len; i++) payload[i] = buf[end + i] ^ mask[i % 4];
    return { opcode, payload, totalLength: end + len };
  }
  if (buf.length < offset + len) return null;
  return { opcode, payload: buf.subarray(offset, offset + len), totalLength: offset + len };
}

function makeFrame(opcode: number, data: string | Buffer): Buffer {
  const payload = typeof data === "string" ? Buffer.from(data) : data;
  const len = payload.length;
  let header: Buffer;
  if (len < 126) { header = Buffer.alloc(2); header[0] = 0x80 | opcode; header[1] = len; }
  else if (len < 65536) { header = Buffer.alloc(4); header[0] = 0x80 | opcode; header[1] = 126; header.writeUInt16BE(len, 2); }
  else { header = Buffer.alloc(10); header[0] = 0x80 | opcode; header[1] = 127; header.writeBigUInt64BE(BigInt(len), 2); }
  return Buffer.concat([header, payload]);
}

// ── Plugin ───────────────────────────────────────────────────────────────────

interface Client { socket: Socket; buffer: Buffer; alive: boolean; }

export default class ObsidianClaudeMCP extends Plugin {
  private clients = new Set<Client>();
  private server: Server | null = null;
  private mcpServer: Server | null = null;
  private mcpSessions = new Map<string, ServerResponse>();
  private port = 0;
  private pingInterval: ReturnType<typeof setInterval> | null = null;
  private broadcastTimer: ReturnType<typeof setTimeout> | null = null;
  private prevStateKey: string | null = null;
  private authToken = "";

  async onload() {
    cleanStaleLockFiles();
    this.authToken = randomUUID();
    this.port = await this.startServer();
    const vaultPath = (this.app.vault.adapter as FileSystemAdapter).getBasePath();
    createLockFile(this.port, process.pid, vaultPath, this.authToken);

    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.scheduleBroadcast()));
    this.registerDomEvent(window, "focus", () => { this.prevStateKey = null; this.scheduleBroadcast(); });
    this.registerDomEvent(document, "selectionchange", () => this.scheduleBroadcast());

    this.addCommand({
      id: "send-to-claude",
      name: "Send to Claude",
      editorCallback: () => {
        const data = this.getSelectionData();
        if (!data) return;
        this.broadcast({ jsonrpc: "2.0", method: "at_mentioned", params: data });
      },
    });

    this.startMcpHttpServer();
    console.log(`[claude-mcp] listening on 127.0.0.1:${this.port}`);
  }

  onunload() {
    if (this.broadcastTimer) clearTimeout(this.broadcastTimer);
    if (this.pingInterval) clearInterval(this.pingInterval);
    for (const c of this.clients) c.socket.destroy();
    this.clients.clear();
    this.server?.close();
    this.mcpServer?.close();
    if (this.port) removeLockFile(this.port);
  }

  private getSelectionData() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view?.file) return null;
    const editor = view.editor;
    const basePath = (this.app.vault.adapter as FileSystemAdapter).getBasePath();
    const cursor = editor.getCursor();
    const from = editor.getCursor("from");
    const to = editor.getCursor("to");
    const text = editor.getSelection();
    const rel = view.file.path;
    return {
      filePath: basePath + "/" + rel,
      relativePath: rel.includes(" ") ? `"${rel}"` : rel,
      cursor: { line: cursor.line, character: cursor.ch },
      selection: { start: { line: from.line, character: from.ch }, end: { line: to.line, character: to.ch }, isEmpty: text === "", text },
    };
  }

  private scheduleBroadcast() {
    if (this.broadcastTimer) clearTimeout(this.broadcastTimer);
    this.broadcastTimer = setTimeout(() => { this.broadcastTimer = null; this.doBroadcast(); }, 100);
  }

  private doBroadcast() {
    const data = this.getSelectionData();
    if (!data) return;
    const key = JSON.stringify({ f: data.filePath, c: data.cursor, s: data.selection });
    if (key === this.prevStateKey) return;
    this.prevStateKey = key;
    this.broadcast({
      jsonrpc: "2.0", method: "selection_changed",
      params: { text: data.selection.text, filePath: data.filePath, fileUrl: "file://" + data.filePath, selection: data.selection },
    });
  }

  private broadcast(msg: object) {
    const frame = makeFrame(OPCODE.TEXT, JSON.stringify(msg));
    for (const c of this.clients) { if (c.socket.writable) c.socket.write(frame); }
  }

  private handleClient(socket: Socket, headers: Record<string, string | string[] | undefined>) {
    if (headers["x-claude-code-ide-authorization"] !== this.authToken) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n"); socket.destroy(); return;
    }
    const wsKey = headers["sec-websocket-key"];
    if (!wsKey || Array.isArray(wsKey)) { socket.write("HTTP/1.1 400 Bad Request\r\n\r\n"); socket.destroy(); return; }
    const protocol = headers["sec-websocket-protocol"];
    socket.write(
      "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n" +
      `Sec-WebSocket-Accept: ${computeAcceptKey(wsKey)}\r\n` +
      (protocol ? `Sec-WebSocket-Protocol: ${protocol}\r\n` : "") + "\r\n"
    );
    const client: Client = { socket, buffer: Buffer.alloc(0), alive: true };
    this.clients.add(client);
    socket.on("data", (data: Buffer) => { client.buffer = Buffer.concat([client.buffer, data]); this.processFrames(client); });
    socket.on("close", () => this.clients.delete(client));
    socket.on("error", () => this.clients.delete(client));
  }

  private processFrames(client: Client) {
    while (true) {
      const frame = parseFrame(client.buffer);
      if (!frame) break;
      client.buffer = client.buffer.subarray(frame.totalLength);
      if (!client.socket.writable) break;
      if (frame.opcode === OPCODE.PING) { client.socket.write(makeFrame(OPCODE.PONG, frame.payload)); }
      else if (frame.opcode === OPCODE.PONG) { client.alive = true; }
      else if (frame.opcode === OPCODE.CLOSE) { client.socket.write(makeFrame(OPCODE.CLOSE, Buffer.alloc(0))); client.socket.destroy(); this.clients.delete(client); break; }
      else if (frame.opcode === OPCODE.TEXT) {
        try {
          const msg = JSON.parse(frame.payload.toString());
          if (msg.id == null) continue;
          const response = this.handleRpc(msg);
          client.socket.write(makeFrame(OPCODE.TEXT, JSON.stringify(response)));
        } catch { client.socket.write(makeFrame(OPCODE.TEXT, JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }))); }
      }
    }
  }

  private handleRpc(msg: { jsonrpc: string; id: unknown; method: string; params?: Record<string, unknown> }): object {
    const id = msg.id;
    switch (msg.method) {
      case "initialize":
        return { jsonrpc: "2.0", id, result: { protocolVersion: (msg.params?.protocolVersion as string) || "2025-03-26", capabilities: { tools: {} }, serverInfo: { name: "obsidian-claude-mcp", version: this.manifest.version } } };
      case "tools/list":
        return { jsonrpc: "2.0", id, result: { tools: [
          { name: "getCurrentSelection", description: "Get the current selection in the active editor", inputSchema: { type: "object", properties: {} } },
          { name: "getLatestSelection", description: "Get the most recent selection", inputSchema: { type: "object", properties: {} } },
          { name: "getOpenEditors", description: "Get all open editor tabs", inputSchema: { type: "object", properties: {} } },
          { name: "getWorkspaceFolders", description: "Get vault path", inputSchema: { type: "object", properties: {} } },
          { name: "getTasks", description: "Get all pending tasks from the vault, grouped by overdue, today, this week, future, and undated. Reads from the Task Board plugin cache.", inputSchema: { type: "object", properties: {} } },
        ]}};
      case "tools/call": {
        const name = msg.params?.name as string;
        const result = this.handleTool(name);
        if (!result) return { jsonrpc: "2.0", id, error: { code: -32601, message: `Tool not found: ${name}` } };
        return { jsonrpc: "2.0", id, result };
      }
      default:
        if (["openDiff","getDiagnostics","checkDocumentDirty","saveDocument","close_tab","closeAllDiffTabs","executeCode"].includes(msg.method))
          return { jsonrpc: "2.0", id, result: { content: [{ type: "text", text: "{}" }] } };
        return { jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } };
    }
  }

  private handleTool(name: string): object | null {
    const wrap = (data: object) => ({ content: [{ type: "text", text: JSON.stringify(data) }] });
    const basePath = (this.app.vault.adapter as FileSystemAdapter).getBasePath();
    switch (name) {
      case "getCurrentSelection": { const d = this.getSelectionData(); return d ? wrap(d) : wrap({ error: "no active file" }); }
      case "getLatestSelection": { const d = this.getSelectionData(); return d ? wrap(d) : wrap({ error: "no selection tracked yet" }); }
      case "getOpenEditors": {
        const leaves = this.app.workspace.getLeavesOfType("markdown");
        const active = this.app.workspace.getActiveViewOfType(MarkdownView);
        return wrap({ tabs: leaves.filter(l => (l.view as MarkdownView).file).map(l => {
          const file = (l.view as MarkdownView).file!;
          return { uri: "file://" + basePath + "/" + file.path, isActive: l.view === active, label: file.basename, languageId: "markdown" };
        })});
      }
      case "getWorkspaceFolders": return wrap({ folders: [basePath] });
      case "getTasks": return this.getTasksFromCache(basePath);
      default: return null;
    }
  }

  private getTasksFromCache(basePath: string): object {
    const wrap = (data: object) => ({ content: [{ type: "text", text: JSON.stringify(data) }] });
    try {
      const cachePath = join(basePath, ".obsidian", "plugins", "task-board", "tasks.json");
      const raw = readFileSync(cachePath, "utf-8");
      const cache = JSON.parse(raw);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString().split("T")[0];

      const weekEnd = new Date(today);
      weekEnd.setDate(today.getDate() + 7);
      const weekEndStr = weekEnd.toISOString().split("T")[0];

      const overdue: object[] = [];
      const dueToday: object[] = [];
      const dueThisWeek: object[] = [];
      const future: object[] = [];
      const undated: object[] = [];

      const pending = cache.Pending as Record<string, Array<{
        id: string;
        title: string;
        due: string;
        priority: number;
        tags: string[];
        filePath: string;
        status: string;
      }>>;

      for (const tasks of Object.values(pending)) {
        for (const task of tasks) {
          const t = {
            id: task.id,
            title: task.title.replace(/^-\s*\[.\]\s*/, "").replace(/📅.*$/, "").trim(),
            due: task.due || null,
            priority: task.priority,
            tags: task.tags,
            file: task.filePath,
          };
          if (!task.due) {
            undated.push(t);
          } else if (task.due < todayStr) {
            overdue.push(t);
          } else if (task.due === todayStr) {
            dueToday.push(t);
          } else if (task.due <= weekEndStr) {
            dueThisWeek.push(t);
          } else {
            future.push(t);
          }
        }
      }

      return wrap({
        asOf: cache.Modified_at,
        summary: {
          overdue: overdue.length,
          today: dueToday.length,
          thisWeek: dueThisWeek.length,
          future: future.length,
          undated: undated.length,
        },
        overdue,
        today: dueToday,
        thisWeek: dueThisWeek,
        future,
        undated,
      });
    } catch (e) {
      return ({ content: [{ type: "text", text: JSON.stringify({ error: "Could not read task cache", detail: String(e) }) }] });
    }
  }

  private isLocalhostRequest(req: IncomingMessage, res: ServerResponse): boolean {
    // Block DNS-rebinding: the Host header must be our exact bind address.
    const host = Array.isArray(req.headers["host"]) ? req.headers["host"][0] : req.headers["host"];
    if (host !== `127.0.0.1:${MCP_HTTP_PORT}`) {
      res.writeHead(403); res.end(); return false;
    }
    // Block browser-based requests: legitimate MCP clients (Claude Desktop, curl)
    // do not send an Origin header. Browsers always do for cross-origin requests.
    const origin = req.headers["origin"];
    if (origin !== undefined) {
      res.writeHead(403); res.end(); return false;
    }
    return true;
  }

  private startMcpHttpServer() {
    this.mcpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
      if (!this.isLocalhostRequest(req, res)) return;
      const url = new URL(req.url ?? "/", `http://127.0.0.1:${MCP_HTTP_PORT}`);

      if (url.pathname === "/sse" && req.method === "GET") {
        const sessionId = randomUUID();
        res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" });
        this.mcpSessions.set(sessionId, res);
        res.write(`event: endpoint\ndata: http://127.0.0.1:${MCP_HTTP_PORT}/message?sessionId=${sessionId}\n\n`);
        req.on("close", () => this.mcpSessions.delete(sessionId));
        return;
      }

      if (url.pathname === "/message" && req.method === "POST") {
        const sseRes = this.mcpSessions.get(url.searchParams.get("sessionId") ?? "");
        let body = "";
        req.on("data", (chunk: Buffer) => body += chunk.toString());
        req.on("end", () => {
          try {
            const msg = JSON.parse(body);
            res.writeHead(202); res.end();
            if (msg.id != null && sseRes && !sseRes.writableEnded) {
              sseRes.write(`event: message\ndata: ${JSON.stringify(this.handleRpc(msg))}\n\n`);
            }
          } catch { res.writeHead(400); res.end(); }
        });
        return;
      }

      res.writeHead(404); res.end();
    });
    this.mcpServer.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code !== "EADDRINUSE") console.error("[claude-mcp] MCP HTTP error:", err);
    });
    this.mcpServer.listen(MCP_HTTP_PORT, "127.0.0.1", () =>
      console.log(`[claude-mcp] MCP HTTP server on 127.0.0.1:${MCP_HTTP_PORT}`)
    );
  }

  private startServer(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.server = createServer((_req, res) => { res.writeHead(400); res.end(); });
      this.server.on("upgrade", (req, socket, head) => {
        const s = socket as Socket;
        if (head.length > 0) s.unshift(head);
        this.handleClient(s, req.headers as Record<string, string | string[] | undefined>);
      });
      this.server.on("error", reject);
      this.server.listen(0, "127.0.0.1", () => {
        const addr = this.server!.address() as { port: number };
        this.pingInterval = setInterval(() => {
          for (const c of this.clients) {
            if (!c.alive) { c.socket.destroy(); this.clients.delete(c); continue; }
            c.alive = false;
            if (c.socket.writable) c.socket.write(makeFrame(OPCODE.PING, Buffer.alloc(0)));
          }
        }, 30_000);
        resolve(addr.port);
      });
    });
  }
}
