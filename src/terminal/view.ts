import { ItemView, WorkspaceLeaf, setIcon } from "obsidian";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { Unicode11Addon } from "@xterm/addon-unicode11";
import { CanvasAddon } from "@xterm/addon-canvas";

import { agentShell, defaultShell, spawnShell, type IPty } from "./pty";
import { AGENT_BACKENDS, type AgentBackend } from "../settings";
import type { Availability } from "./availability";

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
  /** Extra environment variables for the agent process (e.g. CLAUDE_CODE_SSE_PORT). */
  env?: Record<string, string>;
  /** Agent the terminal starts with. */
  backend: AgentBackend;
  /** Agents to list in the switcher (enabled, and not known to be missing). */
  backends: Array<{ id: AgentBackend; label: string }>;
  /** Cached availability of an agent's CLI; safe to call synchronously. */
  getAvailability: (backend: AgentBackend) => Availability;
  /** Probe availability if unknown; resolves to the settled state. */
  ensureAvailability: (backend: AgentBackend) => Promise<Availability>;
  /** Force a fresh probe (after the user installs a CLI); resolves to the state. */
  recheckAvailability: (backend: AgentBackend) => Promise<Availability>;
  /** The CLI binary name for an agent, used in the "not installed" message. */
  cliName: (backend: AgentBackend) => string;
  /** Command auto-run to launch the given agent, so a bare shell is never shown. */
  resolveStartupCommand: (backend: AgentBackend) => string;
  /** Called when the user switches agents from the toolbar, to persist the choice. */
  onBackendChange: (backend: AgentBackend) => void;
  /** Opens this plugin's settings tab (toolbar gear button). */
  openSettings: () => void;
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
  private select: HTMLSelectElement | null = null;
  // Bumped on every start/switch so an async availability probe from a superseded
  // session can't spawn into the wrong (or a torn-down) terminal.
  private sessionSeq = 0;

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

    void this.startSession();
  }

  // Toolbar with the agent switcher. Switching restarts the session with the
  // newly selected agent so the user always stays inside an agent interface.
  private buildToolbar(container: HTMLElement): void {
    const bar = container.createDiv({ cls: "agent-mcp-terminal-toolbar" });
    bar.createSpan({ cls: "agent-mcp-terminal-toolbar-label", text: "Agent" });

    const select = bar.createEl("select", {
      cls: "dropdown agent-mcp-terminal-select",
    });
    this.select = select;
    this.populateBackendOptions();

    this.registerDomEvent(select, "change", () => {
      const next = select.value as AgentBackend;
      if (next === this.currentBackend) return;
      this.switchBackend(next);
    });

    const settingsBtn = bar.createEl("button", {
      cls: "clickable-icon agent-mcp-terminal-settings-btn",
      attr: { "aria-label": "Open plugin settings" },
    });
    setIcon(settingsBtn, "settings");
    this.registerDomEvent(settingsBtn, "click", () => this.cfg?.openSettings());
  }

  // Rebuilds the switcher options from the current enabled/available agent list,
  // always including the running agent so the control reflects the live session.
  private populateBackendOptions(): void {
    const select = this.select;
    if (!select) return;
    select.empty();

    const options = this.cfg ? [...this.cfg.backends] : [];
    if (!options.some(b => b.id === this.currentBackend)) {
      const meta = AGENT_BACKENDS.find(b => b.id === this.currentBackend);
      if (meta) options.unshift({ id: meta.id, label: meta.label });
    }
    for (const { id, label } of options) {
      const opt = select.createEl("option", { value: id, text: label });
      if (id === this.currentBackend) opt.selected = true;
    }
  }

  // Called by the plugin when the enabled-agents setting changes, so an already
  // open terminal updates its switcher instantly without a reload. Pulls a fresh
  // config (its backends list reflects the new toggles) and repopulates.
  refreshBackends(): void {
    if (this.cfg) this.cfg.backends = this.configProvider().backends;
    this.populateBackendOptions();
  }

  private switchBackend(backend: AgentBackend): void {
    this.currentBackend = backend;
    this.cfg?.onBackendChange(backend);
    this.stopSession();
    void this.startSession();
  }

  // Builds the terminal + PTY and auto-runs the agent command. Reused by
  // onOpen and by switchBackend, so it starts from a clean host element.
  private async startSession(): Promise<void> {
    const cfg = this.cfg;
    const host = this.host;
    if (!cfg || !host) return;
    const seq = ++this.sessionSeq;
    const backend = this.currentBackend;
    host.empty();

    // Gate CLI-backed agents on availability BEFORE building a terminal. If the
    // tool isn't installed we show a message panel and launch nothing — never a
    // shell (the user shouldn't land at a prompt for an agent they didn't get).
    const meta = AGENT_BACKENDS.find(b => b.id === backend);
    if (meta?.requiresCli) {
      let state = cfg.getAvailability(backend);
      if (state === "unknown" || state === "checking") {
        this.renderInfoPanel(host, `Checking whether ${meta.label} is installed…`);
        state = await cfg.ensureAvailability(backend);
        if (seq !== this.sessionSeq) return;
        host.empty();
      }
      if (state === "missing") {
        this.renderMissingPanel(host, backend);
        return;
      }
    }

    const command = cfg.resolveStartupCommand(backend);

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
      this.pty = this.startPty(cfg, command, term.cols, term.rows);
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

  // A transient status line while an agent's CLI is being probed.
  private renderInfoPanel(host: HTMLElement, message: string): void {
    const panel = host.createDiv({ cls: "agent-mcp-terminal-message" });
    panel.createDiv({ cls: "agent-mcp-terminal-message-body", text: message });
  }

  // Shown instead of launching a CLI-backed agent whose tool isn't installed. No
  // shell, no install directories (those change and add maintenance) — just which
  // CLI to install, plus Recheck (after installing) and a jump to settings.
  private renderMissingPanel(host: HTMLElement, backend: AgentBackend): void {
    const meta = AGENT_BACKENDS.find(b => b.id === backend);
    const label = meta?.label ?? backend;
    const cli = this.cfg?.cliName(backend) || backend;

    const panel = host.createDiv({ cls: "agent-mcp-terminal-message" });
    panel.createDiv({ cls: "agent-mcp-terminal-message-title", text: `${label} is not installed` });

    const body = panel.createDiv({ cls: "agent-mcp-terminal-message-body" });
    body.appendText("The ");
    body.createEl("code", { text: cli });
    body.appendText(" command wasn't found on your PATH. Install it, then recheck.");

    const actions = panel.createDiv({ cls: "agent-mcp-terminal-message-actions" });

    if (meta?.installUrl) {
      // A real link so Obsidian opens it in the system browser; styled as a button.
      const install = actions.createEl("a", {
        cls: "agent-mcp-terminal-message-link",
        text: `Install ${label}`,
        href: meta.installUrl,
        attr: { target: "_blank", rel: "noopener" },
      });
      install.addClass("mod-cta");
    }

    const recheck = actions.createEl("button", { text: "Recheck" });
    this.registerDomEvent(recheck, "click", () => {
      recheck.setText("Checking…");
      recheck.disabled = true;
      void this.recheckAndMaybeStart(backend);
    });

    const settings = actions.createEl("button", { text: "Open settings" });
    this.registerDomEvent(settings, "click", () => this.cfg?.openSettings());
  }

  // Re-probe after the user says they installed the CLI, then re-run the session:
  // it builds the terminal if the tool is now found, or re-renders the panel.
  private async recheckAndMaybeStart(backend: AgentBackend): Promise<void> {
    const cfg = this.cfg;
    if (!cfg) return;
    await cfg.recheckAvailability(backend);
    if (this.currentBackend !== backend) return;
    this.populateBackendOptions();
    void this.startSession();
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

  private startPty(cfg: TerminalConfig, command: string, cols: number, rows: number): IPty {
    const cmd = command.trim();
    // Launch straight into the agent (never a bare shell). If no command resolves
    // (plain terminal, or a missing-CLI fallback), use an interactive login shell.
    const { file, args } = cmd
      ? agentShell(cmd, cfg.shell, cfg.shellArgs)
      : (cfg.shell ? { file: cfg.shell, args: cfg.shellArgs ?? [] } : defaultShell());
    return spawnShell({
      pluginDir: cfg.pluginDir,
      pythonPath: cfg.pythonPath,
      shell: file,
      args,
      cwd: cfg.cwd,
      env: cfg.env,
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
    this.select = null;
  }
}

function readTheme() {
  const styles = activeWindow.getComputedStyle(activeDocument.body);
  const v = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return {
    background: v("--background-primary", "#1e1e1e"),
    foreground: v("--text-normal", "#d4d4d4"),
    cursor: v("--text-normal", "#d4d4d4"),
    selectionBackground: v("--text-selection", "#264f78"),
  };
}
