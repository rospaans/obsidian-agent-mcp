import { App, PluginSettingTab, Setting } from "obsidian";
import type ObsidianAgentMCP from "./main";

export interface TerminalSettings {
  shell: string;
  shellArgs: string;
  startupCommand: string;
  cwd: "vault" | "home";
  fontSize: number;
}

export interface PluginSettings {
  enabledTools: {
    tasks: boolean;
  };
  terminal: TerminalSettings;
}

export const DEFAULT_SETTINGS: PluginSettings = {
  enabledTools: {
    tasks: true,
  },
  terminal: {
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

    containerEl.createEl("h2", { text: "Agent MCP" });

    containerEl.createEl("h3", { text: "Tools" });

    new Setting(containerEl)
      .setName("Vault task scanner")
      .setDesc(
        "Expose a getTasks tool that scans the entire vault for markdown tasks and returns " +
        "them grouped by due date. Parses Obsidian Tasks emoji syntax and dataview inline " +
        "fields. No other plugins required.",
      )
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.enabledTools.tasks)
          .onChange(async value => {
            this.plugin.settings.enabledTools.tasks = value;
            await this.plugin.saveSettings();
          }),
      );

    containerEl.createEl("h3", { text: "Terminal" });

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
        "Optional command automatically typed into the shell when a terminal is opened (e.g. `claude`).",
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
