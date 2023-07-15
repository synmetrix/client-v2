import { useTranslation } from "react-i18next";
import { Col, Form, Row, Typography } from "antd";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import Button from "@/components/Button";

import type { FC } from "react";

interface GeneralInfo {
  fullName: string;
  email: string;
}

interface GeneralInfoFormProps {
  initialValue?: GeneralInfo;
  onSubmit: (data: GeneralInfo) => void;
}

const { Title } = Typography;

const GeneralInfoForm: FC<GeneralInfoFormProps> = ({
  initialValue,
  onSubmit,
}) => {
  const { t } = useTranslation(["settings", "common"]);

  const { control, handleSubmit } = useForm<GeneralInfo>({
    defaultValues: initialValue,
  });
  return (
    <Form layout="vertical">
      <Title level={5}>{t("personal_info.general_info.title")}</Title>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Input
            control={control}
            rules={{ required: true }}
            name="fullName"
            label={t("common:form.labels.full_name")}
            defaultValue={initialValue?.fullName}
          />
        </Col>

        <Col span={24} md={12}>
          <Input
            control={control}
            rules={{ required: true }}
            name="email"
            label={t("common:form.labels.email")}
            defaultValue={initialValue?.fullName}
          />
        </Col>
      </Row>

      <Button
        htmlType="submit"
        size="large"
        type="primary"
        onClick={handleSubmit(onSubmit)}
      >
        {t("personal_info.general_info.update")}
      </Button>
    </Form>
  );
};

export default GeneralInfoForm;
