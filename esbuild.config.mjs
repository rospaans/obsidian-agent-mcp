import esbuild from "esbuild";
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Load .env if present (OBSIDIAN_PLUGIN_DIR=<path to vault plugin folder>)
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf-8").split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

const pluginDir = process.env.OBSIDIAN_PLUGIN_DIR;

await esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: "main.js",
  format: "cjs",
  platform: "node",
  external: ["obsidian"],
  minify: false,
}).catch(() => process.exit(1));

if (pluginDir) {
  copyFileSync("main.js", join(pluginDir, "main.js"));
  copyFileSync("manifest.json", join(pluginDir, "manifest.json"));
  console.log(`Deployed to ${pluginDir}`);
}
