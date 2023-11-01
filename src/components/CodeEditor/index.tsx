import { Col, Form, InputNumber, Row, Space, Tooltip } from "antd";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import { Editor } from "@monaco-editor/react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import cn from "classnames";

import Button from "@/components/Button";
import PopoverButton from "@/components/PopoverButton";
import type { AllDataSchemasQuery } from "@/graphql/generated";

import styles from "./index.module.less";

import type { FC } from "react";
import type { editor } from "monaco-editor";

interface CodeEditorProps {
  schemas?: AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"];
  active?: string | null;
  onTabChange: (id: string) => void;
  onClose: (fileName: string) => void;
  onRunSQL: (query: string, limit: number) => void;
  onCodeSave: (id: string, code: string) => void;
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

const CodeEditor: FC<CodeEditorProps> = ({
  schemas = [],
  active,
  onClose,
  onTabChange,
  onRunSQL,
  onCodeSave,
}) => {
  const { t } = useTranslation(["models", "common"]);
  const windowSize = useResponsive();
  const isMobile = windowSize.md === false;

  const [limit, setLimit] = useState<number>(1000);
  const [query, setQuery] = useState<string>("");

  const files = schemas?.reduce(
    (res, schema) => ({
      ...res,
      [schema.id]: schema,
    }),
    {}
  ) as Record<
    string,
    AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"][number]
  >;

  const [content, setContent] = useState<string>(
    active ? files[active]?.code : "active"
  );

  const defaultButtons = [
    <Button
      className={styles.btn}
      key="sqlrunner"
      onClick={() => onTabChange("sqlrunner")}
    >
      {t("common:words.sql_runner")}
    </Button>,
    <Button
      className={styles.run}
      type="primary"
      key="run"
      onClick={() => onRunSQL(query, limit)}
    >
      {t("common:words.run")}
    </Button>,
    <PopoverButton
      key="settings"
      trigger={["click"]}
      icon={<SettingOutlined />}
      content={
        <Form layout="vertical">
          <Form.Item label="Rows limit:">
            <InputNumber
              width={300}
              value={limit}
              onChange={(val) => setLimit(val || 0)}
            />
          </Form.Item>
        </Form>
      }
      buttonProps={{ className: styles.settings, type: "ghost" }}
    />,
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
              Object.keys(files).map((id) => (
                <Button
                  type="default"
                  key={id}
                  className={cn(styles.btn, {
                    [styles.active]: active && id === files[active]?.id,
                  })}
                  onClick={() => onTabChange(id)}
                >
                  {files[id].name}
                  <Tooltip title={t("common:words.close")}>
                    <CloseOutlined
                      className={styles.closeIcon}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClose(id);
                      }}
                    />
                  </Tooltip>
                </Button>
              ))}
            {defaultButtons}
          </Space>
        </Col>

        <Col order={isMobile ? -1 : 1}>
          <Button
            className={styles.save}
            onClick={() => active && onCodeSave(active, content)}
          >
            {t("common:words.save")}
          </Button>
        </Col>
      </Row>
      {active && active !== "sqlrunner" ? (
        <Editor
          className={styles.monaco}
          defaultLanguage={"yml"}
          defaultValue={files[active]?.code}
          value={content}
          onChange={(val) => setContent(val || "")}
          path={files[active]?.name}
          options={MONACO_OPTIONS}
        />
      ) : (
        <Editor
          className={styles.monaco}
          defaultLanguage={"query"}
          defaultValue={query}
          onChange={(val) => setQuery(val || "")}
          path={"sql"}
          options={MONACO_OPTIONS}
        />
      )}
    </div>
  );
};

export default CodeEditor;
