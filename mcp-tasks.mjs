#!/usr/bin/env node
/**
 * Minimal stdio MCP server exposing a getTasks tool that reads from the
 * Task Board plugin cache at <vault>/.obsidian/plugins/task-board/tasks.json.
 *
 * Usage: node mcp-tasks.mjs <vault-path>
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline";

const vaultPath = process.argv[2];
if (!vaultPath) {
  process.stderr.write("Usage: node mcp-tasks.mjs <vault-path>\n");
  process.exit(1);
}

// ── MCP helpers ──────────────────────────────────────────────────────────────

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + "\n");
}

function ok(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function err(id, code, message) {
  send({ jsonrpc: "2.0", id, error: { code, message } });
}

// ── Tool implementation ──────────────────────────────────────────────────────

function getTasks() {
  const cachePath = join(vaultPath, ".obsidian", "plugins", "task-board", "tasks.json");
  const raw = readFileSync(cachePath, "utf-8");
  const cache = JSON.parse(raw);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);
  const weekEndStr = weekEnd.toISOString().split("T")[0];

  const overdue = [];
  const dueToday = [];
  const dueThisWeek = [];
  const future = [];
  const undated = [];

  const pending = cache.Pending;
  for (const tasks of Object.values(pending)) {
    for (const task of tasks) {
      const t = {
        id: task.id,
        title: task.title.replace(/^-\s*\[.\]\s*/, "").replace(/📅.*$/, "").trim(),
        due: task.due || null,
        priority: task.priority,
        tags: task.tags,
        file: task.filePath,
      };
      if (!task.due)             undated.push(t);
      else if (task.due < todayStr)   overdue.push(t);
      else if (task.due === todayStr) dueToday.push(t);
      else if (task.due <= weekEndStr) dueThisWeek.push(t);
      else                             future.push(t);
    }
  }

  return {
    asOf: cache.Modified_at,
    summary: {
      overdue: overdue.length,
      today: dueToday.length,
      thisWeek: dueThisWeek.length,
      future: future.length,
      undated: undated.length,
    },
    overdue,
    today: dueToday,
    thisWeek: dueThisWeek,
    future,
    undated,
  };
}

// ── Request router ───────────────────────────────────────────────────────────

const TOOL_DEF = {
  name: "getTasks",
  description:
    "Get all pending tasks from the Obsidian vault, grouped by overdue, today, this week, future, and undated. Reads from the Task Board plugin cache.",
  inputSchema: { type: "object", properties: {} },
};

function handle(msg) {
  const { id, method, params } = msg;
  switch (method) {
    case "initialize":
      ok(id, {
        protocolVersion: params?.protocolVersion ?? "2025-03-26",
        capabilities: { tools: {} },
        serverInfo: { name: "obsidian-tasks-mcp", version: "1.0.0" },
      });
      break;
    case "notifications/initialized":
      break;
    case "tools/list":
      ok(id, { tools: [TOOL_DEF] });
      break;
    case "tools/call":
      if (params?.name === "getTasks") {
        try {
          ok(id, { content: [{ type: "text", text: JSON.stringify(getTasks()) }] });
        } catch (e) {
          ok(id, { content: [{ type: "text", text: JSON.stringify({ error: "Could not read task cache", detail: String(e) }) }] });
        }
      } else {
        err(id, -32601, `Tool not found: ${params?.name}`);
      }
      break;
    default:
      err(id, -32601, "Method not found");
  }
}

// ── stdio transport ──────────────────────────────────────────────────────────

const rl = createInterface({ input: process.stdin, terminal: false });
rl.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    handle(JSON.parse(trimmed));
  } catch {
    send({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
  }
});
