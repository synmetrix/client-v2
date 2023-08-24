import { Table } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import type { Event } from "@/types/event";

import styles from "./index.module.less";

import type { TableProps } from "antd";
import type { FC } from "react";

interface EventsTableProps {
  events: Event[];
}

const EventsTable: FC<EventsTableProps> = ({ events }) => {
  const { t } = useTranslation(["logs"]);

  const columns: TableProps<Event>["columns"] = [
    {
      title: t("query.table.events"),
      dataIndex: "name",
      key: "name",
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
      dataIndex: "timeInQueue",
      key: "timeInQueue",
      render: (value) => <span className={styles.cell}>{value}</span>,
    },
    {
      title: (
        <div className={styles.timestamp}>{t("query.table.timestamp")}</div>
      ),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (value) => (
        <div className={cn(styles.cell, styles.timestamp)}>{value}</div>
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
