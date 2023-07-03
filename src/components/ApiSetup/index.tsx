import { Button, Col, Form, Input, Radio, Row, Typography } from "antd";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";

import type { ApiSetupField } from "@/types/dataSource";

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

interface ApiSetupProps {
  connectionData: ApiSetupField[];
  connectionOptions: ApiSetupField[];
  connectionString: string;
  name: string;
}

const ApiSetup: FC<ApiSetupProps> = ({
  connectionData,
  connectionOptions,
  connectionString,
  name,
}) => {
  const { t } = useTranslation(["apiSetup", "common"]);
  const windowSize = useResponsive();
  return (
    <div>
      <Title level={3}>{t("title")}</Title>

      <Text>{t("text")}</Text>

      <Form layout="vertical">
        <Form.Item label="Data source" className={styles.label}>
          <Input value={name} disabled />
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

        <Row>
          <Button
            className={cn(styles.back, { [styles.sm]: !windowSize.sm })}
            size="large"
            color="primary"
          >
            {t("common:words.back")}
          </Button>
          <Button
            className={cn(styles.submit, { [styles.sm]: !windowSize.sm })}
            form="setup-form"
            type="primary"
            size="large"
            htmlType="submit"
          >
            {t("common:words.finish")}
          </Button>

          <Button className={styles.link} type="link">
            {t("common:words.download_credentials")}
          </Button>

          <Button className={cn(styles.link, styles.skip)} type="link">
            {t("common:words.skip")}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default ApiSetup;
