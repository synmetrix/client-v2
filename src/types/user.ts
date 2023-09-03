import type { DataSourceInfo } from "./dataSource";
import type { Team } from "./team";

export interface User {
  id: string;
  displayName?: string;
  email: string;
  avatarUrl?: string;
  teams: Team[];
  dataSources: DataSourceInfo[];
}
