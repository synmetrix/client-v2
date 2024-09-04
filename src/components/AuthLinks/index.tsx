import { Space } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import useLocation from "@/hooks/useLocation";
import { SIGNIN } from "@/utils/constants/paths";

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
          type="link"
          onClick={() => setLocation(SIGNIN)}
        >
          {t("common:words.sign_in")}
        </Button>
      )}
    </Space>
  );
};

export default AuthLinks;
