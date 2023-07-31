import { Col, Row, Typography } from "antd";

import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

interface SettingsHeaderProps {
  title?: string;
  action?: string;
  onClick?: () => void;
  href?: string;
}

const { Title } = Typography;

const SettingsHeader: FC<SettingsHeaderProps> = ({
  title,
  action,
  onClick,
  href,
}) => {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Title level={5} className={styles.title}>
          {title}
        </Title>
      </Col>
      <Col>
        {action && (
          <Button className={styles.action} href={href} onClick={onClick}>
            {action}
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default SettingsHeader;
