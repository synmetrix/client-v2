import { useResponsive } from "ahooks";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Suspense } from "react";

import Button from "@/components/Button";
import useLocation from "@/hooks/useLocation";

import s from "./index.module.less";

import type { FC, PropsWithChildren, ReactNode } from "react";

const DRAWER_DEFAULT_WIDTH = 320;

interface BurgerMenuProps extends PropsWithChildren {
  header?: ReactNode;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ header = null, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const windowSize = useResponsive();
  const isMobile = windowSize.sm === false;

  const [location] = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <MenuOutlined />
      </Button>

      <Drawer
        className={s.drawer}
        title={<div className={s.header}>{header}</div>}
        bodyStyle={{ padding: 0 }}
        width={isMobile ? window.innerWidth : DRAWER_DEFAULT_WIDTH}
        open={true}
        onClose={() => setIsOpen(false)}
        style={{ background: "#f9f9f9" }}
      >
        <Suspense>
          <div>{children}</div>
        </Suspense>
      </Drawer>
    </>
  );
};

export default BurgerMenu;
