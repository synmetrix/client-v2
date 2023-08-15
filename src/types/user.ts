export interface User {
  id: string;
  displayName?: string;
  email?: string;
  avatarUrl?: string;
  teams?: Team[];
}

export interface Team {
  label: string;
  href: string;
}
