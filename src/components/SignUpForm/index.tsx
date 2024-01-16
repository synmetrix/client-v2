import { Form, Typography } from "antd";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import Input from "@/components/Input";
import useLocation from "@/hooks/useLocation";
import validate from "@/utils/helpers/validations";
import { SIGNIN, SIGNUP } from "@/utils/constants/paths";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

export interface SignUpFormType {
  email: string;
  password?: string;
  privacy?: boolean;
}

interface SignUpProps {
  onSubmit: (data: SignUpFormType) => void;
  isMagicLink: boolean;
}

const SignUpForm: FC<SignUpProps> = ({ onSubmit, isMagicLink }) => {
  const [, setLocation] = useLocation();

  const { t } = useTranslation(["sign", "common"]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title level={2}>{t("sign_up.title")}</Title>
        <Text className={styles.desc}>{t("sign_up.text")}!</Text>
      </div>
      <div className={styles.magicLinkWrapper}>
        <Button
          className={styles.magicLink}
          type="default"
          size="large"
          block
          onClick={() =>
            isMagicLink
              ? setLocation(SIGNUP)
              : setLocation(`${SIGNUP}?magicLink`)
          }
        >
          {isMagicLink ? t("sign_up.sign_up") : t("sign_up.magic_link_login")}
        </Button>
      </div>
      <div className={styles.or}>{t("sign_up.or")}</div>
      <Form className={styles.form}>
        <Input
          className={cn(styles.formItem, styles.input, {
            [styles.error]: errors?.email,
          })}
          variant="borderless"
          placeholder={t("common:form.placeholders.email")}
          control={control}
          rules={{
            required: true,
            validate: (v: string) =>
              validate.email(v) || t("common:form.errors.email"),
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
              validate: (v: string) =>
                validate.password(v) || t("common:form.errors.password"),
            }}
            name="password"
            fieldType="password"
          />
        )}

        <div className={styles.checkboxWrapper}>
          <Input
            className={styles.checkbox}
            control={control}
            rules={{ required: true }}
            name="privacy"
            fieldType="checkbox"
          >
            <span>
              {t("sign_up.privacy_text_1")}{" "}
              <Button
                className={cn(styles.link, styles.privacyLink)}
                type="link"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {t("sign_up.privacy_link_1")}
              </Button>{" "}
              {t("sign_up.privacy_text_2")}{" "}
              <Button
                className={cn(styles.link, styles.privacyLink)}
                type="link"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {t("sign_up.privacy_link_2")}
              </Button>
            </span>
          </Input>
        </div>

        <Button
          className={styles.submit}
          type="primary"
          htmlType="submit"
          size="large"
          onClick={handleSubmit(onSubmit)}
        >
          {t("sign_up.sign_up")}
        </Button>

        <Text className={styles.text}>
          {t("sign_up.bottom_text")}{" "}
          <Button
            className={styles.link}
            type="link"
            onClick={() => setLocation(SIGNIN)}
          >
            {t("sign_up.sign_in_link")}
          </Button>
        </Text>
      </Form>
    </div>
  );
};

export default SignUpForm;
