import { Col, Row, Typography } from "antd";
import cn from "classnames";

import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";
import type { ButtonProps } from "antd";

interface PageHeaderProps {
  title?: string;
  action?: string;
  actionProps?: ButtonProps;
  onClick?: () => void;
  href?: string;
}

const { Title } = Typography;

const PageHeader: FC<PageHeaderProps> = ({
  title,
  action,
  onClick,
  href,
  actionProps,
}) => {
  return (
    <Row className={styles.wrapper} justify="space-between" align="middle">
      <Col>
        <Title level={5} className={styles.title}>
          {title}
        </Title>
      </Col>
      <Col>
        {action && (
          <Button
            className={cn(!actionProps?.type && styles.action)}
            {...actionProps}
            href={href}
            onClick={onClick}
          >
            {action}
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default PageHeader;
