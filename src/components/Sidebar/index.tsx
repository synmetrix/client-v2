import { useResponsive } from "ahooks";
import cn from "classnames";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

interface SidebarProps {
  icon?: ReactNode;
  title: ReactNode;
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ icon, title, children }) => {
  const responsive = useResponsive();

  return (
    <div className={cn(styles.wrapper, !responsive.lg && styles.wrapperMobile)}>
      {responsive.lg && (
        <div className={styles.header}>
          {icon && icon}
          <div>{title}</div>
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Sidebar;
