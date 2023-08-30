import { Col, Row, Space, Tooltip } from "antd";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import { Editor } from "@monaco-editor/react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import cn from "classnames";

import Button from "@/components/Button";
import type { File } from "@/types/file";

import styles from "./index.module.less";

import type { FC } from "react";
import type { editor } from "monaco-editor";

interface CodeEditorProps {
  files: Record<string, File> | null;
  onRemove: (fileName: string) => void;
}

const MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
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

const CodeEditor: FC<CodeEditorProps> = ({ files, onRemove }) => {
  const { t } = useTranslation(["models", "common"]);
  const windowSize = useResponsive();
  const isMobile = windowSize.md === false;

  const [activeFile, setActiveFile] = useState<File | null>(null);

  useEffect(() => {
    const fileNames = files ? Object.keys(files) : null;
    if (fileNames) {
      const lastFileName = fileNames.at(-1) || fileNames[0];
      const lastFile = files?.[lastFileName] || null;
      setActiveFile(lastFile);
    }
  }, [files]);

  const defaultButtons = [
    <Button className={styles.btn} key="sqlrunner">
      {t("common:words.sql_runner")}
    </Button>,
    <Button className={styles.run} type="primary" key="run">
      {t("common:words.run")}
    </Button>,
    <Button className={styles.settings} type="ghost" key="settings">
      <SettingOutlined />
    </Button>,
  ];

  return (
    <div className={styles.wrapper}>
      <Row
        className={styles.nav}
        justify="space-between"
        align="middle"
        gutter={16}
      >
        <Col className={styles.navBtns} order={isMobile ? 1 : -1}>
          <Space size={16} align="center">
            {files &&
              Object.keys(files).map((fileName) => (
                <Button
                  type="default"
                  key={fileName}
                  className={cn(styles.btn, {
                    [styles.active]: fileName === activeFile?.name,
                  })}
                  onClick={() => setActiveFile(files[fileName])}
                >
                  {fileName}
                  <Tooltip title={t("common:words.close")}>
                    <CloseOutlined
                      className={styles.closeIcon}
                      onClick={() => onRemove(fileName)}
                    />
                  </Tooltip>
                </Button>
              ))}
            {defaultButtons}
          </Space>
        </Col>

        <Col order={isMobile ? -1 : 1}>
          <Button className={styles.save}>{t("common:words.save")}</Button>
        </Col>
      </Row>
      {activeFile && (
        <Editor
          height="300px"
          defaultLanguage={activeFile.language}
          defaultValue={activeFile.value}
          path={activeFile.name}
          options={MONACO_OPTIONS}
        />
      )}
    </div>
  );
};

export default CodeEditor;
