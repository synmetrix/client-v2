import { useResponsive } from "ahooks";
import { Layout, Space } from "antd";
import cn from "classnames";

import Button from "@/components/Button";
import { items } from "@/mocks/sideMenu";
import type { SidebarItem } from "@/mocks/sideMenu";
import useLocation from "@/hooks/useLocation";

import styles from "./index.module.less";

import type { FC } from "react";

const { Sider } = Layout;

interface SideMenuProps {}

const SideMenu: FC<SideMenuProps> = () => {
  const [_, setLocation] = useLocation();
  const windowSize = useResponsive();
  const isMobile = windowSize.sm === false;

  const onClick = (menuItem: SidebarItem) => {
    const href = menuItem.href;
    console.log(href);
    if (href) {
      setLocation(href);
    }
  };

  return (
    <Sider
      width={isMobile ? 55 : 70}
      collapsedWidth={isMobile ? "100%" : 371}
      className={styles.wrapper}
      collapsible
      trigger={null}
    >
      <Space className={styles.inner} size={0} align="center">
        <div className={cn(styles.menu, isMobile && styles.mobile)}>
          <img className={styles.logo} alt="" src="/logo_bg.png" />

          {items.map((i, idx) => (
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
    </Sider>
  );
};

export default SideMenu;
