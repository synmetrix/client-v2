import { useTranslation } from "react-i18next";
import { Col, Row, Typography, Descriptions } from "antd";

import styles from "./index.module.less";

import type { FC } from "react";

export interface GeneralInfo {
  displayName: string;
  email: string;
}

interface GeneralInfoFormProps {
  initialValue?: GeneralInfo;
}

const { Title } = Typography;

const GeneralInfoForm: FC<GeneralInfoFormProps> = ({ initialValue }) => {
  const { t } = useTranslation(["settings", "common"]);

  const items = [
    {
      key: "displayName",
      label: t("common:form.labels.full_name"),
      children: <p>{initialValue?.displayName}</p>,
    },
    {
      key: "email",
      label: t("common:form.placeholders.email"),
      children: <p>{initialValue?.email}</p>,
    },
  ];

  return (
    <>
      <Title level={5} className={styles.title}>
        {t("personal_info.general_info.title")}
      </Title>

      <Descriptions title="User Info" items={items} />
    </>
  );
};

export default GeneralInfoForm;
