import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoTeamsImg from "@/assets/no-teams.png";
import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const NoDataSource: FC = () => {
  const { t } = useTranslation(["teams", "common"]);
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoTeamsImg} alt="" />
      <Title level={4}>{t("not_found.title")}</Title>
      <Text className={styles.text}>{t("not_found.text")}</Text>
      <Button size="large" type="primary">
        {t("not_found.btn")}
      </Button>
    </div>
  );
};

export default NoDataSource;
