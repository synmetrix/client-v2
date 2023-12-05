import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoRolesImg from "@/assets/no-roles.png";
import Button from "@/components/Button";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

interface NoRolesProps {
  onCreate?: () => void;
}

const NoRoles: FC<NoRolesProps> = ({ onCreate }) => {
  const { t } = useTranslation(["settings", "common"]);
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoRolesImg} alt="" />
      <Title level={4}>{t("roles_and_access.not_found.title")}</Title>

      <Text className={styles.text}>
        {t("roles_and_access.not_found.text")}
      </Text>
      <Button size="large" type="primary" onClick={onCreate}>
        {t("roles_and_access.not_found.create_btn")}
      </Button>
    </div>
  );
};

export default NoRoles;
