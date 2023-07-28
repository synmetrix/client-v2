import { Layout, Row, Col, Space, Button } from "antd";
import { useResponsive } from "ahooks";
import { useTranslation } from "react-i18next";
import cx from "classnames";

import Navbar from "@/components/Navbar";
import BurgerMenu from "@/components/BurgerMenu";
import type { User } from "@/types/user";

import styles from "./index.module.less";

const { Header: BasicHeader } = Layout;

interface HeaderProps {
  user?: User | null;
  location?: string;
}

const Header: React.FC<HeaderProps> = ({ user = null, location }) => {
  const { t } = useTranslation(["common"]);
  const responsive = useResponsive();
  const isMobile = responsive.md === false;

  const navbar = (
    <Navbar
      direction={isMobile ? "vertical" : "horizontal"}
      userMenu={[
        {
          label: "1st menu item",
          href: "/",
        },
        {
          label: "2nd menu item",
          href: "/",
        },
      ]}
      teams={user?.teams}
    />
  );

  const isSignUpPage = location === "signup";

  const authLinks = (
    <Space>
      {location !== "signin" && (
        <Button
          type={isSignUpPage ? "primary" : "link"}
          className={styles.button}
        >
          {isSignUpPage ? t("common:words.login") : t("common:words.sign_in")}
        </Button>
      )}
      {location !== "signup" && (
        <Button type="primary" className={styles.button}>
          {t("common:words.sign_up")}
        </Button>
      )}
    </Space>
  );

  const content = user ? navbar : authLinks;

  return (
    <BasicHeader className={cx(styles.header, isMobile && styles.headerMobile)}>
      <Row className={styles.root} justify="space-between">
        <Col span={12} className={cx(styles.col)}>
          <a className={styles.logo} href="/">
            <img className={styles.logoText} alt="" src="/logo_with_text.png" />
          </a>
        </Col>
        <Col span={12} className={cx(styles.col, styles.colRight)}>
          {isMobile ? <BurgerMenu>{content}</BurgerMenu> : content}
        </Col>
      </Row>
    </BasicHeader>
  );
};

export default Header;
