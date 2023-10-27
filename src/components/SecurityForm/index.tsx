import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Col, Form, Row, Typography } from "antd";

import Input from "@/components/Input";
import Button from "@/components/Button";
import validate from "@/utils/validations";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title } = Typography;

export interface Security {
  oldPassword: string;
  newPassword: string;
}

interface SecurityFormProps {
  onSubmit: (data: Security) => void;
  initialValue?: Security;
}

const SecurityForm: FC<SecurityFormProps> = ({ initialValue, onSubmit }) => {
  const { t } = useTranslation(["settings", "common"]);

  const { control, handleSubmit } = useForm<Security>({
    values: initialValue,
  });

  return (
    <Form layout="vertical">
      <Title className={styles.title} level={5}>
        {t("personal_info.security.title")}
      </Title>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Input
            control={control}
            name="oldPassword"
            label={t("common:form.labels.old_password")}
            defaultValue={initialValue?.oldPassword}
            fieldType="password"
          />
        </Col>

        <Col span={24} md={12}>
          <Input
            control={control}
            rules={{
              required: true,
              validate: (v: string) =>
                validate.password(v) || t("common:form.errors.password"),
            }}
            name="newPassword"
            label={t("common:form.labels.new_password")}
            defaultValue={initialValue?.newPassword}
            fieldType="password"
          />
        </Col>
      </Row>

      <Button
        htmlType="submit"
        size="large"
        type="primary"
        onClick={handleSubmit(onSubmit)}
      >
        {t("personal_info.security.update")}
      </Button>
    </Form>
  );
};

export default SecurityForm;
