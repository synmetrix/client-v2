import { Space } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import useLocation from "@/hooks/useLocation";

import styles from "./index.module.less";

import type { FC } from "react";

interface AuthLinksProps {
  currentPage?: string;
}

const AuthLinks: FC<AuthLinksProps> = ({ currentPage }) => {
  const { t } = useTranslation(["common"]);
  const [, setLocation] = useLocation();

  return (
    <Space>
      {currentPage !== "signin" && (
        <Button
          className={styles.btn}
          type={currentPage === "signup" ? "primary" : "link"}
          onClick={() => setLocation("/auth/signin")}
        >
          {currentPage === "signup"
            ? t("common:words.login")
            : t("common:words.sign_in")}
        </Button>
      )}
      {currentPage !== "signup" && (
        <Button
          className={styles.btn}
          type="primary"
          onClick={() => setLocation("/auth/signup")}
        >
          {t("common:words.sign_up")}
        </Button>
      )}
    </Space>
  );
};

export default AuthLinks;
