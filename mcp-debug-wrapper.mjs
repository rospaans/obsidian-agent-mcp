#!/usr/bin/env node
// Wraps mcp-tasks.mjs and logs all stdio to /tmp/mcp-debug.log

import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const log = createWriteStream("/tmp/mcp-debug.log", { flags: "a" });
const ts = () => new Date().toISOString();

log.write(`\n\n=== MCP wrapper started at ${ts()} ===\n`);
log.write(`argv: ${JSON.stringify(process.argv)}\n`);
log.write(`env.PATH: ${process.env.PATH}\n`);
log.write(`cwd: ${process.cwd()}\n`);

const scriptDir = dirname(fileURLToPath(import.meta.url));
const child = spawn(process.argv[0], [join(scriptDir, "mcp-tasks.mjs"), ...process.argv.slice(2)], {
  stdio: ["pipe", "pipe", "pipe"],
});

child.on("error", (err) => {
  log.write(`[ERROR spawning child] ${err}\n`);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  log.write(`[child exited] code=${code} signal=${signal} at ${ts()}\n`);
  process.exit(code ?? 1);
});

// stdin → child stdin (log each line)
process.stdin.on("data", (chunk) => {
  log.write(`[stdin→child] ${chunk.toString()}`);
  child.stdin.write(chunk);
});
process.stdin.on("end", () => {
  log.write(`[stdin closed] at ${ts()}\n`);
  child.stdin.end();
});

// child stdout → our stdout (log each line)
child.stdout.on("data", (chunk) => {
  log.write(`[child→stdout] ${chunk.toString()}`);
  process.stdout.write(chunk);
});

// child stderr → our stderr (log it)
child.stderr.on("data", (chunk) => {
  log.write(`[child stderr] ${chunk.toString()}`);
  process.stderr.write(chunk);
});
