import { join } from "node:path";

// node-pty is shipped next to main.js by the build step. Loading via an
// explicit path avoids Obsidian's plugin runtime having to walk node_modules.
// eslint-disable-next-line @typescript-eslint/no-var-requires
function loadNodePty(pluginDir: string): NodePtyModule {
  const pkgDir = join(pluginDir, "node-pty");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(pkgDir) as NodePtyModule;
}

export interface NodePtyModule {
  spawn(file: string, args: string[] | string, options: PtyOptions): IPty;
}

export interface PtyOptions {
  name?: string;
  cols?: number;
  rows?: number;
  cwd?: string;
  env?: { [key: string]: string | undefined };
  encoding?: string | null;
}

export interface IPty {
  readonly pid: number;
  readonly cols: number;
  readonly rows: number;
  readonly process: string;
  onData(cb: (data: string) => void): { dispose(): void };
  onExit(cb: (evt: { exitCode: number; signal?: number }) => void): { dispose(): void };
  resize(cols: number, rows: number): void;
  write(data: string): void;
  kill(signal?: string): void;
}

export interface SpawnShellOptions {
  pluginDir: string;
  shell: string;
  args?: string[];
  cwd: string;
  env?: NodeJS.ProcessEnv;
  cols?: number;
  rows?: number;
}

export function spawnShell(opts: SpawnShellOptions): IPty {
  const nodePty = loadNodePty(opts.pluginDir);
  const env = {
    ...process.env,
    ...opts.env,
    TERM: opts.env?.TERM ?? "xterm-256color",
    COLORTERM: opts.env?.COLORTERM ?? "truecolor",
  };
  return nodePty.spawn(opts.shell, opts.args ?? [], {
    name: "xterm-256color",
    cols: opts.cols ?? 80,
    rows: opts.rows ?? 24,
    cwd: opts.cwd,
    env,
    encoding: "utf8",
  });
}

export function defaultShell(): { file: string; args: string[] } {
  if (process.platform === "win32") {
    return { file: process.env.COMSPEC || "cmd.exe", args: [] };
  }
  const shell = process.env.SHELL || "/bin/bash";
  return { file: shell, args: [] };
}
