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

export function createEditorTools(app: App, getLatestSelection: () => SelectionData | null): ToolDefinition[] {
  function basePath() {
    return (app.vault.adapter as FileSystemAdapter).getBasePath();
  }

  return [
    {
      name: "getLatestSelection",
      description:
        "The primary tool for finding out what the user has open in Obsidian. " +
        "Returns the file path, cursor position, and selected text for the note the user was last working in. " +
        "Works whether or not the Obsidian editor is currently focused — it returns the cached last-known state when focus is elsewhere (e.g. the user switched to a terminal to type a message) and falls back to the live state when Obsidian is focused. " +
        "Always call this first when the user asks about their current file, selection, or context.",
      inputSchema: { type: "object", properties: {} },
      call(): ToolResult {
        const d = getLatestSelection() ?? getSelectionData(app);
        return d ? wrap(d) : wrap({ error: "no selection tracked yet" });
      },
    },
    {
      name: "getOpenEditors",
      description:
        "Returns all open markdown tabs in the Obsidian workspace. " +
        "Each tab has a file URI, display label, languageId ('markdown'), and an isActive flag. " +
        "isActive is true only when the Obsidian editor window is focused — it will be false for every tab when the user is in a terminal. " +
        "Only call this when you need the full list of open tabs; to find the user's current file, use getLatestSelection instead.",
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
      description: "Returns the absolute path to the Obsidian vault root. Use this to resolve relative file paths returned by other tools.",
      inputSchema: { type: "object", properties: {} },
      call(): ToolResult {
        return wrap({ folders: [basePath()] });
      },
    },
  ];
}
