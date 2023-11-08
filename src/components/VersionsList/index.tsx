import { Space, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Copy from "@/components/Copy";
import formatTime from "@/utils/helpers/formatTime";
import type { Dataschema } from "@/types/dataschema";
import type { Version } from "@/types/version";

import DocsIcon from "@/assets/docs.svg";
import YAMLIcon from "@/assets/yml-flie.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { TableProps } from "antd";

const { Title } = Typography;

interface VersionsListProps {
  versions: Version[];
  onRestore: (checksum: string, dataschemas: Dataschema[]) => void;
}

const VersionsList: FC<VersionsListProps> = ({ versions, onRestore }) => {
  const { t } = useTranslation(["models", "common"]);

  const columns: TableProps<Version>["columns"] = [
    {
      title: t("common:words.checksum"),
      dataIndex: "checksum",
      key: "checksum",
      render: (value) => <span className={styles.checksum}>{value}</span>,
    },
    {
      title: t("common:words.author"),
      dataIndex: "user",
      key: "user",
      render: (value) => {
        console.log(value);
        return (
          <Space className={styles.author} size={10}>
            {value && (
              <Avatar img={value?.avatarUrl} username={value?.display_name} />
            )}
            {value?.display_name}
          </Space>
        );
      },
    },
    {
      title: t("common:words.created_at"),
      dataIndex: "created_at",
      key: "created_at",
      render: (value) => (
        <span className={styles.createdAt}>{formatTime(value)}</span>
      ),
    },
    {
      title: <div className={styles.actions}>{t("common:words.actions")}</div>,
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className={styles.actions}>
          <Button
            className={styles.restore}
            icon={<DocsIcon className={styles.restoreIcon} />}
            onClick={() => onRestore(record.checksum, record.dataschemas)}
          >
            {t("common:words.restore")}
          </Button>
        </div>
      ),
    },
  ];

  const renderFileValue = (record: Dataschema) => {
    return <Copy value={record.code} />;
  };

  const expandedRowRender = (record: Version) => {
    const expandedColumns: TableProps<Dataschema>["columns"] = [
      {
        key: "name",
        dataIndex: "name",
        render: (value) => (
          <Space className={styles.fileName} size={5}>
            <YAMLIcon /> {value}
          </Space>
        ),
      },
    ];

    return (
      <Table
        columns={expandedColumns}
        dataSource={record.dataschemas}
        rowKey={(rec) => rec.name}
        expandable={{ expandedRowRender: renderFileValue }}
        pagination={false}
      />
    );
  };

  return (
    <Space className={styles.wrapper} size={16} direction="vertical">
      <Title level={3}>{t("versions_list")}</Title>
      <Table
        className={styles.table}
        columns={columns}
        dataSource={versions}
        rowKey={(record) => record.id}
        pagination={false}
        expandable={{ expandedRowRender }}
      />
    </Space>
  );
};

export default VersionsList;
