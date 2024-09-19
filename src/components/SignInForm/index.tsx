import { Form, Typography } from "antd";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import Input from "@/components/Input";
import useLocation from "@/hooks/useLocation";
import { SIGNIN, SIGNUP } from "@/utils/constants/paths";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const VITE_ENABLE_LDAP_LOGIN = import.meta.env.VITE_ENABLE_LDAP_LOGIN;

export interface SignInFormType {
  email: string;
  password?: string;
  useLDAP?: string;
}

interface SignInFormProps {
  isMagicLink: boolean;
  loading: boolean;
  onSubmit: (data: SignInFormType) => void;
}

const SignInForm: FC<SignInFormProps> = ({
  isMagicLink,
  loading,
  onSubmit,
}) => {
  const [, setLocation] = useLocation();

  const { t } = useTranslation(["sign", "common"]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignInFormType>();

  useEffect(() => {
    if (isMagicLink) {
      setValue("password", undefined);
    }
  }, [isMagicLink, setValue]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title level={2}>{t("sign_in.title")}</Title>
        <Text className={styles.desc}>{t("sign_in.text")}!</Text>
      </div>

      <div className={styles.magicLinkWrapper}>
        <Button
          className={styles.magicLink}
          block
          size="large"
          type="default"
          onClick={() =>
            isMagicLink
              ? setLocation(SIGNIN)
              : setLocation(`${SIGNIN}?magicLink`)
          }
        >
          {isMagicLink
            ? t("sign_in.sign_in_password")
            : t("sign_in.magic_link_login")}
        </Button>
      </div>
      <div className={styles.or}>{t("sign_in.or")}</div>
      <Form className={styles.form}>
        <Input
          className={cn(styles.formItem, styles.input, {
            [styles.error]: errors?.email,
          })}
          variant="borderless"
          placeholder={t("common:form.placeholders.email_username")}
          control={control}
          rules={{
            required: true,
          }}
          name="email"
        />
        {!isMagicLink && (
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
        )}
        {VITE_ENABLE_LDAP_LOGIN && (
          <Input control={control} name="useLDAP" fieldType="checkbox">
            <span>{t("common:form.labels.use_ldap")}</span>
          </Input>
        )}
        <Button
          className={styles.submit}
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {isMagicLink ? t("sign_in.send_link") : t("sign_in.login")}
        </Button>

        <Text className={styles.text}>
          {t("sign_in.bottom_text")}{" "}
          <Button
            className={styles.link}
            type="link"
            onClick={() => setLocation(SIGNUP)}
          >
            {t("sign_in.sign_up_link")}
          </Button>
        </Text>
      </Form>
    </div>
  );
};

export default SignInForm;
