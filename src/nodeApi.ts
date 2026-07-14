/*
 * Typed facade over the Node.js builtins this plugin uses.
 *
 * Obsidian's hosted plugin review type-checks the source in an environment
 * where the node:* type declarations never resolve (regardless of where
 * @types/node is declared), so every value imported from a Node builtin is
 * `any` there, and each use trips the review's type-checked no-unsafe-*
 * rules — hundreds of false positives across the plugin's fs/net/terminal
 * code. Importing each builtin exactly once here and asserting it to a
 * structural type keeps every other line of the plugin fully typed in both
 * environments. The interfaces describe only the API surface the plugin
 * actually uses; `npm run typecheck` (with real @types/node installed)
 * still validates these shapes and all call sites against the real types.
 *
 * The assertions are type-level only: the bundled output is identical to
 * importing the builtins directly.
 */

import * as nodeFs from "node:fs";
import * as nodePath from "node:path";
import * as nodeOs from "node:os";
import * as nodeCrypto from "node:crypto";
import * as nodeHttp from "node:http";
import * as nodeChildProcess from "node:child_process";
import * as nodeStringDecoder from "node:string_decoder";
import { Buffer as nodeBuffer } from "node:buffer";

// ── Buffer ───────────────────────────────────────────────────────────────────

export interface Buffer {
  readonly length: number;
  [index: number]: number;
  subarray(start?: number, end?: number): Buffer;
  readUInt16BE(offset: number): number;
  readBigUInt64BE(offset: number): bigint;
  writeUInt16BE(value: number, offset: number): number;
  writeBigUInt64BE(value: bigint, offset: number): number;
  toString(encoding?: string): string;
}

interface BufferConstructor {
  alloc(size: number): Buffer;
  concat(list: readonly Buffer[]): Buffer;
  from(data: string | Buffer): Buffer;
}

export const Buffer = nodeBuffer as unknown as BufferConstructor;

// ── process ──────────────────────────────────────────────────────────────────

export type EnvVars = Record<string, string | undefined>;

interface ProcessLike {
  readonly pid: number;
  readonly platform: string;
  readonly env: EnvVars;
  kill(pid: number, signal: number | string): boolean;
}

// The renderer window exposes Node's `process` (Obsidian runs plugins with
// Node integration); grabbing it off `window` keeps this module free of any
// direct global that only @types/node declares.
export const process = (
  window as unknown as { process?: unknown }
).process as ProcessLike;

// ── fs ───────────────────────────────────────────────────────────────────────

interface FsModule {
  writeFileSync: (path: string, data: string) => void;
  renameSync: (oldPath: string, newPath: string) => void;
  unlinkSync: (path: string) => void;
  readdirSync: (path: string) => string[];
  readFileSync: (path: string, encoding: string) => string;
  mkdirSync: (path: string, options?: { recursive?: boolean }) => void;
  existsSync: (path: string) => boolean;
}

const fs = nodeFs as unknown as FsModule;
export const { writeFileSync, renameSync, unlinkSync, readdirSync, readFileSync, mkdirSync, existsSync } = fs;

// ── path / os ────────────────────────────────────────────────────────────────

interface PathModule {
  join: (...paths: string[]) => string;
}

interface OsModule {
  homedir: () => string;
}

export const { join } = nodePath as unknown as PathModule;
export const { homedir } = nodeOs as unknown as OsModule;

// ── crypto ───────────────────────────────────────────────────────────────────

interface Hash {
  update(data: string): Hash;
  digest(encoding: string): string;
}

interface CryptoModule {
  randomUUID: () => string;
  createHash: (algorithm: string) => Hash;
}

export const { randomUUID, createHash } = nodeCrypto as unknown as CryptoModule;

// ── http / net ───────────────────────────────────────────────────────────────

export interface Socket {
  readonly writable: boolean;
  write(data: string | Buffer): boolean;
  destroy(): void;
  unshift(data: Buffer): void;
  on(event: "data", cb: (data: Buffer) => void): this;
  on(event: "close" | "error", cb: () => void): this;
}

export interface IncomingMessage {
  readonly headers: Record<string, string | string[] | undefined>;
  readonly url?: string;
  readonly method?: string;
  on(event: "data", cb: (chunk: Buffer) => void): this;
  on(event: "end" | "close", cb: () => void): this;
}

export interface ServerResponse {
  readonly writableEnded: boolean;
  writeHead(status: number, headers?: Record<string, string>): this;
  write(data: string): boolean;
  end(body?: string): void;
}

export interface Server {
  close(): void;
  listen(port: number, host: string, cb?: () => void): void;
  address(): unknown;
  on(event: "upgrade", cb: (req: IncomingMessage, socket: Socket, head: Buffer) => void): this;
  on(event: "error", cb: (err: Error & { code?: string }) => void): this;
}

interface HttpModule {
  createServer: (handler: (req: IncomingMessage, res: ServerResponse) => void) => Server;
}

export const { createServer } = nodeHttp as unknown as HttpModule;

// ── child_process ────────────────────────────────────────────────────────────

export interface Writable {
  write(data: string): boolean;
}

interface Readable {
  on(event: "data", cb: (data: Buffer) => void): this;
}

export interface ChildProcess {
  readonly stdio: ReadonlyArray<Writable | Readable | null | undefined>;
  readonly stdin: Writable | null;
  readonly stdout: Readable | null;
  readonly stderr: Readable | null;
  on(event: "error", cb: (err: Error) => void): this;
  on(event: "exit", cb: (code: number | null, signal: string | null) => void): this;
  kill(signal?: string): boolean;
}

interface ChildProcessModule {
  spawn: (
    command: string,
    args: readonly string[],
    options: { cwd?: string; env?: EnvVars; stdio?: readonly string[] },
  ) => ChildProcess;
  execFile: (
    command: string,
    args: readonly string[],
    options: { timeout?: number },
    callback: (err: Error | null, stdout: string) => void,
  ) => void;
}

export const { spawn, execFile } = nodeChildProcess as unknown as ChildProcessModule;

// ── string_decoder ───────────────────────────────────────────────────────────

interface StringDecoderInstance {
  write(buffer: Buffer): string;
}

interface StringDecoderModule {
  StringDecoder: new (encoding: string) => StringDecoderInstance;
}

export const { StringDecoder } = nodeStringDecoder as unknown as StringDecoderModule;
export type StringDecoder = StringDecoderInstance;
