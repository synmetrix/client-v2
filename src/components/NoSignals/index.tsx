import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "@vitjs/runtime";

import { EXPLORE } from "@/utils/constants/paths";
import NoAlertsImg from "@/assets/no-alerts.png";
import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

interface NoSignalsProps {
  type?: "reports" | "alerts";
}

const NoSignals: FC<NoSignalsProps> = ({ type = "alerts" }) => {
  const { t } = useTranslation(["alerts", "reports", "common"]);
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoAlertsImg} alt="" />
      <Title level={4}>
        {type === "alerts" ? t("not_found.title") : t("reports:not.title")}
      </Title>
      <Text className={styles.text}>
        {" "}
        {type === "alerts" ? t("not_found.text") : t("reports:not.text")}
      </Text>
      <Button size="large" type="primary">
        <Link to={EXPLORE}>{t("not_found.explore_btn")}</Link>
      </Button>
    </div>
  );
};

export default NoSignals;
