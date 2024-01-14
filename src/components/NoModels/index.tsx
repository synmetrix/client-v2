import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoExploration from "@/assets/no-exploration.png";

import styles from "./index.module.less";

const { Title } = Typography;

const NoModels = () => {
  const { t } = useTranslation(["models"], { useSuspense: false });

  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoExploration} alt="" />
      <Title level={4}>{t("no_model")}</Title>
    </div>
  );
};

export default NoModels;
