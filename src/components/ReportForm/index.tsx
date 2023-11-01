import { Alert, Col, Form, Row, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import cn from "classnames";
import construe from "cronstrue/i18n";

import Input from "@/components/Input";
import Button from "@/components/Button";
import QueryPreview from "@/components/QueryPreview";
import StepFormHeader from "@/components/StepFormHeader";
import { capitalize } from "@/utils/helpers/capitalize";
import validate from "@/utils/validations";
import type { AlertType } from "@/types/alert";
import type { QueryState } from "@/types/queryState";
import type { ReportFormType } from "@/types/report";

import InfoIcon from "@/assets/info.svg";
import SendIcon from "@/assets/send.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface ReportFormProps {
  query: QueryState;
  onSubmit: (data: ReportFormType) => void;
  onTest: (data: ReportFormType) => void;
  type?: AlertType;
  initialValue?: ReportFormType;
}

const { Title } = Typography;

const ReportForm: FC<ReportFormProps> = ({
  query,
  type = "WEBHOOK",
  initialValue,
  onSubmit,
  onTest,
}) => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation(["reports", "common"]);
  const { control, handleSubmit, watch, getValues } = useForm<ReportFormType>({
    values: initialValue,
  });

  const schedule = watch("schedule");

  return (
    <Form layout="vertical">
      <Space className={cn(styles.space, styles.body)} size={16}>
        <Title className={styles.title} level={3}>
          {initialValue ? t("edit_report") : t("new_report")}
        </Title>

        {!initialValue && (
          <div className={styles.header}>
            <StepFormHeader
              numbers={false}
              steps={[
                t("common:words.reports"),
                t("common:words.new"),
                capitalize(type),
              ]}
              currentStep={0}
            />
          </div>
        )}
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <Input
              label={t("form.report_name")}
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
                name={
                  type === "EMAIL"
                    ? "deliveryConfig.address"
                    : "deliveryConfig.url"
                }
                defaultValue={
                  type === "EMAIL"
                    ? initialValue?.deliveryConfig?.address
                    : initialValue?.deliveryConfig?.url
                }
              />
            </Space>
          </Col>

          <Col span={24} md={12}>
            <Space className={styles.space} size={10} direction="vertical">
              <span className={styles.subtitle}>{t("trigger_settings")}</span>
              <Input
                rules={{
                  required: true,
                  validate: validate.cronExp,
                }}
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

        <Alert
          className={styles.alert}
          message={
            <Row justify="space-between" align="middle">
              <Col>
                <span>{t("summary")}</span>:{" "}
                {schedule && validate.cronExp(schedule)
                  ? construe.toString(schedule, {
                      locale,
                    })
                  : `${t("schedule_not_set")}, ${t("via")} ${capitalize(type)}`}
              </Col>
              <Col>
                <Button
                  className={styles.sendTest}
                  onClick={() => onTest(getValues())}
                >
                  <SendIcon /> {t("common:words.send_test")}
                </Button>
              </Col>
            </Row>
          }
          type="info"
        />

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
      </Space>
    </Form>
  );
};

export default ReportForm;
