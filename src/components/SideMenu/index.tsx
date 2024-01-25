import { useResponsive } from "ahooks";
import useLocalStorageState from "use-local-storage-state";
import { Space, Tooltip } from "antd";
import cn from "classnames";

import Button from "@/components/Button";
import { items } from "@/mocks/sideMenu";
import type { SidebarItem } from "@/mocks/sideMenu";
import useLocation from "@/hooks/useLocation";
import CurrentUserStore from "@/stores/CurrentUserStore";
import { getSourceAndBranch } from "@/pages/Explore";
import { Roles } from "@/types/team";

import styles from "./index.module.less";

import type { FC } from "react";
import type { ButtonProps } from "antd";

interface SideMenuProps {}

const SideMenu: FC<SideMenuProps> = () => {
  const [location, setLocation] = useLocation();
  const { currentTeam, teamData } = CurrentUserStore();

  const [currentDataSourceId] = useLocalStorageState<string>(
    "currentDataSourceId"
  );
  const [currentBranchId] = useLocalStorageState<string>(
    `${currentDataSourceId}:currentBranch`
  );

  const { curSource, currentBranch } = useMemo(
    () =>
      getSourceAndBranch(
        teamData?.dataSources || [],
        currentDataSourceId,
        currentBranchId
      ),
    [currentBranchId, currentDataSourceId, teamData?.dataSources]
  );

  const updateHref = useCallback(
    (item: SidebarItem) => {
      let newHref = item.href;

      if (curSource?.id && currentBranch?.id) {
        switch (item.key) {
          case "explore":
            newHref += `/${curSource.id}?branchId=${currentBranch.id}`;
            break;
          case "models":
            newHref += `/${curSource.id}/${currentBranch.id}`;
            break;
          default:
            break;
        }
      }

      return {
        ...item,
        href: newHref,
      };
    },
    [curSource?.id, currentBranch?.id]
  );

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

  const updatedItems = useMemo(() => items.map(updateHref), [updateHref]);
  const buttons = useMemo(
    () =>
      updatedItems
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
            <Button
              type="link"
              {...buttonProps}
              href={item.href}
              key={item.key}
            >
              {item.icon}
              <span className={styles.label}>{item.label}</span>
            </Button>
          );
        })
        .filter(Boolean),
    [currentTeam?.role, isMobile, location?.pathname, onClick, updatedItems]
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
