import type { DataSourceCredentials } from "@/components/CredentialsTable";

import type { DataSourceInfo } from "./dataSource";
import type { Team, Member } from "./team";
import type { Alert } from "./alert";
import type { Report } from "./report";
import type { CredentialsInfo } from "./credential";

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

export interface TeamData {
  dataSources: DataSourceInfo[];
  alerts: Alert[];
  reports: Report[];
  members: Member[];
  sqlCredentials: DataSourceCredentials[];
  credentials: CredentialsInfo[];
}
