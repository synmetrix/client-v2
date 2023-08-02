export enum Roles {
  owner,
  role,
}

export interface Member {
  email: string;
  role: string;
  id?: string;
  fullName?: string;
}
