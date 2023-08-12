import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoAlertsImg from "@/assets/no-alerts.png";
import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const NoAlerts: FC = () => {
  const { t } = useTranslation(["alerts", "common"]);
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoAlertsImg} alt="" />
      <Title level={4}>{t("not_found.title")}</Title>
      <Text className={styles.text}>{t("not_found.text")}</Text>
      <Button size="large" type="primary">
        {t("not_found.explore_btn")}
      </Button>
    </div>
  );
};

export default NoAlerts;
