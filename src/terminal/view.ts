import { ItemView, WorkspaceLeaf } from "obsidian";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { Unicode11Addon } from "@xterm/addon-unicode11";
import { CanvasAddon } from "@xterm/addon-canvas";

import { agentShell, defaultShell, spawnShell, type IPty } from "./pty";
import { AGENT_BACKENDS, type AgentBackend } from "../settings";

export const AGENT_TERMINAL_VIEW_TYPE = "agent-terminal";

const RESIZE_DEBOUNCE_MS = 60;

export interface TerminalConfig {
  pluginDir: string;
  pythonPath?: string;
  cwd: string;
  shell?: string;
  shellArgs?: string[];
  fontFamily?: string;
  fontSize?: number;
  /** Agent the terminal starts with. */
  backend: AgentBackend;
  /** Command auto-run to launch the given agent, so a bare shell is never shown. */
  resolveStartupCommand: (backend: AgentBackend) => string;
  /** Called when the user switches agents from the toolbar, to persist the choice. */
  onBackendChange: (backend: AgentBackend) => void;
}

export class AgentTerminalView extends ItemView {
  private term: Terminal | null = null;
  private fit: FitAddon | null = null;
  private pty: IPty | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private resizeTimer: number | null = null;
  private disposers: Array<{ dispose(): void }> = [];

  private cfg: TerminalConfig | null = null;
  private currentBackend: AgentBackend = "claude";
  private host: HTMLElement | null = null;

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
    return "Agent terminal";
  }

  getIcon(): string {
    return "bot";
  }

  focusTerminal(): void {
    this.term?.focus();
  }

  async onOpen(): Promise<void> {
    const container = this.contentEl;
    container.empty();
    container.addClass("agent-mcp-terminal-container");

    this.cfg = this.configProvider();
    this.currentBackend = this.cfg.backend;

    this.buildToolbar(container);
    this.host = container.createDiv({ cls: "agent-mcp-terminal-host" });

    this.startSession();
  }

  // Toolbar with the agent switcher. Switching restarts the session with the
  // newly selected agent so the user always stays inside an agent interface.
  private buildToolbar(container: HTMLElement): void {
    const bar = container.createDiv({ cls: "agent-mcp-terminal-toolbar" });
    bar.createSpan({ cls: "agent-mcp-terminal-toolbar-label", text: "Agent" });

    const select = bar.createEl("select", {
      cls: "dropdown agent-mcp-terminal-select",
    });
    for (const { id, label } of AGENT_BACKENDS) {
      const opt = select.createEl("option", { value: id, text: label });
      if (id === this.currentBackend) opt.selected = true;
    }

    this.registerDomEvent(select, "change", () => {
      const next = select.value as AgentBackend;
      if (next === this.currentBackend) return;
      this.switchBackend(next);
    });
  }

  private switchBackend(backend: AgentBackend): void {
    this.currentBackend = backend;
    this.cfg?.onBackendChange(backend);
    this.stopSession();
    this.startSession();
  }

  // Builds the terminal + PTY and auto-runs the agent command. Reused by
  // onOpen and by switchBackend, so it starts from a clean host element.
  private startSession(): void {
    const cfg = this.cfg;
    const host = this.host;
    if (!cfg || !host) return;
    host.empty();

    const term = new Terminal({
      fontFamily: cfg.fontFamily || "Menlo, Consolas, \"Liberation Mono\", monospace",
      fontSize: cfg.fontSize || 13,
      cursorBlink: true,
      convertEol: false,
      allowProposedApi: true,
      theme: readTheme(),
      scrollback: 10_000,
      // Wide CJK glyphs & modern emoji span two cells. Matches iTerm2, Alacritty, etc.
      // The actual width table is swapped to Unicode 11 below via the addon.
    });

    const fit = new FitAddon();
    const links = new WebLinksAddon();
    const unicode11 = new Unicode11Addon();

    term.loadAddon(fit);
    term.loadAddon(links);
    term.loadAddon(unicode11);
    term.unicode.activeVersion = "11";

    term.open(host);

    // Canvas renderer renders block characters (▀▄█▐▌) and box-drawing chars
    // crisply with no anti-aliasing seams — which the Claude Code splash logo
    // relies on. It must be loaded AFTER .open().
    try {
      term.loadAddon(new CanvasAddon());
    } catch {
      // Fall back to the default DOM renderer if canvas isn't available.
    }

    this.term = term;
    this.fit = fit;

    // Wait for layout to settle so fit() has real dimensions to measure.
    this.scheduleInitialFit(host);

    try {
      this.pty = this.startPty(cfg, term.cols, term.rows);
    } catch (err) {
      term.writeln("\x1b[31mFailed to start shell:\x1b[0m " + String(err));
      term.writeln("");
      term.writeln("The Python PTY bridge could not be started. Make sure a Python 3");
      term.writeln("interpreter is available and set its path in the plugin settings");
      term.writeln("(Settings → Agent MCP → Python path → Check).");
      return;
    }

    this.wirePtyToTerm(this.pty, term);

    this.resizeObserver = new ResizeObserver(() => this.scheduleResize());
    this.resizeObserver.observe(host);

    term.focus();
  }

  private scheduleInitialFit(host: HTMLElement): void {
    // Two rAFs: first lets the browser flush layout after element insertion,
    // second lets xterm commit its initial render before we measure.
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      if (host.clientWidth === 0 || host.clientHeight === 0) return;
      this.applyResize();
    }));
  }

  private scheduleResize(): void {
    if (this.resizeTimer) window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => {
      this.resizeTimer = null;
      this.applyResize();
    }, RESIZE_DEBOUNCE_MS);
  }

  private applyResize(): void {
    if (!this.fit || !this.term || !this.pty) return;
    const dims = this.fit.proposeDimensions();
    if (!dims || !isFinite(dims.cols) || !isFinite(dims.rows) || dims.cols < 2 || dims.rows < 2) {
      // Pane is collapsed, hidden, or mid-animation — skip this tick.
      return;
    }
    try {
      this.fit.fit();
      if (this.term.cols !== dims.cols || this.term.rows !== dims.rows) {
        this.pty.resize(dims.cols, dims.rows);
      } else {
        this.pty.resize(this.term.cols, this.term.rows);
      }
    } catch {
      // Transient races between xterm and the PTY on rapid resize — ignore.
    }
  }

  private startPty(cfg: TerminalConfig, cols: number, rows: number): IPty {
    const command = cfg.resolveStartupCommand(this.currentBackend).trim();
    // Launch straight into the agent (never a bare shell). If somehow no command
    // resolves, fall back to an interactive login shell rather than nothing.
    const { file, args } = command
      ? agentShell(command, cfg.shell, cfg.shellArgs)
      : (cfg.shell ? { file: cfg.shell, args: cfg.shellArgs ?? [] } : defaultShell());
    return spawnShell({
      pluginDir: cfg.pluginDir,
      pythonPath: cfg.pythonPath,
      shell: file,
      args,
      cwd: cfg.cwd,
      cols: Math.max(cols, 2),
      rows: Math.max(rows, 2),
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

  // Tears down the current terminal + PTY but leaves the toolbar and host in
  // place, so a new session can be started on the same view (agent switch).
  private stopSession(): void {
    if (this.resizeTimer) {
      window.clearTimeout(this.resizeTimer);
      this.resizeTimer = null;
    }
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

  async onClose(): Promise<void> {
    this.stopSession();
    this.host = null;
    this.cfg = null;
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
