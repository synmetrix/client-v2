import { Button, Col, Form, Row, Typography } from "antd";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import { useForm } from "react-hook-form";

import type { ApiSetupField, DynamicForm } from "@/types/dataSource";
import Input from "@/components/Input";

import CopyIcon from "@/assets/copy.svg";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const defaultConnectionOptions = [
  {
    value: "mysql",
    label: "MySQL",
    disabled: false,
    name: "connection",
  },
  {
    value: "psql",
    label: "PSQL",
    disabled: false,
    name: "connection",
  },
];

interface ApiSetupProps {
  connectionData: ApiSetupField[];
  connectionString: string;
  onSubmit: (data: DynamicForm) => void;
  onGoBack: () => void;
  onSkip: () => void;
  onDownload: () => void;
  connectionOptions?: ApiSetupField[];
  initialValue?: DynamicForm;
}

const ApiSetup: FC<ApiSetupProps> = ({
  connectionData,
  connectionOptions = defaultConnectionOptions,
  connectionString,
  onSubmit,
  onSkip,
  onGoBack,
  onDownload,
  initialValue,
}) => {
  const { control, handleSubmit, getValues } = useForm<DynamicForm>();

  const { t } = useTranslation(["apiSetup", "common"]);
  const windowSize = useResponsive();
  return (
    <div>
      <Title level={3}>{t("title")}</Title>

      <Text>{t("text")}</Text>

      <Form layout="vertical" id="api-setup">
        <Input
          control={control}
          name="name"
          defaultValue={initialValue?.name}
          label="Data source"
        />

        <Input
          control={control}
          name="connection"
          label="Connect via"
          size="large"
          optionType="button"
          options={connectionOptions}
          fieldType="radio"
        />

        <Row gutter={[16, 16]}>
          {connectionData.map((f) => (
            <Col key={f.label} xs={24} sm={12}>
              <Input
                control={control}
                name={f.name}
                defaultValue={initialValue?.[f.name] || f.value}
                fieldType={f.type}
                suffix={
                  <CopyIcon
                    className={styles.icon}
                    onClick={() =>
                      navigator.clipboard.writeText(getValues(f.name))
                    }
                  />
                }
              />
            </Col>
          ))}
        </Row>

        <Form.Item
          className={cn(styles.textareaWrapper, styles.label)}
          label="Connect using mysql-client"
        >
          <Input
            control={control}
            defaultValue={connectionString}
            name="connection-string"
            fieldType="textarea"
          />

          <CopyIcon
            className={cn(styles.icon, styles.textareaCopy)}
            onClick={() =>
              navigator.clipboard.writeText(getValues("connection-string"))
            }
          />
        </Form.Item>

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
            type="primary"
            size="large"
            htmlType="submit"
            form="api-setup"
            onClick={handleSubmit(onSubmit)}
          >
            {t("common:words.finish")}
          </Button>

          <Button className={styles.link} type="link" onClick={onDownload}>
            {t("common:words.download_credentials")}
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
    </div>
  );
};

export default ApiSetup;
