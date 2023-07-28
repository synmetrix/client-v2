import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import AccessTable from "@/components/AccessTable";
import type { Role } from "@/types/access";

interface RolesAndAccessProps {
  access: Role[];
}

export default function RolesAndAccess({ access }: RolesAndAccessProps) {
  const { t } = useTranslation(["pages"]);

  const onRemove = (item: Role) => console.log(item);
  const onEdit = (item: Role) => console.log(item);

  return (
    <BasicLayout loggedIn divider title={t("pages:settings.roles_and_access")}>
      <AccessTable access={access} onRemove={onRemove} onEdit={onEdit} />
    </BasicLayout>
  );
}
