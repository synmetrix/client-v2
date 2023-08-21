import { Tag } from "antd";
import cn from "classnames";

import type { Status } from "@/types/status";

import EllipseIcon from "@/assets/ellipse.svg";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

interface StatusBadgeProps {
  status: Status;
  children: ReactNode;
  className?: string;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status, children, className }) => {
  return (
    <Tag
      className={cn(styles.badge, styles[status], className)}
      icon={<EllipseIcon />}
      color={status}
    >
      <span className={styles.badgeText}>{children}</span>
    </Tag>
  );
};

export default StatusBadge;
