import { Col, Form, Input, Radio, Row, Typography } from "antd";
import cn from "classnames";

import CopyIcon from "@/assets/copy.svg";
import EyeIcon from "@/assets/eye.svg";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const options = [
  { value: "mysql", label: "MySQL", disabled: false },
  { value: "psql", label: "PSQL", disabled: false },
];

const fields = [
  { label: "Host/URL", value: "username" },
  { label: "Database", value: "db" },
  { label: "Login (auto-generated)", value: "db_username" },
  { label: "Password (auto-generated)", value: "dasdasd", type: "password" },
];

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

const textareaValue = `MYSQL  --host=gh-api.clickhouse.tech
    - -user=user@api.clickhouse.tech
    - -port=5121
    - -password=**********`;

const ApiSetup: FC = () => {
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
            {options.map((o) => (
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
          {fields.map((f) => (
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

        <div className={styles.textareaWrapper}>
          <Input.TextArea
            style={{ resize: "none", height: 104 }}
            className={styles.textarea}
            value={textareaValue}
            disabled
          />

          <CopyIcon
            className={cn(styles.icon, styles.textareaCopy)}
            onClick={() => navigator.clipboard.writeText(textareaValue)}
          />
        </div>
      </Form>
    </div>
  );
};

export default ApiSetup;
