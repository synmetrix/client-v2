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
  const [_, setLocation] = useLocation();

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
        className={styles.link}
        href={i.href}
        key={i.key}
        type="text"
      >
        <Space>
          {i.icon} {i.label}
        </Space>
      </Button>
    </div>
  ));

  return <div>{content}</div>;
};

export default SidebarMenu;
