import { Form, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import type { CredentialsFormType } from "@/types/credential";
import type { DataSourceInfo } from "@/types/dataSource";

import styles from "./index.module.less";

interface CredentialsFormProps {
  initialValue?: CredentialsFormType;
  dataSources?: DataSourceInfo[];
  onSubmit?: (data: CredentialsFormType) => void;
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  initialValue,
  dataSources,
  onSubmit = () => {},
}) => {
  const { t } = useTranslation(["common", "credentials"]);
  const { control, handleSubmit } = useForm<CredentialsFormType>({
    values: initialValue,
  });

  const onHandleSubmit = (data: CredentialsFormType) => {
    onSubmit(data);
  };

  return (
    <Form
      onFinish={handleSubmit(onHandleSubmit)}
      layout="vertical"
      className={styles.form}
    >
      <Input
        rules={{ required: true }}
        label={t("common:form.labels.data_source")}
        control={control}
        name="dataSourceId"
        fieldType="select"
        placeholder={t("common:form.placeholders.data_source")}
        options={(dataSources || []).map((ds) => ({
          label: ds.name,
          value: ds.id as string,
        }))}
        defaultValue={initialValue?.dataSourceId}
        disabled={!!initialValue?.id}
      />

      <Input
        rules={{ required: true }}
        label={t("common:form.labels.username")}
        control={control}
        name="username"
        placeholder={t("common:form.placeholders.login")}
        defaultValue={initialValue?.username}
      />

      <Input
        rules={{ required: false }}
        label={t("common:form.labels.password")}
        control={control}
        name="password"
        fieldType="password"
        placeholder={t("common:form.placeholders.password")}
        defaultValue={initialValue?.password}
      />

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValue?.id
            ? t("common:words.update")
            : t("common:words.create")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CredentialsForm;
