import { loader } from "@monaco-editor/react";
import "virtual:windi.css";

import "../i18next.config";

loader.config({
  paths: {
    vs: `/monaco-editor/min/vs`,
  },
});
