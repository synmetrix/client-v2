export interface User {
  fullName: string;
  teams?: Team[];
}

export interface Team {
  label: string;
  href: string;
}
