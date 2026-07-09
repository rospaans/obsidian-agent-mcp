import { spawn, execFile, type ChildProcess } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { StringDecoder } from "node:string_decoder";
import type { Writable } from "node:stream";

import bridgeSource from "./bridge.py";

const BRIDGE_FILENAME = ".pty-bridge.py";

// Minimal terminal handle consumed by the view. Backed by a python3 process
// running bridge.py, which allocates a real kernel pty — no native binary ships
// with the plugin, so it installs cleanly through the community directory.
export interface IPty {
  onData(cb: (data: string) => void): { dispose(): void };
  onExit(cb: (evt: { exitCode: number; signal?: number }) => void): { dispose(): void };
  resize(cols: number, rows: number): void;
  write(data: string): void;
  kill(signal?: string): void;
}

export interface SpawnShellOptions {
  pluginDir: string;
  pythonPath?: string;
  shell: string;
  args?: string[];
  cwd: string;
  env?: NodeJS.ProcessEnv;
  cols?: number;
  rows?: number;
}

class PythonPty implements IPty {
  private dataCbs = new Set<(d: string) => void>();
  private exitCbs = new Set<(e: { exitCode: number; signal?: number }) => void>();
  private decoder = new StringDecoder("utf8");
  private control: Writable | null;
  private exited = false;

  constructor(private child: ChildProcess) {
    this.control = (child.stdio[3] as Writable | undefined) ?? null;

    child.stdout?.on("data", (b: Buffer) => this.emit(this.decoder.write(b)));
    child.stderr?.on("data", (b: Buffer) => this.emit(b.toString()));

    child.on("error", (err: Error) => {
      // spawn() failures (e.g. python3 not on PATH) surface here, not as a throw.
      this.emit(`\r\n\x1b[31m[agent-mcp] could not start the Python PTY bridge:\x1b[0m ${err.message}\r\n`);
      this.emit("Set a valid Python 3 path in Settings → Agent MCP → Terminal.\r\n");
      this.fireExit(1);
    });

    child.on("exit", (code, signal) => this.fireExit(code ?? 0, signal ?? undefined));
  }

  private emit(s: string): void {
    if (s) for (const cb of this.dataCbs) cb(s);
  }

  private fireExit(exitCode: number, signal?: string): void {
    if (this.exited) return;
    this.exited = true;
    for (const cb of this.exitCbs) cb({ exitCode, signal: signal as unknown as number });
  }

  onData(cb: (data: string) => void) {
    this.dataCbs.add(cb);
    return { dispose: () => { this.dataCbs.delete(cb); } };
  }

  onExit(cb: (evt: { exitCode: number; signal?: number }) => void) {
    this.exitCbs.add(cb);
    return { dispose: () => { this.exitCbs.delete(cb); } };
  }

  resize(cols: number, rows: number): void {
    try { this.control?.write(`${cols},${rows}\n`); } catch { /* pipe closed */ }
  }

  write(data: string): void {
    try { this.child.stdin?.write(data); } catch { /* pipe closed */ }
  }

  kill(signal?: string): void {
    try { this.child.kill(signal as NodeJS.Signals | undefined); } catch { /* already gone */ }
  }
}

export function spawnShell(opts: SpawnShellOptions): IPty {
  const bridgePath = join(opts.pluginDir, BRIDGE_FILENAME);
  // Write the bridge script beside main.js on each launch: cheap, and keeps it
  // in sync with the bundled source after a plugin update.
  writeFileSync(bridgePath, bridgeSource);

  const cols = opts.cols ?? 80;
  const rows = opts.rows ?? 24;
  const env = {
    ...process.env,
    ...opts.env,
    TERM: opts.env?.TERM ?? "xterm-256color",
    COLORTERM: opts.env?.COLORTERM ?? "truecolor",
  };

  const python = opts.pythonPath?.trim() || "python3";
  const child = spawn(
    python,
    [bridgePath, opts.shell, opts.cwd, String(cols), String(rows), ...(opts.args ?? [])],
    { cwd: opts.cwd, env, stdio: ["pipe", "pipe", "pipe", "pipe"] },
  );

  return new PythonPty(child);
}

export function defaultShell(): { file: string; args: string[] } {
  if (process.platform === "win32") {
    return { file: process.env.COMSPEC || "cmd.exe", args: [] };
  }
  const shell = process.env.SHELL || "/bin/bash";
  // Spawn as a login shell, matching Terminal.app / iTerm. A GUI-launched
  // Obsidian inherits macOS's stripped PATH; a non-login shell never runs
  // /etc/zprofile (path_helper), so /usr/local/bin and friends stay missing
  // and tools like `ollama` aren't found. `-l` re-sources the full profile.
  return { file: shell, args: ["-l"] };
}

// Validates that the configured Python can run the bridge: it must exist and
// expose the stdlib pty modules (all present on macOS/Linux; absent on Windows,
// which needs a different backend). Used by the settings "Check" button.
export function checkPython(pythonPath?: string): Promise<{ ok: boolean; message: string }> {
  const python = pythonPath?.trim() || "python3";
  const probe = "import sys, pty, termios, fcntl, struct, select; print(sys.version.split()[0])";
  return new Promise(resolve => {
    execFile(python, ["-c", probe], { timeout: 5000 }, (err, stdout) => {
      if (err) {
        resolve({ ok: false, message: `Could not run "${python}": ${err.message}` });
        return;
      }
      resolve({ ok: true, message: `Python ${stdout.trim()} — PTY support available.` });
    });
  });
}
