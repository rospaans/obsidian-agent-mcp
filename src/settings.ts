import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import type ObsidianAgentMCP from "./main";
import { checkPython } from "./terminal/pty";
import type { Availability } from "./terminal/availability";
import { process } from "./nodeApi";

// Agents the terminal can launch. Adding an entry here surfaces it in both the
// settings dropdown and the in-terminal toolbar switcher.
export type AgentBackend = "claude" | "ollama" | "codex" | "terminal";

export interface AgentBackendMeta {
  id: AgentBackend;
  label: string;
  // requiresCli backends launch an external tool that must be installed; their
  // availability is probed so the terminal can show an install prompt instead of
  // erroring. The plain terminal is just a shell, so it is never probed.
  requiresCli: boolean;
  // Binary name to probe on PATH. For "claude" this is a default that a custom
  // startup command can override (see resolveBackendCli in main.ts).
  cliName: string;
  // Where to send the user to install the CLI, linked from the "not installed"
  // message panel. Empty for the plain terminal.
  installUrl: string;
}

export const AGENT_BACKENDS: ReadonlyArray<AgentBackendMeta> = [
  { id: "claude", label: "Claude Code", requiresCli: true, cliName: "claude", installUrl: "https://claude.com/product/claude-code" },
  { id: "ollama", label: "Ollama (local model)", requiresCli: true, cliName: "ollama", installUrl: "https://docs.ollama.com/quickstart" },
  { id: "codex", label: "Codex", requiresCli: true, cliName: "codex", installUrl: "https://learn.chatgpt.com/docs/codex/cli" },
  // A plain interactive shell with no agent, so you can run other commands.
  { id: "terminal", label: "Terminal", requiresCli: false, cliName: "", installUrl: "" },
];

export interface TerminalSettings {
  backend: AgentBackend;
  // Which agents appear in the settings default dropdown and the in-terminal
  // switcher. Lets users hide agents whose CLI they don't use.
  enabledBackends: Record<AgentBackend, boolean>;
  ollamaModel: string;
  pythonPath: string;
  shell: string;
  shellArgs: string;
  startupCommand: string;
  cwd: "vault" | "home";
  fontSize: number;
}

export interface PluginSettings {
  terminal: TerminalSettings;
}

export const DEFAULT_SETTINGS: PluginSettings = {
  terminal: {
    backend: "claude",
    enabledBackends: { claude: true, ollama: true, codex: true, terminal: true },
    ollamaModel: "",
    pythonPath: "",
    shell: "",
    shellArgs: "",
    startupCommand: "",
    cwd: "vault",
    fontSize: 13,
  },
};

export class AgentMCPSettingsTab extends PluginSettingTab {
  constructor(app: App, private plugin: ObsidianAgentMCP) {
    super(app, plugin);
  }

  // Opt in to Obsidian 1.13+'s declarative settings API. This tab renders
  // imperatively in display() below — much of it is dynamic (per-agent toggles,
  // live availability badges) and has no static declarative form — so there are
  // no definitions to expose to settings search yet. Declaring the method (even
  // empty) is the API's supported entry point and clears the review-scan caution.
  getSettingDefinitions(): unknown[] {
    return [];
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl).setName("Agents").setHeading();

    this.renderAgentToggles(containerEl);

    const t = this.plugin.settings.terminal;
    // Offer every enabled agent as the launch default (plus whatever is currently
    // selected). Agents that aren't installed are still selectable — the terminal
    // shows an install prompt for them rather than failing.
    const selectable = AGENT_BACKENDS.filter(b => b.id === t.backend || t.enabledBackends[b.id]);

    new Setting(containerEl)
      .setName("Default agent")
      .setDesc(
        "Which agent a new terminal launches with. You can also switch agents from the " +
        "dropdown at the top of the terminal — switching there restarts the session and " +
        "updates this default. \"Ollama\" runs `ollama launch claude`, which points Claude " +
        "Code at a local Ollama model — the IDE connection, MCP tools, and diff previews all " +
        "work identically.",
      )
      .addDropdown(drop => {
        for (const { id, label } of selectable) drop.addOption(id, label);
        drop
          .setValue(t.backend)
          .onChange(async value => {
            this.plugin.settings.terminal.backend = value as AgentBackend;
            await this.plugin.saveSettings();
            this.display();
          });
      });

    if (this.plugin.settings.terminal.backend === "ollama") {
      new Setting(containerEl)
        .setName("Ollama model")
        .setDesc(
          "Passed as `ollama launch claude --model <model>` (e.g. qwen3.5, glm-4.7-flash, " +
          "kimi-k2.5:cloud). Leave blank to use Ollama's default. Requires a recent Ollama " +
          "with the `launch` command and a model with a large (64k+) context window.",
        )
        .addText(text =>
          text
            .setPlaceholder("qwen3.5")
            .setValue(this.plugin.settings.terminal.ollamaModel)
            .onChange(async value => {
              this.plugin.settings.terminal.ollamaModel = value.trim();
              await this.plugin.saveSettings();
            }),
        );
    }

    new Setting(containerEl).setName("Terminal").setHeading();

