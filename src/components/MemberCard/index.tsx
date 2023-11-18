import { Card, Select, Space } from "antd";
import { useTranslation } from "react-i18next";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import formatTime from "@/utils/helpers/formatTime";
import ConfirmModal from "@/components/ConfirmModal";
import type { AccessList, Member } from "@/types/team";
import { Roles, ChangeableRoles } from "@/types/team";
import { capitalize } from "@/utils/helpers/capitalize";
import { createRoleOptions } from "@/utils/helpers/createRoleOptions";

import TrashIcon from "@/assets/trash.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface MemberCardProps {
  member: Member;
  accessLists: AccessList[];
  onDelete: (member: Member) => void;
  onRoleChange: (id: string, newRole: ChangeableRoles) => void;
  onAccessListChange: (id: string, accessListId: string | null) => void;
  currentRole?: Roles;
}

const MemberCard: FC<MemberCardProps> = ({
  member,
  onDelete,
  currentRole,
  onRoleChange,
  onAccessListChange,
  accessLists,
}) => {
  const { displayName, email, avatarUrl, createdAt, updatedAt, role } = member;
  const hasRoleChangePermission =
    member?.role.name !== Roles.owner &&
    (currentRole === Roles.owner ||
      (currentRole === Roles.admin && member?.role.name === Roles.member));
  const hasAccessChangePermission =
    member?.role.name !== Roles.owner &&
    member?.role.name !== ("member" as unknown as Roles);

  const hasDeletePermission = hasRoleChangePermission;
  const { t } = useTranslation(["settings", "common"]);

  return (
    <Card
      style={{ position: "static" }}
      bodyStyle={{ padding: 16 }}
      headStyle={{ padding: 16 }}
      title={
        <Space size={10} className={styles.cell}>
          <Avatar username={displayName} img={avatarUrl} />
          <span>{displayName}</span>
        </Space>
      }
      extra={
        hasDeletePermission && (
          <ConfirmModal
            title={t("common:words.delete_member")}
            onConfirm={() => onDelete(member)}
          >
            <Button className={styles.btn} type="ghost" icon={<TrashIcon />} />
          </ConfirmModal>
        )
      }
    >
      <ul className={styles.info}>
        <li className={styles.item}>
          <span className={styles.label}>{t("common:words.email")}</span>
          <span className={styles.value}>{email}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.label}>{t("common:words.role")}</span>
          <span className={styles.value}>
            {hasRoleChangePermission ? (
              <Select
                onChange={(value) =>
                  onRoleChange(
                    member.role.id,
                    value as unknown as ChangeableRoles
                  )
                }
                disabled={!hasRoleChangePermission}
                bordered={false}
                value={member.role.name}
                options={createRoleOptions(ChangeableRoles)}
              />
            ) : (
              capitalize(role.name)
            )}
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.label}>{t("common:words.access_list")}</span>
          <span className={styles.value}>
            {hasAccessChangePermission ? (
              <Select
                onChange={(accessListId) => {
                  onAccessListChange(member.role.id, accessListId);
                }}
                bordered={false}
                disabled={!accessLists?.length}
                value={
                  member.accessList?.id ||
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
            ) : (
              capitalize(role.name)
            )}
          </span>
        </li>
        {createdAt && (
          <li className={styles.item}>
            <span className={styles.label}>{t("common:words.createdAt")}</span>
            <span className={styles.value}>{formatTime(createdAt)}</span>
          </li>
        )}
        {updatedAt && (
          <li className={styles.item}>
            <span className={styles.label}>{t("common:words.updatedAt")}</span>
            <span className={styles.value}>{formatTime(updatedAt)}</span>
          </li>
        )}
      </ul>
    </Card>
  );
};

export default MemberCard;
