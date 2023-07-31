import { Space } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

interface AuthLinksProps {
  page?: string;
}

const AuthLinks: FC<AuthLinksProps> = ({ page }) => {
  const { t } = useTranslation(["common"]);
  return (
    <Space>
      {page !== "signin" && (
        <Button
          className={styles.btn}
          type={page === "signup" ? "primary" : "link"}
        >
          {page === "signup"
            ? t("common:words.login")
            : t("common:words.sign_in")}
        </Button>
      )}
      {page !== "signup" && (
        <Button className={styles.btn} type="primary">
          {t("common:words.sign_up")}
        </Button>
      )}
    </Space>
  );
};

export default AuthLinks;
