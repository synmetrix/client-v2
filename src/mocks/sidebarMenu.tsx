import DataSourceIcon from "@/assets/data-source.svg";
import SQLAPIIcon from "@/assets/sql-api.svg";
import MembersIcon from "@/assets/members.svg";
import RolesAndAccessIcon from "@/assets/roles-and-access.svg";
import PersonalInfoIcon from "@/assets/personal-info.svg";
import AlertsIcon from "@/assets/alert-logs.svg";
import ReportsIcon from "@/assets/report-logs.svg";
import QueryIcon from "@/assets/query-logs.svg";

import type { ReactNode } from "react";

export interface SidebarMenuItem {
  key: string;
  label: string;
  icon: ReactNode;
  href?: string;
  activeIcon?: ReactNode;
}

export const settingsMenuItems: SidebarMenuItem[] = [
  {
    key: "data-sources",
    label: "Data Sources",
    href: "/settings/sources",
    icon: <DataSourceIcon />,
  },
  {
    key: "sql-api",
    label: "SQL API",
    href: "/settings/sql-api",
    icon: <SQLAPIIcon />,
  },
  {
    key: "members",
    label: "Members",
    href: "/settings/members",
    icon: <MembersIcon />,
  },
  {
    key: "access",
    label: "Roles and Access",
    href: "/settings/access",
    icon: <RolesAndAccessIcon />,
  },
  {
    key: "personal-info",
    label: "Personal Info",
    href: "/settings/info",
    icon: <PersonalInfoIcon />,
  },
];

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
