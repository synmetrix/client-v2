import {
  Col,
  Collapse,
  Form,
  Row,
  Space,
  Typography,
  Table,
  Alert,
} from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import cn from "classnames";

import StepFormHeader from "@/components/StepFormHeader";
import Button from "@/components/Button";
import NestedTag from "@/components/NestedTag";
import Input from "@/components/Input";
import QueryPreview from "@/components/QueryPreview";
import { capitalize } from "@/utils/helpers/capitalize";
import { QUERY_COLORS } from "@/utils/constants/colors";
import type { QueryPreview as QueryPreviewType } from "@/types/queryPreview";
import type { AlertFormType, AlertType } from "@/types/alert";

import InfoIcon from "@/assets/info.svg";
import SendIcon from "@/assets/send.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { TableProps } from "antd";

const { Title } = Typography;
const { Panel } = Collapse;

interface AlertFormProps {
  query: QueryPreviewType;
  onSubmit: (data: AlertFormType) => void;
  onTest: (data: AlertFormType) => void;
  type?: AlertType;
  initialValue?: AlertFormType;
}

const AlertForm: FC<AlertFormProps> = ({
  type = "webhook",
  query,
  initialValue,
  onSubmit,
  onTest,
}) => {
  const { t } = useTranslation(["alerts", "common"]);
  const { control, handleSubmit, getValues } = useForm<AlertFormType>();

  const colums: TableProps<{ name: string }>["columns"] = [
    {
      title: capitalize(t("common:words.measures")),
      width: "50%",
      render: (record) => {
        const name = record.name.split(".");
        return (
          <NestedTag
            tag={{ title: name[0], color: QUERY_COLORS.measure[0] }}
            nested={name.slice(1).map((n: string, i: number) => ({
              title: n,
              color: QUERY_COLORS.measure[1],
              key: typeof n === "string" ? name[0] + "." + n : i,
            }))}
          />
        );
      },
    },
    {
      title: t("common:words.lower_bound"),
      render: (record) => (
        <Input
          className={styles.input}
          control={control}
          name={`measures.${record.name}.lowerBound`}
          defaultValue={initialValue?.measures?.[record.name]?.lowerBound}
        />
      ),
    },
    {
      title: t("common:words.upper_bound"),
      render: (record) => (
        <Input
          className={styles.input}
          control={control}
          name={`measures.${record.name}.upperBound`}
          defaultValue={initialValue?.measures?.[record.name]?.upperBound}
        />
      ),
    },
  ];

  return (
    <Form className={styles.space} layout="vertical" id="alert-form">
      <Title className={styles.title} level={3}>
        {initialValue ? t("edit_alert") : t("new_alert")}
      </Title>

      {!initialValue && (
        <div className={styles.header}>
          <StepFormHeader
            numbers={false}
            steps={[
              t("common:words.alerts"),
              t("common:words.new"),
              capitalize(type),
            ]}
            currentStep={0}
          />
        </div>
      )}

      <Space className={cn(styles.space, styles.body)} size={16}>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <Input
              label={t("form.alert_name")}
              control={control}
              name="name"
              defaultValue={initialValue?.name}
            />
          </Col>
          <Col span={24} md={12}>
            <Input
              label={t("form.type")}
              control={control}
              name="type"
              defaultValue={initialValue?.type || type}
              disabled
            />
          </Col>
        </Row>

        <span className={styles.subtitle}>{t("preview")}</span>
        <QueryPreview {...query} />

        <Space
          className={cn(styles.space, styles.metrics)}
          size={10}
          direction="vertical"
        >
          <span className={styles.subtitle}>{t("set_metrics_boundaries")}</span>
          <Table
            rootClassName={styles.table}
            columns={colums}
            dataSource={query.measures?.map((m) => ({ name: m }))}
            pagination={false}
            rowKey={(record) => record.name}
          />
        </Space>

        <Row gutter={[16, 16]} align="stretch">
          <Col span={24} md={12}>
            <Space className={styles.space} size={10} direction="vertical">
              <span className={styles.subtitle}>{t("delivery_settings")}</span>
              <Input
                rules={{ required: true }}
                starPosition="left"
                starColor="#A31BCB"
                label={`${capitalize(type)}:`}
                control={control}
                name={type}
                defaultValue={initialValue?.[type]}
              />
            </Space>
          </Col>

          <Col span={24} md={12}>
            <Space className={styles.space} size={10} direction="vertical">
              <span className={styles.subtitle}>{t("trigger_settings")}</span>
              <Input
                rules={{ required: true }}
                starPosition="left"
                starColor="#A31BCB"
                label={
                  <span>
                    {t("schedule")} (
                    <a
                      className={styles.link}
                      href="https://crontab.guru/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("build_cron_expression")}
                    </a>
                    ):
                  </span>
                }
                control={control}
                name="schedule"
                defaultValue={initialValue?.schedule}
                suffix={<InfoIcon />}
              />
            </Space>
          </Col>
        </Row>

        <Collapse
          expandIcon={({ isActive }) =>
            isActive ? (
              <DownOutlined className={styles.arrow} />
            ) : (
              <UpOutlined className={styles.arrow} />
            )
          }
          bordered={false}
          className={styles.collapse}
        >
          <Panel
            className={styles.panel}
            header={
              <span className={styles.subtitle}>{t("advanced_settings")}</span>
            }
            key={"1"}
          >
            <Row gutter={[16, 16]}>
              <Col span={24} md={12}>
                <Input
                  rules={{ required: true }}
                  starPosition="left"
                  starColor="#A31BCB"
                  className={styles.input}
                  label={t("form.request_timeout")}
                  control={control}
                  name="requestTimeout"
                  fieldType="number"
                />
              </Col>

              <Col span={24} md={12}>
                <Input
                  rules={{ required: true }}
                  starPosition="left"
                  starColor="#A31BCB"
                  className={styles.input}
                  label={t("form.timeout_on_fire")}
                  control={control}
                  name="timeoutOnFire"
                  fieldType="number"
                />
              </Col>
            </Row>
          </Panel>
        </Collapse>

        <Alert
          className={styles.alert}
          message={
            <Row justify="space-between" align="middle">
              <Col>
                <span>{t("summary")}</span>:{" "}
                {t("at 1") +
                  t("on_day-of-month") +
                  " 1, " +
                  t("via") +
                  " 14:15 " +
                  capitalize(type)}
              </Col>
              <Col>
                <Button
                  className={styles.sendTest}
                  onClick={() => onTest(getValues())}
                >
                  <SendIcon /> {t("Send test")}
                </Button>
              </Col>
            </Row>
          }
          type="info"
        />
      </Space>

      <Button
        className={styles.saveBtn}
        type="primary"
        size="large"
        htmlType="submit"
        form="alert-form"
        onClick={handleSubmit(onSubmit)}
      >
        {t("common:words.save")}
      </Button>
    </Form>
  );
};

export default AlertForm;
