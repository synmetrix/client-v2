import AppLayout from "@/layouts/AppLayout";
import Sidebar from "@/components/Sidebar";

import type { ReactNode } from "react";

export type SidebarLayoutProps = {
  title: ReactNode;
  items?: ReactNode[];
  children: ReactNode;
};

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  title = "Settings",
  items = [],
  children,
}) => {
  return (
    <AppLayout sidebar={<Sidebar title={title}>{items}</Sidebar>}>
      {children}
    </AppLayout>
  );
};

export default SidebarLayout;
