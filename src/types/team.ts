export enum ChangableRoles {
  admin = "admin",
  member = "member",
}

export enum Roles {
  owner = "owner",
  admin = "admin",
  member = "member",
}

export interface TeamRole {
  id: string;
  name: Roles | ChangableRoles;
}

export interface AccessList {
  id: string;
  name: string;
  config: object;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  email: string;
  role: TeamRole;
  id: string;
  accessList?: AccessList;
  displayName?: string;
}

export interface Team {
  id: string;
  name: string;
  role: Roles;
  members: Member[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamSettingsForm {
  id?: string;
  name: string;
}
