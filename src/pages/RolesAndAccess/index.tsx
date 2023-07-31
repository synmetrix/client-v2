import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import AccessTable from "@/components/AccessTable";
import type { Role } from "@/types/access";
import SettingsHeader from "@/components/SettingsHeader";

interface RolesAndAccessProps {
  access: Role[];
}

export default function RolesAndAccess({ access }: RolesAndAccessProps) {
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
      <SettingsHeader
        title={t("settings:roles_and_access.manage_roles")}
        action={t("settings:roles_and_access.create_role")}
      />
      <AccessTable access={access} onRemove={onRemove} onEdit={onEdit} />
    </BasicLayout>
  );
}
