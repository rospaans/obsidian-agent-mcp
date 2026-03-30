import { App, PluginSettingTab, Setting } from "obsidian";
import type ObsidianAgentMCP from "./main";

export interface PluginSettings {
  enabledTools: {
    tasks: boolean;
    // Add new optional tool toggles here
  };
}

export const DEFAULT_SETTINGS: PluginSettings = {
  enabledTools: {
    tasks: true,
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
      .setName("Task Board integration")
      .setDesc(
        "Expose a getTasks tool that reads pending tasks from the Task Board plugin cache. " +
        "Disable this if you are not using the Task Board plugin."
      )
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.enabledTools.tasks)
          .onChange(async value => {
            this.plugin.settings.enabledTools.tasks = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
