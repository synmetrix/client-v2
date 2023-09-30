import { useResponsive } from "ahooks";
import { Drawer, Layout, Space, Typography } from "antd";
import cn from "classnames";

import Button from "@/components/Button";
import { items } from "@/mocks/settingsMenu";
import type { SettingsMenuItem } from "@/mocks/settingsMenu";
import useLocation from "@/hooks/useLocation";

import styles from "./index.module.less";

import type { FC } from "react";

interface SettingsMenuProps {}

const SettingsMenu: FC<SettingsMenuProps> = () => {
  const [_, setLocation] = useLocation();

  const onClick = (menuItem: SettingsMenuItem) => {
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

export default SettingsMenu;
