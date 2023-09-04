import type { DataSourceInfo } from "./dataSource";
import type { Team } from "./team";

export interface User {
  id: string;
  email: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  teams: Team[];
  dataSources: DataSourceInfo[];
}
