import type { editor } from "monaco-editor";

export const MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  autoIndent: "full",
  automaticLayout: true,
  contextmenu: true,
  fontFamily: "monospace",
  lineHeight: 24,
  hideCursorInOverviewRuler: true,
  matchBrackets: "always",
  fontLigatures: "",
  detectIndentation: true,
  insertSpaces: true,
  tabSize: 3,
  minimap: {
    enabled: false,
  },
  readOnly: false,
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 4,
  },
};
