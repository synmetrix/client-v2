import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoSqlCredentialsImg from "@/assets/no-credentials.png";
import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

interface NoCredentialsProps {
  onCreate: () => void;
}

const NoCredentials: FC<NoCredentialsProps> = ({ onCreate = () => {} }) => {
  const { t } = useTranslation(["settings", "common"]);
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoSqlCredentialsImg} alt="" />
      <Title level={4}>{t("credentials.not_found.title")}</Title>
      <Text className={styles.text}>{t("credentials.not_found.text")}</Text>
      <Button size="large" type="primary" onClick={onCreate}>
        {t("credentials.not_found.create_btn")}
      </Button>
    </div>
  );
};

export default NoCredentials;
