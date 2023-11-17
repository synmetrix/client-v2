import { Col, Row, Typography } from "antd";
import cn from "classnames";

import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";
import type { ButtonProps } from "antd";

interface PageHeaderProps {
  title?: string;
  action?: ReactNode;
  actionProps?: ButtonProps;
  onClick?: () => void;
  href?: string;
  target?: string;
}

const { Title } = Typography;

const PageHeader: FC<PageHeaderProps> = ({
  title,
  action,
  onClick,
  href,
  target,
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
            {...actionProps}
            className={cn(
              !actionProps?.type && styles.action,
              actionProps?.className
            )}
            target={target}
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
