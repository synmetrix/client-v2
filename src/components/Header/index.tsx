import { Layout, Row, Col, Space, Button } from "antd";
import { useResponsive } from "ahooks";
import cx from "classnames";

import Navbar from "@/components/Navbar";
import BurgerMenu from "@/components/BurgerMenu";

import styles from "./index.module.less";

const { Header: BasicHeader } = Layout;

// TODO use store
const isAuth = false;

const Header: React.FC = () => {
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
      teams={[
        {
          label: "1st team item",
          href: "/",
        },
        {
          label: "2nd team item",
          href: "/",
        },
      ]}
    />
  );

  const authLinks = (
    <Space>
      <Button type="link" className={styles.button}>
        Sign in
      </Button>
      <Button type="primary" className={styles.button}>
        Sign up
      </Button>
    </Space>
  );

  const content = isAuth ? navbar : authLinks;

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
