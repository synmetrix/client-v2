import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoExploration from "@/assets/no-exploration.png";

import styles from "./index.module.less";

const { Title, Text } = Typography;

const ExptyExploration = () => {
  const { t } = useTranslation(["explore"], { useSuspense: false });

  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoExploration} alt="" />
      <Title level={4}>{t("no_query.header")}</Title>
      <>
        <Text className={styles.text}>{t("no_query.text")}</Text>
      </>
    </div>
  );
};

export default ExptyExploration;
