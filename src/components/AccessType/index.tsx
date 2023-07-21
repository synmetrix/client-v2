import { useTranslation } from "react-i18next";

import type { AccessType as Access } from "@/types/access";

import FullAccessIcon from "@/assets/access-full.svg";
import PartialAccessIcon from "@/assets/access-partial.svg";
import NoAccessIcon from "@/assets/access-no.svg";

import styles from "./index.module.less";

interface AccessTypeProps {
  access: Access;
}

import type { FC } from "react";

const AccessType: FC<AccessTypeProps> = ({ access }) => {
  const { t } = useTranslation(["common"]);

  const renderType = () => {
    switch (access) {
      case "full":
        return (
          <>
            <FullAccessIcon className={styles.icon} />
            {t("common:words.partial_access")}
          </>
        );
      case "partial":
        return (
          <>
            <PartialAccessIcon className={styles.icon} />
            {t("common:words.full_access")}
          </>
        );

      default:
        return (
          <>
            <NoAccessIcon className={styles.icon} />
            {t("common:words.no_access")}
          </>
        );
    }
  };

  return <div className={styles.type}>{renderType()}</div>;
};

export default AccessType;