    new Setting(containerEl)
      .setName("Python path")
      .setDesc(
        "Path to a Python 3 interpreter. The terminal uses it to run a small pseudo-terminal " +
        "bridge (standard library only, no packages to install). Leave blank to use \"python3\" " +
        "from your PATH. Required on macOS and Linux; Windows is not yet supported.",
      )
      .addText(text =>
        text
          .setPlaceholder("python3")
          .setValue(this.plugin.settings.terminal.pythonPath)
          .onChange(async value => {
            this.plugin.settings.terminal.pythonPath = value.trim();
            await this.plugin.saveSettings();
          }),
      )
      .addButton(button =>
        button
          .setButtonText("Check")
          .onClick(async () => {
            button.setButtonText("Checking…").setDisabled(true);
            const result = await checkPython(this.plugin.settings.terminal.pythonPath);
            new Notice(result.message, result.ok ? 5000 : 10000);
            button.setButtonText("Check").setDisabled(false);
          }),
      );

    new Setting(containerEl)
      .setName("Shell")
      .setDesc(
        "Path to the shell executable. Leave blank to use $SHELL (macOS/Linux) or %COMSPEC% (Windows).",
      )
      .addText(text =>
        text
          .setPlaceholder(process.env.SHELL || "/bin/zsh")
          .setValue(this.plugin.settings.terminal.shell)
          .onChange(async value => {
            this.plugin.settings.terminal.shell = value.trim();
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Shell arguments")
      .setDesc("Space-separated arguments passed to the shell on launch.")
      .addText(text =>
        text
          .setPlaceholder("-l")
          .setValue(this.plugin.settings.terminal.shellArgs)
          .onChange(async value => {
            this.plugin.settings.terminal.shellArgs = value;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Startup command")
      .setDesc(
        "Overrides the command the Claude Code agent launches with. Leave blank to run `claude`. " +
        "Ignored when the Ollama agent is selected.",
      )
      .addText(text =>
        text
          .setPlaceholder("claude")
          .setValue(this.plugin.settings.terminal.startupCommand)
          .onChange(async value => {
            this.plugin.settings.terminal.startupCommand = value;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Working directory")
      .setDesc("Where each new terminal starts.")
      .addDropdown(drop =>
        drop
          .addOption("vault", "Vault root")
          .addOption("home", "Home directory")
          .setValue(this.plugin.settings.terminal.cwd)
          .onChange(async value => {
            this.plugin.settings.terminal.cwd = value as "vault" | "home";
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Font size")
      .setDesc("Font size used inside the terminal.")
      .addSlider(slider =>
        slider
          .setLimits(10, 22, 1)
          .setValue(this.plugin.settings.terminal.fontSize)
          .setDynamicTooltip()
          .onChange(async value => {
            this.plugin.settings.terminal.fontSize = value;
            await this.plugin.saveSettings();
          }),
      );
  }

  // One row per agent: a toggle to show/hide it in the switcher, plus a live
  // availability badge. Required-CLI agents whose tool isn't detected are grayed
  // out (can't be enabled until installed) with a Recheck button. Probes are lazy
  // and cached, so opening this tab triggers at most one check per agent.
  private renderAgentToggles(containerEl: HTMLElement): void {
    const pending: Promise<unknown>[] = [];

    for (const meta of AGENT_BACKENDS) {
      const setting = new Setting(containerEl).setName(meta.label);

      if (!meta.requiresCli) {
        setting.setDesc("Always available.");
        setting.addToggle(toggle => toggle.setValue(true).setDisabled(true));
        continue;
      }

      const state = this.plugin.getBackendAvailability(meta.id);
      const enabled = this.plugin.settings.terminal.enabledBackends[meta.id];
      setting.setDesc(availabilityDesc(state));

      // You can enable any agent even if its CLI isn't installed — selecting it
      // just shows an install prompt in the terminal instead of running.
      setting.addToggle(toggle =>
        toggle
          .setValue(enabled)
          .onChange(async value => {
            this.plugin.settings.terminal.enabledBackends[meta.id] = value;
            await this.plugin.saveSettings();
            this.plugin.refreshTerminalBackends();
            this.display();
          }),
      );

      setting.addButton(button =>
        button
          .setButtonText("Recheck")
          .onClick(async () => {
            button.setButtonText("Checking…").setDisabled(true);
            await this.plugin.recheckBackendAvailability(meta.id);
            this.plugin.refreshTerminalBackends();
            this.display();
          }),
      );

      if (state === "unknown" || state === "checking") {
        pending.push(this.plugin.ensureBackendAvailability(meta.id));
      }
    }

    // Re-render once, after any first-time probes resolve, to fill in the badges
    // and enable toggles for tools that turned out to be installed.
    if (pending.length) void Promise.all(pending).then(() => this.display());
  }
}

function availabilityDesc(state: Availability): string {
  switch (state) {
    case "available": return "✓ Detected.";
    case "missing": return "⚠ Not found on your PATH — enabling shows an install prompt.";
    default: return "Checking if the CLI is installed…";
  }
}
