import tseslint from "typescript-eslint";
import obsidianmd from "eslint-plugin-obsidianmd";

export default tseslint.config(
  {
    // Build output, dependencies and the inlined Python bridge are not linted.
    ignores: ["main.js", "node_modules/**", "src/terminal/bridge.py"],
  },
  // The recommended config already bundles typescript-eslint's
  // recommendedTypeChecked rules, so it must not be spread again here.
  ...obsidianmd.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
