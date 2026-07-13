import { ItemView, WorkspaceLeaf } from "obsidian";

export const AGENT_DIFF_VIEW_TYPE = "agent-diff";

export interface DiffPayload {
  fileName: string;
  oldContent: string;
  newContent: string;
}

type RowType = "ctx" | "add" | "del";
interface DiffRow { type: RowType; text: string; }

// Line-level LCS diff. Notes are small, so the O(n·m) table is fine.
function diffLines(oldStr: string, newStr: string): DiffRow[] {
  const a = oldStr.length ? oldStr.split("\n") : [];
  const b = newStr.length ? newStr.split("\n") : [];
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const rows: DiffRow[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { rows.push({ type: "ctx", text: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { rows.push({ type: "del", text: a[i] }); i++; }
    else { rows.push({ type: "add", text: b[j] }); j++; }
  }
  while (i < n) { rows.push({ type: "del", text: a[i] }); i++; }
  while (j < m) { rows.push({ type: "add", text: b[j] }); j++; }
  return rows;
}

// Read-only preview of a proposed edit. Approval happens in the terminal (Claude
// shows its own y/n prompt), so this view never steals focus and has no controls.
export class AgentDiffView extends ItemView {
  private payload: DiffPayload | null = null;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return AGENT_DIFF_VIEW_TYPE;
  }

  getDisplayText(): string {
    return this.payload ? `Diff: ${this.payload.fileName}` : "Diff";
  }

  getIcon(): string {
    return "git-compare";
  }

  setDiff(payload: DiffPayload): void {
    this.payload = payload;
    this.render();
  }

  private render(): void {
    if (!this.payload) return;
    const root = this.contentEl;
    root.empty();
    root.addClass("agent-mcp-diff");

    const rows = diffLines(this.payload.oldContent, this.payload.newContent);
    const added = rows.filter(r => r.type === "add").length;
    const removed = rows.filter(r => r.type === "del").length;

    // ── Header ────────────────────────────────────────────────────────────────
    const header = root.createDiv({ cls: "agent-mcp-diff-header" });
    header.createSpan({ text: this.payload.fileName, cls: "agent-mcp-diff-title" });
    header.createSpan({ text: `+${added} -${removed}`, cls: "agent-mcp-diff-stat" });
    header.createSpan({ text: "Approve in the terminal ›", cls: "agent-mcp-diff-hint" });

    // ── Diff body ───────────────────────────────────────────────────────────--
    const body = root.createDiv({ cls: "agent-mcp-diff-body" });

    for (const r of rows) {
      const variant = r.type === "add" ? "is-add" : r.type === "del" ? "is-del" : "is-ctx";
      const line = body.createDiv({ cls: `agent-mcp-diff-line ${variant}` });
      const prefix = r.type === "add" ? "+ " : r.type === "del" ? "- " : "  ";
      line.setText(prefix + r.text);
    }

    if (rows.length === 0) {
      body.createDiv({ text: "(no changes)", cls: "agent-mcp-diff-empty" });
    }
  }
}
