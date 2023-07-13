import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

interface SidebarProps {
  title: ReactNode;
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{title}</div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Sidebar;
