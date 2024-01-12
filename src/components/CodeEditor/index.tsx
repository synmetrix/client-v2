import { Col, Row, Space, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Editor } from "@monaco-editor/react";
import { useTranslation } from "react-i18next";
import { useResponsive, useTrackedEffect } from "ahooks";
import moment from "moment";
import cn from "classnames";

import Button from "@/components/Button";
import SQLRunner from "@/components/SQLRunner";
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
}) => {
  const { t } = useTranslation(["models", "common"]);
  const windowSize = useResponsive();
  const isMd = windowSize?.md;

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

  const [content, setContent] = useState<string>(
    active ? files[active]?.code : ""
  );

  const saveBtn = (
    <Button
      className={cn(styles.save)}
      onClick={() => active && onCodeSave(files[active].id, content)}
      icon={<SaveIcon />}
    >
      {t("common:words.save")}
    </Button>
  );

  const onRun = () => {
    if (!showData) {
      setShowData(true);
    }

    onRunSQL(query, limit);
  };

  useTrackedEffect(
    (changes, previousDeps, currentDeps) => {
      if (!equals(previousDeps?.[0], currentDeps?.[0]) && active) {
        const code = files?.[active]?.code ?? "";
        setContent(code);
      }
    },
    [schemas]
  );
  const language = active
    ? languages[active.split(".")[0] as keyof typeof languages]
    : "sql";
  console.log(active);
  return (
    <div className={styles.wrapper} data-testid="code-editor">
      <Space className={styles.nav} size={8}>
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

      {active && active !== "sqlrunner" ? (
        <div>
          <div className={styles.editorHeader}>
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
              <Col>{saveBtn}</Col>
            </Row>
          </div>
          <div className={styles.editorControls}>{isMd && saveBtn}</div>
          <Editor
            className={styles.monaco}
            language={language}
            defaultLanguage={language}
            defaultValue={files[active]?.code}
            value={content}
            onChange={(val) => setContent(val || "")}
            path={files[active]?.name}
            options={MONACO_OPTIONS}
          />
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
