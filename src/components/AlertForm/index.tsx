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
} from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import cn from "classnames";

import StepFormHeader from "@/components/StepFormHeader";
import Button from "@/components/Button";

import ArrowIcon from "@/assets/arrow.svg";

import styles from "./index.module.less";

import type { FC } from "react";

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

const AlertForm: FC = () => {
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

      <Space className={styles.space} size={16}>
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
              <span className={styles.test}>
                {isActive ? <MinusOutlined /> : <PlusOutlined />}
              </span>
            </Button>
          )}
          bordered={false}
          className={styles.collapse}
        >
          <Panel
            className={styles.panel}
            header={
              <Space size={10} align="center">
                <Tag className={styles.tag} color="#470D6999">
                  product
                  <Tag
                    className={cn(styles.tag, styles.inner)}
                    color="#470D6999"
                  >
                    count
                  </Tag>
                </Tag>

                <Tag className={styles.tag} color="#470D6999">
                  data_table2
                  <Tag
                    className={cn(styles.tag, styles.inner)}
                    color="#470D6999"
                  >
                    count
                  </Tag>
                </Tag>
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
                <span>BY</span>
                <Tag className={styles.tag} color="#A31BCB80">
                  Compnay{" "}
                  <Tag
                    className={cn(styles.tag, styles.inner)}
                    color="#A31BCB80"
                  >
                    name
                  </Tag>
                </Tag>
              </Space>

              <Space size={9}>
                <span>IN</span>
                <Tag className={styles.tag} color="#33679199">
                  product_categories{" "}
                  <Tag
                    className={cn(styles.tag, styles.inner)}
                    color="#33679199"
                  >
                    toys
                  </Tag>
                </Tag>
              </Space>

              <Space size={9}>
                <span>ORDERED BY</span>
                <Tag className={styles.tag} color="#892C6C99">
                  product{" "}
                  <Tag
                    className={cn(styles.tag, styles.inner)}
                    color="#892C6C99"
                  >
                    created_at
                  </Tag>
                  <Tag
                    className={cn(styles.tag, styles.inner)}
                    color="#892C6C99"
                  >
                    <ArrowIcon />
                  </Tag>
                </Tag>
              </Space>
            </Space>
          </Panel>
        </Collapse>

        <span className={styles.subtitle}>Set metrics boundaries</span>
      </Space>
    </Form>
  );
};

export default AlertForm;
