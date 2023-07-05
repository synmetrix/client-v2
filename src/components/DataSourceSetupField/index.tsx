import { Checkbox, Form, Input } from "antd";
import { Controller } from "react-hook-form";

import type {
  DataSourceSetupForm,
  DataSoureSetupField as DataSoureSetupFieldType,
} from "@/types/dataSource";

import styles from "./index.module.less";

import type { Control } from "react-hook-form";
import type { FC } from "react";

interface DataSoureSetupFieldProps extends DataSoureSetupFieldType {
  control: Control<DataSourceSetupForm>;
  defaultValue?: string;
}

const DataSoureSetupField: FC<DataSoureSetupFieldProps> = ({
  control,
  type,
  name,
  placeholder,
  label,
  defaultValue,
}) => {
  switch (type) {
    case "checkbox":
      return (
        <Controller
          control={control}
          name={`db_params.${name}`}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Form.Item className={styles.label} label={label}>
              <Checkbox
                checked={value === "yes"}
                onChange={() => onChange(value === "yes" ? "no" : "yes")}
              >
                <span className={styles.checkbox}>{placeholder}</span>
              </Checkbox>
            </Form.Item>
          )}
        />
      );
    case "password":
      return (
        <Controller
          control={control}
          name={`db_params.${name}`}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            <Form.Item className={styles.label} label={label}>
              <Input.Password
                placeholder={placeholder}
                type={type}
                value={value}
                defaultValue={defaultValue}
                onChange={(e) => onChange(e.target.value)}
              />
            </Form.Item>
          )}
        />
      );
    default:
      return (
        <Controller
          control={control}
          name={`db_params.${name}`}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            <Form.Item className={styles.label} label={label}>
              <Input
                placeholder={placeholder}
                type={type}
                defaultValue={defaultValue}
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            </Form.Item>
          )}
        />
      );
  }
};

export default DataSoureSetupField;
