import type { User } from "./user";

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

export interface Team {
  id: string;
  name: string;
  members: User[];
  createdAt: string;
}

export interface TeamSettingsForm {
  name: string;
}
