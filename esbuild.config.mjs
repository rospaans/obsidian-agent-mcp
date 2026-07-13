import esbuild from "esbuild";
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Load .env if present (OBSIDIAN_PLUGIN_DIR=<path to vault plugin folder>)
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf-8").split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

const pluginDir = process.env.OBSIDIAN_PLUGIN_DIR;

// ── Bundle src/main.ts → main.js ──────────────────────────────────────────────
// The PTY bridge (bridge.py) is inlined as text, so the entire plugin ships as a
// single main.js with no native binaries — installable through the Obsidian
// community directory. A user-provided python3 runs the bridge.

await esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: "main.js",
  format: "cjs",
  platform: "node",
  external: ["obsidian"],
  loader: {
    ".py": "text",
  },
  minify: false,
  logLevel: "info",
}).catch(() => process.exit(1));

// ── Bundle src/styles.css → styles.css ────────────────────────────────────────
// Obsidian auto-loads styles.css from the plugin folder. esbuild inlines the
// xterm @import so the shipped stylesheet is self-contained.

await esbuild.build({
  entryPoints: ["src/styles.css"],
  bundle: true,
  outfile: "styles.css",
  loader: {
    ".css": "css",
  },
  minify: false,
  logLevel: "info",
}).catch(() => process.exit(1));

// ── Optional local deploy into a vault for development ─────────────────────────

if (pluginDir) {
  mkdirSync(pluginDir, { recursive: true });
  copyFileSync("main.js", join(pluginDir, "main.js"));
  copyFileSync("manifest.json", join(pluginDir, "manifest.json"));
  copyFileSync("styles.css", join(pluginDir, "styles.css"));
  console.log(`Deployed to ${pluginDir}`);
}
