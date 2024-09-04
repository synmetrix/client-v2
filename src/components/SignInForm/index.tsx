import { Form, Typography } from "antd";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import Input from "@/components/Input";
import useLocation from "@/hooks/useLocation";
import validate from "@/utils/helpers/validations";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

export interface SignInFormType {
  username: string;
  password: string;
}

interface SignInFormProps {
  loading: boolean;
  onSubmit: (data: SignInFormType) => void;
}

const SignInForm: FC<SignInFormProps> = ({ loading, onSubmit }) => {
  const [, setLocation] = useLocation();

  const { t } = useTranslation(["sign", "common"]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title level={2}>{t("sign_in.title")}</Title>
        <Text className={styles.desc}>{t("sign_in.text")}!</Text>
      </div>
      <Form className={styles.form}>
        <Input
          className={cn(styles.formItem, styles.input, {
            [styles.error]: errors?.username,
          })}
          variant="borderless"
          placeholder={t("common:form.placeholders.username")}
          control={control}
          name="username"
        />
        <Input
          className={cn(styles.formItem, styles.input, {
            [styles.error]: errors?.password,
          })}
          variant="borderless"
          placeholder={t("common:form.placeholders.password")}
          control={control}
          rules={{
            required: true,
          }}
          name="password"
          fieldType="password"
        />
        <Button
          className={styles.submit}
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {t("sign_in.login")}
        </Button>
      </Form>
    </div>
  );
};

export default SignInForm;
