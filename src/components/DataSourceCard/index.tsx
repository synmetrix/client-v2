import { SettingOutlined } from "@ant-design/icons";
import { Card, Typography, Dropdown } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import DataSourceTag from "@/components/DataSourceTag";
import formatTime from "@/utils/helpers/formatTime";
import type { DataSourceInfo } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

const { Paragraph } = Typography;

interface DataSourceCardProps {
  dataSource: DataSourceInfo;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const DataSourceCard: FC<DataSourceCardProps> = ({
  dataSource: { id, name, dbParams, type, updatedAt, createdAt },
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const { t } = useTranslation(["common"]);

  return (
    <Card
      style={{ width: 260 }}
      bodyStyle={{ padding: 16 }}
      headStyle={{ padding: 16 }}
      title={
        <Button
          className={styles.btn}
          type="link"
          onClick={() => id && onEdit(id)}
        >
          {name}
        </Button>
      }
      extra={
        <Dropdown
          className={styles.btn}
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "edit",
                label: t("common:words.edit"),
                onClick: () => id && onEdit(id),
              },
              {
                key: "delete",
                label: t("common:words.delete"),
                onClick: () => id && onDelete(id),
              },
            ],
          }}
        >
          <SettingOutlined key="setting" />
        </Dropdown>
      }
    >
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span className={styles.label}>{t("common:words.host")}</span>
          <Paragraph className={styles.paragraph} ellipsis>
            {dbParams.host}
          </Paragraph>
        </li>

        <li className={styles.listItem}>
          <span className={styles.label}>{t("common:words.type")}</span>
          <DataSourceTag dataSource={type} />
        </li>

        <li className={styles.listItem}>
          <span className={styles.label}>{t("common:words.updated_at")}</span>
          <span className={styles.value}>{formatTime(updatedAt)}</span>
        </li>

        <li className={styles.listItem}>
          <span className={styles.label}>{t("common:words.created_at")}</span>
          <span className={styles.value}>{formatTime(createdAt)}</span>
        </li>
      </ul>
    </Card>
  );
};

export default DataSourceCard;
