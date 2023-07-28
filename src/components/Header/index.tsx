import { Layout, Row, Col, Typography } from "antd";
import { useResponsive } from "ahooks";
import cx from "classnames";

import logo from "@/assets/logo_with_text.png";

import styles from "./index.module.less";

const { Header: BasicHeader } = Layout;

interface HeaderProps {
  content: React.ReactNode;
  withLogo?: boolean;
  bordered?: boolean;
  title?: string;
}

const { Title } = Typography;

const Header: React.FC<HeaderProps> = ({
  withLogo,
  bordered = false,
  title,
  content,
}) => {
  const responsive = useResponsive();
  const isMobile = responsive.md === false;

  return (
    <BasicHeader
      className={cx(styles.header, bordered && styles.headerBordered)}
    >
      <Row className={styles.root} justify="space-between">
        <Col span={12} className={cx(styles.col)}>
          {withLogo && (
            <a className={styles.logo} href="/">
              <img className={styles.logoText} alt="" src={logo} />
            </a>
          )}
          {title && (
            <Title className={cx(isMobile && styles.title)} level={4}>
              {title}
            </Title>
          )}
        </Col>
        <Col span={12} className={cx(styles.col, styles.colRight)}>
          {content}
        </Col>
      </Row>
    </BasicHeader>
  );
};

export default Header;
