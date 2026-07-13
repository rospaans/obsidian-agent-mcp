import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import type ObsidianAgentMCP from "./main";
import { checkPython } from "./terminal/pty";

// Agents the terminal can launch. Adding an entry here surfaces it in both the
// settings dropdown and the in-terminal toolbar switcher.
export type AgentBackend = "claude" | "ollama";

export const AGENT_BACKENDS: ReadonlyArray<{ id: AgentBackend; label: string }> = [
  { id: "claude", label: "Claude Code" },
  { id: "ollama", label: "Ollama (local model)" },
];

export interface TerminalSettings {
  backend: AgentBackend;
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

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl).setName("Agent backend").setHeading();

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
        for (const { id, label } of AGENT_BACKENDS) drop.addOption(id, label);
        drop
          .setValue(this.plugin.settings.terminal.backend)
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
}
