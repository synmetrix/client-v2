import { Table } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import AccessType from "@/components/AccessType";
import type { Role } from "@/types/access";

import TrashIcon from "@/assets/trash.svg";

import styles from "./index.module.less";

import type { ColumnsType } from "antd/es/table";
import type { FC } from "react";

interface AccessTableProps {
  access: Role[];
  onRemove: (access: Role) => void;
  onEdit: (access: Role) => void;
}

const AccessTable: FC<AccessTableProps> = ({ access, onRemove, onEdit }) => {
  const { t } = useTranslation(["settings", "common"]);

  const columns: ColumnsType<Role> = [
    {
      title: t("common:words.role"),
      dataIndex: "name",
      key: "name",
      render: (value) => <span className={styles.role}>{value}</span>,
    },
    {
      title: t("roles_and_access.access_table.count"),
      dataIndex: "count",
      key: "count",
      render: (value) => (
        <span className={styles.count}>
          {value} {t("common:words.data_sources")}
        </span>
      ),
    },
    {
      title: t("common:words.created_at"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => <span className={styles.dateCell}>{value}</span>,
    },
    {
      title: t("common:words.updated_at"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => <span className={styles.dateCell}>{value}</span>,
    },

    {
      title: (
        <span className={styles.actionsCell}>{t("common:words.actions")}</span>
      ),
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className={styles.actionsCell}>
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
        </div>
      ),
    },
  ];

  const expandedRowRender = (record: Role) => {
    const expandedColumns: ColumnsType<Role["dataSources"][number]> = [
      {
        title: "url",
        dataIndex: "url",
        key: "url",
        width: 225,
        render: (value) => <span className={styles.url}>{value}</span>,
      },
      {
        title: "type",
        dataIndex: "type",
        key: "type",
        render: (value) => <AccessType access={value} />,
      },
    ];

    return (
      <Table
        className={styles.subTable}
        columns={expandedColumns}
        dataSource={record.dataSources}
        rowKey={(rec) => rec.url}
        showHeader={false}
        pagination={false}
        size="small"
      />
    );
  };

  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={access}
      rowKey={(record) => record.id}
      expandable={{
        expandedRowRender,
      }}
      pagination={false}
    />
  );
};

export default AccessTable;
