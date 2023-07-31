import { useTranslation } from "react-i18next";

import type {
  DataResource,
  DataSourceAccess,
  RoleForm as RoleFormType,
} from "@/types/access";
import RoleForm from "@/components/RoleForm";
import BasicLayout from "@/layouts/BasicLayout";
import SettingsHeader from "@/components/SettingsHeader";

import styles from "./index.module.less";

interface RoleEditorProps {
  accessItems: DataSourceAccess[];
  resources: DataResource[];
}

const RoleEditor: React.FC<RoleEditorProps> = ({ accessItems, resources }) => {
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
      <div className={styles.wrapper}>
        <RoleForm
          dataSourceAccess={accessItems}
          resources={resources}
          onSubmit={onSubmit}
        />
      </div>
    </BasicLayout>
  );
};

export default RoleEditor;
