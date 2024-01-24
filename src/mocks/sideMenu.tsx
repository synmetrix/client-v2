import type { ReactNode } from "react";

export interface SidebarItem {
  key: string;
  label: string;
  icon: ReactNode;
  href: string;
  activeIcon?: ReactNode;
  items?: SidebarItem[];
}
