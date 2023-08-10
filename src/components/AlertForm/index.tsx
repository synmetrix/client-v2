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
import {
  DownOutlined,
  MinusOutlined,
  PlusOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useForm } from "react-hook-form";
import cn from "classnames";

import StepFormHeader from "@/components/StepFormHeader";
import Button from "@/components/Button";
import NestedTag from "@/components/NestedTag";
import Input from "@/components/Input";
import { capitalize } from "@/utils/helpers/capitalize";

import InfoIcon from "@/assets/info.svg";
import ArrowIcon from "@/assets/arrow.svg";
import SendIcon from "@/assets/send.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { TableProps } from "antd";

const { Title } = Typography;
const { Panel } = Collapse;

interface Measure {
  lowerBound: number;
  upperBound: number;
}

type AlertType = "webhook" | "slack" | "email";

export type AlertFormType = {
  [key in AlertType]?: string;
} & {
  name: string;
  type: AlertType;
  measures: Record<string, Measure>;
  schedule: string;
  requestTimeout: number;
  timeoutOnFire: number;
};

interface Order {
  name: string;
  order: "asc" | "desc";
}

interface AlertFormProps {
  onSubmit: (data: AlertFormType) => void;
  onTest: (data: AlertFormType) => void;
  type: AlertType;
  measures?: string[];
  dimensions?: string[];
  segments?: string[];
  timeDimensions?: string[];
  order?: Order[];
  initialValue?: AlertFormType;
}

const COLORS = {
  measure: ["#470D6999", "#470D6999"],
  dimension: ["#A31BCB80", "#A31BCB80"],
  timeDimension: ["#4386FA", "#470D6999"],
  segment: ["#33679199", "#33679199"],
  order: ["#892C6C99", "#892C6C99"],
};

const AlertForm: FC<AlertFormProps> = ({
  type,
  measures,
  dimensions,
  segments,
  timeDimensions,
  order,
  initialValue,
  onSubmit,
  onTest,
}) => {
  const { control, handleSubmit, getValues } = useForm<AlertFormType>();

  const colums: TableProps<{ name: string }>["columns"] = [
    {
      title: "Measure",
      width: "50%",
      render: (record) => {
        const name = record.name.split(".");
        return (
          <NestedTag
            tag={{ title: name[0], color: COLORS.measure[0] }}
            nested={name.slice(1).map((n: string, i: number) => ({
              title: n,
              color: COLORS.measure[1],
              key: typeof n === "string" ? name[0] + "." + n : i,
            }))}
          />
        );
      },
    },
    {
      title: "Lower Bound",
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
      title: "Upper Bound",
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

  const detectIcon = (title: string) => {
    switch (title) {
      case "asc":
        return <ArrowIcon />;
      case "desc":
        return <ArrowIcon className={styles.arrowDown} />;
      default:
        return title;
    }
  };

  const renderTags = (colors: string[], content?: string[]) => {
    if (!content) return null;

    return content.map((tag) => {
      const tagSplited = tag.split(".");
      return (
        <NestedTag
          key={JSON.stringify(tag)}
          tag={{ title: tagSplited[0], color: colors[0] }}
          nested={tagSplited.slice(1).map((t, idx) => ({
            title: detectIcon(t),
            color: colors[1],
            key: idx,
          }))}
        />
      );
    });
  };

  return (
    <Form className={styles.space} layout="vertical" id="alert-form">
      <Title className={styles.title} level={3}>
        {initialValue ? "Edit Alert" : "New Alert"}
      </Title>

      {!initialValue && (
        <div className={styles.header}>
          <StepFormHeader
            numbers={false}
            steps={["Alerts", "New", "Webhook"]}
            currentStep={0}
          />
        </div>
      )}

      <Space className={cn(styles.space, styles.body)} size={16}>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <Input
              label="Alert Name:"
              control={control}
              name="name"
              defaultValue={initialValue?.name}
            />
          </Col>
          <Col span={24} md={12}>
            <Input
              label="Type:"
              control={control}
              name="type"
              defaultValue={initialValue?.type || type}
              disabled
            />
          </Col>
        </Row>

        <span className={styles.subtitle}>preview</span>
        <Collapse
          expandIcon={({ isActive }) => (
            <Button className={styles.collapseBtn} size="small">
              {isActive ? <MinusOutlined /> : <PlusOutlined />}
            </Button>
          )}
          bordered={false}
          className={styles.collapse}
        >
          <Panel
            className={styles.panel}
            header={
              <Space size={10} align="center">
                {renderTags(COLORS.measure, measures)}
              </Space>
            }
            key={"1"}
          >
            <Space
              className={styles.collapseInner}
              direction="vertical"
              size={10}
            >
              {(dimensions || timeDimensions) && (
                <Space size={9}>
                  <span className={styles.tagLabel}>BY</span>
                  {renderTags(COLORS.dimension, dimensions)}
                  {renderTags(COLORS.timeDimension, timeDimensions)}
                </Space>
              )}
              {segments && (
                <Space size={9}>
                  <span className={styles.tagLabel}>IN</span>
                  {renderTags(COLORS.segment, segments)}
                </Space>
              )}

              {order && (
                <Space size={9}>
                  <span className={styles.tagLabel}>ORDERED BY</span>
                  {renderTags(
                    COLORS.order,
                    order?.map((o) => `${o.name}.${o.order}`)
                  )}
                </Space>
              )}
            </Space>
          </Panel>
        </Collapse>

        <Space
          className={cn(styles.space, styles.metrics)}
          size={10}
          direction="vertical"
        >
          <span className={styles.subtitle}>Set metrics boundaries</span>
          <Table
            rootClassName={styles.table}
            columns={colums}
            dataSource={measures?.map((m) => ({ name: m }))}
            pagination={false}
            rowKey={(record) => record.name}
          />
        </Space>

        <Row gutter={[16, 16]} align="stretch">
          <Col span={24} md={12}>
            <Space className={styles.space} size={10} direction="vertical">
              <span className={styles.subtitle}>Delivery Settings</span>
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
              <span className={styles.subtitle}>Trigger Settings</span>
              <Input
                rules={{ required: true }}
                starPosition="left"
                starColor="#A31BCB"
                label={
                  <span>
                    Schedule (
                    <a
                      className={styles.link}
                      href="https://crontab.guru/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Build cron expression
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
            header={<span className={styles.subtitle}>Advanced Settings</span>}
            key={"1"}
          >
            <Row gutter={[16, 16]}>
              <Col span={24} md={12}>
                <Input
                  rules={{ required: true }}
                  starPosition="left"
                  starColor="#A31BCB"
                  className={styles.input}
                  label="Request Timeout (minutes):"
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
                  label="TImeout On FIre (minutes):"
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
                <span>Summary</span>: At 14:15 on day-of-month 1, via Webhook
              </Col>
              <Col>
                <Button
                  className={styles.sendTest}
                  onClick={() => onTest(getValues())}
                >
                  <SendIcon /> Send test
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
        Save
      </Button>
    </Form>
  );
};

export default AlertForm;
