import ExploreIcon from "@/assets/explore.svg";
import ModelsIcon from "@/assets/models.svg";
import ReportsIcon from "@/assets/reports.svg";
import AlertsIcon from "@/assets/alerts.svg";
import LogsIcon from "@/assets/logs.svg";
import SettingsIcon from "@/assets/settings.svg";
import SettingsActiveIcon from "@/assets/settings-active.svg";
import LogsActiveIcon from "@/assets/logs-active.svg";
import AlertLogsIcon from "@/assets/alert-logs.svg";
import ReportLogsIcon from "@/assets/report-logs.svg";
import QueryLogsIcon from "@/assets/query-logs.svg";

import type { ReactNode } from "react";

interface SidebarItem {
  key: string;
  label: string;
  icon: ReactNode;
  href?: string;
  activeIcon?: ReactNode;
  items?: SidebarItem[];
}

export const items: SidebarItem[] = [
  {
    key: "explore",
    label: "Explore",
    href: "/explore",
    icon: <ExploreIcon />,
  },
  {
    key: "models",
    label: "Models",
    href: "/models",
    icon: <ModelsIcon />,
  },
  {
    key: "reports",
    label: "Reports",
    href: "/reports",
    icon: <ReportsIcon />,
  },
  {
    key: "alerts",
    label: "Alerts",
    href: "/alerts",
    icon: <AlertsIcon />,
  },
  {
    key: "logs",
    label: "Logs",
    icon: <LogsIcon />,
    activeIcon: <LogsActiveIcon />,
    items: [
      {
        key: "alerts-logs",
        label: "Alerts Logs",
        href: "/logs/alerts",
        icon: <AlertLogsIcon />,
      },
      {
        key: "reports-logs",
        label: "Reports Logs",
        href: "/logs/reports",
        icon: <ReportLogsIcon />,
      },
      {
        key: "query-logs",
        label: "Query Logs",
        href: "/logs/query",
        icon: <QueryLogsIcon />,
      },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    activeIcon: <SettingsActiveIcon />,
  },
];
