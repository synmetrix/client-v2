import { useTranslation } from "react-i18next";

import SidebarLayout from "@/layouts/SidebarLayout";
import SidebarMenu from "@/components/SidebarMenu";
import type { Location } from "@/hooks/useLocation";
import type { SidebarMenuItem } from "@/mocks/sidebarMenu";

import DataSourceIcon from "@/assets/data-source.svg";
import SQLAPIIcon from "@/assets/sql-api.svg";
import MembersIcon from "@/assets/members.svg";
import RolesAndAccessIcon from "@/assets/roles-and-access.svg";
import PersonalInfoIcon from "@/assets/personal-info.svg";
import AlertsIcon from "@/assets/alert-logs.svg";
import ReportsIcon from "@/assets/report-logs.svg";
import QueryIcon from "@/assets/query-logs.svg";
import TeamsIcon from "@/assets/team.svg";
import Icon from "@/assets/settings-active.svg";

import type { ReactNode } from "react";

export type SidebarLayoutProps = {
  title?: string;
  children: ReactNode;
  location: Location;
};

const SettingsLayout: React.FC<SidebarLayoutProps> = ({
  title,
  children,
  location,
}) => {
  const { t } = useTranslation(["pages"]);
  const splitedPath = (location?.pathname || "").split("/");
  const titleKey = splitedPath?.[2];
  const subKey = splitedPath?.[1];

  const settingsMenuItems: SidebarMenuItem[] = [
    {
      key: "data-sources",
      label: t("common:words.data_sources"),
      href: "/settings/sources",
      icon: <DataSourceIcon />,
    },
    {
      key: "sql-api",
      label: t("common:words.sql_api"),
      href: "/settings/sql-api",
      icon: <SQLAPIIcon />,
    },
    {
      key: "members",
      label: t("common:words.members"),
      href: "/settings/members",
      icon: <MembersIcon />,
    },
    {
      key: "roles",
      label: t("common:words.roles_and_access"),
      href: "/settings/roles",
      icon: <RolesAndAccessIcon />,
    },
    {
      key: "teams",
      label: t("common:words.teams"),
      href: "/settings/teams",
      icon: <TeamsIcon />,
    },
    {
      key: "personal-info",
      label: t("common:words.personal_info"),
      href: "/settings/info",
      icon: <PersonalInfoIcon />,
    },
  ];

  const singalsMenuItems: SidebarMenuItem[] = [
    {
      key: "alerts",
      icon: <AlertsIcon />,
      href: "/signals/alerts",
      label: t("common:words.alerts"),
    },
    {
      key: "reports",
      icon: <ReportsIcon />,
      href: "/signals/reports",
      label: t("common:words.reports"),
    },
  ];

  const sidebar = {
    settings: settingsMenuItems,
    signals: singalsMenuItems,
  };

  return (
    <SidebarLayout
      icon={<Icon />}
      title={title || t(`pages:${titleKey}`)}
      items={<SidebarMenu items={sidebar[subKey as keyof typeof sidebar]} />}
      burgerTitle={subKey}
      subTitle={t(`pages:${subKey}`, subKey)}
    >
      {children}
    </SidebarLayout>
  );
};

export default SettingsLayout;
