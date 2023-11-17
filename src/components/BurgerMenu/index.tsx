import { useResponsive } from "ahooks";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Suspense } from "react";

import Button from "@/components/Button";
import useLocation from "@/hooks/useLocation";

import type { FC, PropsWithChildren } from "react";

const DRAWER_DEFAULT_WIDTH = 320;

const BurgerMenu: FC<PropsWithChildren> = ({ children }) => {
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
        width={isMobile ? window.innerWidth : DRAWER_DEFAULT_WIDTH}
        open={isOpen}
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
