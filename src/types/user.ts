import type { DataSourceInfo } from "./dataSource";

export interface User {
  id: string;
  displayName?: string | null;
  email?: string;
  avatarUrl?: string | null;
  teams?: Team[];
  dataSources?: DataSourceInfo[];
}

export interface Team {
  id: string;
  name: string;
}
