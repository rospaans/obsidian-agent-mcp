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
- Writes a lock file to `~/.claude/ide/` — Claude Code reads this to auto-discover and connect to Obsidian, the same way it connects to VS Code or other editors. The lock is re-asserted on an interval, so if it ever gets cleaned out from under us the connection self-heals instead of going silently dead until the next reload.
- Streams your active file path and text selection to Claude Code as you navigate
- Adds a **"Send to Claude"** command to explicitly push your current selection as context

### Edit previews (terminal-gated diffs)
When Claude Code is connected as an IDE, it routes file edits through the IDE instead of printing the diff in the terminal. The plugin handles this by:
- Opening a **read-only diff preview** of the proposed change in a side pane — added lines in green, removed lines struck in red.
- Immediately **handing focus back to the terminal**, so you approve or decline right there using Claude's normal `y`/`n` prompt — no mouse, no separate buttons.
- Letting **Claude write the file itself** on accept (the plugin never writes it), which keeps Claude's view of the file in sync and avoids "file content has changed" errors.
- Clearing the preview and refocusing the terminal once you've decided.

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
| `getTasks` | Scans every markdown file in the vault for tasks (Obsidian Tasks emoji syntax + dataview inline fields) and returns them grouped by overdue / today / this week / future / undated. Supports filters: `includeCompleted`, `pathPrefix`, `tag`, `limit`. | Vault task scanner toggle |

---

## Task discovery

`getTasks` scans the vault natively — it walks every markdown file via Obsidian's metadata cache, parses task lines against both [Obsidian Tasks](https://github.com/obsidian-tasks-group/obsidian-tasks) emoji syntax and [Dataview](https://github.com/blacksmithgu/obsidian-dataview) inline fields, and returns a bucketed view by due date. No extra plugins required, but any task you write that matches the standard formats will be found.

Examples the scanner understands:

```markdown
- [ ] Write the release notes 📅 2026-04-25 ⏫ #release
- [/] Refactor the parser 🛫 2026-04-18 #project/obsidian
- [ ] Email the team [due:: 2026-04-20] #admin
- [x] Book flights ✅ 2026-04-10
```

Tool arguments:

- `includeCompleted` (bool, default `false`) — include `[x]` and `[-]` lines.
- `pathPrefix` (string, optional) — scope to a folder (e.g. `Projects/`).
- `tag` (string, optional) — only tasks carrying this tag.
- `limit` (number, default `2000`) — safety cap for very large vaults.

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

## How it's wired up

The plugin runs two local services, both bound to `127.0.0.1`:

| Service | Port | What it does | Used by |
|---|---|---|---|
| **WebSocket IDE server** | OS-assigned (random) | Streams active file + selection, advertises the lock file in `~/.claude/ide/`, and renders edit diffs as terminal-gated previews. Lets Claude Code auto-discover Obsidian as an "IDE". | Claude Code |
| **MCP HTTP server** | `127.0.0.1:27183` | Exposes all tools (`getTasks`, `getLatestSelection`, `getOpenEditors`, `getWorkspaceFolders`) over the standard MCP Streamable HTTP transport. | Claude Code, Codex, any MCP client |

Both routes into the same tool registry — adding one tool makes it available everywhere.

**Important**: Claude Code treats IDE connections and MCP servers as separate systems. The IDE connection gives Claude live selection awareness; the MCP server is what exposes our tools to the model. You want **both** registered.

## Usage

### Opening a terminal

1. Enable the plugin.
2. Click the terminal ribbon icon, or run **"Open Agent Terminal"** from the command palette.
3. A terminal opens in the right sidebar using your default shell, starting in the vault root.
4. Configure the shell, startup command (e.g. `claude`), working directory, and font size under **Settings → Agent MCP → Terminal**.

### With Claude Code

Register both channels once, then you're done forever.

```bash
# (1) Register our MCP server so Claude can call our tools
claude mcp add --transport http obsidian-agent-mcp http://127.0.0.1:27183/mcp
```

The IDE connection is automatic — nothing to register. Claude Code scans `~/.claude/ide/` on startup and discovers the lock file the plugin wrote on launch.

Then:

1. Open a terminal inside Obsidian (ribbon icon or command palette) — or use any external terminal with your vault as cwd.
2. Run `claude`.
3. Claude prompts you to connect to the discovered Obsidian IDE — accept once.
4. Inside Claude, `/mcp` should list `obsidian-agent-mcp` as connected.
5. Ask something like *"What's due this week?"* — Claude will call `getTasks`. Or *"What file am I in?"* → `getLatestSelection`.

Use the command palette command **"Send to Claude"** in Obsidian to explicitly push your current selection as a context mention.

When Claude edits a note, a read-only diff preview opens in Obsidian and focus returns to the terminal — approve or decline with Claude's `y`/`n` prompt as usual.

**Removing an older `obsidian-tasks` stdio server?** If you previously used the standalone `mcp-tasks.mjs` and have it registered, drop it — the plugin supersedes it:

```bash
claude mcp remove obsidian-tasks
```

### With Codex CLI

Codex only needs the MCP server registration:

```bash
codex mcp add obsidian-agent-mcp --url http://127.0.0.1:27183/mcp
```

Start `codex`, run `/mcp` to confirm the connection, then ask anything that benefits from vault context.

### With a local model via Ollama

You can run the **exact same Claude Code experience** against a local model with [Ollama](https://ollama.com). Ollama exposes an Anthropic-compatible endpoint at `http://localhost:11434` and ships an `ollama launch claude` helper that starts Claude Code pointed at a local model. Because it's still Claude Code underneath, the IDE connection, MCP tools, and diff previews all work identically — no extra registration, no proxy.

**Setup:**

1. Install [Ollama](https://ollama.com) and pull a model with a large (64k+) context window and tool-use support — e.g. `ollama pull qwen3.5`. See [Ollama's Claude Code guide](https://docs.ollama.com/integrations/claude-code) for recommended models.
2. In **Settings → Agent MCP → Agent backend**, set **Backend** to **Ollama** and enter your model name (e.g. `qwen3.5`).
3. Open the Agent Terminal. It now launches `ollama launch claude --model <your-model>` instead of `claude`.
4. As with Claude Code, register the MCP server once so the model can call our tools:

   ```bash
   claude mcp add --transport http obsidian-agent-mcp http://127.0.0.1:27183/mcp
   ```

The IDE connection is still automatic — Claude Code discovers Obsidian via the lock file exactly as before.

> Prefer to drive it yourself? `ollama launch claude` just sets these and runs Claude Code:
>
> ```bash
> export ANTHROPIC_BASE_URL=http://localhost:11434
> export ANTHROPIC_AUTH_TOKEN=ollama
> export ANTHROPIC_API_KEY=""
> claude --model qwen3.5
> ```

---

## Settings

**Settings → Agent MCP**

- **Vault task scanner** — expose the `getTasks` tool that scans the whole vault for markdown tasks. Disable if you don't want the agent to have task visibility.
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
