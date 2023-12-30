import {
  ALERTS,
  EXPLORE,
  MODELS,
  QUERY_LOGS,
  SOURCES,
} from "@/utils/constants/paths";

import ExploreIcon from "@/assets/explore.svg";
import ModelsIcon from "@/assets/models.svg";
import ReportsIcon from "@/assets/reports.svg";
import AlertsIcon from "@/assets/alerts.svg";
import LogsIcon from "@/assets/logs.svg";
import SettingsIcon from "@/assets/settings.svg";
import SettingsActiveIcon from "@/assets/settings-active.svg";
import LogsActiveIcon from "@/assets/logs-active.svg";
// import AlertLogsIcon from "@/assets/alert-logs.svg";
// import ReportLogsIcon from "@/assets/report-logs.svg";
// import QueryLogsIcon from "@/assets/query-logs.svg";

import type { ReactNode } from "react";

export interface SidebarItem {
  key: string;
  label: string;
  icon: ReactNode;
  href: string;
  activeIcon?: ReactNode;
  items?: SidebarItem[];
}

export const items: SidebarItem[] = [
  {
    key: "explore",
    label: "Explore",
    href: EXPLORE,
    icon: <ExploreIcon />,
  },
  {
    key: "models",
    label: "Models",
    href: MODELS,
    icon: <ModelsIcon />,
  },
  {
    key: "signals",
    label: "Signals",
    href: ALERTS,
    icon: <AlertsIcon />,
  },
  {
    key: "logs",
    label: "Logs",
    href: QUERY_LOGS,
    icon: <LogsIcon />,
    activeIcon: <LogsActiveIcon />,
    //   items: [
    //     {
    //       key: "alerts-logs",
    //       label: "Alerts Logs",
    //       href: "/logs/alerts",
    //       icon: <AlertLogsIcon />,
    //     },
    //     {
    //       key: "reports-logs",
    //       label: "Reports Logs",
    //       href: "/logs/reports",
    //       icon: <ReportLogsIcon />,
    //     },
    //     {
    //       key: "query-logs",
    //       label: "Query Logs",
    //       href: "/logs/query",
    //       icon: <QueryLogsIcon />,
    //     },
    //   ],
  },
  {
    key: "settings",
    label: "Settings",
    href: SOURCES,
    icon: <SettingsIcon />,
    activeIcon: <SettingsActiveIcon />,
  },
];
