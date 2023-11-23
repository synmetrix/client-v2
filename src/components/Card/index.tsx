import { Card as BasicCard, Button, Typography } from "antd";
import cx from "classnames";

import s from "./index.module.less";

import type { FC, PropsWithChildren } from "react";
import type { CardProps as BasicCardProps } from "antd";

interface CardProps extends BasicCardProps, PropsWithChildren {
  onTitleClick?: () => void;
  titleTooltip?: string;
}

const { Paragraph } = Typography;

const Card: FC<CardProps> = ({
  title,
  titleTooltip,
  onTitleClick,
  children,
  ...rest
}) => {
  return (
    <div className={s.wrapper}>
      <BasicCard
        style={{ position: "static" }}
        bodyStyle={{ padding: 16 }}
        headStyle={{ padding: 16 }}
        {...rest}
        title={
          onTitleClick ? (
            <Button
              block
              type="link"
              className={s.titleLink}
              style={{
                textAlign: "left",
                padding: 0,
                width: "98%",
                height: "none",
              }}
              onClick={onTitleClick}
              title={titleTooltip}
            >
              <Paragraph
                ellipsis
                style={{ display: "inline-block", width: "95%" }}
                className={cx(s.paragraph, s.btn)}
              >
                {title}
              </Paragraph>
            </Button>
          ) : (
            <Paragraph
              ellipsis
              className={cx(s.paragraph, s.btn)}
              title={titleTooltip}
            >
              {title}
            </Paragraph>
          )
        }
      >
        {children}
      </BasicCard>
    </div>
  );
};

export default Card;
