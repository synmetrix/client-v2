import type { DataSource } from "./dataSource";

export type AccessType = "partial" | "full" | "no";

export interface DataSourceAccess {
  id: string;
  url: string;
  access: AccessType;
  dataSource: DataSource;
}

export interface DataModelOption {
  title: string;
  access: AccessType;
}

export interface DataResource {
  id: string;
  title: string;
  dataModels: DataModel[];
}

export interface DataModel extends Required<DataAccessOption> {
  title: string;
}

export type DataAccessOption = Partial<
  Record<"measures" | "dimensions" | "segments", string[]>
>;

export interface Role {
  id: string;
  name: string;
  count: number;
  createdAt: string;
  updatedAt: string;
  dataSources: { url: string; type: AccessType }[];
}

export interface RoleForm {
  name: string;
  resource: DataSourceAccess;
  access: Record<string, DataAccessOption>;
}
