import {
  Alert,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import cn from "classnames";
import { Controller, useForm } from "react-hook-form";

import type {
  DataSource,
  DataSoureSetupField,
  DataSourceSetupForm,
} from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

interface DataSourceSetupProps {
  dataSource: DataSource;
  fields: DataSoureSetupField[];
  onSubmit: (values: DataSourceSetupForm) => void;
  onGoBack: () => void;
  onSkip: () => void;
  onTestConnection: () => void;
  initialValue?: DataSourceSetupForm;
}

const DataSourceSetup: FC<DataSourceSetupProps> = ({
  dataSource,
  fields,
  onSubmit,
  onGoBack,
  onSkip,
  onTestConnection,
  initialValue,
}) => {
  const { t } = useTranslation(["dataSetupForm", "common"]);

  const [error, setError] = useState<boolean>(false);
  const windowSize = useResponsive();

  const { control, handleSubmit } = useForm<DataSourceSetupForm>();

  const renderField = (field: DataSoureSetupField) => {
    const name = field.name.split(".")[1];
    const defaultValue = initialValue?.db_params?.[name];
    switch (field.type) {
      case "checkbox":
        return (
          <Controller
            control={control}
            name={`db_params.${name}`}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => (
              <Form.Item
                className={styles.label}
                name={field.name}
                label={field.label}
              >
                <Checkbox
                  checked={value === "yes"}
                  onChange={() => onChange(value === "yes" ? "no" : "yes")}
                >
                  <span className={styles.checkbox}>{field.placeholder}</span>
                </Checkbox>
              </Form.Item>
            )}
          />
        );
      case "password":
        return (
          <Controller
            control={control}
            name={`db_params.${name}`}
            defaultValue={defaultValue}
            render={({ field: { value, onChange } }) => (
              <Form.Item
                className={styles.label}
                name={field.name}
                label={field.label}
              >
                <Input.Password
                  placeholder={field.placeholder}
                  type={field.type}
                  value={value}
                  defaultValue={defaultValue}
                  onChange={(e) => onChange(e.target.value)}
                />
              </Form.Item>
            )}
          />
        );
      default:
        return (
          <Controller
            control={control}
            name={`db_params.${name}`}
            defaultValue={defaultValue}
            render={({ field: { value, onChange } }) => (
              <Form.Item
                className={styles.label}
                key={field.name}
                name={field.name}
                label={field.label}
              >
                <Input
                  placeholder={field.placeholder}
                  type={field.type}
                  defaultValue={defaultValue}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                />
              </Form.Item>
            )}
          />
        );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.dataSource}>
          <div className={styles.iconWrapper}>{dataSource.icon}</div>
          <Title className={styles.title} level={3}>
            {dataSource.name}
          </Title>
        </div>

        <Text className={styles.text}>
          {t("text.line1")} <br /> {t("text.line2")}
        </Text>
      </div>
      <Form className={styles.form} id="setup-form" layout="vertical">
        <Controller
          name="name"
          control={control}
          defaultValue={initialValue?.name}
          render={({ field: { onChange, value } }) => (
            <Form.Item label="Name*" className={styles.label}>
              <Input value={value} onChange={(e) => onChange(e.target.value)} />
            </Form.Item>
          )}
        />
        <Row gutter={[16, 16]}>
          {fields.map((f) => (
            <Col key={f.name} xs={24} sm={12}>
              {renderField(f)}
            </Col>
          ))}
        </Row>

        <Row>
          <Button
            className={cn(styles.back, { [styles.sm]: !windowSize.sm })}
            size="large"
            color="primary"
            onClick={onGoBack}
          >
            {t("common:words.back")}
          </Button>
          <Button
            className={cn(styles.submit, { [styles.sm]: !windowSize.sm })}
            form="setup-form"
            type="primary"
            size="large"
            htmlType="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {t("common:words.apply")}
          </Button>

          <Button
            className={styles.link}
            type="link"
            onClick={onTestConnection}
          >
            {t("common:words.test_connection")}
          </Button>

          <Button
            className={cn(styles.link, styles.skip)}
            type="link"
            onClick={onSkip}
          >
            {t("common:words.skip")}
          </Button>
        </Row>
      </Form>
      {error && <Alert message="Error" type="error" />}
    </div>
  );
};

export default DataSourceSetup;
