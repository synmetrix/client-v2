import AccessTable from "@/components/AccessTable";
import type { Role } from "@/types/access";

interface RolesAndAccessProps {
  access: Role[];
}

export default function RolesAndAccess({ access }: RolesAndAccessProps) {
  const onRemove = (item: Role) => console.log(item);
  const onEdit = (item: Role) => console.log(item);

  return <AccessTable access={access} onRemove={onRemove} onEdit={onEdit} />;
}
