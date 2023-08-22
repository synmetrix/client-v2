import { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Space } from "antd";

import PageHeader from "@/components/PageHeader";
import BasicLayout from "@/layouts/BasicLayout";
import DataSourceCardWrapper from "@/components/DataSourceCard";
import Modal from "@/components/Modal";
import DataSourceForm from "@/components/DataSourceForm";
import type {
  DataSourceForm as DataSourceFormType,
  DataSourceInfo,
} from "@/types/dataSource";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useLocation from "@/hooks/useLocation";

import styles from "./index.module.less";

export const DataSources = ({
  dataSources = [],
  curDataSource,
  setLocation,
}: {
  dataSources: DataSourceInfo[];
  curDataSource?: DataSourceInfo;
  setLocation: (location: string) => void;
}) => {
  const { t } = useTranslation(["settings", "pages"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onFinish = (data: DataSourceFormType) => console.log(data);

  const onClose = () => {
    setIsOpen(false);
    setLocation("/settings/data_sources");
  };

  useEffect(() => {
    if (curDataSource) {
      setIsOpen(true);
    }
  }, [curDataSource]);

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:settings.data_sources") }}
    >
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
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
              <DataSourceCardWrapper dataSource={d} setLocation={setLocation} />
            </Col>
          ))}
        </Row>
      </Space>

      <Modal width={1000} open={isOpen} onClose={() => onClose()} closable>
        <DataSourceForm
          curDataSource={curDataSource}
          bordered={false}
          shadow={false}
          onFinish={onFinish}
        />
      </Modal>
    </BasicLayout>
  );
};

const DataSourcesWrapper = ({
  dataSources = [],
}: {
  dataSources: DataSourceInfo[];
}) => {
  const { currentUser } = CurrentUserStore();
  const [location, setLocation] = useLocation();
  const { id } = location.query;

  const datasources = useMemo(
    () => (dataSources.length ? dataSources : currentUser.dataSources || []),
    [dataSources, currentUser]
  ) as DataSourceInfo[];
  const curDataSource = useMemo(
    () => datasources.find((d) => d.id === id),
    [id, datasources]
  );

  return (
    <DataSources
      curDataSource={curDataSource}
      dataSources={datasources}
      setLocation={setLocation}
    />
  );
};

export default DataSourcesWrapper;
