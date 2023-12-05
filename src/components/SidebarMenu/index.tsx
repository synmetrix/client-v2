import { Space } from "antd";
import cn from "classnames";

import Button from "@/components/Button";
import type { SidebarMenuItem } from "@/mocks/sidebarMenu";
import useLocation from "@/hooks/useLocation";

import styles from "./index.module.less";

import type { FC } from "react";

interface SidebarMenuProps {
  items: SidebarMenuItem[];
}

const SidebarMenu: FC<SidebarMenuProps> = ({ items }) => {
  const [location, setLocation] = useLocation();

  const onClick = (menuItem: SidebarMenuItem) => {
    const href = menuItem.href;

    if (href) {
      setLocation(href);
    }
  };

  const content = items.map((i) => (
    <div className={cn(styles.linkWrapper)} key={i.key}>
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick(i);
        }}
        className={cn(
          styles.link,
          location.pathname.includes(i.href) && styles.active
        )}
        href={i.href}
        key={i.key}
        type="text"
      >
        <Space align="center">
          <div className={styles.icon}>{i.icon} </div>
          {i.label}
        </Space>
      </Button>
    </div>
  ));

  return <div className={styles.wrapper}>{content}</div>;
};

export default SidebarMenu;
