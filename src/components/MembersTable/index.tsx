import { Select, Space, Table } from "antd";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { Role } from "@/types/team";
import { createRoleOptions } from "@/utils/helpers/createRoleOptions";

import TrashIcon from "@/assets/trash.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { TableProps } from "antd";

interface Member {
  fullName: string;
  email: string;
  role: string;
}

interface MembersTableProps {
  members: Member[];
  onRoleChange: (member: Member) => void;
  onRemove: (member: Member) => void;
}

const MembersTable: FC<MembersTableProps> = ({
  members,
  onRoleChange,
  onRemove,
}) => {
  const { t } = useTranslation(["settings", "common"]);

  const columns: TableProps<Member>["columns"] = [
    {
      title: (
        <span className={cn(styles.cell, styles.header)}>
          {t("common:words.member")}
        </span>
      ),
      dataIndex: "member",
      key: "member",
      render: (_, value) => ({
        children: (
          <Space size={10} className={styles.cell}>
            <Avatar username={value.fullName} />
            <span className={styles.memberName}>{value.fullName}</span>
          </Space>
        ),
      }),
    },
    {
      title: (
        <span className={cn(styles.cell, styles.header)}>
          {" "}
          {t("common:words.email")}
        </span>
      ),
      dataIndex: "email",
      key: "email",
      render: (_, value) => ({
        children: <span className={styles.cell}>{value.email}</span>,
      }),
    },
    {
      title: (
        <span className={cn(styles.cell, styles.header)}>
          {" "}
          {t("common:words.role")}
        </span>
      ),
      dataIndex: "role",
      key: "role",
      render: (_, value) => ({
        children: (
          <span className={styles.cell}>
            <Select
              className={styles.select}
              onChange={(role) => onRoleChange({ ...value, role })}
              bordered={false}
              value={value.role}
              options={createRoleOptions(Role)}
            />
          </span>
        ),
      }),
    },
    {
      title: (
        <div className={cn(styles.cell, styles.header, styles.remove)}>
          {t("common:words.remove")}
        </div>
      ),
      dataIndex: "remove",
      key: "remove",
      render: (_, value) => ({
        children: (
          <div className={cn(styles.cell, styles.remove)}>
            <Button onClick={() => onRemove(value)} type="link">
              <TrashIcon />
            </Button>
          </div>
        ),
      }),
    },
  ];
  return (
    <Table
      dataSource={members}
      rowKey={(record) => record.fullName + record.email}
      pagination={false}
      columns={columns}
    />
  );
};

export default MembersTable;
