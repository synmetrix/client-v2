import { Layout, Row, Col, Space, Button } from "antd";
import { useResponsive } from "ahooks";
import cx from "classnames";

import styles from "./index.module.less";

const { Header: BasicHeader } = Layout;

const Header: React.FC = () => {
  const responsive = useResponsive();
  const isMobile = responsive.md === false;

  return (
    <BasicHeader className={styles.header}>
      <Row
        className={styles.root}
        style={{ width: "100%" }}
        justify="space-between"
      >
        <Col
          xs={24}
          sm={24}
          md={12}
          className={cx(styles.col, isMobile && styles.colMobile)}
        >
          <a className={styles.logo} href="/">
            <img className={styles.logoText} alt="" src="/logo_with_text.png" />
          </a>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          className={cx(
            styles.col,
            styles.colRight,
            isMobile && styles.colMobile
          )}
        >
          <Space>
            <Button type="link" className={styles.button}>
              Sign in
            </Button>
            <Button type="primary" className={styles.button}>
              Sign up
            </Button>
          </Space>
        </Col>
      </Row>
    </BasicHeader>
  );
};

export default Header;
