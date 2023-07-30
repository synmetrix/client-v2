import { Layout } from "antd";
import { useResponsive } from "ahooks";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthLinks from "@/components/AuthLinks";
import Navbar from "@/components/Navbar";
import BurgerMenu from "@/components/BurgerMenu";
import { userMenu } from "@/mocks/user";
import { useUserData } from "@/hooks/useUserData";

import styles from "./index.module.less";

const { Content } = Layout;

export type BasicLayoutProps = {
  children: React.ReactNode;
  loggedIn?: boolean;
  page?: string;
  divider?: boolean;
  headerProps?: {
    title?: string;
    withLogo?: boolean;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = ({
  loggedIn = false,
  divider = false,
  page,
  headerProps = {
    withLogo: false,
  },
  children,
}) => {
  const responsive = useResponsive();
  const user = useUserData();

  const isMobile = responsive.md === false;

  const navbar = (
    <Navbar
      direction={isMobile ? "vertical" : "horizontal"}
      username={user.fullName}
      userAvatar={user.avatar}
      userMenu={userMenu}
      teams={user?.teams}
    />
  );

  const authLinks = <AuthLinks page={page} />;

  const content = loggedIn ? navbar : authLinks;

  return (
    <Layout className={styles.root}>
      <Header
        withLogo={headerProps.withLogo}
        title={headerProps.title}
        bordered={divider}
        content={isMobile ? <BurgerMenu>{content}</BurgerMenu> : content}
      />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};

export default BasicLayout;
