import { Suspense } from "react";
import { Space, Typography } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import ModelsSidebar from "@/components/ModelsSidebar";
import CodeEditor from "@/components/CodeEditor";
import type { Version } from "@/types/version";
import type { File } from "@/types/file";

import ModelsActiveIcon from "@/assets/models-active.svg";

import styles from "./index.module.less";

interface ModelsProps {
  versions: Version[];
  currentVersion: Version;
  branches: string[];
  docs: string;
}

const { Title } = Typography;

const Models: React.FC<ModelsProps> = ({
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
    <BasicLayout
      loggedIn
      headerProps={{
        title: "gh-api.clickhouse.tech",
      }}
      withSideMenu
      sidebar={{
        header: (
          <Space size={7} align="center">
            <ModelsActiveIcon />
            <Title className={styles.sidebarTitle} level={4}>
              Models
            </Title>
          </Space>
        ),
        children: (
          <Suspense>
            <ModelsSidebar
              version={currentVersion.checksum}
              branches={branches}
              docs={docs}
              files={files.map((f) => f.name)}
              onCreateFile={onFileCreate}
              onSelectFile={onSelectFile}
              onSetDefaultVersion={console.log}
            />
          </Suspense>
        ),
        trigger: "models",
      }}
    >
      <CodeEditor files={selectedFiles} onRemove={onFileRemove} />
    </BasicLayout>
  );
};

export default Models;
