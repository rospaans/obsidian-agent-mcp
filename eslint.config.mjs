import tseslint from "typescript-eslint";
import obsidianmd from "eslint-plugin-obsidianmd";

// The hosted plugin review lints with its own copy of this preset (it ignores
// the repo's eslint config and tsconfig), so using the same preset here keeps
// `npm run lint` predictive of scan results. The scan installs production
// `dependencies` only and supplies the `obsidian` types itself — which is why
// `@types/node` must live in dependencies: as a devDependency the node:*
// built-ins don't resolve there, and the preset's type-checked no-unsafe-*
// rules flag every Node value as `any` (~325 false positives).
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
