import type { Access_Types_Enum } from "@/graphql/generated";

export interface Credentials {
  id: string;
  accessType: Access_Types_Enum;
  username: string;
  updatedAt: string;
  createdAt: string;
  members: string[];
  dataSource: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    display_name: string;
  };
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
