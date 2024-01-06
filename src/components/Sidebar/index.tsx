import { useResponsive } from "ahooks";
import cn from "classnames";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

interface SidebarProps {
  icon?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ icon, title, children }) => {
  const responsive = useResponsive();

  return (
    <div className={cn(styles.wrapper, !responsive.lg && styles.wrapperMobile)}>
      {responsive.lg && (
        <div className={styles.header}>
          {icon && <div className={styles.iconContainer}>{icon}</div>}
          <div>{title}</div>
        </div>
      )}
      {children && <div className={styles.body}>{children}</div>}
    </div>
  );
};

export default Sidebar;
