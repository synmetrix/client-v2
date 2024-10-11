import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoSqlCredentialsImg from "@/assets/no-credentials.png";
import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

interface NoSqlCredentialsProps {
  editPermission?: boolean;
  onAttach: () => void;
}

const NoSqlCredentials: FC<NoSqlCredentialsProps> = ({
  editPermission,
  onAttach = () => {},
}) => {
  const { t } = useTranslation(["settings", "common"]);
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoSqlCredentialsImg} alt="" />
      <Title level={4}>{t("sql_api.not_found.title")}</Title>
      <Text className={styles.text}>{t("sql_api.not_found.text")}</Text>
      {editPermission && (
        <Button size="large" type="primary" onClick={onAttach}>
          {t("sql_api.not_found.attach_btn")}
        </Button>
      )}
    </div>
  );
};

export default NoSqlCredentials;
