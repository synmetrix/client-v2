import { Alert, Space } from "antd";
import { VerticalAlignMiddleOutlined } from "@ant-design/icons";
import { ResizableBox } from "react-resizable";
import { Editor } from "@monaco-editor/react";

import VirtualTable from "@/components/VirtualTable";
import { MONACO_OPTIONS } from "@/utils/constants/monaco";

import styles from "./index.module.less";

import type { FC, MutableRefObject } from "react";
import type { editor } from "monaco-editor";

interface SQLRunnerProps {
  sqlError: object;
  value: string;
  onChange: (value: string) => void;
  showData: boolean;
  data?: object[];
}

const SQLRunner: FC<SQLRunnerProps> = ({
  sqlError = {},
  data = [],
  showData,
  value,
  onChange,
}) => {
  const monacoRef: MutableRefObject<editor.IStandaloneCodeEditor | null> =
    useRef(null);
  const [monacoHeight, setMonacoHeight] = useState(100);

  useEffect(() => {
    monacoRef.current?.layout();
  }, [monacoHeight]);

  return (
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
            defaultValue={value}
            onChange={(val) => onChange(val || "")}
            path={"sql"}
            options={MONACO_OPTIONS}
            onMount={(editor) => (monacoRef.current = editor)}
          />
        </div>
      </ResizableBox>
      {showData && (
        <div className={styles.data}>
          <VirtualTable data={data || []} loading={false} />
        </div>
      )}
    </Space>
  );
};

export default SQLRunner;
