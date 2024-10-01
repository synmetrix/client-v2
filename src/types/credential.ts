export interface Credentials {
  id: string;
  username: string;
  password: string;
  updatedAt: string;
  createdAt: string;
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
  username: string;
  password: string;
  dataSourceId: string;
}
