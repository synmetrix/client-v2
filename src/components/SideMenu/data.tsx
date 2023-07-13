import ExploreIcon from "@/assets/explore.svg";
import ModelsIcon from "@/assets/models.svg";
import ReportsIcon from "@/assets/reports.svg";
import AlertsIcon from "@/assets/alerts.svg";
import LogsIcon from "@/assets/logs.svg";
import SettingsIcon from "@/assets/settings.svg";
import SettingsActiveIcon from "@/assets/settings-active.svg";
import DataSourceIcon from "@/assets/data-source.svg";
import SQLAPIIcon from "@/assets/sql-api.svg";
import MembersIcon from "@/assets/members.svg";
import RolesAndAccessIcon from "@/assets/roles-and-access.svg";
import PersonalInfoIcon from "@/assets/personal-info.svg";

import type { ReactNode } from "react";

interface SidebarItem {
  key: string;
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  items?: SidebarItem[];
}

export const items: SidebarItem[] = [
  {
    key: "explore",
    label: "Explore",
    icon: <ExploreIcon />,
  },
  {
    key: "models",
    label: "Models",
    icon: <ModelsIcon />,
  },
  {
    key: "reports",
    label: "Reports",
    icon: <ReportsIcon />,
  },
  {
    key: "alerts",
    label: "Alerts",
    icon: <AlertsIcon />,
  },
  {
    key: "logs",
    label: "Logs",
    icon: <LogsIcon />,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    activeIcon: <SettingsActiveIcon />,
    items: [
      {
        key: "data-sources",
        label: "Data Sources",
        icon: <DataSourceIcon />,
      },
      {
        key: "sql-api",
        label: "SQL API",
        icon: <SQLAPIIcon />,
      },
      {
        key: "members",
        label: "Members",
        icon: <MembersIcon />,
      },
      {
        key: "roles-and-access",
        label: "Roles and Access",
        icon: <RolesAndAccessIcon />,
      },
      {
        key: "personal-info",
        label: "Personal Info",
        icon: <PersonalInfoIcon />,
      },
    ],
  },
];
