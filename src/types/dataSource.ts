import type { ReactNode } from "react";

export interface ApiSetupField {
  label: string;
  value: string;
  type?: string;
  disabled?: boolean;
}

export interface DataSource {
  name: string;
  icon: ReactNode;
  value?: string;
}

export interface DataSoureSetupField {
  name: string;
  label: string;
  type?: "text" | "checkbox" | "password" | "file";
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
