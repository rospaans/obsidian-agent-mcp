import tseslint from "typescript-eslint";
import obsidianmd from "eslint-plugin-obsidianmd";

export default tseslint.config(
  {
    // Build output, dependencies and the inlined Python bridge are not linted.
    ignores: ["main.js", "node_modules/**", "src/terminal/bridge.py"],
  },
  ...tseslint.configs.recommendedTypeChecked,
  ...obsidianmd.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // The `no-unsafe-*` family only produces meaningful results when the linter
    // resolves the ambient Node type definitions (@types/node). In environments
    // that lint the source without installing them, every `node:` builtin
    // collapses to `any` and these rules emit hundreds of false positives. Real
    // type safety here is enforced by `tsc --strict` (see `npm run build` and
    // tsconfig.json), which resolves those types, so we disable the redundant
    // unsafe-value rules to avoid the noise.
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
    },
  },
);
