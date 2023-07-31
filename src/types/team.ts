export enum Roles {
  owner,
  role,
}

export interface Member {
  id: string;
  fullName: string;
  email: string;
  role: string;
}
