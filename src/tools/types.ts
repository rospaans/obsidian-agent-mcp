export interface ToolResult {
  content: Array<{ type: "text"; text: string }>;
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  call(params?: Record<string, unknown>): ToolResult;
}

export function wrap(data: object): ToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
}
