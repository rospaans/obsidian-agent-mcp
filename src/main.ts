import { Plugin, WorkspaceLeaf, MarkdownView, TFile } from "obsidian";
import { createServer, Server, IncomingMessage, ServerResponse } from "node:http";
import { Socket } from "node:net";
import { randomUUID } from "node:crypto";
import { createHash } from "node:crypto";
import { writeFileSync, renameSync, unlinkSync, readdirSync, readFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

import { DEFAULT_SETTINGS, AgentMCPSettingsTab, type PluginSettings, type AgentBackend } from "./settings";
import { createEditorTools, getSelectionData, getVaultBasePath } from "./tools/editor";
import type { ToolDefinition } from "./tools/types";
import { AgentTerminalView, AGENT_TERMINAL_VIEW_TYPE, type TerminalConfig } from "./terminal/view";
import { AgentDiffView, AGENT_DIFF_VIEW_TYPE } from "./diff/view";

// ── WebSocket constants ──────────────────────────────────────────────────────

const GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const OPCODE = { TEXT: 0x1, CLOSE: 0x8, PING: 0x9, PONG: 0xa } as const;

// ── MCP HTTP server ──────────────────────────────────────────────────────────

const MCP_HTTP_PORT = 27183;
const DEFAULT_MCP_PROTOCOL_VERSION = "2025-03-26";
const SUPPORTED_MCP_PROTOCOL_VERSIONS = new Set([
  "2024-11-05",
  "2025-03-26",
  "2025-06-18",
  "2025-11-25",
]);

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
  try { unlinkSync(join(LOCK_DIR, `${port}.lock`)); } catch { /* already gone */ }
}

