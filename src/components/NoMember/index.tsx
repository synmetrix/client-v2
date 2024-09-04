import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import NoMemberImg from "@/assets/no-member.png";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

interface NoMemberProps {
  onInvite?: () => void;
}

const NoMember: FC<NoMemberProps> = ({ onInvite = () => {} }) => {
  const { t } = useTranslation(["settings", "common"]);
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={NoMemberImg} alt="" />
      <Title level={4}>{t("members.not_found.title")}</Title>
      <Text className={styles.text}>{t("members.not_found.text")}</Text>
    </div>
  );
};

export default NoMember;
