import { Card } from "antd";
import cn from "classnames";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

interface FormTileProps {
  title: string;
  icon: ReactNode;
  onClick?: (title: string) => void;
  active?: boolean;
}

const FormTile: FC<FormTileProps> = ({
  title,
  icon,
  onClick,
  active = false,
}) => {
  return (
    <div className={styles.wrapper}>
      <Card
        className={styles.card}
        style={{ background: "#F9F9F9" }}
        onClick={() => onClick?.(title)}
        hoverable
      >
        <div
          className={cn(styles.iconWrapper, {
            [styles.active]: active,
          })}
        >
          {icon}
        </div>
        <span
          className={cn(styles.title, {
            [styles.active]: active,
          })}
        >
          {title}
        </span>
      </Card>
    </div>
  );
};

export default FormTile;