function cleanStaleLockFiles() {
  try {
    for (const file of readdirSync(LOCK_DIR).filter(f => f.endsWith(".lock"))) {
      const p = join(LOCK_DIR, file);
      try {
        const data = JSON.parse(readFileSync(p, "utf-8")) as { ideName?: string; pid?: number };
        if (data.ideName !== "Obsidian") continue;
        if (typeof data.pid === "number") process.kill(data.pid, 0);
      } catch {
        // Unreadable, malformed, or the owning process is gone — remove the lock.
        try { unlinkSync(p); } catch { /* already gone */ }
      }
    }
  } catch { /* lock dir missing — nothing to clean */ }
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

// Coerce an untyped JSON value to a string, treating anything non-string as
// empty. Used for the loosely-typed argument records Claude Code sends.
function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export default class ObsidianAgentMCP extends Plugin {
  private clients = new Set<Client>();
  private server: Server | null = null;
  private mcpServer: Server | null = null;
  private mcpSessions = new Map<string, ServerResponse>();
  private codexSseSessions = new Set<ServerResponse>();
  private port = 0;
  private pingInterval: number | null = null;
  private broadcastTimer: number | null = null;
  private prevStateKey: string | null = null;
  private authToken = "";
  private latestSelection = getSelectionData(this.app);
  private lockRefreshInterval: number | null = null;
  private diffLeaves = new Map<string, WorkspaceLeaf>();
  private pendingDiffResolvers = new Map<string, (r: object) => void>();
  // The note leaf the edit belongs to, captured before the diff opens so we can
  // restore it in the main area once the diff closes — otherwise Obsidian falls
  // back to an arbitrary neighbouring tab.
  private diffReturnLeaves = new Map<string, WorkspaceLeaf>();

  settings: PluginSettings = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new AgentMCPSettingsTab(this.app, this));

    cleanStaleLockFiles();
    this.authToken = randomUUID();
    this.port = await this.startServer();
    const vaultPath = this.basePath();
    createLockFile(this.port, process.pid, vaultPath, this.authToken);

    // The lock file is how Claude Code discovers Obsidian as an "IDE". Other
    // Claude Code instances housekeep ~/.claude/ide/ and can remove our lock,
    // which silently kills selection streaming until the next plugin reload.
    // Re-assert it on a slow interval so a deleted lock self-heals.
    this.lockRefreshInterval = window.setInterval(() => {
      if (existsSync(join(LOCK_DIR, `${this.port}.lock`))) return;
      try { createLockFile(this.port, process.pid, vaultPath, this.authToken); } catch { /* best-effort re-assert */ }
    }, 10_000);

    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.scheduleBroadcast()));
    this.registerDomEvent(window, "focus", () => { this.prevStateKey = null; this.scheduleBroadcast(); });
    this.registerDomEvent(document, "selectionchange", () => this.scheduleBroadcast());

    this.addCommand({
      id: "send-to-claude",
      name: "Send to Claude",
      editorCallback: () => {
        const data = this.captureSelection();
        if (!data) return;
        this.broadcast({ jsonrpc: "2.0", method: "at_mentioned", params: data });
      },
    });

    this.registerView(
      AGENT_TERMINAL_VIEW_TYPE,
      leaf => new AgentTerminalView(leaf, () => this.getTerminalConfig()),
    );

    this.registerView(AGENT_DIFF_VIEW_TYPE, leaf => new AgentDiffView(leaf));

    this.addCommand({
      id: "open-agent-terminal",
      name: "Open agent terminal",
      callback: () => void this.openTerminalView(),
    });

    this.addRibbonIcon("bot", "Open agent terminal", () => void this.openTerminalView());

    this.startMcpHttpServer();
  }

  onunload() {
    if (this.broadcastTimer) window.clearTimeout(this.broadcastTimer);
    if (this.pingInterval) window.clearInterval(this.pingInterval);
    if (this.lockRefreshInterval) window.clearInterval(this.lockRefreshInterval);
    for (const c of this.clients) c.socket.destroy();
    this.clients.clear();
    this.server?.close();
    this.mcpServer?.close();
    if (this.port) removeLockFile(this.port);
  }

  async loadSettings() {
    const data = ((await this.loadData()) ?? {}) as Partial<PluginSettings>;
    // Deep-merge the nested `terminal` object: a shallow Object.assign would let a
    // saved `terminal` (written before newer keys like `ollamaModel` existed)
    // replace the whole default, leaving those keys undefined and crashing later.
    this.settings = {
      ...DEFAULT_SETTINGS,
      ...data,
      terminal: { ...DEFAULT_SETTINGS.terminal, ...(data.terminal ?? {}) },
    };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  private basePath(): string {
    return getVaultBasePath(this.app);
  }

  // ── Terminal ───────────────────────────────────────────────────────────────

  private pluginDir(): string {
    return join(this.basePath(), this.app.vault.configDir, "plugins", this.manifest.id);
  }

  private getTerminalConfig(): TerminalConfig {
    const t = this.settings.terminal;
    const shellArgs = t.shellArgs.trim().length
      ? t.shellArgs.split(/\s+/).filter(Boolean)
      : undefined;
    return {
      pluginDir: this.pluginDir(),
      pythonPath: t.pythonPath,
      cwd: t.cwd === "home" ? homedir() : this.basePath(),
      shell: t.shell.trim() || undefined,
      shellArgs,
      fontSize: t.fontSize,
      backend: t.backend,
      resolveStartupCommand: backend => this.resolveStartupCommand(backend),
      onBackendChange: backend => this.persistBackend(backend),
    };
  }

  // The agent command that auto-runs when a terminal session starts, so the user
  // always lands in the agent rather than a bare shell. The Claude Code agent
  // runs `claude` (or the user's override). The Ollama agent launches Claude Code
  // via `ollama launch claude`, pointing it at a local model — everything
  // downstream (IDE connection, MCP tools, diff previews) behaves identically
  // because it is still Claude Code.
  private resolveStartupCommand(backend: AgentBackend): string {
    const t = this.settings.terminal;
    if (backend === "ollama") {
      const model = t.ollamaModel.trim();
      return model ? `ollama launch claude --model ${model}` : "ollama launch claude";
    }
    return t.startupCommand.trim() || "claude";
  }

  // The in-terminal agent switcher persists its selection here so it becomes the
  // default the next time a terminal is opened.
  private persistBackend(backend: AgentBackend): void {
    if (this.settings.terminal.backend === backend) return;
    this.settings.terminal.backend = backend;
    void this.saveSettings();
  }

  private async openTerminalView(): Promise<void> {
    const existing = this.app.workspace.getLeavesOfType(AGENT_TERMINAL_VIEW_TYPE);
    if (existing.length > 0) {
      void this.app.workspace.revealLeaf(existing[0]);
      return;
    }
    const leaf: WorkspaceLeaf | null = this.app.workspace.getRightLeaf(false);
    if (!leaf) return;
    await leaf.setViewState({ type: AGENT_TERMINAL_VIEW_TYPE, active: true });
    void this.app.workspace.revealLeaf(leaf);
  }

  // ── Tool registry ──────────────────────────────────────────────────────────

  private getActiveTools(): ToolDefinition[] {
    return [...createEditorTools(this.app, () => this.latestSelection)];
  }

  // ── Broadcasting ───────────────────────────────────────────────────────────

  private scheduleBroadcast() {
    if (this.broadcastTimer) window.clearTimeout(this.broadcastTimer);
    this.broadcastTimer = window.setTimeout(() => { this.broadcastTimer = null; this.doBroadcast(); }, 100);
  }

  private doBroadcast() {
    const data = this.captureSelection();
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
    const sseData = `event: message\ndata: ${JSON.stringify(msg)}\n\n`;
    for (const res of this.codexSseSessions) {
      if (!res.writableEnded) res.write(sseData);
      else this.codexSseSessions.delete(res);
    }
  }

  private captureSelection() {
    const data = getSelectionData(this.app);
    if (data) this.latestSelection = data;
    return data;
  }

  // ── IDE-control tools (openDiff & friends) ───────────────────────────────────

  private textResult(text: string): object {
    return { content: [{ type: "text", text }] };
  }

  // Returns a result for IDE-control calls Claude Code issues over the WS
  // connection, or null if the call is not one we handle here.
  private async handleIdeTool(name: string, args: Record<string, unknown> | undefined): Promise<object | null> {
    switch (name) {
      case "openDiff":
        return this.openDiff(args ?? {});
      case "close_tab": {
        const tab = asString(args?.tab_name);
        // If a diff for this tab is still blocking, the user has decided in the
        // terminal — unblock it. (EXPERIMENT: treat any close as accepted.)
        const resolver = this.pendingDiffResolvers.get(tab);
        if (resolver) {
          this.pendingDiffResolvers.delete(tab);
          resolver({ content: [{ type: "text", text: "FILE_SAVED" }] });
        }
        this.detachDiff(tab);
        this.focusTerminal();
        return this.textResult("TAB_CLOSED");
      }
      case "closeAllDiffTabs":
        this.detachAllDiffs();
        return this.textResult("CLOSED_ALL_DIFF_TABS");
      case "getDiagnostics":
        return this.textResult("[]");
      case "checkDocumentDirty":
      case "saveDocument":
      case "openFile":
      case "executeCode":
        return this.textResult("{}");
      default:
        return null;
    }
  }

  private toRelativePath(absPath: string): string {
    const base = this.basePath();
    return absPath.startsWith(base + "/") ? absPath.slice(base.length + 1) : absPath;
  }

  private async openDiff(args: Record<string, unknown>): Promise<object> {
    const filePath = asString(args.new_file_path) || asString(args.old_file_path);
    const newContent = asString(args.new_file_contents);
    const tabName = asString(args.tab_name) || filePath;
    const rel = this.toRelativePath(filePath);
    const fileName = rel.split("/").pop() || rel;

    const existing = this.app.vault.getAbstractFileByPath(rel);
    const oldContent = existing instanceof TFile ? await this.app.vault.read(existing) : "";

    // Remember which note tab the edit belongs to before we open the diff, so we
    // can bring it back to the foreground once the user accepts/declines.
    const returnLeaf = this.findMarkdownLeaf(rel);

    // Replace any stale diff tab with the same name before opening a fresh one.
    this.detachDiff(tabName);

    const leaf = this.app.workspace.getLeaf(true);
    await leaf.setViewState({ type: AGENT_DIFF_VIEW_TYPE, active: true });
    this.diffLeaves.set(tabName, leaf);
    if (returnLeaf) this.diffReturnLeaves.set(tabName, returnLeaf);
    const view = leaf.view as AgentDiffView;
    view.setDiff({ fileName, oldContent, newContent });

    // Present the diff as a read-only preview, then hand focus back to the
    // terminal so the user can approve there. Claude gates the edit via its own
    // terminal prompt and writes the file itself; close_tab signals the decision.
    // Re-focus after a tick so we win against Obsidian focusing the new leaf.
    this.focusTerminal();
    window.setTimeout(() => this.focusTerminal(), 60);

    return new Promise<object>(resolve => {
      this.pendingDiffResolvers.set(tabName, resolve);
      window.setTimeout(() => {
        if (this.pendingDiffResolvers.delete(tabName)) {
          resolve({ content: [{ type: "text", text: "DIFF_REJECTED" }, { type: "text", text: tabName }] });
        }
      }, 600_000);
    });
  }

  private detachDiff(tabName: string): void {
    const resolver = this.pendingDiffResolvers.get(tabName);
    if (resolver) {
      this.pendingDiffResolvers.delete(tabName);
      resolver({ content: [{ type: "text", text: "DIFF_REJECTED" }, { type: "text", text: tabName }] });
    }
    const leaf = this.diffLeaves.get(tabName);
    if (!leaf) return;
    this.diffLeaves.delete(tabName);
    leaf.detach();
    this.restoreNoteLeaf(tabName);
  }

  // Finds the open markdown tab showing the given vault-relative path, if any.
  private findMarkdownLeaf(path: string): WorkspaceLeaf | null {
    return this.app.workspace
      .getLeavesOfType("markdown")
      .find(l => (l.view as MarkdownView).file?.path === path) ?? null;
  }

  // Brings the edited note back to the foreground in the main area without
  // stealing keyboard focus (that goes to the terminal via focusTerminal).
  private restoreNoteLeaf(tabName: string): void {
    const leaf = this.diffReturnLeaves.get(tabName);
    this.diffReturnLeaves.delete(tabName);
    if (leaf && (leaf.view as MarkdownView | null)?.file) {
      this.app.workspace.setActiveLeaf(leaf, { focus: false });
    }
  }

  private focusTerminal(): void {
    const leaves = this.app.workspace.getLeavesOfType(AGENT_TERMINAL_VIEW_TYPE);
    if (leaves.length === 0) return;
    const leaf = leaves[0];
    void this.app.workspace.revealLeaf(leaf);
    const view = leaf.view;
    if (view instanceof AgentTerminalView) view.focusTerminal();
  }

  private detachAllDiffs(): void {
    for (const [tab, resolve] of this.pendingDiffResolvers) {
      resolve({ content: [{ type: "text", text: "DIFF_REJECTED" }, { type: "text", text: tab }] });
    }
    this.pendingDiffResolvers.clear();
    this.diffLeaves.clear();
    this.diffReturnLeaves.clear();
    this.app.workspace.detachLeavesOfType(AGENT_DIFF_VIEW_TYPE);
  }

  // ── RPC routing ────────────────────────────────────────────────────────────

  private async handleRpc(msg: { jsonrpc: string; id: unknown; method: string; params?: Record<string, unknown> }): Promise<object> {
    const id = msg.id;
    const tools = this.getActiveTools();

    switch (msg.method) {
      case "initialize":
        return {
          jsonrpc: "2.0", id,
          result: {
            protocolVersion: (msg.params?.protocolVersion as string) || "2025-03-26",
            capabilities: { tools: {} },
            serverInfo: { name: "agent-mcp", version: this.manifest.version },
          },
        };

      case "tools/list":
        return {
          jsonrpc: "2.0", id,
          result: {
            tools: tools.map(t => ({ name: t.name, description: t.description, inputSchema: t.inputSchema })),
          },
        };

      case "tools/call": {
        const name = msg.params?.name as string;
        const toolParams = msg.params?.arguments as Record<string, unknown> | undefined;

        // IDE-control calls (openDiff, close_tab, …) are issued by Claude Code
        // over the WebSocket connection and are not part of our MCP tool registry.
        const ideResult = await this.handleIdeTool(name, toolParams);
        if (ideResult) return { jsonrpc: "2.0", id, result: ideResult };

        const tool = tools.find(t => t.name === name);
        if (!tool) return { jsonrpc: "2.0", id, error: { code: -32601, message: `Tool not found: ${name}` } };
        try {
          const result = await Promise.resolve(tool.call(toolParams));
          return { jsonrpc: "2.0", id, result };
        } catch (e) {
          return { jsonrpc: "2.0", id, error: { code: -32603, message: `Tool execution failed: ${String(e)}` } };
        }
      }

      default:
        if (["openDiff", "getDiagnostics", "checkDocumentDirty", "saveDocument", "close_tab", "closeAllDiffTabs", "executeCode"].includes(msg.method))
          return { jsonrpc: "2.0", id, result: { content: [{ type: "text", text: "{}" }] } };
        return { jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } };
    }
  }

  // ── WebSocket server ───────────────────────────────────────────────────────

  private handleClient(socket: Socket, headers: Record<string, string | string[] | undefined>) {
    if (headers["x-claude-code-ide-authorization"] !== this.authToken) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n"); socket.destroy(); return;
    }
    const wsKey = headers["sec-websocket-key"];
    if (!wsKey || Array.isArray(wsKey)) { socket.write("HTTP/1.1 400 Bad Request\r\n\r\n"); socket.destroy(); return; }
    const protocolHeader = headers["sec-websocket-protocol"];
    const protocol = Array.isArray(protocolHeader) ? protocolHeader[0] : protocolHeader;
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

  private async handleWsText(client: Client, payload: Buffer): Promise<void> {
    let msg: { id: unknown; method: string; params?: Record<string, unknown>; jsonrpc: string };
    try {
      msg = JSON.parse(payload.toString()) as { id: unknown; method: string; params?: Record<string, unknown>; jsonrpc: string };
    } catch {
      if (client.socket.writable) {
        client.socket.write(makeFrame(OPCODE.TEXT, JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } })));
      }
      return;
    }
    if (msg.id == null) return;
    const response = await this.handleRpc(msg);
    if (client.socket.writable) {
      client.socket.write(makeFrame(OPCODE.TEXT, JSON.stringify(response)));
    }
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
        const payload = frame.payload;
        void this.handleWsText(client, payload);
      }
    }
  }

  private startServer(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.server = createServer((_req, res) => { res.writeHead(400); res.end(); });
      this.server.on("upgrade", (req, socket, head) => {
        const s = socket as Socket;
        if (head.length > 0) s.unshift(head);
        this.handleClient(s, req.headers);
      });
      this.server.on("error", reject);
      this.server.listen(0, "127.0.0.1", () => {
        const addr = this.server!.address() as { port: number };
        this.pingInterval = window.setInterval(() => {
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

  // ── MCP HTTP/SSE server ────────────────────────────────────────────────────

  private isLocalhostRequest(req: IncomingMessage, res: ServerResponse): boolean {
    // Block DNS-rebinding: the Host header must be our exact bind address.
    const host = req.headers.host;
    if (!host || !new Set([`127.0.0.1:${MCP_HTTP_PORT}`, `localhost:${MCP_HTTP_PORT}`]).has(host)) {
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

  private getProtocolVersionHeader(req: IncomingMessage): string {
    const raw = Array.isArray(req.headers["mcp-protocol-version"])
      ? req.headers["mcp-protocol-version"][0]
      : req.headers["mcp-protocol-version"];
    if (raw == null || raw === "") return DEFAULT_MCP_PROTOCOL_VERSION;
    return SUPPORTED_MCP_PROTOCOL_VERSIONS.has(raw) ? raw : DEFAULT_MCP_PROTOCOL_VERSION;
  }

  private parseJsonRpcBody(body: string): unknown {
    return JSON.parse(body);
  }

  private async handleStreamableHttpPayload(payload: unknown): Promise<{ status: number; body?: string }> {
    const messages = Array.isArray(payload) ? payload : [payload];
    const responses: object[] = [];

    for (const msg of messages) {
      if (!msg || typeof msg !== "object") return { status: 400 };
      const rpc = msg as { jsonrpc?: unknown; id?: unknown; method?: unknown; params?: Record<string, unknown> };
      if (rpc.jsonrpc !== "2.0") return { status: 400 };
      if (typeof rpc.method !== "string" || rpc.id == null) continue;
      responses.push(await this.handleRpc({
        jsonrpc: "2.0",
        id: rpc.id,
        method: rpc.method,
        params: rpc.params,
      }));
    }

    if (responses.length === 0) return { status: 202 };
    return {
      status: 200,
      body: JSON.stringify(Array.isArray(payload) ? responses : responses[0]),
    };
  }

  private startMcpHttpServer() {
    this.mcpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
      if (!this.isLocalhostRequest(req, res)) return;
      const protocolVersion = this.getProtocolVersionHeader(req);
      const url = new URL(req.url ?? "/", `http://127.0.0.1:${MCP_HTTP_PORT}`);

      if (url.pathname === "/mcp" && req.method === "GET") {
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "MCP-Protocol-Version": protocolVersion,
        });
        this.codexSseSessions.add(res);
        req.on("close", () => this.codexSseSessions.delete(res));
        res.write(": keepalive\n\n");
        return;
      }

      if (url.pathname === "/mcp" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk: Buffer) => body += chunk.toString());
        req.on("end", () => void (async () => {
          try {
            const result = await this.handleStreamableHttpPayload(this.parseJsonRpcBody(body));
            if (result.status === 200) {
              res.writeHead(200, {
                "Content-Type": "application/json",
                "MCP-Protocol-Version": protocolVersion,
              });
              res.end(result.body);
              return;
            }

            res.writeHead(result.status, {
              "MCP-Protocol-Version": protocolVersion,
            });
            res.end();
          } catch {
            res.writeHead(400, {
              "MCP-Protocol-Version": protocolVersion,
            });
            res.end();
          }
        })());
        return;
      }

      if (url.pathname === "/sse" && req.method === "GET") {
        const sessionId = randomUUID();
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "MCP-Protocol-Version": protocolVersion,
        });
        this.mcpSessions.set(sessionId, res);
        res.write(`event: endpoint\ndata: http://127.0.0.1:${MCP_HTTP_PORT}/message?sessionId=${sessionId}\n\n`);
        req.on("close", () => this.mcpSessions.delete(sessionId));
        return;
      }

      if (url.pathname === "/message" && req.method === "POST") {
        const sseRes = this.mcpSessions.get(url.searchParams.get("sessionId") ?? "");
        let body = "";
        req.on("data", (chunk: Buffer) => body += chunk.toString());
        req.on("end", () => void (async () => {
          try {
            const msg = JSON.parse(body) as { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> };
            res.writeHead(202, { "MCP-Protocol-Version": protocolVersion }); res.end();
            if (msg.id != null && sseRes && !sseRes.writableEnded) {
              const response = await this.handleRpc({ jsonrpc: "2.0", id: msg.id, method: msg.method ?? "", params: msg.params });
              sseRes.write(`event: message\ndata: ${JSON.stringify(response)}\n\n`);
            }
          } catch { res.writeHead(400, { "MCP-Protocol-Version": protocolVersion }); res.end(); }
        })());
        return;
      }

      res.writeHead(404, { "MCP-Protocol-Version": protocolVersion }); res.end();
    });
    this.mcpServer.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code !== "EADDRINUSE") console.error("[agent-mcp] MCP HTTP error:", err);
    });
    this.mcpServer.listen(MCP_HTTP_PORT, "127.0.0.1");
  }
}
