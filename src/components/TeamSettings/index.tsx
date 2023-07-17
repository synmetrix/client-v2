import { Form, Typography } from "antd";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import Input from "@/components/Input";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title } = Typography;

interface TeamSettingsForm {
  name: string;
}

const TeamSettings: FC = () => {
  const { t } = useTranslation(["settings", "common"]);
  const { control, handleSubmit } = useForm<TeamSettingsForm>();

  return (
    <Form layout="vertical">
      <Title level={4}>{t("members.team_settings.title")}</Title>

      <Input
        label={t("members.team_settings.form.labels.team_name")}
        name="name"
        control={control}
        rules={{ required: true }}
      />

      <Button
        className={styles.submit}
        size="large"
        type="primary"
        onClick={handleSubmit(console.log)}
      >
        Save
      </Button>
    </Form>
  );
};

export default TeamSettings;
