import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoTeamsImg from "@/assets/no-teams.png";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const NoTeams: FC = () => {
  const { t } = useTranslation(["teams", "common"]);
  return (
    <div className={styles.wrapper} data-testid="no-teams">
      <img className={styles.img} src={NoTeamsImg} alt="" />
      <Title level={4}>{t("not_found.title")}</Title>
      <Text className={styles.text}>{t("not_found.text")}</Text>
    </div>
  );
};

export default NoTeams;
