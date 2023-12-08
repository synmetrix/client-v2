import { Space, Table } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import Avatar from "@/components/Avatar";
import formatTime from "@/utils/helpers/formatTime";
import type { Request_Logs } from "@/graphql/generated";

import styles from "./index.module.less";

import type { TableProps } from "antd";
import type { FC } from "react";

interface QueryLogsTableProps {
  logs: Request_Logs[];
  pagination?: TableProps<Request_Logs>["pagination"];
  onChange?: TableProps<Request_Logs>["onChange"];
  onClickRow?: (rowId: string) => void;
}

const QueryLogsTable: FC<QueryLogsTableProps> = ({
  logs,
  onChange,
  onClickRow,
  pagination = false,
}) => {
  const { t } = useTranslation(["logs"]);
  const columns: TableProps<Request_Logs>["columns"] = [
    {
      title: t("query.table.data_source"),
      dataIndex: "datasource",
      key: "datasource",
      render: (value) => (
        <span className={cn(styles.cell, styles.dataSource)}>{value.name}</span>
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
      dataIndex: "request_event_logs",
      key: "request_event_logs",
      render: (value) => (
        <span className={cn(styles.cell, styles.events)}>{value?.length}</span>
      ),
    },
    {
      title: t("query.table.creator"),
      dataIndex: "user",
      key: "user",
      render: (value) => {
        if (value?.display_name) {
          return (
            <span className={cn(styles.cell, styles.creator)}>
              <Space size={10}>
                <Avatar img={value?.avatarUrl} username={value?.display_name} />
                <span>{value?.display_name}</span>
              </Space>
            </span>
          );
        }
      },
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
      title: (
        <div className={styles.headerRight}>{t("query.table.start_time")}</div>
      ),
      dataIndex: "start_time",
      key: "start_time",
      render: (value) => (
        <span className={cn(styles.cell, styles.startTime)}>
          {formatTime(value)}
        </span>
      ),
    },
    {
      title: (
        <div className={styles.headerRight}>{t("query.table.created_at")}</div>
      ),
      dataIndex: "created_at",
      key: "created_at",
      render: (value) => (
        <span className={cn(styles.cell, styles.createdAt)}>
          {formatTime(value)}
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
      onRow={(r) => ({
        onClick: () => onClickRow?.(r.id),
        style: { cursor: "pointer" },
      })}
      pagination={pagination}
      onChange={onChange}
    />
  );
};

export default QueryLogsTable;
