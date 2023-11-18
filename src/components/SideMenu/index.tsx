import { useResponsive } from "ahooks";
import { Space } from "antd";
import cn from "classnames";

import Button from "@/components/Button";
import { items } from "@/mocks/sideMenu";
import type { SidebarItem } from "@/mocks/sideMenu";
import useLocation from "@/hooks/useLocation";

import styles from "./index.module.less";

import type { FC } from "react";

interface SideMenuProps {}

const SideMenu: FC<SideMenuProps> = () => {
  const [, setLocation] = useLocation();
  const windowSize = useResponsive();
  const isMobile = windowSize.sm === false;

  const onClick = (menuItem: SidebarItem) => {
    const href = menuItem.href;

    if (href) {
      setLocation(href);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Space className={styles.inner} size={0} align="center">
        <div className={cn(styles.menu)}>
          <img className={styles.logo} alt="" src="/logo_bg.png" />

          {items.map((i) => (
            <Button
              key={i.key}
              className={cn(styles.btn, isMobile && styles.mobile)}
              type="text"
              href={i.href}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick(i);
              }}
            >
              {i.icon}
              <span className={styles.label}>{i.label}</span>
            </Button>
          ))}
        </div>
      </Space>
    </div>
  );
};

export default SideMenu;
