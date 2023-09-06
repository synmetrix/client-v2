import { Col, Form, Row, Typography } from "antd";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import { useForm } from "react-hook-form";

import type {
  ApiSetupField,
  ApiSetupForm,
  DataSourceInfo,
} from "@/types/dataSource";
import Input from "@/components/Input";
import Button from "@/components/Button";

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
  onGoBack?: () => void;
  initialValue: ApiSetupForm;
  connectionOptions?: ApiSetupField[];
  dataSources?: DataSourceInfo[];
  teamMembers?: any[];
}

const connectionData = [
  { label: "Host/URL", value: "host", name: "host", disabled: true },
  { label: "Database", value: "db", name: "db", disabled: true },
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
  initialValue,
  dataSources,
  teamMembers,
  onSubmit,
  onGoBack,
}) => {
  const { control, handleSubmit, setValue, getValues, watch, resetField } =
    useForm<ApiSetupForm>();

  const { t } = useTranslation(["apiSetup", "common"]);
  const windowSize = useResponsive();

  const isEdit = useMemo(() => !!dataSources?.length, [dataSources]);

  const getLabel = (key: string) => t(`common:form.labels.${key}`, key);

  const createConnectionString = useCallback(
    ({
      user = initialValue.user,
      host = initialValue.host,
      password = initialValue.password,
      connection = CONNECTION_DEFAULT,
    }) => `${connection}  --host=${host}
    - -user=${user}
    - -port=${initialValue.port}
    - -password=${"*".repeat(password?.length)}`,
    [
      initialValue.host,
      initialValue.password,
      initialValue.port,
      initialValue.user,
    ]
  );

  const onDownload = () => {
    const formValues = getValues();
    delete formValues.datasource_id;
    delete formValues.member_id;

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formValues, null, 2));
    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "credentials.json";
    link.click();
    link.remove();
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (
        ["password", "user", "datasource_id", "connection"].includes(name || "")
      ) {
        let connectionValues = {};
        if (dataSources?.length) {
          const datasource = dataSources?.find(
            (d) => d.id === value.datasource_id
          );
          const host = datasource?.dbParams.host;
          const db = datasource?.dbParams.database;

          setValue("host", host);
          setValue("db", db);

          connectionValues = {
            host,
          };
        }

        connectionValues = {
          user: value.user,
          password: value.password,
          connection: value.connection,
          ...connectionValues,
        };

        resetField("connection_string", {
          defaultValue: createConnectionString(connectionValues),
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [createConnectionString, dataSources, resetField, setValue, watch]);

  return (
    <div>
      <Title level={3}>{t("title")}</Title>

      <Text>{t("text")}</Text>

      <Form layout="vertical" id="api-setup">
        {isEdit ? (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Input
                control={control}
                name="member_id"
                fieldType="select"
                label={getLabel("team_member")}
                defaultValue={initialValue.member_id}
                options={(teamMembers || []).map((m) => ({
                  value: m.id,
                  label: m.displayName,
                }))}
              />
            </Col>
            <Col xs={24} sm={12}>
              <Input
                className={styles.input}
                control={control}
                name="datasource_id"
                fieldType="select"
                label={getLabel("data_source")}
                defaultValue={initialValue.datasource_id}
                options={(dataSources || []).map((d) => ({
                  value: d.id,
                  label: d.name,
                }))}
              />
            </Col>
          </Row>
        ) : (
          <Input
            control={control}
            name="name"
            defaultValue={initialValue.name}
            label={getLabel("data_source")}
            disabled
          />
        )}

        <Input
          control={control}
          name="connection"
          label={getLabel("connect_via")}
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
                  disabled={f.disabled || !isEdit}
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
            defaultValue={createConnectionString({})}
            name="connection_string"
            fieldType="textarea"
            label={`${getLabel("connect_using")} ${
              watch("connection") || CONNECTION_DEFAULT
            }-client`}
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

        <Row align="middle" justify={"space-between"}>
          <Col xs={24} md={18}>
            {!isEdit && (
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
              type="primary"
              size="large"
              htmlType="submit"
              form="api-setup"
              onClick={handleSubmit(onSubmit)}
            >
              {isEdit ? t("common:words.save") : t("common:words.finish")}
            </Button>

            <Button
              className={cn(styles.link, {
                [styles.fullwidth]: !windowSize.md,
              })}
              type="link"
              onClick={onDownload}
            >
              {t("common:words.download_credentials")}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ApiSetup;
