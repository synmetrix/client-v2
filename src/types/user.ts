import type { DataSourceInfo } from "./dataSource";
import type { Team } from "./team";
import type { Alert } from "./alert";
import type { Report } from "./report";

export interface User {
  id: string;
  email: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  teams: Team[];
}

export interface RawUser {
  id: string;
  email: string;
  avatar_url: string;
  display_name?: string | null;
  account: {
    email: string;
  };
}

export interface UserData {
  dataSources: DataSourceInfo[];
  alerts: Alert[];
  reports: Report[];
}
