import { Alert, Col, Form, Row, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import cn from "classnames";

import Input from "@/components/Input";
import Button from "@/components/Button";
import QueryPreview from "@/components/QueryPreview";
import StepFormHeader from "@/components/StepFormHeader";
import { capitalize } from "@/utils/helpers/capitalize";
import type { AlertType } from "@/types/alert";
import type { QueryPreview as QueryPreviewType } from "@/types/queryPreview";

import InfoIcon from "@/assets/info.svg";
import SendIcon from "@/assets/send.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface ReportFormProps {
  query: QueryPreviewType;
  type: AlertType;
  onSubmit: (data: ReportFormType) => void;
  initialValue?: ReportFormType;
}

type ReportFormType = Record<AlertType, string> & {
  name: string;
  type: AlertType;
  schedule: string;
};

const { Title } = Typography;

const ReportForm: FC<ReportFormProps> = ({
  query,
  type,
  initialValue,
  onSubmit,
}) => {
  const { t } = useTranslation(["reports", "common"]);
  const { control, handleSubmit } = useForm<ReportFormType>();

  return (
    <Form layout="vertical">
      <Space className={cn(styles.space, styles.body)} size={16}>
        <Title className={styles.title} level={3}>
          {initialValue ? "edit_report" : t("new_report")}
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
                <Button className={styles.sendTest}>
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
