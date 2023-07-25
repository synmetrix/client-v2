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
  title: string;
  dataModels: DataModel[];
}

export interface DataModel extends Required<DataAccessOption> {
  title: string;
}

export type DataAccessOption = Partial<
  Record<"measures" | "dimensions" | "segments", string[]>
>;
