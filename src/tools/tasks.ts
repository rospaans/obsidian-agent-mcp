import { App, TFile } from "obsidian";
import { wrap, type ToolDefinition, type ToolResult } from "./types";

// ── Task line parsing ────────────────────────────────────────────────────────

const TASK_LINE_RE = /^\s*[-*+]\s+\[([ xX/\-])\]\s+(.*)$/;

const DUE_EMOJI_RE = /📅\s*(\d{4}-\d{2}-\d{2})/;
const SCHEDULED_EMOJI_RE = /⏳\s*(\d{4}-\d{2}-\d{2})/;
const START_EMOJI_RE = /🛫\s*(\d{4}-\d{2}-\d{2})/;
const DONE_EMOJI_RE = /✅\s*(\d{4}-\d{2}-\d{2})/;
const CANCELLED_EMOJI_RE = /❌\s*(\d{4}-\d{2}-\d{2})/;
const CREATED_EMOJI_RE = /➕\s*(\d{4}-\d{2}-\d{2})/;
const TASK_ID_RE = /🆔\s*\S+/;
const DEPENDS_ON_RE = /⛔\s*\S+/;
const RECURRENCE_EMOJI_RE = /🔁\s*([^📅⏳🛫✅❌➕🆔⛔🔺⏫🔼🔽⏬#]+?)(?=\s*[📅⏳🛫✅❌➕🆔⛔🔺⏫🔼🔽⏬#]|$)/;

const DUE_DATAVIEW_RE = /\[due::\s*(\d{4}-\d{2}-\d{2})\s*\]/;
const SCHEDULED_DATAVIEW_RE = /\[scheduled::\s*(\d{4}-\d{2}-\d{2})\s*\]/;
const START_DATAVIEW_RE = /\[start::\s*(\d{4}-\d{2}-\d{2})\s*\]/;

const TAG_RE = /(?:^|\s)(#[\p{L}\p{N}_\-\/]+)/gu;

const PRIORITY: Record<string, "highest" | "high" | "medium" | "low" | "lowest"> = {
  "🔺": "highest",
  "⏫": "high",
  "🔼": "medium",
  "🔽": "low",
  "⏬": "lowest",
};

type TaskStatus = "pending" | "done" | "inProgress" | "cancelled";

function statusFromChar(c: string): TaskStatus {
  if (c === "x" || c === "X") return "done";
  if (c === "/") return "inProgress";
  if (c === "-") return "cancelled";
  return "pending";
}

function extract(re: RegExp, line: string): string | null {
  const m = line.match(re);
  return m ? m[1] : null;
}

function cleanTitle(raw: string): string {
  return raw
    .replace(DUE_EMOJI_RE, "")
    .replace(SCHEDULED_EMOJI_RE, "")
    .replace(START_EMOJI_RE, "")
    .replace(DONE_EMOJI_RE, "")
    .replace(CANCELLED_EMOJI_RE, "")
    .replace(CREATED_EMOJI_RE, "")
    .replace(TASK_ID_RE, "")
    .replace(DEPENDS_ON_RE, "")
    .replace(RECURRENCE_EMOJI_RE, "")
    .replace(/[🔺⏫🔼🔽⏬]/g, "")
    .replace(DUE_DATAVIEW_RE, "")
    .replace(SCHEDULED_DATAVIEW_RE, "")
    .replace(START_DATAVIEW_RE, "")
    .replace(/\s*#[\p{L}\p{N}_\-\/]+/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

interface ParsedTask {
  status: TaskStatus;
  title: string;
  due: string | null;
  scheduled: string | null;
  start: string | null;
  done: string | null;
  cancelled: string | null;
  priority: "highest" | "high" | "medium" | "low" | "lowest" | null;
  recurrence: string | null;
  tags: string[];
  file: string;
  line: number;
}

function parseTaskLine(line: string, file: string, lineNumber: number): ParsedTask | null {
  const m = line.match(TASK_LINE_RE);
  if (!m) return null;

  const status = statusFromChar(m[1]);
  const body = m[2];

  const due = extract(DUE_EMOJI_RE, body) ?? extract(DUE_DATAVIEW_RE, body);
  const scheduled = extract(SCHEDULED_EMOJI_RE, body) ?? extract(SCHEDULED_DATAVIEW_RE, body);
  const start = extract(START_EMOJI_RE, body) ?? extract(START_DATAVIEW_RE, body);
  const done = extract(DONE_EMOJI_RE, body);
  const cancelled = extract(CANCELLED_EMOJI_RE, body);

  let priority: ParsedTask["priority"] = null;
  for (const [emoji, level] of Object.entries(PRIORITY)) {
    if (body.includes(emoji)) { priority = level; break; }
  }

  const rec = body.match(RECURRENCE_EMOJI_RE);
  const recurrence = rec ? rec[1].trim() : null;

  const tags: string[] = [];
  for (const m of body.matchAll(TAG_RE)) tags.push(m[1]);

  return {
    status,
    title: cleanTitle(body),
    due,
    scheduled,
    start,
    done,
    cancelled,
    priority,
    recurrence,
    tags,
    file,
    line: lineNumber,
  };
}

// ── Scanner ──────────────────────────────────────────────────────────────────

function localDateString(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export interface ScanOptions {
  includeCompleted?: boolean;
  pathPrefix?: string;
  tag?: string;
  limit?: number;
}

export async function scanVaultTasks(app: App, opts: ScanOptions = {}): Promise<ParsedTask[]> {
  const files = app.vault.getMarkdownFiles();
  const out: ParsedTask[] = [];
  const prefix = opts.pathPrefix?.replace(/^\/+|\/+$/g, "");
  const tagFilter = opts.tag?.startsWith("#") ? opts.tag : opts.tag ? `#${opts.tag}` : null;
  const limit = opts.limit ?? 2000;

  for (const file of files) {
    if (prefix && !file.path.startsWith(prefix)) continue;

    const cache = app.metadataCache.getFileCache(file);
    const items = cache?.listItems?.filter(li => li.task !== undefined);
    if (!items || items.length === 0) continue;

    const content = await app.vault.cachedRead(file as TFile);
    const lines = content.split("\n");

    for (const item of items) {
      const lineNo = item.position.start.line;
      const raw = lines[lineNo];
      if (typeof raw !== "string") continue;
      const parsed = parseTaskLine(raw, file.path, lineNo);
      if (!parsed) continue;
      if (!opts.includeCompleted && (parsed.status === "done" || parsed.status === "cancelled")) continue;
      if (tagFilter && !parsed.tags.some(t => t.toLowerCase() === tagFilter.toLowerCase())) continue;
      out.push(parsed);
      if (out.length >= limit) return out;
    }
  }
  return out;
}

// ── Bucketing ────────────────────────────────────────────────────────────────

function bucket(tasks: ParsedTask[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = localDateString(today);
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);
  const weekEndStr = localDateString(weekEnd);

  const overdue: ParsedTask[] = [];
  const dueToday: ParsedTask[] = [];
  const dueThisWeek: ParsedTask[] = [];
  const future: ParsedTask[] = [];
  const undated: ParsedTask[] = [];

  for (const t of tasks) {
    if (!t.due) undated.push(t);
    else if (t.due < todayStr) overdue.push(t);
    else if (t.due === todayStr) dueToday.push(t);
    else if (t.due <= weekEndStr) dueThisWeek.push(t);
    else future.push(t);
  }

  return { overdue, dueToday, dueThisWeek, future, undated };
}

// ── Tool definition ──────────────────────────────────────────────────────────

export function createTasksTool(app: App): ToolDefinition {
  return {
    name: "getTasks",
    description:
      "Scan the entire Obsidian vault for tasks and return them grouped by due date " +
      "(overdue, today, this week, future, undated). " +
      "Parses standard Obsidian Tasks syntax (e.g. `- [ ] Do thing 📅 2026-01-15 ⏫ #project`) " +
      "as well as dataview inline fields (`[due:: 2026-01-15]`). " +
      "Use this instead of reading individual markdown files when the user asks about their " +
      "tasks, to-do list, workload, what's overdue, what's due today, or similar questions. " +
      "No external plugins required — reads directly from the vault's markdown files via " +
      "Obsidian's metadata cache.",
    inputSchema: {
      type: "object",
      properties: {
        includeCompleted: {
          type: "boolean",
          description: "Include tasks marked done ([x]) or cancelled ([-]). Default: false.",
        },
        pathPrefix: {
          type: "string",
          description: "Only include tasks from files whose path starts with this prefix (e.g. 'Projects/').",
        },
        tag: {
          type: "string",
          description: "Only include tasks carrying this tag (with or without leading '#').",
        },
        limit: {
          type: "number",
          description: "Maximum number of tasks to return. Default: 2000.",
        },
      },
    },
    async call(params?: Record<string, unknown>): Promise<ToolResult> {
      try {
        const opts: ScanOptions = {
          includeCompleted: params?.includeCompleted === true,
          pathPrefix: typeof params?.pathPrefix === "string" ? params.pathPrefix : undefined,
          tag: typeof params?.tag === "string" ? params.tag : undefined,
          limit: typeof params?.limit === "number" ? params.limit : undefined,
        };
        const tasks = await scanVaultTasks(app, opts);
        const { overdue, dueToday, dueThisWeek, future, undated } = bucket(tasks);

        return wrap({
          asOf: new Date().toISOString(),
          summary: {
            total: tasks.length,
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
        });
      } catch (e) {
        return wrap({ error: "Failed to scan vault tasks", detail: String(e) });
      }
    },
  };
}
