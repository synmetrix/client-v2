import { Space } from "antd";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

interface SidebarHeaderProps {
  icon?: ReactNode;
  title?: ReactNode;
}

const SidebarHeader: FC<SidebarHeaderProps> = ({ icon = null, title = "" }) => {
  return (
    <Space size={7} align="end">
      {icon} <span className={styles.title}>{title}</span>
    </Space>
  );
};

export default SidebarHeader;
