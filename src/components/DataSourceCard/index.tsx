import { SettingOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import DataSourceTag from "@/components/DataSourceTag";
import type { DataSourceInfo } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

const DataSourceCard: FC<DataSourceInfo> = ({
  host,
  type,
  updatedAt,
  createdAt,
}) => {
  const { t } = useTranslation(["common"]);
  return (
    <Card
      style={{ width: 260 }}
      bodyStyle={{ padding: 16 }}
      headStyle={{ padding: 16 }}
      title={
        <Button className={styles.btn} type="link">
          {host}
        </Button>
      }
      extra={
        <Button className={styles.btn} type="link">
          <SettingOutlined key="setting" />
        </Button>
      }
    >
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span className={styles.label}>{t("common:words.host")}</span>
          <span className={styles.value}>{host}</span>
        </li>

        <li className={styles.listItem}>
          <span className={styles.label}>{t("common:words.type")}</span>
          <DataSourceTag dataSource={type} />
        </li>

        <li className={styles.listItem}>
          <span className={styles.label}>{t("common:words.updated_at")}</span>
          <span className={styles.value}>{updatedAt}</span>
        </li>

        <li className={styles.listItem}>
          <span className={styles.label}>{t("common:words.created_at")}</span>
          <span className={styles.value}>{createdAt}</span>
        </li>
      </ul>
    </Card>
  );
};

export default DataSourceCard;
