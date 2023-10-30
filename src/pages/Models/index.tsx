import { Col, Row, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";

import CodeEditor from "@/components/CodeEditor";
import ModelsSidebar from "@/components/ModelsSidebar";
import useLocation from "@/hooks/useLocation";
import SidebarLayout from "@/layouts/SidebarLayout";
import AppLayout from "@/layouts/AppLayout";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type { File } from "@/types/file";
import type { Version } from "@/types/version";
// import type {
//   Datasources_Pk_Columns_Input,
//   Datasources_Set_Input,
// } from "@/graphql/generated";

import ModelsActiveIcon from "@/assets/models-active.svg";

import styles from "./index.module.less";

interface ModelsProps {
  versions: Version[];
  currentVersion: Version;
  branches: string[];
  docs: string;
}

const { Title } = Typography;

export const Models: React.FC<ModelsProps> = ({
  // versions,
  branches,
  docs,
  currentVersion,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<Record<
    string,
    File
  > | null>(null);
  const [files, setFiles] = useState<File[]>(currentVersion.files);

  const onSelectFile = (fileName: string) => {
    setSelectedFiles((prevState) => {
      const file = currentVersion.files.find((f) => f.name === fileName);
      if (file) {
        const newState = prevState
          ? { ...prevState, [fileName]: file }
          : { [fileName]: file };
        return newState;
      }
      return prevState;
    });
  };

  const onFileRemove = (fileName: string) => {
    setSelectedFiles((prevState) => {
      if (prevState) {
        const newState = { ...prevState };
        delete newState[fileName];
        return newState;
      }
      return prevState;
    });
  };

  const onFileCreate = (fileName: string) => {
    setFiles((prevState) => {
      const language = fileName.split(".").at(-1);
      if (prevState && language) {
        const newState = [...prevState];
        newState.push({
          name: fileName,
          value: "",
          language,
        });
        return newState;
      }
      return prevState;
    });
  };

  return (
    <SidebarLayout
      title={"gh-api.clickhouse.tech"}
      subTitle={
        <Space size={7} align="center">
          <ModelsActiveIcon />
          <Title className={styles.sidebarTitle} level={4}>
            Models
          </Title>
        </Space>
      }
      divider
      items={
        <ModelsSidebar
          version={currentVersion.checksum}
          branches={branches}
          docs={docs}
          files={files.map((f) => f.name)}
          onCreateFile={onFileCreate}
          onSelectFile={onSelectFile}
          onSetDefaultVersion={console.log}
        />
      }
    >
      <CodeEditor files={selectedFiles} onRemove={onFileRemove} />
    </SidebarLayout>
  );
};

const ModelsWrapper: React.FC = () => {
  return <>this is models page </>;
};

export default ModelsWrapper;
