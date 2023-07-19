import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoCredentialsImg from "@/assets/no-credentials.png";
import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const NoCredentials: FC = () => {
  const { t } = useTranslation(["settings", "common"]);
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoCredentialsImg} alt="" />
      <Title level={4}>{t("sql_api.not_found.title")}</Title>
      <Text className={styles.text}>{t("sql_api.not_found.text")}</Text>
      <Button size="large" type="primary">
        {t("sql_api.not_found.attach_btn")}
      </Button>
    </div>
  );
};

export default NoCredentials;
