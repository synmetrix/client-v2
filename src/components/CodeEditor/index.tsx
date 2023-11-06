import { Alert, Col, Form, InputNumber, Row, Space, Tooltip } from "antd";
import { ResizableBox } from "react-resizable";
import {
  CloseOutlined,
  SettingOutlined,
  VerticalAlignMiddleOutlined,
} from "@ant-design/icons";
import { Editor } from "@monaco-editor/react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import cn from "classnames";

import Button from "@/components/Button";
import PopoverButton from "@/components/PopoverButton";
import VirtualTable from "@/components/VirtualTable";
import type { Dataschema } from "@/types/dataschema";

import styles from "./index.module.less";

import type { FC, MutableRefObject } from "react";
import type { editor } from "monaco-editor";

interface CodeEditorProps {
  schemas?: Dataschema[];
  active?: string | null;
  onTabChange: (dataschema?: Dataschema) => void;
  onClose: (fileName: string) => void;
  onRunSQL: (query: string, limit: number) => void;
  onCodeSave: (id: string, code: string) => void;
  data?: object[];
  sqlError?: object;
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

const languages = {
  js: "javascript",
  yml: "yaml",
};

const CodeEditor: FC<CodeEditorProps> = ({
  schemas = [],
  active,
  onClose,
  onTabChange,
  onRunSQL,
  onCodeSave,
  data,
  sqlError = {},
}) => {
  const { t } = useTranslation(["models", "common"]);
  const windowSize = useResponsive();
  const isMobile = windowSize.md === false;

  const [limit, setLimit] = useState<number>(1000);
  const [query, setQuery] = useState<string>("SELECT id FROM users");
  const [monacoHeight, setMonacoHeight] = useState(100);
  const [showData, setShowData] = useState<boolean>(false);
  const monacoRef: MutableRefObject<editor.IStandaloneCodeEditor | null> =
    useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const files = schemas?.reduce(
    (res, schema) => ({
      ...res,
      [schema.id]: schema,
    }),
    {}
  ) as Record<string, Dataschema>;

  const [content, setContent] = useState<string>(
    active ? files[active]?.code : "active"
  );

  const onRun = () => {
    if (!showData) {
      setShowData(true);
    }

    onRunSQL(query, limit);
  };

  useEffect(() => {
    monacoRef.current?.layout();
  }, [monacoHeight]);

  const defaultButtons = [
    <Button
      className={cn(styles.btn, {
        [styles.active]: active === "sqlrunner",
      })}
      key="sqlrunner"
      onClick={() => onTabChange()}
    >
      {t("common:words.sql_runner")}
    </Button>,
    active === "sqlrunner" ? (
      <Button className={styles.run} type="primary" key="run" onClick={onRun}>
        {t("common:words.run")}
      </Button>
    ) : null,
    active === "sqlrunner" ? (
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
      />
    ) : null,
  ];

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
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
                  onClick={() => onTabChange(files[id])}
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
          className={cn(styles.monaco, styles.monacoHeight)}
          language={
            languages[
              files[active]?.name.split(".")[0] as keyof typeof languages
            ]
          }
          defaultLanguage={
            languages[
              files[active]?.name.split(".")[0] as keyof typeof languages
            ]
          }
          defaultValue={files[active]?.code}
          value={content}
          onChange={(val) => setContent(val || "")}
          path={files[active]?.name}
          options={MONACO_OPTIONS}
        />
      ) : (
        <Space className={styles.sqlRunner} direction="vertical" size={25}>
          <ResizableBox
            height={100}
            handle={
              <div className={styles.resizeIcon}>
                <VerticalAlignMiddleOutlined />
              </div>
            }
            axis="y"
            resizeHandles={["s"]}
            minConstraints={[100, 100]}
            maxConstraints={[1000, 1000]}
            onResize={(_w, editor) => {
              setMonacoHeight(editor.size.height);
            }}
          >
            <div>
              {(Object.keys(sqlError).length && (
                <div>
                  <Alert
                    style={{ borderRadius: 0 }}
                    type="error"
                    message={sqlError.toString()}
                    closable
                  />
                </div>
              )) ||
                null}
              <Editor
                className={styles.monaco}
                defaultLanguage={"sql"}
                wrapperProps={{ styles: { minHeight: monacoHeight } }}
                height={monacoHeight}
                defaultValue={query}
                onChange={(val) => setQuery(val || "")}
                path={"sql"}
                options={MONACO_OPTIONS}
                onMount={(editor) => (monacoRef.current = editor)}
              />
            </div>
          </ResizableBox>
          {showData && (
            <div>
              <VirtualTable
                data={data || []}
                loading={false}
                loadingProgress={{}}
              />
            </div>
          )}
        </Space>
      )}
    </div>
  );
};

export default CodeEditor;
