import type { DataSource } from "./dataSource";

export type AccessType = "partial" | "full" | "no";
export type Section = "measures" | "dimensions" | "segments";

export interface DataSourceAccess {
  id: string;
  name: string;
  access?: AccessType;
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

export interface DataModel extends Required<DataAccessConfigOption> {
  title: string;
}

export type Option = {
  label: string;
  value: string;
};

export type DataAccessConfigOption = Partial<Record<Section, Option[]>>;
export type DataAccessFormOption = Partial<Record<Section, string[]>>;

export type Permission = Partial<Record<string, DataAccessFormOption>>;

export type DataAccessConfig = Record<
  string,
  Record<string, DataAccessConfigOption[]>
>;

export type DataAccessDataSources = {
  datasources?: DataAccessConfig;
};

export interface AccessList {
  id: string;
  name: string;
  count: number;
  createdAt: string;
  updatedAt: string;
  dataSources: { id: string; name: string; type: AccessType }[];
  config: DataAccessDataSources;
}

export interface RoleForm {
  name: string;
  resource?: DataSourceAccess;
  access: Permission;
}
