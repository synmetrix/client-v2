import { Space } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";

import type { FC } from "react";

interface AuthLinksProps {
  page?: string;
}

const AuthLinks: FC<AuthLinksProps> = ({ page }) => {
  const { t } = useTranslation(["common"]);
  return (
    <Space>
      {page !== "signin" && (
        <Button type={page === "signup" ? "primary" : "link"}>
          {page === "signup"
            ? t("common:words.login")
            : t("common:words.sign_in")}
        </Button>
      )}
      {page !== "signup" && (
        <Button type="primary">{t("common:words.sign_up")}</Button>
      )}
    </Space>
  );
};

export default AuthLinks;
