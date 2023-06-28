import { Button, Checkbox, Form, Input, Typography } from "antd";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

const { Title, Text } = Typography;

export interface DataSoureSetupField {
  name: string;
  label: string;
  type: "text" | "checkbox";
  rules?: object;
  value?: string;
  placeholder?: string;
}

interface DataSourceSetupProps {
  dataSource: {
    title: string;
    value: string;
    icon: ReactNode;
  };
  fields: DataSoureSetupField[];
}

const DataSourceSetup: FC<DataSourceSetupProps> = ({ dataSource, fields }) => {
  const renderField = (field: DataSoureSetupField) => {
    switch (field.type) {
      case "checkbox":
        return (
          <Form.Item
            className={styles.label}
            key={field.name}
            name={field.name}
            label={field.label}
          >
            <Checkbox checked={field.value === "yes"}>
              <span className={styles.checkbox}>{field.placeholder}</span>
            </Checkbox>
          </Form.Item>
        );
      default:
        return (
          <Form.Item
            className={styles.label}
            key={field.name}
            name={field.name}
            label={field.label}
          >
            <Input
              placeholder={field.placeholder}
              type={field.type}
              defaultValue={field.value}
            />
          </Form.Item>
        );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.dataSource}>
          <div className={styles.iconWrapper}>{dataSource.icon}</div>
          <Title className={styles.title} level={3}>
            {dataSource.title}
          </Title>
        </div>

        <Text className={styles.text}>
          Please enter the credentials for the data source to establish a
          connection. <br />
          To obtain further information about this configuration and
          Cube&lsquo;s features that are specific to Postgres, please refer to
          our documentation.
        </Text>
      </div>
      <Form layout="vertical" id="setup-form" onFinish={console.log}>
        <Form.Item className={styles.label} label="Name*" name="name">
          <Input placeholder="gh-api.clickhouse.tech (Yandex Demo)" />
        </Form.Item>

        <div className={styles.setupForm}>{fields.map(renderField)}</div>

        <div className={styles.actions}>
          <Button className={styles.back} size="large" color="primary">
            Back
          </Button>
          <Button
            className={styles.submit}
            form="setup-form"
            type="primary"
            size="large"
            htmlType="submit"
          >
            Apply
          </Button>

          <Button className={styles.link} type="link">
            Test Connection
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DataSourceSetup;
