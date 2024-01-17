import { Alert, InputNumber, Space } from "antd";
import { RightOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
import { ResizableBox } from "react-resizable";
import { Editor } from "@monaco-editor/react";
import { useTranslation } from "react-i18next";

import VirtualTable from "@/components/VirtualTable";
import Button from "@/components/Button";
import { MONACO_OPTIONS } from "@/utils/constants/monaco";

import CloseIcon from "@/assets/alert-close.svg";

import styles from "./index.module.less";

import type { FC, MutableRefObject } from "react";
import type { editor } from "monaco-editor";

interface SQLRunnerProps {
  sqlError: object;
  value: string;
  onChange: (value: string) => void;
  showData: boolean;
  data?: object[];
  onRun?: () => void;
  limit?: number;
  onChangeLimit?: (limit: number) => void;
}

const SQLRunner: FC<SQLRunnerProps> = ({
  sqlError = {},
  data = [],
  showData,
  value,
  onChange,
  onRun = () => {},
  limit,
  onChangeLimit = () => {},
}) => {
  const { t } = useTranslation(["common"]);

  const monacoRef: MutableRefObject<editor.IStandaloneCodeEditor | null> =
    useRef(null);
  const [monacoHeight, setMonacoHeight] = useState(100);

  useEffect(() => {
    monacoRef.current?.layout();
  }, [monacoHeight]);

  return (
    <Space className={styles.sqlRunner} direction="vertical" size={16}>
      {(Object.keys(sqlError).length && (
        <div>
          <Alert
            className={styles.error}
            type="error"
            role="error"
            message={sqlError.toString()}
            closable
            closeIcon={<CloseIcon />}
          />
        </div>
      )) ||
        null}
      <div className={styles.resize}>
        <ResizableBox
          height={monacoHeight}
          handle={
            <div className={styles.resizeIcon}>
              <VerticalAlignMiddleOutlined />
            </div>
          }
          axis="y"
          resizeHandles={["s"]}
          minConstraints={[100, 100]}
          maxConstraints={[1000, 1000]}
          onResize={(_w, editor) => setMonacoHeight(editor.size.height)}
        >
          <div className={styles.monacoWrapper}>
            <Editor
              className={styles.monaco}
              defaultLanguage={"sql"}
              wrapperProps={{ styles: { minHeight: monacoHeight } }}
              height={monacoHeight}
              defaultValue={value}
              onChange={(val) => onChange(val || "")}
              path={"sql"}
              options={{
                ...MONACO_OPTIONS,
                glyphMargin: false,
                folding: false,
                lineDecorationsWidth: 7,
                lineNumbersMinChars: 2,
                renderLineHighlight: "none",
              }}
              onMount={(editor, monaco) => {
                monaco.editor.defineTheme("my-theme", {
                  base: "vs",
                  inherit: true,
                  rules: [],
                  colors: {
                    "editor.background": "#F3F4F5",
                  },
                });
                monaco.editor.setTheme("my-theme");
                monacoRef.current = editor;
              }}
            />
          </div>
        </ResizableBox>
      </div>

      <Space className={styles.runner} align="start">
        <Button className={styles.run} type="primary" key="run" onClick={onRun}>
          {t("common:words.run")}
          <RightOutlined />
        </Button>

        <InputNumber
          addonBefore={t("common:words.row_limit")}
          value={limit}
          className={styles.limit}
          onChange={(val) => onChangeLimit(val || 0)}
        />
      </Space>

      {showData && (
        <div className={styles.data}>
          <VirtualTable data={data || []} loading={false} />
        </div>
      )}
    </Space>
  );
};

export default SQLRunner;
