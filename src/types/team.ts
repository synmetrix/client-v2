export enum Roles {
  owner,
  admin,
  role,
}

export interface TeamRole {
  id: string;
  name: Roles;
}

export interface Member {
  email: string;
  role: TeamRole;
  id: string;
  displayName?: string;
}

export interface Team {
  id: string;
  name: string;
  members: Member[];
  createdAt: string;
}

export interface TeamSettingsForm {
  id?: string;
  name: string;
}
