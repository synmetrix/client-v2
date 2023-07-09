import { Button, Col, Form, Row, Typography } from "antd";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import { useForm } from "react-hook-form";

import type { ApiSetupField, ApiSetupForm } from "@/types/dataSource";
import Input from "@/components/Input";

import CopyIcon from "@/assets/copy.svg";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const CONNECTION_DEFAULT = "mysql";

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
  onSubmit: (data: ApiSetupForm) => void;
  onGoBack: () => void;
  onSkip: () => void;
  onDownload: () => void;
  initialValue: ApiSetupForm;
  connectionOptions?: ApiSetupField[];
}

const connectionData = [
  { label: "Host/URL", value: "username", name: "username" },
  { label: "Database", value: "db", name: "db" },
  {
    label: "Login (auto-generated)",
    name: "db_username",
  },
  {
    label: "Password (auto-generated)",
    type: "password",
    name: "password",
  },
];

const ApiSetup: FC<ApiSetupProps> = ({
  connectionOptions = defaultConnectionOptions,
  onSubmit,
  onSkip,
  onGoBack,
  onDownload,
  initialValue,
}) => {
  const { control, handleSubmit, getValues, watch, resetField } =
    useForm<ApiSetupForm>();

  const { t } = useTranslation(["apiSetup", "common"]);
  const windowSize = useResponsive();

  const createConnectionString = useCallback(
    (connection: string = CONNECTION_DEFAULT) => `${connection}  --host=${
      initialValue.host
    }
    - -user=${initialValue.user}
    - -port=${initialValue.port}
    - -password=${"*".repeat(initialValue.password?.length)}`,
    [
      initialValue.host,
      initialValue.password?.length,
      initialValue.port,
      initialValue.user,
    ]
  );

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "connection")
        resetField("connection_string", {
          defaultValue: createConnectionString(value.connection),
        });
    });

    return () => subscription.unsubscribe();
  }, [createConnectionString, resetField, watch]);

  return (
    <div>
      <Title level={3}>{t("title")}</Title>

      <Text>{t("text")}</Text>

      <Form layout="vertical" id="api-setup">
        <Input
          control={control}
          name="name"
          defaultValue={initialValue.name}
          label="Data source"
          disabled
        />

        <Input
          control={control}
          name="connection"
          label="Connect via"
          size="large"
          optionType="button"
          options={connectionOptions}
          defaultValue={CONNECTION_DEFAULT}
          fieldType="radio"
        />

        <Row gutter={[16, 16]}>
          {connectionData.map((f) => {
            const name = f.name as keyof ApiSetupForm;
            return (
              <Col key={f.label} xs={24} sm={12}>
                <Input
                  control={control}
                  name={name}
                  defaultValue={initialValue?.[name]}
                  fieldType={f.type}
                  label={f.label}
                  disabled
                  suffix={
                    <CopyIcon
                      className={styles.icon}
                      onClick={() =>
                        navigator.clipboard.writeText(getValues(name) || "")
                      }
                    />
                  }
                />
              </Col>
            );
          })}
        </Row>

        <div className={cn(styles.textareaWrapper, styles.label)}>
          <Input
            control={control}
            defaultValue={createConnectionString()}
            name="connection_string"
            fieldType="textarea"
            label={`Connect using ${watch("connection")}-client`}
            disabled
          />

          <CopyIcon
            className={cn(styles.icon, styles.textareaCopy)}
            onClick={() =>
              navigator.clipboard.writeText(
                getValues("connection_string") || ""
              )
            }
          />
        </div>

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
