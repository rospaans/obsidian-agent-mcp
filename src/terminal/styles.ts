import xtermCss from "@xterm/xterm/css/xterm.css";

const STYLE_EL_ID = "agent-mcp-terminal-styles";

export function ensureTerminalStyles(): void {
  if (document.getElementById(STYLE_EL_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_EL_ID;
  style.textContent =
    (xtermCss as unknown as string) +
    `\n.agent-mcp-terminal-host { width: 100%; height: 100%; }\n` +
    `.agent-mcp-terminal-host .xterm-viewport { overflow-y: auto; }\n`;
  document.head.appendChild(style);
}

export function removeTerminalStyles(): void {
  document.getElementById(STYLE_EL_ID)?.remove();
}
