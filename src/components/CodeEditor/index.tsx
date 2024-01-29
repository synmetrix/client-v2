import { Col, Row, Space, Tooltip } from "antd";
import Scrollbar from "react-custom-scrollbars";
import { CloseOutlined } from "@ant-design/icons";
import { Editor } from "@monaco-editor/react";
import { useTranslation } from "react-i18next";
import { useResponsive, useSize, useTrackedEffect } from "ahooks";
import moment from "moment";
import cn from "classnames";

import Button from "@/components/Button";
import NoModels from "@/components/NoModels";
import SQLRunner from "@/components/SQLRunner";
import Console from "@/components/Console";
import { MONACO_OPTIONS } from "@/utils/constants/monaco";
import type { Dataschema } from "@/types/dataschema";
import equals from "@/utils/helpers/equals";

import SaveIcon from "@/assets/save.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface CodeEditorProps {
  schemas?: Dataschema[];
  active?: string | null;
  onTabChange: (dataschema?: Dataschema) => void;
  onClose: (fileName: string) => void;
  onRunSQL: (query: string, limit: number) => void;
  onCodeSave: (id: string, code: string) => void;
  data?: object[];
  sqlError?: object;
  showConsole?: boolean;
  toggleConsole?: () => void;
  validationError: string;
}

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
  showConsole = false,
  toggleConsole = () => {},
  validationError,
}) => {
  const { t } = useTranslation(["models", "common"]);
  const pageHeader = useRef(null);
  const editorHeader = useRef(null);
  const windowSize = useResponsive();
  const isMd = windowSize?.md;

  const bodySize = useSize(document.body);
  const headerSize = useSize(document.getElementById("header"));
  const pageHeaderSize = useSize(pageHeader.current);

  const editorHeight =
    bodySize?.height && headerSize?.height
      ? Math.max(
          bodySize.height -
            headerSize.height -
            (pageHeaderSize?.height || 0) -
            91,
          300
        )
      : 500;

  const [limit, setLimit] = useState<number>(1000);
  const [query, setQuery] = useState<string>("SELECT id FROM users");
  const [showData, setShowData] = useState<boolean>(false);

  const files = schemas?.reduce(
    (res, schema) => ({
      ...res,
      [schema.name]: schema,
    }),
    {}
  ) as Record<string, Dataschema>;
  const activeFileId = files?.[active || ""]?.id;

  const getFilesContent = () => {
    return schemas?.reduce(
      (s) => ({ [s.id]: s.code }),
      {} as Record<string, string>
    );
  };

  const [content, setContent] = useState<Record<string, string>>(
    getFilesContent()
  );

  const onRun = () => {
    if (!showData) {
      setShowData(true);
    }

    onRunSQL(query, limit);
  };

  useTrackedEffect(
    (changes, previousDeps, currentDeps) => {
      const isSchemasChanged = !equals(previousDeps?.[0], currentDeps?.[0]);

      if (active && isSchemasChanged) {
        setContent(getFilesContent());
      }
    },
    [schemas]
  );

  const language = active
    ? languages[active.split(".")[0] as keyof typeof languages]
    : "sql";

  const header = (
    <Scrollbar
      style={{
        width: "100%",
        height: "57px",
        background: "#f9f9f9",
      }}
      hideTracksWhenNotNeeded
      autoHide
      renderThumbHorizontal={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: "#C1BFC1",
            height: "4px",
            borderRadius: "2px",
            bottom: -1,
          }}
        />
      )}
    >
      <Space className={styles.nav} size={8} ref={pageHeader}>
        <Button
          className={cn(styles.btn, styles.sqlRunner, {
            [styles.active]: active === "sqlrunner",
          })}
          key="sqlrunner"
          onClick={() => onTabChange()}
        >
          {t("common:words.sql_runner")}
        </Button>
        {files &&
          Object.keys(files).map((name) => (
            <Button
              type="default"
              key={name}
              className={cn(styles.btn, {
                [styles.active]: active && name === active,
              })}
              onClick={() => onTabChange(files[name])}
            >
              {files[name].name}
              <Tooltip title={t("common:words.close")}>
                <CloseOutlined
                  className={styles.closeIcon}
                  data-testid="close-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose(name);
                  }}
                />
              </Tooltip>
            </Button>
          ))}
      </Space>
    </Scrollbar>
  );

  if (!active) {
    return (
      <div className={styles.wrapper}>
        {header}
        <NoModels />
      </div>
    );
  }

  return (
    <div className={styles.wrapper} data-testid="code-editor">
      {header}
      {active && active !== "sqlrunner" ? (
        <div>
          <div className={styles.editorHeader} ref={editorHeader}>
            <Row
              className={styles.editorHeaderInner}
              align={"middle"}
              justify={"space-between"}
              gutter={[16, 16]}
            >
              <Col>
                {(files[active]?.updated_at || files[active]?.created_at) && (
                  <span className={cn(!isMd && styles.modifyMobile)}>
                    {t("models:last_modify")}{" "}
                    {moment(
                      files[active]?.updated_at || files[active]?.created_at
                    ).fromNow()}
                  </span>
                )}
              </Col>
              <Col>
                <Button
                  className={cn(styles.save)}
                  onClick={() =>
                    active && onCodeSave(activeFileId, content?.[activeFileId])
                  }
                  icon={<SaveIcon />}
                >
                  {t("common:words.save")}
                </Button>
              </Col>
            </Row>
          </div>
          <div className={styles.monacoWrapper}>
            <Editor
              className={styles.monaco}
              language={language}
              defaultLanguage={language}
              defaultValue={files[active]?.code}
              value={content?.[active]}
              onChange={(val) =>
                setContent((prev) => ({ ...prev, [activeFileId]: val || " " }))
              }
              path={files[active]?.name}
              options={MONACO_OPTIONS}
              height={editorHeight}
            />
            {showConsole && active !== "sqlrunner" && (
              <div className={styles.console}>
                <Console
                  onClose={() => toggleConsole?.()}
                  errors={validationError}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <SQLRunner
          value={query}
          onChange={setQuery}
          showData={showData}
          data={data}
          sqlError={sqlError}
          limit={limit}
          onChangeLimit={setLimit}
          onRun={onRun}
        />
      )}
    </div>
  );
};

export default CodeEditor;
