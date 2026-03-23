# obsidian-claude-mcp

A minimal Obsidian plugin that connects [Claude Code](https://claude.ai/code) to your vault. It runs a local WebSocket server inside Obsidian, writes a lock file that Claude Code auto-discovers, and broadcasts your active file and current selection so Claude Code always knows what you are working on.

## What it does

- Starts a local-only WebSocket server on `127.0.0.1` (never exposed to the network)
- Writes a lock file to `~/.claude/ide/` so Claude Code can auto-discover and connect
- Sends your active file path and selected text to Claude Code in real time
- Adds a "Send to Claude" command to explicitly push selected text as context

## Requirements

### Obsidian plugins

- [Terminal for Obsidian](https://github.com/polyipseity/obsidian-terminal) — to run Claude Code inside Obsidian as a side panel

### CLI tools

- [Claude Code](https://claude.ai/code) — installed and authenticated (`claude` available in your PATH)
- [Node.js](https://nodejs.org/) v18 or higher (only needed to build the plugin from source)

## Installation

### Option A: Manual install (recommended)

1. Download `main.js` and `manifest.json` from the [latest release](../../releases/latest)
2. Create the folder `.obsidian/plugins/obsidian-claude-mcp/` inside your vault
3. Place both files in that folder
4. Go to Obsidian → Settings → Community plugins → refresh the list → toggle **Claude MCP** on

### Option B: Build from source

```bash
git clone https://github.com/yourname/obsidian-claude-mcp
cd obsidian-claude-mcp
npm install
npm run build
cp main.js manifest.json /path/to/your/vault/.obsidian/plugins/obsidian-claude-mcp/
```

Then enable the plugin in Obsidian as above.

## Usage

1. Open Obsidian with the plugin enabled
2. Open a terminal pane via the Terminal plugin (ribbon icon or command palette)
3. Run `claude` in the terminal
4. Claude Code will detect the lock file and prompt you to connect to Obsidian — accept once and it will auto-connect on every subsequent launch
5. Claude Code now sees your active file and selection automatically

You can also use the command palette command **"Send to Claude"** to explicitly push your current selection as context.

## Verify it is working

Check that the lock file was created:

```bash
ls ~/.claude/ide/
```

You should see a `.lock` file. If the plugin is enabled and running, this file will be present while Obsidian is open and removed when Obsidian closes.

## Security

- The WebSocket server binds exclusively to `127.0.0.1` — no network exposure
- A unique authentication token is generated fresh on every Obsidian launch
- Only Claude Code (which reads the token from the lock file) can connect
- The plugin only shares file paths and selected text — it does not read or transmit file contents

## Compatibility

- macOS: tested
- Windows/Linux: should work but untested
- Obsidian minimum version: 1.0.0
- Desktop only (no mobile support)
