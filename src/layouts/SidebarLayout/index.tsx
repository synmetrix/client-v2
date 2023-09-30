import AppLayout from "@/layouts/AppLayout";
import Sidebar from "@/components/Sidebar";

import type { ReactNode } from "react";

export type SidebarLayoutProps = {
  title?: ReactNode | string;
  subTitle?: ReactNode | string;
  items?: ReactNode[] | ReactNode;
  children: ReactNode;
  divider?: boolean;
};

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  title = "Main",
  subTitle = "Settings",
  items = [],
  children,
  divider = true,
}) => {
  return (
    <AppLayout
      title={title}
      divider={divider}
      sidebar={<Sidebar title={subTitle}>{items}</Sidebar>}
    >
      {children}
    </AppLayout>
  );
};

export default SidebarLayout;
