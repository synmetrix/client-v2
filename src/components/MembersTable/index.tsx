import { Select, Space, Table } from "antd";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import type { AccessList, Member } from "@/types/team";
import { Roles, ChangeableRoles } from "@/types/team";
import { createRoleOptions } from "@/utils/helpers/createRoleOptions";

import TrashIcon from "@/assets/trash.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { TableProps } from "antd";

interface MembersTableProps {
  members: Member[];
  accessLists: AccessList[];
  currentRole?: Roles;
  onRoleChange: (id: string, newRole: ChangeableRoles) => void;
  onAccessListChange: (id: string, accessListId: string | null) => void;
  onRemove: (member: Member) => void;
}

const MembersTable: FC<MembersTableProps> = ({
  members,
  accessLists,
  currentRole,
  onRoleChange,
  onAccessListChange,
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
      render: (_, record) => ({
        children: (
          <Space size={10} className={styles.cell}>
            <Avatar username={record.displayName} />
            <span className={styles.memberName}>{record.displayName}</span>
          </Space>
        ),
      }),
    },
    {
      title: (
        <span className={cn(styles.cell, styles.header)}>
          {t("common:words.email")}
        </span>
      ),
      dataIndex: "email",
      key: "email",
      render: (_, record) => ({
        children: <span className={styles.cell}>{record.email}</span>,
      }),
    },
    {
      title: (
        <span className={cn(styles.cell, styles.header)}>
          {t("common:words.role")}
        </span>
      ),
      dataIndex: "role",
      key: "role",
      render: (_, record) => {
        const role = record.role.name;
        const hasPermission =
          role !== Roles.owner ||
          (currentRole === Roles.admin && role !== Roles.owner);

        if (!hasPermission) return role;
        return {
          children: (
            <span className={styles.cell}>
              <Select
                className={styles.select}
                onChange={(value) =>
                  onRoleChange(
                    record.role.id,
                    value as unknown as ChangeableRoles
                  )
                }
                variant="borderless"
                value={role}
                options={createRoleOptions(ChangeableRoles)}
              />
            </span>
          ),
        };
      },
    },
    {
      title: (
        <span className={cn(styles.cell, styles.header)}>
          {t("common:words.access_list")}
        </span>
      ),
      dataIndex: "accessList",
      key: "accessList",
      render: (_, record) => {
        const curAccessList = record.accessList;
        const role = record?.role?.name;

        if (role === ("member" as unknown as Roles)) {
          return {
            children: (
              <span className={styles.cell}>
                <Select
                  className={styles.select}
                  onChange={(accessListId) => {
                    onAccessListChange(record.role.id, accessListId);
                  }}
                  variant="borderless"
                  disabled={!accessLists?.length}
                  value={
                    curAccessList?.id ||
                    `* ${t("common:words.full_access").toUpperCase()} *`
                  }
                  options={[
                    {
                      value: null,
                      label: t("common:words.full_access").toUpperCase(),
                    },
                    ...(accessLists || []).map((al) => ({
                      value: al.id,
                      label: al.name,
                    })),
                  ]}
                />
              </span>
            ),
          };
        }
      },
    },
    {
      title: (
        <div className={cn(styles.cell, styles.header, styles.remove)}>
          {t("common:words.remove")}
        </div>
      ),
      dataIndex: "remove",
      key: "remove",
      render: (_, record) => ({
        children: (
          <div className={cn(styles.cell, styles.remove)}>
            <Button onClick={() => onRemove(record)} type="text">
              <TrashIcon />
            </Button>
          </div>
        ),
      }),
    },
  ];
  return (
    <Table
      rootClassName={styles.table}
      dataSource={members}
      rowKey={(record) => record.id || record.email}
      pagination={false}
      columns={columns}
    />
  );
};

export default MembersTable;
