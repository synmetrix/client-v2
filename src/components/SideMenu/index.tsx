import { useResponsive } from "ahooks";
import { Drawer, Layout, Space, Typography } from "antd";
import cn from "classnames";

import Sidebar from "@/components/Sidebar";
import Button from "@/components/Button";

import { items } from "./data";

import styles from "./index.module.less";

import type { FC } from "react";

const { Sider } = Layout;

const { Title } = Typography;

const SideMenu: FC = () => {
  const windowSize = useResponsive();
  const isMobile = windowSize.sm === false;

  const [open, setOpen] = useState<number | null>(null);

  const onClick = (index: number) => {
    if (open === index || items[index].href) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  const links =
    open !== null
      ? items[open].items?.map((i) => (
          <Button className={styles.link} href={i.href} key={i.key} type="text">
            <Space>
              {i.icon} {i.label}
            </Space>
          </Button>
        ))
      : null;

  const header =
    open !== null ? (
      <Space className={styles.header} size={7} align="center">
        {items[open].activeIcon || items[open].icon}
        <Title className={styles.title} level={4}>
          {items[open].label}
        </Title>
      </Space>
    ) : null;

  return (
    <Sider
      width={isMobile ? 55 : 88}
      collapsedWidth={isMobile ? "100%" : 371}
      className={styles.wrapper}
      collapsible
      collapsed={open !== null}
      trigger={null}
    >
      <Space className={styles.inner} size={0}>
        <div className={cn(styles.menu, isMobile && styles.mobile)}>
          <img className={styles.logo} alt="" src="/logo_bg.png" />

          {items.map((i, idx) => (
            <Button
              key={i.key}
              className={cn(styles.btn, isMobile && styles.mobile)}
              type="text"
              href={i.href}
              onClick={() => onClick(idx)}
            >
              {i.icon}
              {i.label}
            </Button>
          ))}
        </div>

        {links &&
          (isMobile ? (
            <Drawer
              open={open !== null}
              onClose={() => setOpen(null)}
              placement="left"
              width={270}
              title={header}
            >
              {links}
            </Drawer>
          ) : (
            <Sidebar title={header}>{links}</Sidebar>
          ))}
      </Space>
    </Sider>
  );
};

export default SideMenu;
