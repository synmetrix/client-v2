import AppLayout from "@/layouts/AppLayout";
import Sidebar from "@/components/Sidebar";

import type { ReactNode } from "react";

export type SidebarLayoutProps = {
  title: ReactNode | string;
  items?: ReactNode[] | ReactNode;
  children: ReactNode;
  divider?: boolean;
};

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  title = "Settings",
  items = [],
  children,
  divider = true,
}) => {
  return (
    <AppLayout
      divider={divider}
      sidebar={<Sidebar title={title}>{items}</Sidebar>}
    >
      {children}
    </AppLayout>
  );
};

export default SidebarLayout;
