import { useTranslation } from "react-i18next";

import type {
  DataResource,
  DataSourceAccess,
  RoleForm as RoleFormType,
} from "@/types/access";
import RoleForm from "@/components/RoleForm";
import BasicLayout from "@/layouts/BasicLayout";

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
      headerProps={{ title: t("pages:settings.roles_and_access") }}
    >
      <RoleForm
        dataSourceAccess={accessItems}
        resources={resources}
        onSubmit={onSubmit}
      />
    </BasicLayout>
  );
}
