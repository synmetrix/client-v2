import { Alert, Col, Form, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import cn from "classnames";
import { useForm } from "react-hook-form";

import type {
  DataSource,
  DataSoureSetupField,
  DataSourceSetupForm,
} from "@/types/dataSource";
import Input from "@/components/Input";
import Button from "@/components/Button";
import DataSourceStore from "@/stores/DataSourceStore";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

interface DataSourceSetupProps {
  dataSource: DataSource;
  fields: DataSoureSetupField[];
  onSubmit: (values: DataSourceSetupForm) => void;
  onGoBack: () => void;
  onSkip: () => void;
  onTestConnection: (data: DataSourceSetupForm) => void;
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
  const { id } = DataSourceStore();

  const [error] = useState<boolean>(false);

  const windowSize = useResponsive();

  const { control, handleSubmit } = useForm<DataSourceSetupForm>();

  const getLabel = (key: string) => t(`common:form.labels.${key}`, key);
  const getPlaceholder = (key?: string) =>
    key ? t(`common:form.placeholders.${key}`, key) : "";

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
        <Input
          rules={{
            required: true,
          }}
          control={control}
          name="name"
          label={getLabel("name")}
          placeholder={getPlaceholder("name")}
          defaultValue={initialValue?.name}
        />

        <Row gutter={16}>
          {fields.map((f) => {
            const name = f.name.split(".")[1];
            const defaultValue = initialValue?.db_params?.[name];
            return (
              <Col key={f.name} xs={24} sm={12}>
                <Input
                  rules={f.rules}
                  control={control}
                  fieldType={f.type}
                  name={`db_params.${name}`}
                  placeholder={getPlaceholder(f.placeholder)}
                  label={getLabel(f.label)}
                  defaultValue={defaultValue}
                />
              </Col>
            );
          })}
        </Row>

        <Row align="middle" justify="space-between">
          <Col xs={24} md={18}>
            {!id && (
              <Button
                className={cn(styles.back, {
                  [styles.fullwidth]: !windowSize.md,
                })}
                size="large"
                color="primary"
                onClick={onGoBack}
              >
                {t("common:words.back")}
              </Button>
            )}
            <Button
              className={cn(styles.submit, {
                [styles.fullwidth]: !windowSize.md,
              })}
              form="setup-form"
              type="primary"
              size="large"
              htmlType="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {id ? t("common:words.save") : t("common:words.apply")}
            </Button>

            <Button
              className={cn(styles.link, {
                [styles.fullwidth]: !windowSize.md,
              })}
              type="link"
              onClick={handleSubmit(onTestConnection)}
            >
              {t("common:words.test_connection")}
            </Button>
          </Col>

          <Col
            xs={24}
            md={6}
            className={cn(styles.skip, { [styles.center]: !windowSize.md })}
          >
            {!id && (
              <Button
                className={cn(styles.link, {
                  [styles.fullwidth]: !windowSize.md,
                })}
                type="link"
                onClick={onSkip}
              >
                {t("common:words.skip")}
              </Button>
            )}
          </Col>
        </Row>
      </Form>
      {error && (
        <Alert
          message={<span className={styles.error}>Error</span>}
          type="error"
        />
      )}
    </div>
  );
};

export default DataSourceSetup;
