import { Space } from "antd";
import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import SettingsHeader from "@/components/SettingsHeader";
import MembersTable from "@/components/MembersTable";
import type { Member } from "@/types/team";

import styles from "./index.module.less";

interface MembersProps {
  members: Member[];
}

const Members: React.FC<MembersProps> = ({ members }) => {
  const { t } = useTranslation(["settings", "pages"]);

  const onRemove = (member: Member) => console.log("remove", member);
  const onRoleChange = (member: Member) => console.log("role change", member);

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:settings.members") }}
    >
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <SettingsHeader
          title={t("settings:members.title")}
          action={t("settings:members.action")}
        />
        <MembersTable
          members={members}
          onRemove={onRemove}
          onRoleChange={onRoleChange}
        />
      </Space>
    </BasicLayout>
  );
};

export default Members;
