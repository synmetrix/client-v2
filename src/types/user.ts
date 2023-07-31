export interface User {
  fullName: string;
  avatar?: string;
  teams?: Team[];
}

export interface Team {
  label: string;
  href: string;
}
