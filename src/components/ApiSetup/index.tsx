import { Button, Col, Form, Input, Radio, Row, Typography } from "antd";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import { Controller, useForm } from "react-hook-form";

import type { ApiSetupField, DynamicForm } from "@/types/dataSource";

import CopyIcon from "@/assets/copy.svg";
import EyeIcon from "@/assets/eye.svg";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const Password: FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange,
}) => {
  const [type, setType] = useState<"text" | "password">("password");

  return (
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      suffix={
        <EyeIcon
          className={styles.icon}
          onClick={() =>
            setType((prevState) => (prevState === "text" ? "password" : "text"))
          }
        />
      }
    />
  );
};

interface ApiSetupProps {
  connectionData: ApiSetupField[];
  connectionOptions: ApiSetupField[];
  connectionString: string;
  onSubmit: (data: DynamicForm) => void;
  initialValue?: DynamicForm;
}

const ApiSetup: FC<ApiSetupProps> = ({
  connectionData,
  connectionOptions,
  connectionString,
  initialValue,
  onSubmit,
}) => {
  const { control, handleSubmit } = useForm<DynamicForm>({
    defaultValues: initialValue,
  });

  const { t } = useTranslation(["apiSetup", "common"]);
  const windowSize = useResponsive();
  return (
    <div>
      <Title level={3}>{t("title")}</Title>

      <Text>{t("text")}</Text>

      <Form layout="vertical" id="api-setup">
        <Controller
          name="name"
          control={control}
          defaultValue={initialValue?.name}
          render={({ field: { onChange, value } }) => (
            <Form.Item label="Data source" className={styles.label}>
              <Input value={value} onChange={(e) => onChange(e.target.value)} />
            </Form.Item>
          )}
        />

        <Controller
          control={control}
          name="connection"
          defaultValue={initialValue?.connection}
          render={({ field: { value, onChange } }) => (
            <Form.Item label="Connect via" className={styles.label}>
              <Radio.Group
                value={value}
                onChange={(e) => onChange(e.target.value)}
                size="large"
                optionType="button"
              >
                {connectionOptions.map((o) => (
                  <Radio
                    className={styles.radio}
                    key={o.value}
                    value={o.value}
                    disabled={o.disabled}
                  >
                    {o.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          )}
        />

        <Row gutter={[16, 16]}>
          {connectionData.map((f) => (
            <Col key={f.label} xs={24} sm={12}>
              <Controller
                control={control}
                name={f.name}
                defaultValue={f.value}
                render={({ field: { value, onChange } }) => (
                  <Form.Item label={f.label} className={styles.label}>
                    {f.type === "password" ? (
                      <Password value={value} onChange={onChange} />
                    ) : (
                      <Input
                        type={f.type}
                        value={value}
                        suffix={
                          <CopyIcon
                            className={styles.icon}
                            onClick={() =>
                              navigator.clipboard.writeText(f.value)
                            }
                          />
                        }
                      />
                    )}
                  </Form.Item>
                )}
              />
            </Col>
          ))}
        </Row>

        <Form.Item
          className={cn(styles.textareaWrapper, styles.label)}
          label="Connect using mysql-client"
        >
          <Input.TextArea
            style={{ resize: "none", height: 104 }}
            className={styles.textarea}
            value={connectionString}
            disabled
          />

          <CopyIcon
            className={cn(styles.icon, styles.textareaCopy)}
            onClick={() => navigator.clipboard.writeText(connectionString)}
          />
        </Form.Item>

        <Row>
          <Button
            className={cn(styles.back, { [styles.sm]: !windowSize.sm })}
            size="large"
            color="primary"
          >
            {t("common:words.back")}
          </Button>
          <Button
            className={cn(styles.submit, { [styles.sm]: !windowSize.sm })}
            type="primary"
            size="large"
            htmlType="submit"
            form="api-setup"
            onClick={handleSubmit(onSubmit)}
          >
            {t("common:words.finish")}
          </Button>

          <Button className={styles.link} type="link">
            {t("common:words.download_credentials")}
          </Button>

          <Button className={cn(styles.link, styles.skip)} type="link">
            {t("common:words.skip")}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default ApiSetup;
