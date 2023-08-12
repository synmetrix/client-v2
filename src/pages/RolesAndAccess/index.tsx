import { Space } from "antd";
import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import AccessTable from "@/components/AccessTable";
import type { Role } from "@/types/access";
import PageHeader from "@/components/PageHeader";

import styles from "./index.module.less";

interface RolesAndAccessProps {
  access: Role[];
}

const RolesAndAccess: React.FC<RolesAndAccessProps> = ({ access }) => {
  const { t } = useTranslation(["settings", "pages"]);

  const onRemove = (item: Role) => console.log(item);
  const onEdit = (item: Role) => console.log(item);

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:settings.roles_and_access") }}
    >
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={t("settings:roles_and_access.manage_roles")}
          action={t("settings:roles_and_access.create_role")}
        />
        <AccessTable access={access} onRemove={onRemove} onEdit={onEdit} />
      </Space>
    </BasicLayout>
  );
};

export default RolesAndAccess;
