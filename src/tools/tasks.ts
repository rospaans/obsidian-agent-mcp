import { readFileSync } from "node:fs";
import { join } from "node:path";
import { wrap, type ToolDefinition } from "./types";

export function createTasksTool(getBasePath: () => string): ToolDefinition {
  return {
    name: "getTasks",
    description:
      "Get all pending tasks from the vault, grouped by overdue, today, this week, future, and undated. " +
      "Reads from the Task Board plugin cache. Requires the Task Board plugin to be installed and active.",
    inputSchema: { type: "object", properties: {} },
    call() {
      try {
        const basePath = getBasePath();
        const cachePath = join(basePath, ".obsidian", "plugins", "task-board", "tasks.json");
        const cache = JSON.parse(readFileSync(cachePath, "utf-8"));

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const pad = (n: number) => String(n).padStart(2, "0");
        const localDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        const todayStr = localDate(today);

        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() + 7);
        const weekEndStr = localDate(weekEnd);

        const overdue: object[] = [];
        const dueToday: object[] = [];
        const dueThisWeek: object[] = [];
        const future: object[] = [];
        const undated: object[] = [];

        const pending = cache.Pending as Record<string, Array<{
          id: string;
          title: string;
          due: string;
          priority: number;
          tags: string[];
          filePath: string;
        }>>;

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
            if (!task.due)                   undated.push(t);
            else if (task.due < todayStr)    overdue.push(t);
            else if (task.due === todayStr)  dueToday.push(t);
            else if (task.due <= weekEndStr) dueThisWeek.push(t);
            else                             future.push(t);
          }
        }

        return wrap({
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
        });
      } catch (e) {
        return wrap({
          error: "Could not read Task Board cache. Is the Task Board plugin installed and active?",
          detail: String(e),
        });
      }
    },
  };
}
