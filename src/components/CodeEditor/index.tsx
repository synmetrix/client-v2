import { Editor } from "@monaco-editor/react";

import type { FC } from "react";

const CodeEditor: FC = () => {
  return (
    <Editor
      height="100vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
};

export default CodeEditor;
