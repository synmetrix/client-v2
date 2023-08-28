import { Col, Row, Space, Tooltip } from "antd";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import { Editor } from "@monaco-editor/react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import cn from "classnames";

import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";
import type { editor } from "monaco-editor";

interface File {
  name: string;
  language: string;
  value: string;
}

interface CodeEditorProps {
  files: Record<string, File>;
  onRemove: (fileName: string) => void;
}

const MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  autoIndent: "full",
  automaticLayout: true,
  contextmenu: true,
  fontFamily: "monospace",
  fontSize: 14,
  lineHeight: 24,
  hideCursorInOverviewRuler: true,
  matchBrackets: "always",
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

  const [activeFile, setActiveFile] = useState<File>(
    files[Object.keys(files)[0]]
  );

  const defaultButtons = [
    <Button className={styles.btn} key="sqlrunner">
      {t("common:wrods.sql_runner")}
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
      <Row className={styles.nav} align="bottom" gutter={16}>
        <Col
          className={styles.navBtns}
          span={24}
          lg={22}
          order={isMobile ? 1 : -1}
        >
          <Space size={16}>
            {Object.keys(files).map((fileName) => (
              <Button
                type="default"
                key={fileName}
                className={cn(styles.btn, {
                  [styles.active]: fileName === activeFile.name,
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

        <Col span={24} lg={1} order={isMobile ? -1 : 1}>
          <Button className={styles.save}>{t("common:words.save")}</Button>
        </Col>
      </Row>
      <Editor
        height={"100vh"}
        defaultLanguage={activeFile.language}
        defaultValue={activeFile.value}
        path={activeFile.name}
        options={MONACO_OPTIONS}
      />
    </div>
  );
};

export default CodeEditor;
