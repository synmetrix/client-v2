import { Space, Table } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import Avatar from "@/components/Avatar";
import type { QueryLog } from "@/types/logs";

import styles from "./index.module.less";

import type { TableProps } from "antd";
import type { FC } from "react";

interface QueryLogsTableProps {
  logs: QueryLog[];
}

const QueryLogsTable: FC<QueryLogsTableProps> = ({ logs }) => {
  const { t } = useTranslation(["logs"]);
  const columns: TableProps<QueryLog>["columns"] = [
    {
      title: t("query.table.data_source"),
      dataIndex: "dataSource",
      key: "dataSource",
      render: (value) => (
        <span className={cn(styles.cell, styles.dataSource)}>{value}</span>
      ),
    },
    {
      title: t("query.table.path"),
      dataIndex: "path",
      key: "path",
      render: (value) => (
        <span className={cn(styles.cell, styles.path)}>{value}</span>
      ),
    },
    {
      title: t("query.table.events"),
      dataIndex: "events",
      key: "events",
      render: (value) => (
        <span className={cn(styles.cell, styles.events)}>{value}</span>
      ),
    },
    {
      title: t("query.table.creator"),
      dataIndex: "creator",
      key: "creator",
      render: (value) => (
        <span className={cn(styles.cell, styles.creator)}>
          <Space size={10}>
            <Avatar img={value.avatarUrl} username={value.displayName} />
            <span>{value.email}</span>
          </Space>
        </span>
      ),
    },
    {
      title: t("query.table.duration"),
      dataIndex: "duration",
      key: "duration",
      render: (value) => (
        <span className={cn(styles.cell, styles.duration)}>
          {value} {t("query.table.ms")}
        </span>
      ),
    },
    {
      title: t("query.table.startTime"),
      dataIndex: "startTime",
      key: "startTime",
      render: (value) => (
        <span className={cn(styles.cell, styles.startTime)}>{value}</span>
      ),
    },
    {
      title: t("query.table.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => (
        <span className={cn(styles.cell, styles.createdAt)}>{value}</span>
      ),
    },
  ];
  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={logs}
      rowKey={(record) => record.id}
      pagination={false}
    />
  );
};

export default QueryLogsTable;
