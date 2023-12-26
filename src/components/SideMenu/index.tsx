import { useResponsive } from "ahooks";
import { Space, Tooltip } from "antd";
import cn from "classnames";

import Button from "@/components/Button";
import { items } from "@/mocks/sideMenu";
import type { SidebarItem } from "@/mocks/sideMenu";
import useLocation from "@/hooks/useLocation";
import CurrentUserStore from "@/stores/CurrentUserStore";
import { Roles } from "@/types/team";

import styles from "./index.module.less";

import type { FC } from "react";
import type { ButtonProps } from "antd";

interface SideMenuProps {}

const SideMenu: FC<SideMenuProps> = () => {
  const [location, setLocation] = useLocation();
  const { currentTeam } = CurrentUserStore();

  const windowSize = useResponsive();
  const isMobile = windowSize.sm === false;

  const onClick = useCallback(
    (menuItem: SidebarItem) => {
      const href = menuItem.href;

      if (href) {
        setLocation(href);
      }
    },
    [setLocation]
  );

  const buttons = useMemo(
    () =>
      items
        .map((item) => {
          if (currentTeam?.role === Roles.member && item.key === "models") {
            return false;
          }

          const isActive = location?.pathname?.includes(item.href!);
          const buttonProps = {
            className: cn(
              styles.btn,
              isMobile && styles.mobile,
              isActive && styles.active
            ),
            type: "text",
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick(item);
            },
          } as ButtonProps;

          if (isMobile) {
            return (
              <Tooltip
                placement="right"
                title={item.label}
                trigger="focus"
                key={item.key}
              >
                <Button {...buttonProps} icon={item.icon} />
              </Tooltip>
            );
          }

          return (
            <Button {...buttonProps} href={item.href} key={item.key}>
              {item.icon}
              <span className={styles.label}>{item.label}</span>
            </Button>
          );
        })
        .filter(Boolean),
    [currentTeam?.role, isMobile, location?.pathname, onClick]
  );

  return (
    <div className={styles.wrapper}>
      <Space className={styles.inner} size={0} align="center">
        <div className={cn(styles.menu)}>
          <img
            className={cn(styles.logo, isMobile && styles.logoMobile)}
            alt=""
            src="/logo_bg.png"
          />

          <div className={styles.items}>{buttons}</div>
        </div>
      </Space>
    </div>
  );
};

export default SideMenu;
