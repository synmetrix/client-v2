import { useResponsive } from "ahooks";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Suspense } from "react";

import Button from "@/components/Button";

import type { FC, PropsWithChildren } from "react";

const DRAWER_DEFAULT_WIDTH = 320;

const BurgerMenu: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const windowSize = useResponsive();
  const isMobile = windowSize.sm === false;
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <MenuOutlined />
      </Button>

      <Drawer
        width={isMobile ? window.innerWidth : DRAWER_DEFAULT_WIDTH}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Suspense>{children}</Suspense>
      </Drawer>
    </>
  );
};

export default BurgerMenu;
