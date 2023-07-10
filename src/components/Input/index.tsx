import { Controller } from "react-hook-form";
import { Input as AntInput, Button, Checkbox, Form, Radio, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import cn from "classnames";

import styles from "./index.module.less";

import type { TextAreaProps } from "antd/es/input/TextArea";
import type {
  InputProps as AntInputProps,
  CheckboxProps as AntCheckboxProps,
  RadioGroupProps,
  UploadProps,
} from "antd";
import type { Control, Path, PathValue, FieldValues } from "react-hook-form";
import type { PasswordProps } from "antd/es/input/Password";

type ParentProps = AntCheckboxProps &
  AntInputProps &
  TextAreaProps &
  RadioGroupProps &
  UploadProps &
  PasswordProps;

interface InputProps<T extends FieldValues> extends ParentProps {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  label?: string;
  placeholder?: string;
  fieldType?: string;
  rules?: object;
}

const Input: <T extends FieldValues>(props: InputProps<T>) => JSX.Element = ({
  control,
  name,
  defaultValue,
  label,
  placeholder,
  fieldType,
  rules,
  ...props
}) => {
  const getLabel = () => (rules && "required" in rules ? label + "*" : label);
  switch (fieldType) {
    case "file":
      return (
        <Controller
          rules={rules}
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
          }) => (
            <Form.Item label={getLabel()}>
              <span className={styles.error}>{error?.message}</span>
              <Upload
                {...props}
                fileList={value}
                onChange={(e) => onChange(e.fileList as any)}
              >
                <Button
                  className={cn(styles.input, props.className, {
                    [styles.uploadError]: invalid,
                  })}
                  icon={<UploadOutlined />}
                >
                  {placeholder}
                </Button>
              </Upload>
            </Form.Item>
          )}
        />
      );
    case "radio":
      return (
        <Controller
          rules={rules}
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
          }) => (
            <Form.Item label={getLabel()}>
              <span className={styles.error}>{error?.message}</span>
              <Radio.Group
                className={cn({ [styles.radioError]: invalid })}
                {...props}
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            </Form.Item>
          )}
        />
      );
    case "checkbox":
      return (
        <Controller
          rules={rules}
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field: { onChange, value }, fieldState: { invalid } }) => (
            <Form.Item label={getLabel()} className={styles.label}>
              <Checkbox
                className={cn({ [styles.error]: invalid })}
                checked={value}
                onChange={(e) => {
                  e.target.value = e.target.checked;
                  onChange(e.target.value);
                }}
              >
                <span
                  className={cn(styles.checkbox, { [styles.error]: invalid })}
                >
                  {placeholder}
                </span>
              </Checkbox>
            </Form.Item>
          )}
        />
      );
    case "password":
      return (
        <Controller
          rules={rules}
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
          }) => (
            <Form.Item label={getLabel()} className={styles.label}>
              <span className={styles.error}>{error?.message}</span>
              <AntInput.Password
                {...props}
                className={cn(styles.input, props.className)}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                status={invalid ? "error" : undefined}
              />
            </Form.Item>
          )}
        />
      );

    case "textarea":
      return (
        <Controller
          rules={rules}
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
          }) => (
            <Form.Item label={getLabel()} className={styles.label}>
              <span className={styles.error}>{error?.message}</span>
              <AntInput.TextArea
                {...props}
                className={cn(styles.input, props.className)}
                style={{ resize: "none", height: 108 }}
                value={value}
                onChange={onChange}
                status={invalid ? "error" : undefined}
              />
            </Form.Item>
          )}
        />
      );
    default:
      return (
        <Controller
          rules={
            fieldType === "number"
              ? { ...rules, validate: (v) => !isNaN(v) }
              : rules
          }
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
          }) => (
            <Form.Item label={getLabel()} className={styles.label}>
              <span className={styles.error}>{error?.message}</span>
              <AntInput
                {...props}
                className={cn(styles.input, props.className)}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                status={invalid ? "error" : undefined}
              />
            </Form.Item>
          )}
        />
      );
  }
};

export default Input;
