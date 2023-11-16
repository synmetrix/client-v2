import { Card, Select, Space } from "antd";
import { useTranslation } from "react-i18next";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import formatTime from "@/utils/helpers/formatTime";
import {
  Roles,
  type AccessList,
  type Member,
  ChangeableRoles,
} from "@/types/team";
import { createRoleOptions } from "@/utils/helpers/createRoleOptions";
import { capitalize } from "@/utils/helpers/capitalize";

import TrashIcon from "@/assets/trash.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface MemberCardProps {
  member: Member;
  accessLists: AccessList[];
  onAccessListChange: (id: string, accessListId: string | null) => void;
  onDelete: (member: Member) => void;
  onRoleChange: (id: string, newRole: ChangeableRoles) => void;
  currentRole?: Roles;
}

const MemberCard: FC<MemberCardProps> = ({
  member,
  accessLists,
  onAccessListChange,
  onDelete,
  currentRole,
  onRoleChange,
}) => {
  const {
    displayName,
    email,
    avatarUrl,
    createdAt,
    updatedAt,
    role,

    accessList,
  } = member;
  const hasPermission =
    role.name !== Roles.owner ||
    (currentRole === Roles.admin && role.name !== Roles.owner);

  const { t } = useTranslation(["settings", "common"]);

  return (
    <Card
      style={{ width: 260, position: "static" }}
      bodyStyle={{ padding: 16 }}
      headStyle={{ padding: 16 }}
      title={
        <Space size={10} className={styles.cell}>
          <Avatar username={displayName} img={avatarUrl} />
          <span>{displayName}</span>
        </Space>
      }
      extra={
        <Button
          onClick={() => onDelete(member)}
          icon={<TrashIcon />}
          type="text"
        />
      }
    >
      <ul>
        <li className={styles.item}>
          <span className={styles.label}>{t("common:words.email")}</span>
          <span>{email}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.label}>{t("common:words.role")}</span>
          <span>
            {
              <Select
                className={styles.select}
                onChange={(value) =>
                  onRoleChange(role.id, value as unknown as ChangeableRoles)
                }
                bordered={false}
                value={role}
                options={createRoleOptions(ChangeableRoles)}
              />
            }
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.label}>{t("common:words.access_list")}</span>
          {!hasPermission ? (
            <Select
              className={styles.select}
              onChange={(accessListId) => {
                onAccessListChange(role.id, accessListId);
              }}
              bordered={false}
              disabled={!accessLists?.length}
              value={
                accessList?.id ||
                `* ${t("common:words.full_access").toUpperCase()} *`
              }
              options={[
                {
                  value: null,
                  label: t("common:words.full_access").toUpperCase(),
                },
                ...(accessLists || []).map((al) => ({
                  value: al.id,
                  label: capitalize(al.name),
                })),
              ]}
            />
          ) : (
            role.name
          )}
        </li>
        {createdAt && (
          <li className={styles.item}>
            <span className={styles.label}>{t("common:words.createdAt")}</span>
            <span>{formatTime(createdAt)}</span>
          </li>
        )}
        {updatedAt && (
          <li className={styles.item}>
            <span className={styles.label}>{t("common:words.updatedAt")}</span>
            <span>{formatTime(updatedAt)}</span>
          </li>
        )}
      </ul>
    </Card>
  );
};

export default MemberCard;
