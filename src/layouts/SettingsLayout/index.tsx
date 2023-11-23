import { useTranslation } from "react-i18next";

import SidebarLayout from "@/layouts/SidebarLayout";
import SidebarMenu from "@/components/SidebarMenu";
import { settingsMenuItems } from "@/mocks/sidebarMenu";
import type { Location } from "@/hooks/useLocation";

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
  const titleKey = (location?.pathname || "").split("/")?.[2];

  return (
    <SidebarLayout
      icon={<Icon />}
      title={title || t(`pages:settings.${titleKey}`)}
      items={<SidebarMenu items={settingsMenuItems} />}
      burgerTitle={"Settings"}
    >
      {children}
    </SidebarLayout>
  );
};

export default SettingsLayout;
