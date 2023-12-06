import { useTranslation } from "react-i18next";

import SidebarLayout from "@/layouts/SidebarLayout";
import SidebarMenu from "@/components/SidebarMenu";
import { singalsMenuItems } from "@/mocks/sidebarMenu";
import type { Location } from "@/hooks/useLocation";

import Icon from "@/assets/alerts-active.svg";

import type { ReactNode } from "react";

export type SidebarLayoutProps = {
  title?: string;
  children: ReactNode;
  location: Location;
};

const SignalsLayout: React.FC<SidebarLayoutProps> = ({
  title,
  children,
  location,
}) => {
  const { t } = useTranslation(["pages"]);
  const titleKey = (location?.pathname || "").split("/")?.[2];

  return (
    <SidebarLayout
      icon={<Icon />}
      title={title || t(`pages:${titleKey}`)}
      items={<SidebarMenu items={singalsMenuItems} />}
      burgerTitle={"Signals"}
      subTitle={"Signals"}
    >
      {children}
    </SidebarLayout>
  );
};

export default SignalsLayout;
