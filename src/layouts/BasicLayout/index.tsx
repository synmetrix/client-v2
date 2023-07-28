import { Layout, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import { useLocation } from "@vitjs/runtime";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import BurgerMenu from "@/components/BurgerMenu";
import { userMenu } from "@/mocks/user";
import { WITH_LOGO_ROUTES } from "@/utils/constants/routes";
import { useUserData } from "@/hooks/useUserData";

import styles from "./index.module.less";

const { Content } = Layout;

export type BasicLayoutProps = {
  children: React.ReactNode;
  loggedIn?: boolean;
};

const BasicLayout: React.FC<BasicLayoutProps> = ({
  loggedIn = false,
  children,
}) => {
  const { t } = useTranslation(["common", "pages"]);
  const { pathname } = useLocation();
  const responsive = useResponsive();

  const user = useUserData();

  const isMobile = responsive.md === false;
  const isSignUpPage = true;
  const withLogo = WITH_LOGO_ROUTES.includes(location.pathname);

  const navbar = (
    <Navbar
      direction={isMobile ? "vertical" : "horizontal"}
      username={user.fullName}
      userAvatar={user.avatar}
      userMenu={userMenu}
      teams={user?.teams}
    />
  );

  const authLinks = (
    <Space>
      {pathname !== "signin" && (
        <Button
          type={isSignUpPage ? "primary" : "link"}
          className={styles.button}
        >
          {isSignUpPage ? t("common:words.login") : t("common:words.sign_in")}
        </Button>
      )}
      {pathname !== "signup" && (
        <Button type="primary" className={styles.button}>
          {t("common:words.sign_up")}
        </Button>
      )}
    </Space>
  );

  const content = loggedIn ? navbar : authLinks;

  return (
    <Layout className={styles.root}>
      <Header
        withLogo={withLogo}
        bordered={loggedIn}
        title={t(`pages:${pathname}`, pathname)}
        content={isMobile ? <BurgerMenu>{content}</BurgerMenu> : content}
      />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};

export default BasicLayout;
