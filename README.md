# obsidian-agent-mcp

>This is a personal project Vibe-coded for fun. It connects Obsidian to coding agents like Claude Code and Codex so they can work with your vault context. The goal is to be able to use LLMs to handle the brunt work in maintaining a knowledge base or task manager. (or both :)) 

It exposes local integration points for both Claude Code and Codex, and is designed to be extended with your own tools.

---

## What it does

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
| `getCurrentSelection` | Active file path, cursor position, and selected text | Always on |
| `getLatestSelection` | Most recently tracked selection (useful when focus has moved) | Always on |
| `getOpenEditors` | All open markdown tabs with file URI, label, and which is active | Always on |
| `getWorkspaceFolders` | Vault root path | Always on |
| `getTasks` | All pending tasks from the vault, grouped by overdue / today / this week / future / undated | Task Board toggle |

---

## Plugins this builds on

This plugin doesn't do everything itself — it connects the dots between a few excellent community plugins:

### [Terminal for Obsidian](https://obsidian.md/plugins?id=terminal) · [GitHub](https://github.com/polyipseity/obsidian-terminal)

Integrates a full terminal emulator inside Obsidian as a side panel. This is how you run `claude` (or `ollama run`) without leaving Obsidian. Supports multiple shell profiles (bash, zsh, PowerShell, etc.), saves and restores terminal history across sessions, and has built-in keyboard shortcuts. **Required** to run an AI assistant inside Obsidian.

### [Obsidian Tasks](https://obsidian.md/plugins?id=obsidian-tasks-plugin) · [GitHub](https://github.com/obsidian-tasks-group/obsidian-tasks)

The de-facto standard for task management in Obsidian. Lets you track tasks across your entire vault with due dates, recurrence, priorities, and rich query blocks. Tasks are written as standard markdown checkboxes with emoji metadata (e.g. `📅 2026-03-23`). **Only needed if you use the `getTasks` tool.**

### [Task Board](https://obsidian.md/plugins?id=task-board) · [GitHub](https://github.com/tu2-atmanand/Task-Board)

Scans all tasks across your vault and displays them on a Kanban-style board with real-time sync back to the source markdown files. It also maintains a JSON cache of all pending tasks at `.obsidian/plugins/task-board/tasks.json` — which is exactly what this plugin's `getTasks` tool reads to give Claude a structured snapshot of your workload. **Only needed if you use the `getTasks` tool.**

---

## Installation

### Option A: Manual install (no build required)

1. Download `main.js` and `manifest.json` from the [latest release](../../releases/latest)
2. Create the folder `.obsidian/plugins/obsidian-agent-mcp/` inside your vault
3. Copy both files into that folder
4. Go to **Obsidian → Settings → Community plugins** → refresh → toggle **Claude MCP** on

### Option B: Build from source

```bash
git clone https://github.com/rospaans/obsidian-agent-mcp
cd obsidian-agent-mcp
npm install
cp .env.example .env          # edit to point at your vault's plugin folder
npm run build
```

Then enable the plugin in Obsidian as above.

---

## Usage

### With Claude Code

1. Enable the plugin — it starts both servers automatically on Obsidian launch
2. Open a terminal pane via the [Terminal](https://obsidian.md/plugins?id=terminal) plugin
3. Run `claude` in the terminal
4. Claude Code detects the lock file and prompts you to connect — accept once and it auto-connects on every subsequent launch
5. Claude now sees your active file and selection in real time and can query your task list

Use the command palette command **"Send to Claude"** to explicitly push your current selection as a context mention.

### With Codex CLI

Codex does not use Claude's lock-file discovery flow, but it can connect to the same Obsidian tools over MCP.

1. Enable the plugin in Obsidian
2. Register the MCP endpoint with Codex:

```bash
codex mcp add obsidian --url http://127.0.0.1:27183/mcp
```

3. Start `codex`
4. Use `/mcp` inside Codex to confirm the server is connected
5. Codex can now call the same Obsidian tools, including `getLatestSelection`, even after focus moves to the terminal

### With a local model via Ollama

Don't want to use a cloud AI? You can get similar functionality with a local model using [Ollama](https://ollama.com) and the `ollama run` command with a model that supports tool use:

```bash
ollama launch claude
```

The MCP HTTP/SSE server on `127.0.0.1:27183` can be registered with any MCP-compatible client, including local ones. Keep in mind that the quality of context awareness depends heavily on the model — smaller or less capable models may not make good use of the selection and task data that gets passed in.

---

## Settings

Go to **Obsidian → Settings → Claude MCP** to configure which tools are active:

- **Task Board integration** — disable this if you are not using the Task Board plugin; the `getTasks` tool will simply not appear in the tool list

---

## Adding your own tools

The plugin is structured so that adding a new tool is straightforward.

**1. Create a tool file** at `src/tools/my-tool.ts`:

```typescript
import { wrap, type ToolDefinition } from "./types";

export function createMyTool(/* any context you need */): ToolDefinition {
  return {
    name: "myTool",
    description: "What this tool does.",
    inputSchema: { type: "object", properties: {} },
    call() {
      // do something and return a result
      return wrap({ hello: "world" });
    },
  };
}
```

**2. Add a toggle to `src/settings.ts`:**

```typescript
// In PluginSettings.enabledTools:
myTool: boolean;

// In DEFAULT_SETTINGS:
myTool: true,

// In ClaudeMCPSettingsTab.display():
new Setting(containerEl)
  .setName("My tool")
  .setDesc("What it does and when to disable it.")
  .addToggle(toggle =>
    toggle
      .setValue(this.plugin.settings.enabledTools.myTool)
      .onChange(async value => {
        this.plugin.settings.enabledTools.myTool = value;
        await this.plugin.saveSettings();
      })
  );
```

**3. Register it in `src/main.ts`** inside `getActiveTools()`:

```typescript
if (this.settings.enabledTools.myTool) {
  tools.push(createMyTool(/* context */));
}
```

That's it. Both the WebSocket and HTTP/SSE transports pick it up automatically. No changes to server or routing code.

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

- Both servers bind exclusively to `127.0.0.1` — no network exposure
- A unique auth token is generated fresh on every Obsidian launch via `crypto.randomUUID()`
- The WebSocket server rejects any connection that does not present the correct token in the `x-claude-code-ide-authorization` header
- The MCP HTTP/SSE server validates the `Host` header and rejects any request carrying an `Origin` header, blocking browser-based and DNS-rebinding attacks
- Only file paths, cursor positions, and selected text are shared — file contents are never read or transmitted by the plugin itself
- Stale lock files from crashed Obsidian processes are cleaned up automatically on startup

---

## Compatibility

- macOS: tested
- Windows / Linux: should work but untested
- Obsidian minimum version: 1.0.0
- Desktop only (no mobile support)
