import { useTranslation } from "react-i18next";
import { Col, Row, Space } from "antd";

import SettingsHeader from "@/components/SettingsHeader";
import BasicLayout from "@/layouts/BasicLayout";
import DataSourceCard from "@/components/DataSourceCard";
import Modal from "@/components/Modal";
import DataSourceForm from "@/components/DataSourceForm";
import type {
  DataSourceForm as DataSourceFormType,
  DataSourceInfo,
} from "@/types/dataSource";

import styles from "./index.module.less";

const DataSources = ({ dataSources }: { dataSources: DataSourceInfo[] }) => {
  const { t } = useTranslation(["settings", "pages"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onFinish = (data: DataSourceFormType) => console.log(data);

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:settings.data_sources") }}
    >
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <SettingsHeader
          title={t("settings:data_sources.title")}
          action={t("settings:data_sources.create_now")}
          actionProps={{
            type: "primary",
            size: "large",
          }}
          onClick={() => setIsOpen(true)}
        />

        <Row className={styles.body} justify={"start"} gutter={[32, 32]}>
          {dataSources.map((d) => (
            <Col key={d.id}>
              <DataSourceCard {...d} />
            </Col>
          ))}
        </Row>
      </Space>

      <Modal
        width={1000}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        closable
      >
        <DataSourceForm onFinish={onFinish} />
      </Modal>
    </BasicLayout>
  );
};

export default DataSources;
