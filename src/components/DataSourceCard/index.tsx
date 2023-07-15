import cn from "classnames";
import { SettingOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import type { DataSource } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

interface DataSourceCardProps {
  type: DataSource;
  host: string;
  updatedAt: string;
  createdAt: string;
}

const DataSourceCard: FC<DataSourceCardProps> = ({
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
          <span className={cn(styles.value, styles.db)}>
            <span className={styles.icon}>{type.icon}</span>
            {type.name}
          </span>
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