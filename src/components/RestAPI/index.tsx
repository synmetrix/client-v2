import { Col, Form, Row, Input as Output } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import Button from "@/components/Button";
import validations from "@/utils/helpers/validations";

import styles from "./index.module.less";

const RestAPI = () => {
  const { t } = useTranslation(["explore", "common"], { useSuspense: false });
  const [response, setResponse] = useState();
  const { control, handleSubmit } = useForm({
    // values: initialValue,
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <Form layout="vertical">
        <Input
          label={t("common:form.labels.json")}
          name="json"
          fieldType="textarea"
          control={control}
          rules={{
            required: true,
            validate: (v: string) =>
              validations.json(v) || t("common:form.errors.json"),
          }}
        />
        <Row style={{ width: "100%" }} gutter={[16, 16]}>
          <Col xs={12}>
            <Input
              label={t("common:form.labels.auth_token")}
              name="token"
              control={control}
              rules={{
                required: true,
              }}
            />
          </Col>
          <Col xs={12}>
            <Input
              disabled
              label={t("common:form.labels.url")}
              name="url"
              control={control}
            />
          </Col>
        </Row>

        <Button
          className={styles.submit}
          size="large"
          type="primary"
          onClick={handleSubmit(onSubmit)}
        >
          {t("common:words.send_request")}
        </Button>

        {response && (
          <Row style={{ width: "100%" }} gutter={[16, 16]}>
            <Col xs={24}>
              <span>{t("common:form.labels.request_output")}</span>
              <Output.TextArea disabled value={""} />
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
};

export default RestAPI;
