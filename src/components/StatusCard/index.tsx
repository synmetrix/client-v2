import { Card } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import styles from "./index.module.less";

import type { FC } from "react";

interface StatusCardProps {
  count: number;
  status: "success" | "error";
}

const StatusCard: FC<StatusCardProps> = ({ count, status }) => {
  const { t } = useTranslation(["common"]);

  return (
    <Card className={cn(styles.card, styles[status])}>
      <span className={styles.count}>{count}</span>
      <div className={styles.status}>{t(`common:words.${status}`)}</div>
    </Card>
  );
};

export default StatusCard;
