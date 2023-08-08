import {
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Space,
  Tag,
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
import cn from "classnames";

import StepFormHeader from "@/components/StepFormHeader";
import Button from "@/components/Button";
import NestedTag from "@/components/NestedTag";

import InfoIcon from "@/assets/info.svg";
import ArrowIcon from "@/assets/arrow.svg";
import SendIcon from "@/assets/send.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { TableProps } from "antd";

const { Title } = Typography;
const { Panel } = Collapse;

// interface Measure {
//   lowerBound: number;
//   upperBound: number;
// }

// interface AlertFormType {
//   name: string;
//   type: "webhook" | "slack" | "email";
//   measures: Record<string, Measure>;
// }

interface AlertFormProps {
  measures: string[];
  dimensions: string[];
  segments: string[];
  filters: string[];
  timeDimensions: string[];
  order: {
    name: string;
    order: "asc" | "desc";
  }[];
}

const AlertForm: FC<AlertFormProps> = (props) => {
  console.log(props);

  const records = [
    {
      name: "name1.name",
    },
    {
      name: "name2.name",
    },
    {
      name: "name3.name",
    },
  ];

  const colums: TableProps<{ name: string }>["columns"] = [
    {
      title: "Measure",
      width: "50%",
      render: (record) => {
        const name = record.name.split(".");
        return (
          <NestedTag
            tag={{ title: name[0], color: "#470D6999" }}
            nested={name.slice(1).map((n: string) => ({
              title: n,
              color: "#470D6999",
              key: typeof n,
            }))}
          />
        );
      },
    },
    {
      title: "Lower Bound",
      render: () => <Input className={styles.input} size="large" />,
    },
    {
      title: "Upper Bound",
      render: () => <Input className={styles.input} size="large" />,
    },
  ];
  return (
    <Form className={styles.space} layout="vertical">
      <Title className={styles.title} level={3}>
        New Alert
      </Title>

      <div className={styles.header}>
        <StepFormHeader
          numbers={false}
          steps={["Alerts", "New", "Webhook"]}
          currentStep={0}
        />
      </div>

      <Space className={cn(styles.space, styles.body)} size={16}>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <Form.Item label="Alert Name:">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label="Type:">
              <Input size="large" />
            </Form.Item>
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
                <NestedTag
                  tag={{ title: "product", color: "#470D6999" }}
                  nested={[
                    { title: "count", color: "#470D6999", key: "count" },
                  ]}
                />
                <NestedTag
                  tag={{ title: "data_table2", color: "#470D6999" }}
                  nested={[
                    { title: "count", color: "#470D6999", key: "count" },
                  ]}
                />
              </Space>
            }
            key={"1"}
          >
            <Space
              className={styles.collapseInner}
              direction="vertical"
              size={10}
            >
              <Space size={9}>
                <span className={styles.tagLabel}>BY</span>
                <NestedTag
                  tag={{ title: "Company", color: "#A31BCB80" }}
                  nested={[{ title: "name", color: "#A31BCB80", key: "name" }]}
                />
                <NestedTag
                  tag={{ title: "products", color: "#4386FA" }}
                  nested={[
                    {
                      title: "created_at",
                      color: "#470D6999",
                      key: "created_at",
                    },
                    { title: "by year", color: "#470D6999", key: "by year" },
                  ]}
                />
              </Space>

              <Space size={9}>
                <span className={styles.tagLabel}>IN</span>
                <NestedTag
                  tag={{ title: "product_categories", color: "#33679199" }}
                  nested={[{ title: "toys", color: "#33679199", key: "toys" }]}
                />
              </Space>

              <Space size={9}>
                <span className={styles.tagLabel}>ORDERED BY</span>
                <NestedTag
                  tag={{ title: "product", color: "#892C6C99" }}
                  nested={[
                    {
                      title: "created_at",
                      color: "#892C6C99",
                      key: "created_at",
                    },
                    { title: <ArrowIcon />, color: "#892C6C99", key: "icon" },
                  ]}
                />
              </Space>
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
            dataSource={records}
            pagination={false}
            rowKey={(record) => record.name}
          />
        </Space>

        <Row gutter={[16, 16]} align="stretch">
          <Col span={24} md={12}>
            <Space className={styles.space} size={10} direction="vertical">
              <span className={styles.subtitle}>Delivery Settings</span>
              <Form.Item label="Webhook:">
                <Input size="large" />
              </Form.Item>
            </Space>
          </Col>

          <Col span={24} md={12}>
            <Space className={styles.space} size={10} direction="vertical">
              <span className={styles.subtitle}>Trigger Settings</span>
              <Form.Item
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
              >
                <Input size="large" suffix={<InfoIcon />} />
              </Form.Item>
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
                <Form.Item label="Timeout On Fire (minutes):">
                  <Input className={styles.input} size="large" />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item label="TImeout On FIre (minutes):">
                  <Input className={styles.input} size="large" />
                </Form.Item>
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
                <Button className={styles.sendTest}>
                  <SendIcon /> Send test
                </Button>
              </Col>
            </Row>
          }
          type="info"
        />
      </Space>

      <Button className={styles.saveBtn} type="primary" size="large">
        Save
      </Button>
    </Form>
  );
};

export default AlertForm;
