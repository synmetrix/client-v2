import { useTranslation } from "react-i18next";
import { Col, Row, Space } from "antd";

import SettingsHeader from "@/components/SettingsHeader";
import BasicLayout from "@/layouts/BasicLayout";
import DataSourceCard from "@/components/DataSourceCard";
import type { DataSourceInfo } from "@/types/dataSource";

import styles from "./index.module.less";

const DataSources = ({ dataSources }: { dataSources: DataSourceInfo[] }) => {
  const { t } = useTranslation(["settings", "pages"]);
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
        />

        <Row justify="space-between">
          {dataSources.map((d) => (
            <Col key={d.id}>
              <DataSourceCard {...d} />
            </Col>
          ))}
        </Row>
      </Space>
    </BasicLayout>
  );
};

export default DataSources;
