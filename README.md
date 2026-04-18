# obsidian-agent-mcp

> Connect Obsidian to coding agents like Claude Code and Codex so they can work with your vault context. The goal is to let LLMs handle the brunt work in maintaining a knowledge base or task manager. (Or both.)
>
> Ships with a **built-in terminal**, so you can run `claude` or `codex` directly inside Obsidian — no other plugins required.

---

## What it does

### Built-in terminal
- Full terminal emulator inside Obsidian, powered by [xterm.js](https://github.com/xtermjs/xterm.js) and a native PTY.
- Opens as a side panel. Honors your `$SHELL`, starts in the vault root by default, and can auto-run a startup command like `claude` on open.
- Use the ribbon icon or the **"Open Agent Terminal"** command.

### IDE integration (WebSocket)
- Starts a local WebSocket server on `127.0.0.1` (random port, never network-exposed)
- Writes a lock file to `~/.claude/ide/` — Claude Code reads this to auto-discover and connect to Obsidian, the same way it connects to VS Code or other editors
- Streams your active file path and text selection to Claude Code as you navigate
- Adds a **"Send to Claude"** command to explicitly push your current selection as context

### MCP HTTP server
- Runs a second local MCP server on `127.0.0.1:27183`
- Exposes a modern Streamable HTTP endpoint at `/mcp` for Codex
- Preserves the older HTTP/SSE endpoints for Claude Desktop and other legacy MCP clients

### MCP tools exposed

| Tool | Description | Toggle in settings |
|---|---|---|
| `getLatestSelection` | Active file path, cursor position, and selected text (falls back to last-known state when Obsidian loses focus) | Always on |
| `getOpenEditors` | All open markdown tabs with file URI, label, and which is active | Always on |
| `getWorkspaceFolders` | Vault root path | Always on |
| `getTasks` | All pending tasks from the vault, grouped by overdue / today / this week / future / undated | Task Board toggle |

---

## Optional integrations

The plugin is self-contained, but `getTasks` leans on two excellent community plugins if you want task awareness:

### [Obsidian Tasks](https://obsidian.md/plugins?id=obsidian-tasks-plugin) · [GitHub](https://github.com/obsidian-tasks-group/obsidian-tasks)

The de-facto standard for task management in Obsidian. Tracks tasks across your vault with due dates, recurrence, priorities, and rich query blocks.

### [Task Board](https://obsidian.md/plugins?id=task-board) · [GitHub](https://github.com/tu2-atmanand/Task-Board)

Scans all tasks across your vault and displays them on a Kanban-style board. It maintains a JSON cache of all pending tasks at `.obsidian/plugins/task-board/tasks.json` — which is what this plugin's `getTasks` tool reads to give the agent a structured snapshot of your workload.

Only needed if you use the `getTasks` tool.

---

## Installation

### Option A: Manual install (no build required)

1. Download the platform-matching release zip (e.g. `obsidian-agent-mcp-macos-arm64.zip`) from the [latest release](../../releases/latest)
2. Unzip into `.obsidian/plugins/obsidian-agent-mcp/` inside your vault — the folder must contain `main.js`, `manifest.json`, and the `node-pty/` directory
3. Go to **Obsidian → Settings → Community plugins** → refresh → toggle **Agent MCP** on

### Option B: Build from source

```bash
git clone https://github.com/rospaans/obsidian-agent-mcp
cd obsidian-agent-mcp
npm install
cp .env.example .env          # edit to point at your vault's plugin folder
npm run build
```

`npm install` compiles `node-pty` against your current Electron/Node ABI. `npm run build` bundles `main.js` and copies the `node-pty` runtime next to it. If `OBSIDIAN_PLUGIN_DIR` is set in `.env`, the build also deploys the files directly into your vault.

---

## Usage

### Opening a terminal

1. Enable the plugin.
2. Click the terminal ribbon icon, or run **"Open Agent Terminal"** from the command palette.
3. A terminal opens in the right sidebar using your default shell, starting in the vault root.
4. Configure the shell, startup command (e.g. `claude`), working directory, and font size under **Settings → Agent MCP → Terminal**.

### With Claude Code

1. Open a terminal inside Obsidian (see above).
2. Run `claude` — or set the startup command to `claude` so it runs automatically every time the terminal opens.
3. Claude Code detects the lock file in `~/.claude/ide/` and prompts you to connect to Obsidian. Accept once and it auto-connects thereafter.
4. Claude now sees your active file and selection in real time and can query your task list.

Use the command palette command **"Send to Claude"** to explicitly push your current selection as a context mention.

### With Codex CLI

Codex does not use Claude's lock-file discovery flow, but it can connect to the same Obsidian tools over MCP.

1. Enable the plugin in Obsidian.
2. Register the MCP endpoint with Codex:

   ```bash
   codex mcp add obsidian --url http://127.0.0.1:27183/mcp
   ```

3. Start `codex`.
4. Use `/mcp` inside Codex to confirm the server is connected.
5. Codex can now call the same Obsidian tools, including `getLatestSelection`, even after focus moves to the terminal.

### With a local model via Ollama

You can get similar functionality with a local model using [Ollama](https://ollama.com) and a model that supports tool use. The MCP HTTP/SSE server on `127.0.0.1:27183` can be registered with any MCP-compatible client, including local ones.

---

## Settings

**Settings → Agent MCP**

- **Task Board integration** — expose the `getTasks` tool. Disable if you don't use Task Board.
- **Terminal → Shell** — path to the shell binary. Defaults to `$SHELL`.
- **Terminal → Shell arguments** — space-separated arguments (e.g. `-l`).
- **Terminal → Startup command** — typed into the shell on open (e.g. `claude`).
- **Terminal → Working directory** — vault root or home.
- **Terminal → Font size** — 10–22.

---

## Adding your own tools

**1. Create a tool file** at `src/tools/my-tool.ts`:

```typescript
import { wrap, type ToolDefinition } from "./types";

export function createMyTool(/* any context you need */): ToolDefinition {
  return {
    name: "myTool",
    description: "What this tool does.",
    inputSchema: { type: "object", properties: {} },
    call() {
      return wrap({ hello: "world" });
    },
  };
}
```

**2. Add a toggle to `src/settings.ts`** (inside `enabledTools`, `DEFAULT_SETTINGS`, and `AgentMCPSettingsTab.display()`).

**3. Register it in `src/main.ts`** inside `getActiveTools()`:

```typescript
if (this.settings.enabledTools.myTool) {
  tools.push(createMyTool(/* context */));
}
```

Both the WebSocket and HTTP/SSE transports pick it up automatically. No changes to server or routing code.

---

## Standalone MCP task server

`mcp-tasks.mjs` is a lightweight stdio MCP server that exposes only the `getTasks` tool. It can be registered in `claude_desktop_config.json` independently of the plugin — useful if you want task awareness in Claude Desktop without running the full Obsidian plugin:

```json
{
  "mcpServers": {
    "obsidian-tasks": {
      "command": "node",
      "args": ["/path/to/mcp-tasks.mjs", "/path/to/your/vault"]
    }
  }
}
```

A debug wrapper (`mcp-debug-wrapper.mjs`) logs all stdio traffic to `/tmp/mcp-debug.log` for troubleshooting.

---

## Security

- Both local servers bind exclusively to `127.0.0.1` — no network exposure
- A unique auth token is generated fresh on every Obsidian launch via `crypto.randomUUID()`
- The WebSocket server rejects any connection that does not present the correct token in the `x-claude-code-ide-authorization` header
- The MCP HTTP/SSE server validates the `Host` header and rejects any request carrying an `Origin` header, blocking browser-based and DNS-rebinding attacks
- Only file paths, cursor positions, and selected text are shared — file contents are never read or transmitted by the plugin itself
- Stale lock files from crashed Obsidian processes are cleaned up automatically on startup
- The built-in terminal spawns processes with the same privileges as Obsidian. Treat it like any other terminal on your machine.

---

## License & attribution

This plugin is licensed under the **MIT License** (see [`LICENSE`](LICENSE)).

Bundled third-party software (see [`NOTICE`](NOTICE) for full attribution):

- **[xterm.js](https://github.com/xtermjs/xterm.js)** (MIT) — terminal emulator in the browser
- **[node-pty-prebuilt-multiarch](https://github.com/homebridge/node-pty-prebuilt-multiarch)** (MIT), a prebuilt fork of Microsoft's **[node-pty](https://github.com/microsoft/node-pty)** (MIT) — native pseudo-terminal bindings

---

## Compatibility

- macOS: tested on Apple Silicon
- Windows / Linux: build pipeline targets both, but less tested
- Obsidian minimum version: 1.0.0
- Desktop only (no mobile support — native PTY bindings are not available on mobile)
