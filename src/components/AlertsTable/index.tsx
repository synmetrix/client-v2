import { Space, Table, Tag } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { capitalize } from "@/utils/helpers/capitalize";
import type { Alert } from "@/types/alert";

import TrashIcon from "@/assets/trash.svg";
import EllipseIcon from "@/assets/ellipse.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { TableProps } from "antd";

interface AlertTableProps {
  alerts: Alert[];
  onEdit: (alert: Alert) => void;
  onRemove: (alert: Alert) => void;
}

const AlertsTable: FC<AlertTableProps> = ({ alerts, onEdit, onRemove }) => {
  const { t } = useTranslation(["alerts", "common"]);
  const columns: TableProps<Alert>["columns"] = [
    {
      title: t("common:words.name"),
      dataIndex: "name",
      key: "name",
      render: (value) => (
        <span className={cn(styles.cell, styles.nameCell)}>{value}</span>
      ),
    },
    {
      title: t("common:words.delivery_type"),
      dataIndex: "type",
      key: "type",
      render: (value) => (
        <span className={styles.cell}>{capitalize(value)}</span>
      ),
    },
    {
      title: t("common:words.schedule"),
      dataIndex: "schedule",
      key: "schedule",
      render: (value) => (
        <span className={styles.cell}>
          {new Array(value.length).fill("*").join("")}
        </span>
      ),
    },
    {
      title: t("common:words.creator"),
      dataIndex: "creator",
      key: "creator",
      render: (value) => (
        <Space size={10} className={styles.cell}>
          <Avatar username={value.displayName} img={value.avatar} />
          <span>{value.email}</span>
        </Space>
      ),
    },
    {
      title: t("common:words.updated_at"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => <span className={styles.cell}>{value}</span>,
    },
    {
      title: t("common:words.created_at"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => <span className={styles.cell}>{value}</span>,
    },
    {
      title: t("common:words.last_activity"),
      dataIndex: "lastActivity",
      key: "lastActivity",
      render: (value, record) => (
        <Tag
          className={cn(styles.badge, styles[record.status])}
          icon={<EllipseIcon />}
          color={record.status}
        >
          <span className={styles.badgeText}>{value}</span>
        </Tag>
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
            onClick={() => onEdit(record)}
          >
            <SettingOutlined key="setting" />
          </Button>
          <Button
            className={styles.action}
            type="text"
            onClick={() => onRemove(record)}
          >
            <TrashIcon />
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      className={styles.table}
      dataSource={alerts}
      rowKey={(record) => record.id}
      pagination={false}
      columns={columns}
    />
  );
};

export default AlertsTable;
