import { Col, Form, InputNumber, Row, Space, Tooltip } from "antd";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import { Editor } from "@monaco-editor/react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import cn from "classnames";

import Button from "@/components/Button";
import PopoverButton from "@/components/PopoverButton";
import SQLRunner from "@/components/SQLRunner";
import { MONACO_OPTIONS } from "@/utils/constants/monaco";
import type { Dataschema } from "@/types/dataschema";

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
  const isMobile = windowSize.md === false;

  const [limit, setLimit] = useState<number>(1000);
  const [query, setQuery] = useState<string>("SELECT id FROM users");
  const [showData, setShowData] = useState<boolean>(false);

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
          className={styles.monaco}
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
        <SQLRunner
          value={query}
          onChange={setQuery}
          showData={showData}
          data={data}
          sqlError={sqlError}
        />
      )}
    </div>
  );
};

export default CodeEditor;
