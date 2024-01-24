import AlertsIcon from "@/assets/alert-logs.svg";
import ReportsIcon from "@/assets/report-logs.svg";
import QueryIcon from "@/assets/query-logs.svg";

import type { ReactNode } from "react";

export interface SidebarMenuItem {
  key: string;
  label: string;
  icon: ReactNode;
  href: string;
  activeIcon?: ReactNode;
}

export const logsMenuItems: SidebarMenuItem[] = [
  {
    key: "alerts",
    icon: <AlertsIcon />,
    href: "/logs/alerts",
    label: "Alerts logs",
  },
  {
    key: "reports",
    icon: <ReportsIcon />,
    href: "/logs/reports",
    label: "Reports logs",
  },
  {
    key: "query",
    icon: <QueryIcon />,
    href: "/logs/query",
    label: "Query logs",
  },
];
