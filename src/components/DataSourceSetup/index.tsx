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
  DynamicForm,
  DataSoureSetupField,
} from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

interface DataSourceSetupProps {
  dataSource: DataSource;
  fields: DataSoureSetupField[];
  name: string;
  onSubmit: (values: DynamicForm) => void;
  initialValue?: DynamicForm;
}

const DataSourceSetup: FC<DataSourceSetupProps> = ({
  dataSource,
  fields,
  name,
  onSubmit,
  initialValue,
}) => {
  const { t } = useTranslation(["dataSetupForm", "common"]);

  const [error, setError] = useState<boolean>(false);
  const windowSize = useResponsive();

  const { control, handleSubmit } = useForm<DynamicForm>({
    defaultValues: initialValue,
  });

  const renderField = (field: DataSoureSetupField) => {
    switch (field.type) {
      case "checkbox":
        return (
          <Controller
            control={control}
            name={field.name}
            defaultValue={field.value}
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
            name={field.name}
            defaultValue={field.value}
            render={({ field: { value, onChange } }) => (
              <Form.Item
                className={styles.label}
                name={field.name}
                label={field.label}
              >
                <Input.Password
                  placeholder={field.placeholder}
                  type={field.type}
                  defaultValue={field.value}
                  value={value}
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
            name={field.name}
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
          control={control}
          name="name"
          defaultValue={name}
          render={({ field: { value, onChange } }) => (
            <Form.Item className={styles.label} label="Name*" name="name">
              <Input
                placeholder={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled
              />
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
            onClick={() => setError(true)}
          >
            {t("common:words.test_connection")}
          </Button>

          <Button className={cn(styles.link, styles.skip)} type="link">
            {t("common:words.skip")}
          </Button>
        </Row>
      </Form>
      {error && <Alert message="Error" type="error" />}
    </div>
  );
};

export default DataSourceSetup;
