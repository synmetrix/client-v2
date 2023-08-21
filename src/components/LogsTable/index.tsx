import { Table } from "antd";
import cn from "classnames";

import StatusBadge from "@/components/StatusBadge";
import type { Status } from "@/types/status";
import type { AlertType } from "@/types/alert";

import styles from "./index.module.less";

import type { FC } from "react";
import type { TableProps } from "antd";

interface Log {
  id: string;
  date: string;
  status: Status;
  name: string;
  type: AlertType;
  message: string;
}

interface LogsTableProps {
  logs: Log[];
}

const LogsTable: FC<LogsTableProps> = ({ logs }) => {
  const columns: TableProps<Log>["columns"] = [
    {
      title: "Event time",
      dataIndex: "date",
      key: "date",
      render: (value) => (
        <span className={cn(styles.cell, styles.date)}>{value}</span>
      ),
    },
    {
      title: "Trigger name",
      dataIndex: "name",
      key: "name",
      render: (value) => (
        <span className={cn(styles.cell, styles.name)}>{value}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <StatusBadge className={cn(styles.cell, styles.status)} status={value}>
          {value}
        </StatusBadge>
      ),
    },
    {
      title: "Alert Type",
      dataIndex: "type",
      key: "type",
      render: (value) => <span className={styles.cell}>{value}</span>,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (value, record) => (
        <span
          className={cn(styles.cell, styles.message, styles[record.status])}
        >
          {value}
        </span>
      ),
    },
  ];
  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={logs}
      rowKey={(record) => record.id}
      expandable={{ expandedRowRender: (record) => <p>{record.message}</p> }}
      pagination={false}
    />
  );
};

export default LogsTable;
