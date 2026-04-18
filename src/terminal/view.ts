import { ItemView, WorkspaceLeaf } from "obsidian";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";

import { defaultShell, spawnShell, type IPty } from "./pty";
import { ensureTerminalStyles } from "./styles";

export const AGENT_TERMINAL_VIEW_TYPE = "agent-terminal";

export interface TerminalConfig {
  pluginDir: string;
  cwd: string;
  shell?: string;
  shellArgs?: string[];
  startupCommand?: string;
  fontFamily?: string;
  fontSize?: number;
}

export class AgentTerminalView extends ItemView {
  private term: Terminal | null = null;
  private fit: FitAddon | null = null;
  private pty: IPty | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private disposers: Array<{ dispose(): void }> = [];

  constructor(
    leaf: WorkspaceLeaf,
    private readonly configProvider: () => TerminalConfig,
  ) {
    super(leaf);
    this.navigation = true;
  }

  getViewType(): string {
    return AGENT_TERMINAL_VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Agent Terminal";
  }

  getIcon(): string {
    return "terminal";
  }

  async onOpen(): Promise<void> {
    ensureTerminalStyles();
    const container = this.contentEl;
    container.empty();
    container.addClass("agent-mcp-terminal-container");
    container.style.padding = "0";
    container.style.height = "100%";
    container.style.background = "var(--background-primary)";

    const host = container.createDiv({ cls: "agent-mcp-terminal-host" });
    host.style.width = "100%";
    host.style.height = "100%";

    const cfg = this.configProvider();

    const term = new Terminal({
      fontFamily: cfg.fontFamily || "Menlo, Consolas, \"Liberation Mono\", monospace",
      fontSize: cfg.fontSize || 13,
      cursorBlink: true,
      convertEol: false,
      allowProposedApi: true,
      theme: readTheme(),
      scrollback: 10_000,
    });
    const fit = new FitAddon();
    const links = new WebLinksAddon();
    term.loadAddon(fit);
    term.loadAddon(links);
    term.open(host);
    fit.fit();

    this.term = term;
    this.fit = fit;

    try {
      this.pty = this.startPty(cfg, term.cols, term.rows);
    } catch (err) {
      term.writeln("\x1b[31mFailed to start shell:\x1b[0m " + String(err));
      term.writeln("");
      term.writeln("The native PTY module could not be loaded. If you built from source,");
      term.writeln("run `npm install` and `npm run build` again. If you installed the release,");
      term.writeln("make sure the `node-pty/` folder is present next to main.js.");
      return;
    }

    this.wirePtyToTerm(this.pty, term);

    if (cfg.startupCommand && cfg.startupCommand.trim().length > 0) {
      this.pty.write(cfg.startupCommand + "\r");
    }

    this.resizeObserver = new ResizeObserver(() => {
      if (!this.fit || !this.term || !this.pty) return;
      try {
        this.fit.fit();
        this.pty.resize(this.term.cols, this.term.rows);
      } catch {
        // ignore transient resize errors
      }
    });
    this.resizeObserver.observe(host);

    term.focus();
  }

  private startPty(cfg: TerminalConfig, cols: number, rows: number): IPty {
    const { file, args } = cfg.shell
      ? { file: cfg.shell, args: cfg.shellArgs ?? [] }
      : defaultShell();
    return spawnShell({
      pluginDir: cfg.pluginDir,
      shell: file,
      args,
      cwd: cfg.cwd,
      cols,
      rows,
    });
  }

  private wirePtyToTerm(pty: IPty, term: Terminal): void {
    this.disposers.push(
      pty.onData(data => term.write(data)),
      pty.onExit(({ exitCode }) => {
        term.writeln("");
        term.writeln(`\x1b[90m[process exited with code ${exitCode}]\x1b[0m`);
      }),
      term.onData(data => pty.write(data)),
    );
  }

  async onClose(): Promise<void> {
    for (const d of this.disposers) {
      try { d.dispose(); } catch { /* noop */ }
    }
    this.disposers = [];
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    try { this.pty?.kill(); } catch { /* noop */ }
    this.pty = null;
    try { this.term?.dispose(); } catch { /* noop */ }
    this.term = null;
    this.fit = null;
  }
}

function readTheme() {
  const styles = getComputedStyle(document.body);
  const v = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return {
    background: v("--background-primary", "#1e1e1e"),
    foreground: v("--text-normal", "#d4d4d4"),
    cursor: v("--text-normal", "#d4d4d4"),
    selectionBackground: v("--text-selection", "#264f78"),
  };
}
