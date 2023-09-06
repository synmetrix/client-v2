import { Space, Table } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import type { DataSource } from "@/types/dataSource";
import DataSourceTag from "@/components/DataSourceTag";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";

import TrashIcon from "@/assets/trash.svg";

import styles from "./index.module.less";

import type { TableProps } from "antd";
import type { FC } from "react";

interface DataSourceCredentials {
  id: string;
  member: {
    displayName: string;
    avatar?: string;
  };
  dataSource: DataSource;
  login: string;
  createdAt: string;
}

interface CredentialsProps {
  credentials: DataSourceCredentials[];
  editPermission?: boolean;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

const CredentialsTable: FC<CredentialsProps> = ({
  credentials,
  editPermission = false,
  onEdit = () => {},
  onRemove = () => {},
}) => {
  const { t } = useTranslation(["settings", "common"]);

  const columns: TableProps<DataSourceCredentials>["columns"] = [
    {
      title: (
        <span className={cn(styles.headerCeil)}>
          {t("common:words.team_member")}
        </span>
      ),
      dataIndex: "member",
      key: "member",
      render: (record) => (
        <Space size={10} className={cn(styles.ceil, styles.bold)}>
          <Avatar username={record.displayName} img={record.avatar} />
          <span>{record.displayName}</span>
        </Space>
      ),
    },
    {
      title: (
        <span className={cn(styles.headerCeil)}>
          {" "}
          {t("common:words.data_source")}
        </span>
      ),
      dataIndex: "dataSource",
      key: "dataSource",
      render: (record) => (
        <Space size={12} className={cn(styles.ceil, styles.bold)}>
          <span>{record.url}</span>
          <DataSourceTag dataSource={record} />
        </Space>
      ),
    },
    {
      title: (
        <span className={cn(styles.headerCeil)}>
          {" "}
          {t("common:words.login")}
        </span>
      ),
      dataIndex: "login",
      key: "login",
      render: (record) => <span className={styles.ceil}>{record}</span>,
    },
    {
      title: (
        <span className={styles.headerCeil}>
          {" "}
          {t("common:words.created_at")}
        </span>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record) => (
        <div className={styles.ceil}>
          <div className={styles.dateTime}>{record}</div>
        </div>
      ),
    },
    {
      title: (
        <span className={styles.actionsCell}>{t("common:words.actions")}</span>
      ),
      dataIndex: "actions",
      render: (_, record) => (
        <Space size={10} className={styles.actionsCell}>
          <Button
            className={styles.action}
            type="text"
            onClick={() => onEdit(record.id)}
          >
            <SettingOutlined key="setting" />
          </Button>
          {editPermission && (
            <Button
              className={styles.action}
              type="text"
              onClick={() => onRemove(record.id)}
            >
              <TrashIcon />
            </Button>
          )}
        </Space>
      ),
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Table
        rootClassName={styles.table}
        columns={columns}
        dataSource={credentials}
        rowClassName={() => styles.row}
        pagination={false}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default CredentialsTable;
