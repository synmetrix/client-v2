import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title } = Typography;

const LogoutSessions: FC = () => {
  const { t } = useTranslation(["settings"]);
  return (
    <div>
      <Title level={5}>{t("personal_info.logout_sessions.title")}</Title>

      <Button className={styles.btn} type="text" size="large">
        {t("personal_info.logout_sessions.logout")}
      </Button>
    </div>
  );
};

export default LogoutSessions;
