import { Form, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import cn from "classnames";

import Button from "@/components/Button";
import Input from "@/components/Input";
import validate from "@/utils/validations";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

export interface SignInFormType {
  email: string;
  password: string;
}

interface SignInFormProps {
  onSubmit: (data: SignInFormType) => void;
}

const SignInForm: FC<SignInFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation(["sign", "common"]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title>{t("sign_in.title")}</Title>
        <Text>{t("sign_in.text")}</Text>
      </div>

      <Form className={styles.form}>
        <Input
          className={cn(styles.formItem, styles.input, {
            [styles.error]: errors?.email,
          })}
          bordered={false}
          placeholder={t("common:form.placeholders.email")}
          control={control}
          rules={{ required: true }}
          name="email"
        />
        <Input
          className={cn(styles.formItem, styles.input, {
            [styles.error]: errors?.password,
          })}
          bordered={false}
          placeholder={t("common:form.placeholders.password")}
          control={control}
          rules={{
            required: t("common:form.errors.password"),
            validate: validate.passsword,
          }}
          name="password"
          fieldType="password"
        />
        <Button
          className={styles.formItem}
          type="primary"
          htmlType="submit"
          onClick={handleSubmit(onSubmit)}
        >
          {t("sign_in.login")}
        </Button>

        <Text className={styles.text}>
          {t("sign_in.bottom_text")}{" "}
          <Button className={styles.link} type="link">
            {t("sign_in.sign_up_link")}
          </Button>
        </Text>
      </Form>
    </div>
  );
};

export default SignInForm;
