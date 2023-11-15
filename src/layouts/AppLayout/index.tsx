import { Layout } from "antd";
import { useResponsive } from "ahooks";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BurgerMenu from "@/components/BurgerMenu";
import SideMenu from "@/components/SideMenu";
import { userMenu } from "@/mocks/user";
import useUserData from "@/hooks/useUserData";

import styles from "./index.module.less";

import type { ReactNode } from "react";

export type AppLayoutProps = {
  sidebar?: ReactNode;
  children: ReactNode;
  title?: ReactNode | string;
  divider?: boolean;
};

const { Sider } = Layout;

const AppLayout: React.FC<AppLayoutProps> = ({
  title = "App",
  divider = false,
  sidebar = null,
  children,
}) => {
  const responsive = useResponsive();
  const { currentUser } = useUserData();

  const isMobile = responsive.md === false;

  const content = (
    <Navbar
      direction={isMobile ? "vertical" : "horizontal"}
      username={currentUser.displayName}
      userAvatar={currentUser.avatarUrl}
      userMenu={userMenu}
      teams={currentUser?.teams}
    />
  );

  return (
    <div className={styles.root}>
      {responsive.lg ? (
        <div style={{ display: "flex", minHeight: "100%" }}>
          <SideMenu />
          {sidebar}
        </div>
      ) : (
        <SideMenu />
      )}
      <Layout>
        <Header
          title={title}
          bordered={divider}
          content={isMobile ? <BurgerMenu>{content}</BurgerMenu> : content}
        />
        <div className={styles.main}>{children}</div>
        {!responsive.lg && sidebar}
        <Footer />
      </Layout>
    </div>
  );
};

export default AppLayout;
