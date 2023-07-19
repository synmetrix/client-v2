import { Space, Table } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import cn from "classnames";

import type { DataSource } from "@/types/dataSource";
import DataSourceTag from "@/components/DataSourceTag";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";

import styles from "./index.module.less";

import type { TableProps } from "antd";
import type { FC } from "react";

interface DataSourceCrdentials {
  id: string;
  member: {
    fullName: string;
    avatar?: string;
  };
  dataSource: DataSource;
  login: string;
  createdAt: string;
}

interface CredentialsProps {
  credentials: DataSourceCrdentials[];
}

const Credentials: FC<CredentialsProps> = ({ credentials }) => {
  const columns: TableProps<DataSourceCrdentials>["columns"] = [
    {
      title: <span className={cn(styles.headerCeil)}>Team Member</span>,
      dataIndex: "member",
      key: "member",
      render: (record) => (
        <Space size={10} className={cn(styles.ceil, styles.bold)}>
          <Avatar username={record.fullName} img={record.avatar} />
          <span>{record.fullName}</span>
        </Space>
      ),
    },
    {
      title: <span className={cn(styles.headerCeil)}>Data Source</span>,
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
      title: <span className={cn(styles.headerCeil)}>Login</span>,
      dataIndex: "login",
      key: "login",
      render: (record) => <span className={styles.ceil}>{record}</span>,
    },
    {
      title: (
        <span className={cn(styles.headerCeil, styles.date)}>Created At</span>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record) => (
        <div className={cn(styles.ceil, styles.dateCeil)}>
          <div className={styles.dateTime}>{record}</div>
          <Button type="text" size="small">
            <SettingOutlined key="setting" />
          </Button>
        </div>
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

export default Credentials;
