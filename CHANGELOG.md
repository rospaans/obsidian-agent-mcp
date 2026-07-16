# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-07-16

### Added

- **Per-agent enable toggles.** Settings → Agents lets you show or hide each agent
  (Claude Code, Ollama, Codex, Terminal) in the terminal's switcher, so you only
  see the ones you use. Any agent can be enabled whether or not its CLI is
  installed. Changes apply to any open terminal instantly — no reload.
- **CLI availability detection.** Each agent's CLI is probed through the same
  interactive login shell the terminal launches in (so it sees your real `PATH`),
  with the result cached for the session. Settings shows each agent's detection
  status with a **Recheck** button.
- **Graceful "not installed" handling.** Selecting an agent whose CLI is missing
  shows a message panel — with a link to install that agent, plus Recheck and
  Open-settings buttons — instead of running the command and surfacing a raw
  `command not found` in a bare shell.
- **Settings gear button** in the terminal toolbar, next to the agent dropdown,
  that jumps straight to the plugin's settings.

### Housekeeping

- Moved the submission checklist and scanner review snapshots to a local-only
  `docs/archive/` folder (no longer tracked in git).
- Started keeping this changelog; development now accumulates here between releases.

## [1.0.11] - 2026-07-14

### Fixed

- Added a typed Node facade (`src/nodeApi.ts`) and routed Node usage through it,
  plus a patched `xterm.css`, to clear the Obsidian automated-scan warnings.

## [1.0.10] - 2026-07-14

### Fixed

- Moved `@types/node` to `dependencies` so the review scanner resolves Node types.

## [1.0.9] - 2026-07-14

### Fixed

- Stopped enabling type-checked `no-unsafe` ESLint rules the scanner can't evaluate.

## [1.0.8] - 2026-07-13

### Fixed

- Resolved CSS lint warnings and documented audit false positives.

## [1.0.7] - 2026-07-13

### Changed

- Reverted vendored Obsidian types (the audit ignores `tsconfig`).

## [1.0.6] - 2026-07-13

### Fixed

- Completed the obsidian-types fix for the audit warning cascade.

## [1.0.5] - 2026-07-13

### Fixed

- Addressed the audit `no-unsafe` cascade by vendoring Obsidian types.

## [1.0.4] - 2026-07-13

### Fixed

- Addressed the audit type-warning cascade by making `obsidian` resolvable.

## [1.0.3] - 2026-07-13

### Added

- Codex and terminal options.

### Fixed

- Cleaner lint output and more robust session kill.

## [1.0.2] - 2026-07-13

### Added

- Auto-connect Claude to the Obsidian IDE.

### Fixed

- Review fixes.

## [1.0.1] - 2026-07-13

### Added

- In-terminal agent switcher and the ability to launch agents directly.

### Fixed

- Settings-merge fix.

## [1.0.0] - 2026-07-09

### Added

- Initial release: Obsidian plugin connecting coding agents (Claude Code, Codex,
  Ollama) over MCP, with a built-in terminal backed by a Python PTY bridge,
  active-file/selection exposure, and terminal-gated edit previews via the IDE
  `openDiff` protocol.
