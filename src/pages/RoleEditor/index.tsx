import { useTranslation } from "react-i18next";

import type {
  DataResource,
  DataSourceAccess,
  RoleForm as RoleFormType,
} from "@/types/access";
import RoleForm from "@/components/RoleForm";
import BasicLayout from "@/layouts/BasicLayout";
import SettingsHeader from "@/components/SettingsHeader";

interface RoleEditorProps {
  accessItems: DataSourceAccess[];
  resources: DataResource[];
}

export default function RoleEditor({
  accessItems,
  resources,
}: RoleEditorProps) {
  const { t } = useTranslation(["pages"]);

  const onSubmit = (data: RoleFormType) => console.log(data);

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:settings.roles_and_access") }}
    >
      <SettingsHeader title={t("settings:roles_and_access.create_role")} />
      <RoleForm
        dataSourceAccess={accessItems}
        resources={resources}
        onSubmit={onSubmit}
      />
    </BasicLayout>
  );
}
