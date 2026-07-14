import js from "@eslint/js";
import tseslint from "typescript-eslint";
import obsidianmd from "eslint-plugin-obsidianmd";

// The obsidianmd *rules* are used individually below instead of spreading
// obsidianmd.configs.recommended: the preset bundles typescript-eslint's
// recommended-type-checked rules, and the hosted plugin review lints this
// config in an environment where the node:* built-in types do not resolve.
// There, every Node value becomes `any` and the preset's no-unsafe-* rules
// report ~325 false positives across the plugin's fs/net/child_process code.
// The non-type-checked recommended set is used instead; real type errors are
// caught by `npm run typecheck` (tsc --noEmit, strict), where node:* resolves.
export default tseslint.config(
  {
    // Build output, dependencies and the inlined Python bridge are not linted.
    ignores: ["main.js", "node_modules/**", "src/terminal/bridge.py"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { obsidianmd },
    // The obsidianmd rules and severities from the plugin's recommended
    // preset, minus its wrapped core-rule messages.
    rules: {
      "obsidianmd/commands/no-command-in-command-id": "warn",
      "obsidianmd/commands/no-command-in-command-name": "warn",
      "obsidianmd/commands/no-default-hotkeys": "warn",
      "obsidianmd/commands/no-plugin-id-in-command-id": "warn",
      "obsidianmd/commands/no-plugin-name-in-command-name": "warn",
      "obsidianmd/detach-leaves": "error",
      "obsidianmd/editor-drop-paste": "warn",
      "obsidianmd/hardcoded-config-path": "warn",
      "obsidianmd/no-forbidden-elements": "error",
      "obsidianmd/no-global-this": "warn",
      "obsidianmd/no-plugin-as-component": "error",
      "obsidianmd/no-sample-code": "error",
      "obsidianmd/no-static-styles-assignment": "error",
      "obsidianmd/no-tfile-tfolder-cast": "warn",
      "obsidianmd/no-unsupported-api": "error",
      "obsidianmd/no-view-references-in-plugin": "error",
      "obsidianmd/object-assign": "warn",
      "obsidianmd/platform": "error",
      "obsidianmd/prefer-abstract-input-suggest": "warn",
      "obsidianmd/prefer-active-doc": "off",
      "obsidianmd/prefer-create-el": "warn",
      "obsidianmd/prefer-file-manager-trash-file": "warn",
      "obsidianmd/prefer-get-language": "warn",
      "obsidianmd/prefer-instanceof": "warn",
      "obsidianmd/prefer-window-timers": "warn",
      "obsidianmd/regex-lookbehind": "error",
      "obsidianmd/sample-names": "error",
      "obsidianmd/settings-tab/no-deprecated-display": "warn",
      "obsidianmd/settings-tab/no-manual-html-headings": "error",
      "obsidianmd/settings-tab/no-problematic-settings-headings": "error",
      "obsidianmd/settings-tab/prefer-setting-definitions": "warn",
      "obsidianmd/settings-tab/prefer-update-over-display": "warn",
      "obsidianmd/settings-tab/require-display": "warn",
      "obsidianmd/ui/sentence-case": ["warn", { enforceCamelCaseLower: true }],
      "obsidianmd/validate-license": "warn",
      "obsidianmd/validate-manifest": "warn",
      "obsidianmd/vault/iterate": "warn",
    },
  },
);
