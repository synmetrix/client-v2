import { Col, Form, Input, Radio, Row, Typography } from "antd";
import cn from "classnames";

import CopyIcon from "@/assets/copy.svg";
import EyeIcon from "@/assets/eye.svg";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const Password: FC<{ value: string }> = ({ value }) => {
  const [type, setType] = useState<"text" | "password">("password");

  return (
    <Input
      type={type}
      value={value}
      disabled
      suffix={
        <EyeIcon
          className={styles.icon}
          onClick={() =>
            setType((prevState) => (prevState === "text" ? "password" : "text"))
          }
        />
      }
    />
  );
};

interface Field {
  label: string;
  value: string;
  type?: string;
  disabled?: boolean;
}

interface ApiSetupProps {
  connectionData: Field[];
  connectionOptions: Field[];
  connectionString: string;
}

const ApiSetup: FC<ApiSetupProps> = ({
  connectionData,
  connectionOptions,
  connectionString,
}) => {
  return (
    <div>
      <Title level={3}>Setup SQL API</Title>

      <Text>
        You can connect any BI tool or other SQL compatible software using the
        details specified below
      </Text>

      <Form layout="vertical">
        <Form.Item label="Data source" className={styles.label}>
          <Input value={"gh-api.clickhouse.tech (Yandex Demo)"} disabled />
        </Form.Item>

        <Form.Item label="Connect via" className={styles.label}>
          <Radio.Group size="large" optionType="button">
            {connectionOptions.map((o) => (
              <Radio
                className={styles.radio}
                key={o.value}
                value={o.value}
                disabled={o.disabled}
              >
                {o.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Row gutter={[16, 16]}>
          {connectionData.map((f) => (
            <Col key={f.label} xs={24} sm={12}>
              <Form.Item label={f.label} className={styles.label}>
                {f.type === "password" ? (
                  <Password value={f.value} />
                ) : (
                  <Input
                    type={f.value}
                    value={f.value}
                    disabled
                    suffix={
                      <CopyIcon
                        className={styles.icon}
                        onClick={() => navigator.clipboard.writeText(f.value)}
                      />
                    }
                  />
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.Item
          className={cn(styles.textareaWrapper, styles.label)}
          label="Connect using mysql-client"
        >
          <Input.TextArea
            style={{ resize: "none", height: 104 }}
            className={styles.textarea}
            value={connectionString}
            disabled
          />

          <CopyIcon
            className={cn(styles.icon, styles.textareaCopy)}
            onClick={() => navigator.clipboard.writeText(connectionString)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ApiSetup;
