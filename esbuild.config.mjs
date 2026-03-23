import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: "main.js",
  format: "cjs",
  platform: "node",
  external: ["obsidian"],
  minify: false,
}).catch(() => process.exit(1));
