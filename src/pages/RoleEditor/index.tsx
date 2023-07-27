import { Row, Col } from "antd";

import type { DataResource, DataSourceAccess } from "@/types/access";
import RoleForm from "@/components/RoleForm";

interface RoleEditorProps {
  accessItems: DataSourceAccess[];
  resources: DataResource[];
}

export default function RoleEditor({
  accessItems,
  resources,
}: RoleEditorProps) {
  return <RoleForm dataSourceAccess={accessItems} resources={resources} />;
}
