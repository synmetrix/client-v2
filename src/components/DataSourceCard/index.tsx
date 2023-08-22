import { SettingOutlined } from "@ant-design/icons";
import { Card, Typography, Dropdown } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import DataSourceTag from "@/components/DataSourceTag";
import useDataSources from "@/hooks/useDataSources";
import useCheckResponse from "@/hooks/useCheckResponse";
import formatTime, { CARD_TIME_FORMAT } from "@/utils/helpers/formatTime";
import type { DataSourceInfo } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

const { Paragraph } = Typography;

interface DataSourceCardProps extends DataSourceInfo {
  onEdit?: () => void;
  onDelete?: () => void;
}
interface DataSourceCardWrapperProps {
  dataSource: DataSourceInfo;
  setLocation: (location: string) => void;
}

export const DataSourceCard: FC<DataSourceCardProps> = ({
  name,
  db_params: { host },
  type,
  updatedAt,
  createdAt,
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
        <Button className={styles.btn} type="link" onClick={() => onEdit()}>
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
                onClick: () => onEdit(),
              },
              {
                key: "delete",
                label: t("common:words.delete"),
                onClick: () => onDelete(),
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
            {host}
          </Paragraph>
        </li>

        <li className={styles.listItem}>
          <span className={styles.label}>{t("common:words.type")}</span>
          <DataSourceTag dataSource={type} />
        </li>

        <li className={styles.listItem}>
          <span className={styles.label}>{t("common:words.updated_at")}</span>
          <span className={styles.value}>
            {formatTime(updatedAt, CARD_TIME_FORMAT)}
          </span>
        </li>

        <li className={styles.listItem}>
          <span className={styles.label}>{t("common:words.created_at")}</span>
          <span className={styles.value}>
            {formatTime(createdAt, CARD_TIME_FORMAT)}
          </span>
        </li>
      </ul>
    </Card>
  );
};

const DataSourceCardWrapper: FC<DataSourceCardWrapperProps> = ({
  dataSource,
  setLocation,
}) => {
  const { id } = dataSource;

  const {
    mutations: { deleteMutation, execDeleteMutation },
  } = useDataSources({});

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: "Data Source deleted!",
  });

  const onDelete = () => {
    execDeleteMutation({ variables: { id } });
  };

  const onEdit = () => {
    setLocation(`/settings/data_sources?id=${id}`);
  };

  return <DataSourceCard {...dataSource} onEdit={onEdit} onDelete={onDelete} />;
};

export default DataSourceCardWrapper;
