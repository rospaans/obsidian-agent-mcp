import esbuild from "esbuild";
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env if present (OBSIDIAN_PLUGIN_DIR=<path to vault plugin folder>)
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf-8").split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

const pluginDir = process.env.OBSIDIAN_PLUGIN_DIR;
const outDir = __dirname;

// ── Bundle src/main.ts → main.js ──────────────────────────────────────────────

await esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: "main.js",
  format: "cjs",
  platform: "node",
  // `obsidian` is provided by the host; node-pty is loaded at runtime from the
  // plugin folder so its native .node file works regardless of how esbuild
  // would try to resolve it.
  external: ["obsidian", "@homebridge/node-pty-prebuilt-multiarch"],
  loader: {
    ".css": "text",
  },
  minify: false,
  logLevel: "info",
}).catch(() => process.exit(1));

// ── Copy the node-pty runtime next to main.js ─────────────────────────────────

const nodePtySrc = join(__dirname, "node_modules", "@homebridge", "node-pty-prebuilt-multiarch");
const nodePtyDst = join(outDir, "node-pty");

function copyNodePty(dest) {
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  copyFileSync(join(nodePtySrc, "package.json"), join(dest, "package.json"));
  cpSync(join(nodePtySrc, "lib"), join(dest, "lib"), { recursive: true });
  // Published prebuilds (linux) — optional
  const prebuildsSrc = join(nodePtySrc, "prebuilds");
  if (existsSync(prebuildsSrc)) {
    cpSync(prebuildsSrc, join(dest, "prebuilds"), { recursive: true });
  }
  // Locally built .node (mac/win fall-through) — required unless matching prebuild exists
  const buildSrc = join(nodePtySrc, "build");
  if (existsSync(buildSrc)) {
    cpSync(buildSrc, join(dest, "build"), { recursive: true });
  }
}

copyNodePty(nodePtyDst);

if (pluginDir) {
  mkdirSync(pluginDir, { recursive: true });
  copyFileSync("main.js", join(pluginDir, "main.js"));
  copyFileSync("manifest.json", join(pluginDir, "manifest.json"));
  copyNodePty(join(pluginDir, "node-pty"));
  console.log(`Deployed to ${pluginDir}`);
}
