import { Layout } from "antd";
import { useResponsive } from "ahooks";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthLinks from "@/components/AuthLinks";
import Navbar from "@/components/Navbar";
import BurgerMenu from "@/components/BurgerMenu";
import SideMenu from "@/components/SideMenu";
import { userMenu } from "@/mocks/user";
import useUserData from "@/hooks/useUserData";

import styles from "./index.module.less";

import type { ReactNode } from "react";

const { Content } = Layout;

export type BasicLayoutProps = {
  children: ReactNode;
  loggedIn?: boolean;
  page?: string;
  divider?: boolean;
  withSideMenu?: boolean;
  headerProps?: {
    title?: string;
    withLogo?: boolean;
  };
  sidebar?: {
    header: ReactNode;
    children: ReactNode;
    trigger: string;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = ({
  loggedIn = false,
  divider = false,
  withSideMenu = false,
  page,
  headerProps = {
    withLogo: false,
  },
  sidebar,
  children,
}) => {
  const responsive = useResponsive();
  const { currentUser } = useUserData();

  const isMobile = responsive.md === false;

  const navbar = (
    <Navbar
      direction={isMobile ? "vertical" : "horizontal"}
      username={currentUser.displayName}
      userAvatar={currentUser.avatarUrl}
      userMenu={userMenu}
      teams={currentUser?.teams}
    />
  );

  const authLinks = <AuthLinks page={page} />;

  const content = loggedIn ? navbar : authLinks;

  return (
    <Layout className={styles.root}>
      {withSideMenu && <SideMenu pageSidebar={sidebar} />}
      <Layout>
        <Header
          withLogo={headerProps.withLogo}
          title={headerProps.title}
          bordered={divider}
          content={isMobile ? <BurgerMenu>{content}</BurgerMenu> : content}
        />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
