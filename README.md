# obsidian-claude-mcp

An Obsidian plugin that gives [Claude Code](https://claude.ai/code) full awareness of your vault: your active file, current selection, open tabs, and all pending tasks — updated in real time.

It exposes two local MCP interfaces (WebSocket + HTTP/SSE) that Claude Code connects to automatically, and integrates with the [Task Board](https://obsidian.md/plugins?id=task-board) and [Obsidian Tasks](https://obsidian.md/plugins?id=obsidian-tasks-plugin) plugins to surface your task list directly inside Claude's context.

---

## What it does

### IDE integration (WebSocket)
- Starts a local WebSocket server on `127.0.0.1` (random port, never network-exposed)
- Writes a lock file to `~/.claude/ide/` — Claude Code reads this to auto-discover and connect to Obsidian, the same way it connects to VS Code or other editors
- Streams your active file path and text selection to Claude Code as you navigate
- Adds a **"Send to Claude"** command to explicitly push your current selection as context

### MCP HTTP/SSE server
- Runs a second local MCP server on `127.0.0.1:27183` (SSE transport)
- Exposes the same tools over HTTP so Claude can also connect via the MCP protocol directly (e.g. from `claude_desktop_config.json`)

### MCP tools exposed

| Tool | Description |
|---|---|
| `getCurrentSelection` | Active file path, cursor position, and selected text |
| `getLatestSelection` | Most recently tracked selection (useful when focus has moved) |
| `getOpenEditors` | All open markdown tabs with file URI, label, and which is active |
| `getWorkspaceFolders` | Vault root path |
| `getTasks` | All pending tasks from the vault, grouped by overdue / today / this week / future / undated |

### Task awareness
The `getTasks` tool reads the cache that the [Task Board](https://obsidian.md/plugins?id=task-board) plugin maintains at `.obsidian/plugins/task-board/tasks.json`. Tasks are created and managed with the [Obsidian Tasks](https://obsidian.md/plugins?id=obsidian-tasks-plugin) plugin. This gives Claude a structured, up-to-date view of your workload without needing to scan your entire vault.

---

## Required Obsidian plugins

| Plugin | Purpose |
|---|---|
| [Terminal](https://obsidian.md/plugins?id=terminal) | Run Claude Code inside Obsidian as a side panel |
| [Obsidian Tasks](https://obsidian.md/plugins?id=obsidian-tasks-plugin) | Create and manage tasks across your vault |
| [Task Board](https://obsidian.md/plugins?id=task-board) | Maintains the task cache that the `getTasks` tool reads |

---

## Installation

### Option A: Manual install (no build required)

1. Download `main.js` and `manifest.json` from the [latest release](../../releases/latest)
2. Create the folder `.obsidian/plugins/obsidian-claude-mcp/` inside your vault
3. Copy both files into that folder
4. Go to **Obsidian → Settings → Community plugins** → refresh → toggle **Claude MCP** on

### Option B: Build from source

```bash
git clone https://github.com/rospaans/obsidian-claude-mcp
cd obsidian-claude-mcp
npm install
npm run build
cp main.js manifest.json /path/to/your/vault/.obsidian/plugins/obsidian-claude-mcp/
```

Then enable the plugin in Obsidian as above.

---

## Usage

1. Enable the plugin — it starts both servers automatically on Obsidian launch
2. Open a terminal pane via the [Terminal](https://obsidian.md/plugins?id=terminal) plugin
3. Run `claude` in the terminal
4. Claude Code detects the lock file and prompts you to connect — accept once and it auto-connects on every subsequent launch
5. Claude now sees your active file and selection in real time and can query your task list

Use the command palette command **"Send to Claude"** to explicitly push your current selection as a context mention.

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

## Verify it is working

Check that the lock file was created:

```bash
ls ~/.claude/ide/
```

You should see a `.lock` file while Obsidian is open. It is removed automatically when Obsidian closes or the plugin is disabled.

---

## Security

- Both servers bind exclusively to `127.0.0.1` — no network exposure
- A unique auth token is generated fresh on every Obsidian launch via `crypto.randomUUID()`
- The WebSocket server rejects any connection that does not present the correct token in the `x-claude-code-ide-authorization` header
- Only file paths, cursor positions, and selected text are shared — file contents are never read or transmitted by the plugin itself
- Stale lock files from crashed Obsidian processes are cleaned up automatically on startup

---

## Compatibility

- macOS: tested
- Windows / Linux: should work but untested
- Obsidian minimum version: 1.0.0
- Desktop only (no mobile support)
