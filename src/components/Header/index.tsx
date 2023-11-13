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
  title?: React.ReactNode | string;
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
      className={cx(
        styles.header,
        bordered && styles.headerBordered,
        isMobile && styles.mobile
      )}
    >
      <Row className={styles.root} justify="space-between">
        <Col span={16} md={12}>
          <div className={styles.col}>
            {withLogo && (
              <a className={styles.logo} href="/">
                <img className={styles.logoText} alt="" src={logo} />
              </a>
            )}
            {title && (
              <Title
                ellipsis
                className={cx(isMobile && styles.title)}
                level={isMobile ? 5 : 4}
              >
                {title}
              </Title>
            )}
          </div>
        </Col>
        <Col span={8} md={12}>
          <div className={cx(styles.col, styles.colRight)}>{content}</div>
        </Col>
      </Row>
    </BasicHeader>
  );
};

export default Header;
