import { Table } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import formatTime from "@/utils/helpers/formatTime";
import type { Request_Event_Logs } from "@/graphql/generated";

import styles from "./index.module.less";

import type { TableProps } from "antd";
import type { FC } from "react";

interface EventsTableProps {
  events: Request_Event_Logs[];
}

const EventsTable: FC<EventsTableProps> = ({ events }) => {
  const { t } = useTranslation(["logs"]);

  const columns: TableProps<Request_Event_Logs>["columns"] = [
    {
      title: t("query.table.event"),
      dataIndex: "event",
      key: "event",
      render: (value) => <span className={styles.cell}>{value}</span>,
    },
    {
      title: t("query.table.duration"),
      dataIndex: "duration",
      key: "duration",
      render: (value) => <span className={styles.cell}>{value}</span>,
    },
    {
      title: t("query.table.time_in_queue"),
      dataIndex: "time_in_queue",
      key: "time_in_queue",
      render: (value) => <span className={styles.cell}>{value || 0}</span>,
    },
    {
      title: (
        <div className={styles.timestamp}>{t("query.table.timestamp")}</div>
      ),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (value) => (
        <div className={cn(styles.cell, styles.timestamp)}>
          {formatTime(value)}
        </div>
      ),
    },
  ];
  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={events}
      rowKey={(record) => record.id}
      pagination={false}
    />
  );
};

export default EventsTable;
