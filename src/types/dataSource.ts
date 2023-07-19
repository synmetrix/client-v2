import type { ReactNode } from "react";

export interface ApiSetupField {
  label: string;
  name: string;
  value: string;
  type?: string;
  disabled?: boolean;
}

export interface DataSource {
  name: string;
  icon: ReactNode;
  value?: string;
  url?: string;
}

export interface DataSoureSetupField {
  name: string;
  label: string;
  type?: "text" | "checkbox" | "password" | "file" | "number";
  rules?: object;
  value?: string;
  placeholder?: string;
}

export interface Column {
  attributes: [];
  name: string;
  type: string;
}

export type Table = Record<string, Column[]>;

export type Schema = Record<string, Table>;

export type DynamicForm = Record<string, any>;

export interface ApiSetupForm {
  name: string;
  db_username: string;
  db: string;
  host: string;
  user: string;
  username: string;
  password: string;
  port: string;
  connection?: string;
  connection_string?: string;
}

export interface DataSourceSetupForm {
  name: string;
  db_params?: DynamicForm;
}

export interface DataSourceForm {
  dataSource?: DataSource;
  dataSourceSetup?: DataSourceSetupForm;
  dataModel?: DynamicForm;
  apiSetup?: ApiSetupForm;
}
