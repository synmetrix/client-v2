import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoMemberImg from "@/assets/no-member.png";
import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const NoDataSource: FC = () => {
  const { t } = useTranslation(["settings", "common"]);
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoMemberImg} alt="" />
      <Title level={4}>{t("members.not_found.title")}</Title>
      <Text className={styles.text}>{t("members.not_found.text")}</Text>
      <Button size="large" type="primary">
        {t("members.not_found.invite_btn")}
      </Button>
    </div>
  );
};

export default NoDataSource;
