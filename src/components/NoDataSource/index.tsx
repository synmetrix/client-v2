import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoDataSourceImg from "@/assets/no-db.png";
import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const NoDataSource: FC = () => {
  const { t } = useTranslation(["settings", "common"]);
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoDataSourceImg} alt="" />
      <Title level={4}>{t("data_sources.title")}</Title>
      <Text className={styles.text}>{t("data_sources.text")}</Text>
      <Button size="large" type="primary">
        {t("data_sources.connect_btn")}
      </Button>
    </div>
  );
};

export default NoDataSource;
