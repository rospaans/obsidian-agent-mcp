import { App, FileSystemAdapter, MarkdownView } from "obsidian";
import { wrap, type ToolDefinition, type ToolResult } from "./types";

export interface SelectionData {
  filePath: string;
  relativePath: string;
  cursor: { line: number; character: number };
  selection: {
    start: { line: number; character: number };
    end: { line: number; character: number };
    isEmpty: boolean;
    text: string;
  };
}

export function getSelectionData(app: App): SelectionData | null {
  const view = app.workspace.getActiveViewOfType(MarkdownView);
  if (!view?.file) return null;
  const editor = view.editor;
  const basePath = (app.vault.adapter as FileSystemAdapter).getBasePath();
  const cursor = editor.getCursor();
  const from = editor.getCursor("from");
  const to = editor.getCursor("to");
  const text = editor.getSelection();
  const rel = view.file.path;
  return {
    filePath: basePath + "/" + rel,
    relativePath: rel.includes(" ") ? `"${rel}"` : rel,
    cursor: { line: cursor.line, character: cursor.ch },
    selection: {
      start: { line: from.line, character: from.ch },
      end: { line: to.line, character: to.ch },
      isEmpty: text === "",
      text,
    },
  };
}

export function createEditorTools(app: App): ToolDefinition[] {
  function basePath() {
    return (app.vault.adapter as FileSystemAdapter).getBasePath();
  }

  return [
    {
      name: "getCurrentSelection",
      description: "Get the current selection in the active editor",
      inputSchema: { type: "object", properties: {} },
      call(): ToolResult {
        const d = getSelectionData(app);
        return d ? wrap(d) : wrap({ error: "no active file" });
      },
    },
    {
      name: "getLatestSelection",
      description: "Get the most recent selection",
      inputSchema: { type: "object", properties: {} },
      call(): ToolResult {
        const d = getSelectionData(app);
        return d ? wrap(d) : wrap({ error: "no selection tracked yet" });
      },
    },
    {
      name: "getOpenEditors",
      description: "Get all open editor tabs",
      inputSchema: { type: "object", properties: {} },
      call(): ToolResult {
        const base = basePath();
        const leaves = app.workspace.getLeavesOfType("markdown");
        const active = app.workspace.getActiveViewOfType(MarkdownView);
        return wrap({
          tabs: leaves
            .filter(l => (l.view as MarkdownView).file)
            .map(l => {
              const file = (l.view as MarkdownView).file!;
              return {
                uri: "file://" + base + "/" + file.path,
                isActive: l.view === active,
                label: file.basename,
                languageId: "markdown",
              };
            }),
        });
      },
    },
    {
      name: "getWorkspaceFolders",
      description: "Get vault path",
      inputSchema: { type: "object", properties: {} },
      call(): ToolResult {
        return wrap({ folders: [basePath()] });
      },
    },
  ];
}
