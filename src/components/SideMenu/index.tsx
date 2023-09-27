import { useResponsive } from "ahooks";
import { Drawer, Layout, Space, Typography } from "antd";
import cn from "classnames";

import Sidebar from "@/components/Sidebar";
import Button from "@/components/Button";
import { items } from "@/mocks/sideMenu";
import useLocation from "@/hooks/useLocation";

import styles from "./index.module.less";

import type { FC } from "react";

const { Sider } = Layout;

const { Title } = Typography;

interface SideMenuProps {}

const SideMenu: FC<SideMenuProps> = () => {
  const [_, setLocation] = useLocation();
  const windowSize = useResponsive();
  const isMobile = windowSize.sm === false;

  const [selected, setSelected] = useState<number | null>(null);

  const onClick = (index: number) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  const goToSection = (e: any) => {
    const href = e.target.getAttribute("href");

    console.log(href);
    if (href) {
      setLocation(href);
    }

    e.preventDefault();
    e.stopPropagation();
  };

  const content =
    selected !== null
      ? items[selected].items?.map((i) => (
          <Button
            onClick={goToSection}
            className={styles.link}
            href={i.href}
            key={i.key}
            type="text"
          >
            <Space>
              {i.icon} {i.label}
            </Space>
          </Button>
        ))
      : null;

  const header =
    selected !== null ? (
      <Space className={styles.header} size={7} align="center">
        {items[selected].items && (
          <>
            {items[selected].activeIcon || items[selected].icon}
            <Title className={styles.title} level={4}>
              {items[selected].label}
            </Title>
          </>
        )}
      </Space>
    ) : null;

  return (
    <Sider
      width={isMobile ? 55 : 70}
      collapsedWidth={isMobile ? "100%" : 371}
      className={styles.wrapper}
      collapsible
      collapsed={!!content}
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
                onClick(idx);
              }}
            >
              {i.icon}
              <span className={styles.label}>{i.label}</span>
            </Button>
          ))}
        </div>
        {isMobile ? (
          <Drawer
            open={selected !== null}
            onClose={() => setSelected(null)}
            placement="left"
            width={270}
            title={header}
          >
            {content}
          </Drawer>
        ) : (
          <Sidebar title={header}>{content}</Sidebar>
        )}
      </Space>
    </Sider>
  );
};

export default SideMenu;
