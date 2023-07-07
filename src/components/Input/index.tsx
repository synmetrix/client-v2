import { Controller } from "react-hook-form";
import { Input as AntInput, Checkbox, Form, Radio } from "antd";

import styles from "./index.module.less";

import type { TextAreaProps } from "antd/es/input/TextArea";
import type {
  InputProps as AntInputProps,
  CheckboxProps as AntCheckboxProps,
  RadioGroupProps,
} from "antd";
import type { Control, Path, PathValue, FieldValues } from "react-hook-form";

type ParentProps = AntCheckboxProps &
  AntInputProps &
  TextAreaProps &
  RadioGroupProps;

interface InputProps<T extends FieldValues> extends ParentProps {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  label?: string;
  placeholder?: string;
  type?: string;
}

const Input: <T extends FieldValues>(props: InputProps<T>) => JSX.Element = ({
  control,
  name,
  defaultValue,
  label,
  placeholder,
  type,
  ...props
}) => {
  switch (type) {
    case "radio":
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            <Form.Item label="Connect via">
              <Radio.Group
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
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Form.Item label={label} className={styles.label}>
              <Checkbox
                checked={value}
                onChange={(e) => {
                  e.target.value = e.target.checked;
                  onChange(e.target.value);
                }}
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
          name={name}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            <Form.Item label={label} className={styles.label}>
              <AntInput.Password
                {...props}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
              />
            </Form.Item>
          )}
        />
      );

    case "textarea":
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            <AntInput.TextArea
              {...props}
              style={{ resize: "none", height: 104 }}
              value={value}
              onChange={onChange}
            />
          )}
        />
      );
    default:
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            <Form.Item label={label} className={styles.label}>
              <AntInput
                {...props}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
              />
            </Form.Item>
          )}
        />
      );
  }
};

export default Input;
