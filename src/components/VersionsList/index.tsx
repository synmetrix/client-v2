import { Space, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Copy from "@/components/Copy";
import type { User } from "@/types/user";
import type { File } from "@/types/file";

import DocsIcon from "@/assets/docs.svg";
import YAMLIcon from "@/assets/yml-flie.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { TableProps } from "antd";

const { Title } = Typography;

interface Version {
  id: string;
  checksum: string;
  author: User;
  createdAt: string;
  files: File[];
}

interface VersionsListProps {
  versions: Version[];
  onRestore: (versionId: string) => void;
  onSave: () => void;
}

const VersionsList: FC<VersionsListProps> = ({
  versions,
  onRestore,
  onSave,
}) => {
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
      dataIndex: "author",
      key: "author",
      render: (value: User) => (
        <Space className={styles.author} size={10}>
          <Avatar img={value.avatarUrl} username={value.displayName} />
          {value.email}
        </Space>
      ),
    },
    {
      title: t("common:words.created_at"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => <span className={styles.createdAt}>{value}</span>,
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
            onClick={() => onRestore(record.id)}
          >
            {t("common:words.restore")}
          </Button>
        </div>
      ),
    },
  ];

  const renderFileValue = (record: File) => {
    return <Copy value={record.value} />;
  };

  const expandedRowRender = (record: Version) => {
    const expandedColums: TableProps<File>["columns"] = [
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
        columns={expandedColums}
        dataSource={record.files}
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

      <Button
        className={styles.save}
        type="primary"
        size="large"
        onClick={onSave}
      >
        {t("common:words.save")}
      </Button>
    </Space>
  );
};

export default VersionsList;
