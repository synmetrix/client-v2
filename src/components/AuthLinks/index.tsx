import { Space } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import useLocation from "@/hooks/useLocation";

import styles from "./index.module.less";

import type { FC } from "react";

interface AuthLinksProps {
  page?: string;
}

const AuthLinks: FC<AuthLinksProps> = ({ page }) => {
  const { t } = useTranslation(["common"]);
  const [, setLocation] = useLocation();

  return (
    <Space>
      {page !== "signin" && (
        <Button
          className={styles.btn}
          type={page === "signup" ? "primary" : "link"}
          onClick={() => setLocation("signin")}
        >
          {page === "signup"
            ? t("common:words.login")
            : t("common:words.sign_in")}
        </Button>
      )}
      {page !== "signup" && (
        <Button
          className={styles.btn}
          type="primary"
          onClick={() => setLocation("signup")}
        >
          {t("common:words.sign_up")}
        </Button>
      )}
    </Space>
  );
};

export default AuthLinks;
