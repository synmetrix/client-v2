import { Space, Table } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";

import TrashIcon from "@/assets/trash.svg";
import LockOpenIcon from "@/assets/lock-open.svg";
import LockClosedIcon from "@/assets/lock-close.svg";

import styles from "./index.module.less";

import type { ColumnsType } from "antd/es/table";
import type { FC } from "react";

interface DataSourceAccess {
  url: string;
  type: "partial" | "full";
}

interface Access {
  id: string;
  name: string;
  count: number;
  createdAt: string;
  updatedAt: string;
  dataSources: DataSourceAccess[];
}

interface AccessTableProps {
  access: Access[];
  onRemove: (access: Access) => void;
  onEdit: (access: Access) => void;
}

const AccessTable: FC<AccessTableProps> = ({ access, onRemove, onEdit }) => {
  const { t } = useTranslation(["settings", "common"]);

  const columns: ColumnsType<Access> = [
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
        <span className={styles.count}>{value} Data sources</span>
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
          <Button type="text" onClick={() => onEdit(record)}>
            <SettingOutlined key="setting" />
          </Button>
          <Button type="text" onClick={() => onRemove(record)}>
            <TrashIcon />
          </Button>
        </div>
      ),
    },
  ];

  const expandedRowRender = (record: Access) => {
    const expandedColumns: ColumnsType<DataSourceAccess> = [
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
        render: (value) => (
          <Space className={styles.type} size={10} align="center">
            {value === "partial" ? (
              <>
                <LockOpenIcon /> {t("common:words.partial_access")}
              </>
            ) : (
              <>
                <LockClosedIcon />
                {t("common:words.full_access")}
              </>
            )}
          </Space>
        ),
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
