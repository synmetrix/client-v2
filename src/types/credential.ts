import type { Access_Types_Enum } from "@/graphql/generated";

import type { DataSourceInfo } from "./dataSource";
export interface CredentialsInfo {
  id: string;
  accessType: Access_Types_Enum;
  username: string;
  updatedAt: string;
  createdAt: string;
  members: string[];
  user: {
    id: string;
    displayName: string;
  };
  dataSource: DataSourceInfo;
}

export interface CredentialsFormType {
  id?: string;
  name: string;
  accessType: Access_Types_Enum;
  members: string[];
  username: string;
  password: string;
  dataSourceId: string;
}
