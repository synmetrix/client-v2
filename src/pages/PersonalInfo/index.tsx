import { Space } from "antd";
import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import GeneralInfoForm from "@/components/GeneralInfoForm";
import SecurityForm from "@/components/SecurityForm";
import LogoutSessions from "@/components/LogoutSessions";

import styles from "./index.module.less";

const PersonalInfo: React.FC = () => {
  const { t } = useTranslation(["settings", "pages"]);

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:settings.personal_info") }}
    >
      <Space className={styles.wrapper} direction="vertical" size={25}>
        <GeneralInfoForm onSubmit={console.log} />
        <SecurityForm onSubmit={console.log} />
        <LogoutSessions />
      </Space>
    </BasicLayout>
  );
};

export default PersonalInfo;
