import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title } = Typography;

export type LogoutSessionProps = {
  onSubmit?: () => void;
};

const LogoutSessions: FC<LogoutSessionProps> = ({ onSubmit = () => {} }) => {
  const { t } = useTranslation(["settings"]);
  return (
    <div>
      <Title className={styles.title} level={5}>
        {t("personal_info.logout_sessions.title")}
      </Title>

      <Button
        className={styles.btn}
        type="text"
        size="large"
        onClick={onSubmit}
      >
        {t("personal_info.logout_sessions.logout")}
      </Button>
    </div>
  );
};

export default LogoutSessions;
