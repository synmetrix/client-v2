import { Select, Space, Table } from "antd";
import cn from "classnames";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { Role } from "@/types/team";
import { createRoleOptions } from "@/utils/helpers/createRoleOptions";

import TrashIcon from "@/assets/trash.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface Member {
  fullName: string;
  email: string;
  role: string;
}

const columns = [
  {
    title: <span className={cn(styles.cell, styles.header)}>Member</span>,
    dataIndex: "member",
    key: "member",
  },
  {
    title: <span className={cn(styles.cell, styles.header)}>Email</span>,
    dataIndex: "email",
    key: "email",
  },
  {
    title: <span className={cn(styles.cell, styles.header)}>Role</span>,
    dataIndex: "role",
    key: "role",
  },
  {
    title: (
      <div className={cn(styles.cell, styles.header, styles.remove)}>
        Remove
      </div>
    ),
    dataIndex: "remove",
    key: "remove",
  },
];

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
  const renderMembers = (membersList: Member[]) =>
    membersList.map((m, i) => ({
      member: (
        <Space size={10} className={styles.cell}>
          <Avatar username={m.fullName} />
          <span className={styles.memberName}>{m.fullName}</span>
        </Space>
      ),
      email: <span className={styles.cell}>{m.email}</span>,
      role: (
        <span className={styles.cell}>
          <Select
            className={styles.select}
            onChange={(role) => onRoleChange({ ...m, role })}
            bordered={false}
            value={m.role}
            options={createRoleOptions(Role)}
          />
        </span>
      ),
      remove: (
        <div className={cn(styles.cell, styles.remove)}>
          <Button onClick={() => onRemove(m)} type="link">
            <TrashIcon />
          </Button>
        </div>
      ),
      key: i,
    }));

  return (
    <Table
      dataSource={renderMembers(members)}
      pagination={false}
      columns={columns}
    />
  );
};

export default MembersTable;
