import type { DataSource } from "./dataSource";

export type AccessType = "partial" | "full" | "no";

export interface DataSourceAccess {
  id: string;
  url: string;
  access: AccessType;
  dataSource: DataSource;
}
