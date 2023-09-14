import { Table } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import { AccessTypeWrapper } from "@/components/AccessType";
import type { AccessList } from "@/types/access";
import formatTime from "@/utils/helpers/formatTime";

import TrashIcon from "@/assets/trash.svg";

import styles from "./index.module.less";

import type { ColumnsType } from "antd/es/table";
import type { FC } from "react";

interface AccessTableProps {
  accessLists: AccessList[];
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const AccessTable: FC<AccessTableProps> = ({
  accessLists,
  onRemove = () => {},
  onEdit = () => {},
}) => {
  const { t } = useTranslation(["settings", "common"]);

  const columns: ColumnsType<AccessList> = [
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
      render: (value) => (
        <span className={styles.dateCell}>{formatTime(value)}</span>
      ),
    },
    {
      title: t("common:words.updated_at"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => (
        <span className={styles.dateCell}>{formatTime(value)}</span>
      ),
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
            onClick={() => onEdit?.(record.id)}
          >
            <SettingOutlined key="setting" />
          </Button>
          <Button
            className={styles.action}
            type="text"
            onClick={() => onRemove?.(record.id)}
          >
            <TrashIcon />
          </Button>
        </div>
      ),
    },
  ];

  const expandedRowRender = (record: AccessList, i: number) => {
    const expandedColumns: ColumnsType<AccessList["dataSources"][number]> = [
      {
        title: "name",
        dataIndex: "name",
        key: "name",
        width: 225,
        render: (value) => <span className={styles.url}>{value}</span>,
      },
      {
        title: "type",
        dataIndex: "type",
        key: "type",
        render: (_, rec) => {
          const permissions =
            accessLists[i]?.config?.datasources?.[rec?.id]?.cubes;
          return (
            <AccessTypeWrapper
              dataSourceId={rec?.id}
              permissions={permissions}
            />
          );
        },
      },
    ];

    return (
      <Table
        className={styles.subTable}
        columns={expandedColumns}
        dataSource={record.dataSources}
        rowKey={(rec) => rec.name}
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
      dataSource={accessLists}
      rowKey={(record) => record.id}
      expandable={{
        expandedRowRender,
      }}
      pagination={false}
    />
  );
};

export default AccessTable;
