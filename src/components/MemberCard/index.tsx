import { Card, Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import { SettingOutlined } from "@ant-design/icons";

import Avatar from "@/components/Avatar";
import formatTime from "@/utils/helpers/formatTime";
import ConfirmModal from "@/components/ConfirmModal";
import { Roles } from "@/types/team";
import type { Member } from "@/types/team";
import { capitalize } from "@/utils/helpers/capitalize";

import styles from "./index.module.less";

import type { FC } from "react";

interface MemberCardProps {
  member: Member;
  onDelete: (member: Member) => void;
  onEdit: (member: Member) => void;
  currentRole?: Roles;
}

const MemberCard: FC<MemberCardProps> = ({
  member,
  onDelete,
  currentRole,
  onEdit,
}) => {
  const { displayName, email, avatarUrl, createdAt, updatedAt, role } = member;
  const hasPermission =
    currentRole === Roles.owner ||
    (currentRole === Roles.admin && member.role.name === Roles.member) ||
    member.role.name !== ("member" as unknown as Roles);
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
        hasPermission && (
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "edit",
                  label: t("common:words.edit"),
                  onClick: () => onEdit(member),
                },
                {
                  key: "delete",
                  label: (
                    <ConfirmModal
                      title={t("common:words.delete_member")}
                      onConfirm={() => onDelete(member)}
                    >
                      {t("common:words.delete")}
                    </ConfirmModal>
                  ),
                },
              ],
            }}
          >
            <SettingOutlined key="setting" />
          </Dropdown>
        )
      }
    >
      <ul>
        <li className={styles.item}>
          <span className={styles.label}>{t("common:words.email")}</span>
          <span>{email}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.label}>{t("common:words.role")}</span>
          <span>{capitalize(role.name)}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.label}>{t("common:words.access_list")}</span>
          {capitalize(role.name)}
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
