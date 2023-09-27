import { useResponsive } from "ahooks";
import { Drawer, Layout, Space, Typography } from "antd";
import cn from "classnames";

import Sidebar from "@/components/Sidebar";
import Button from "@/components/Button";
import { items } from "@/mocks/settingsMenu";
import useLocation from "@/hooks/useLocation";

import styles from "./index.module.less";

import type { FC } from "react";

const { Sider } = Layout;

const { Title } = Typography;

interface SettingsMenuProps {}

const SettingsMenu: FC<SettingsMenuProps> = () => {
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

  const content = items.map((i) => (
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
  ));

  // const header =
  //   selected !== null ? (
  //     <Space className={styles.header} size={7} align="center">
  //       {items[selected].items && (
  //         <>
  //           {items[selected].activeIcon || items[selected].icon}
  //           <Title className={styles.title} level={4}>
  //             {items[selected].label}
  //           </Title>
  //         </>
  //       )}
  //     </Space>
  //   ) : null;

  return <div>{content}</div>;
};

export default SettingsMenu;
