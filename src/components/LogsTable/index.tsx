import { Table } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import StatusBadge from "@/components/StatusBadge";
import type { Log } from "@/types/logs";

import styles from "./index.module.less";

import type { FC } from "react";
import type { TableProps } from "antd";

interface LogsTableProps {
  logs: Log[];
}

const LogsTable: FC<LogsTableProps> = ({ logs }) => {
  const { t } = useTranslation(["logs", "pages"]);

  const columns: TableProps<Log>["columns"] = [
    {
      title: t("event_time"),
      dataIndex: "date",
      key: "date",
      render: (value) => (
        <span className={cn(styles.cell, styles.date)}>{value}</span>
      ),
    },
    {
      title: t("trigger_name"),
      dataIndex: "name",
      key: "name",
      render: (value) => (
        <span className={cn(styles.cell, styles.name)}>{value}</span>
      ),
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <StatusBadge className={cn(styles.cell, styles.status)} status={value}>
          {value}
        </StatusBadge>
      ),
    },
    {
      title: t("alert_type"),
      dataIndex: "type",
      key: "type",
      render: (value) => <span className={styles.cell}>{value}</span>,
    },
    {
      title: t("message"),
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
