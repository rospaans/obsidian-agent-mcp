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
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
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
    root.style.display = "flex";
    root.style.flexDirection = "column";
    root.style.height = "100%";
    root.style.padding = "0";

    const rows = diffLines(this.payload.oldContent, this.payload.newContent);
    const added = rows.filter(r => r.type === "add").length;
    const removed = rows.filter(r => r.type === "del").length;

    // ── Header ────────────────────────────────────────────────────────────────
    const header = root.createDiv();
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.gap = "8px";
    header.style.padding = "8px 12px";
    header.style.borderBottom = "1px solid var(--background-modifier-border)";
    header.style.flex = "0 0 auto";

    const title = header.createSpan({ text: this.payload.fileName });
    title.style.fontWeight = "600";
    title.style.overflow = "hidden";
    title.style.textOverflow = "ellipsis";
    title.style.whiteSpace = "nowrap";

    const stat = header.createSpan({ text: `+${added} -${removed}` });
    stat.style.fontSize = "12px";
    stat.style.color = "var(--text-muted)";
    stat.style.marginRight = "auto";

    const hint = header.createSpan({ text: "Approve in the terminal ›" });
    hint.style.fontSize = "12px";
    hint.style.color = "var(--text-accent)";

    // ── Diff body ───────────────────────────────────────────────────────────--
    const body = root.createDiv();
    body.style.flex = "1 1 auto";
    body.style.overflow = "auto";
    body.style.fontFamily = "var(--font-monospace, monospace)";
    body.style.fontSize = "var(--font-text-size, 13px)";
    body.style.lineHeight = "1.5";
    body.style.padding = "4px 0";

    for (const r of rows) {
      const line = body.createDiv();
      line.style.whiteSpace = "pre-wrap";
      line.style.wordBreak = "break-word";
      line.style.padding = "0 12px 0 8px";
      line.style.borderLeft = "3px solid transparent";
      const prefix = r.type === "add" ? "+ " : r.type === "del" ? "- " : "  ";
      if (r.type === "add") {
        line.style.background = "rgba(46, 160, 67, 0.15)";
        line.style.borderLeftColor = "rgba(46, 160, 67, 0.8)";
      } else if (r.type === "del") {
        line.style.background = "rgba(248, 81, 73, 0.15)";
        line.style.borderLeftColor = "rgba(248, 81, 73, 0.8)";
      } else {
        line.style.color = "var(--text-muted)";
      }
      line.setText(prefix + r.text);
    }

    if (rows.length === 0) {
      const empty = body.createDiv({ text: "(no changes)" });
      empty.style.padding = "8px 12px";
      empty.style.color = "var(--text-muted)";
    }
  }
}
