import { useTranslation } from "react-i18next";

import SidebarLayout from "@/layouts/SidebarLayout";
import SidebarMenu from "@/components/SidebarMenu";
import { settingsMenuItems, singalsMenuItems } from "@/mocks/sidebarMenu";
import type { Location } from "@/hooks/useLocation";

import Icon from "@/assets/settings-active.svg";

import type { ReactNode } from "react";

const sidebar = {
  settings: settingsMenuItems,
  signals: singalsMenuItems,
};

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
  return (
    <SidebarLayout
      icon={<Icon />}
      title={title || t(`pages:${titleKey}`)}
      items={<SidebarMenu items={sidebar[subKey as keyof typeof sidebar]} />}
      burgerTitle={subKey}
      subTitle={subKey}
    >
      {children}
    </SidebarLayout>
  );
};

export default SettingsLayout;
