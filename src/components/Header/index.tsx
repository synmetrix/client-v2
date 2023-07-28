import { Layout, Row, Col, Space, Button, Typography } from "antd";
import { useResponsive } from "ahooks";
import { useTranslation } from "react-i18next";
import cx from "classnames";

import Navbar from "@/components/Navbar";
import BurgerMenu from "@/components/BurgerMenu";
import type { User } from "@/types/user";
import { WITHOUT_TITLE_ROUTES } from "@/utils/constants/routes";

import styles from "./index.module.less";

const { Header: BasicHeader } = Layout;

interface HeaderProps {
  user?: User | null;
  location?: string;
}

const { Title } = Typography;

const Header: React.FC<HeaderProps> = ({ user = null, location = "" }) => {
  const { t } = useTranslation(["common", "pages"]);
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

  const isSignUpPage = location === "sign_up";

  const authLinks = (
    <Space>
      {location !== "sign_in" && (
        <Button
          type={isSignUpPage ? "primary" : "link"}
          className={styles.button}
        >
          {isSignUpPage ? t("common:words.login") : t("common:words.sign_in")}
        </Button>
      )}
      {location !== "sign_up" && (
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
          {WITHOUT_TITLE_ROUTES.includes(location) ? (
            <a className={styles.logo} href="/">
              <img
                className={styles.logoText}
                alt=""
                src="/logo_with_text.png"
              />
            </a>
          ) : (
            <Title className={cx(isMobile && styles.title)} level={4}>
              {t(`pages:${location}`, location)}
            </Title>
          )}
        </Col>
        <Col span={12} className={cx(styles.col, styles.colRight)}>
          {isMobile ? <BurgerMenu>{content}</BurgerMenu> : content}
        </Col>
      </Row>
    </BasicHeader>
  );
};

export default Header;
