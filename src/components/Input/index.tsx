import { Controller } from "react-hook-form";
import {
  Input as BasicInput,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Radio,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import ru from "antd/es/date-picker/locale/ru_RU";
import en from "antd/es/date-picker/locale/en_US";

import CalendarIcon from "@/assets/calendar.svg";

import styles from "./index.module.less";

import type { TextAreaProps } from "antd/es/input/TextArea";
import type {
  InputProps as BasicInputProps,
  CheckboxProps as BasicCheckboxProps,
  RadioGroupProps,
  UploadProps,
  SelectProps,
} from "antd";
import type { Control, Path, PathValue, FieldValues } from "react-hook-form";
import type { PasswordProps } from "antd/es/input/Password";
import type { ReactNode } from "react";

type ParentProps = BasicCheckboxProps &
  BasicInputProps &
  TextAreaProps &
  RadioGroupProps &
  UploadProps &
  PasswordProps &
  SelectProps;

export interface InputProps<T extends FieldValues> extends ParentProps {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  label?: ReactNode;
  placeholder?: string;
  fieldType?: string;
  rules?: object;
  starPosition?: "left" | "right";
  starColor?: string;
}

const locales = {
  en,
  ru,
};

const Input: <T extends FieldValues>(props: InputProps<T>) => JSX.Element = ({
  control,
  name,
  size = "large",
  defaultValue,
  label,
  placeholder,
  fieldType,
  rules = {},
  starPosition = "right",
  starColor = "#000000",
  children,
  ...props
}) => {
  const {
    i18n: { language },
  } = useTranslation();

  const getLabel = () => {
    if (rules && "required" in rules) {
      if (starPosition === "left") {
        return (
          <>
            <span className={styles.rightStar} style={{ color: starColor }}>
              *
            </span>
            {label}
          </>
        );
      } else {
        return (
          <>
            {label} <span style={{ color: starColor }}>*</span>
          </>
        );
      }
    }
    return label;
  };

  const WrapperComponent = label ? Form.Item : "label";
  const wrapperProps = {
    className: styles.label,
    label: label ? getLabel() : undefined,
  };

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
            <WrapperComponent {...wrapperProps} className="">
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
                  size={size}
                >
                  {placeholder}
                </Button>
              </Upload>
              <span className={styles.error}>{error?.message}</span>
            </WrapperComponent>
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
            <WrapperComponent {...wrapperProps} className="">
              <Radio.Group
                className={cn({ [styles.radioError]: invalid })}
                {...props}
                size={size}
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
              <span className={styles.error}>{error?.message}</span>
            </WrapperComponent>
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
            <WrapperComponent
              {...wrapperProps}
              label=""
              onClick={() => onChange(!value as any)}
            >
              <Checkbox
                className={cn({ [styles.error]: invalid })}
                checked={value}
              >
                <span
                  className={cn(styles.checkbox, { [styles.error]: invalid })}
                >
                  {children || placeholder || label}
                </span>
              </Checkbox>
            </WrapperComponent>
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
            <WrapperComponent {...wrapperProps}>
              <BasicInput.Password
                {...props}
                size={size}
                className={cn(styles.input, props.className)}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                status={invalid ? "error" : undefined}
              />
              <span className={styles.error}>{error?.message}</span>
            </WrapperComponent>
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
            <WrapperComponent {...wrapperProps}>
              <BasicInput.TextArea
                {...props}
                size={size}
                className={cn(styles.input, props.className)}
                style={{ resize: "none", height: 108 }}
                value={value}
                onChange={onChange}
                status={invalid ? "error" : undefined}
              />
              <span className={styles.error}>{error?.message}</span>
            </WrapperComponent>
          )}
        />
      );
    case "select":
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
            <WrapperComponent {...wrapperProps}>
              <Select
                {...props}
                placeholder={placeholder}
                size={size}
                className={cn(styles.input, props.className)}
                value={value}
                status={invalid ? "error" : undefined}
                onChange={onChange}
              />
              <span className={styles.error}>{error?.message}</span>
            </WrapperComponent>
          )}
        />
      );
    case "date":
      return (
        <Controller
          rules={rules}
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field: { onChange }, fieldState: { invalid, error } }) => (
            <WrapperComponent {...wrapperProps}>
              <DatePicker
                size={size}
                className={cn(styles.input, props.className)}
                onChange={(date) =>
                  onChange(
                    date?.toISOString() as PathValue<
                      FieldValues,
                      Path<FieldValues>
                    >
                  )
                }
                locale={locales[language as keyof typeof locales]}
                suffixIcon={<CalendarIcon />}
                placeholder={placeholder}
                status={invalid ? "error" : undefined}
              />
              <span className={styles.error}>{error?.message}</span>
            </WrapperComponent>
          )}
        />
      );
    default:
      return (
        <Controller
          rules={
            fieldType === "number"
              ? {
                  ...rules,
                  validate: (v) =>
                    "validate" in rules && typeof rules.validate === "function"
                      ? rules.validate(v) && !isNaN(v)
                      : !isNaN(v),
                }
              : rules
          }
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
          }) => (
            <WrapperComponent {...wrapperProps}>
              <BasicInput
                {...props}
                size={size}
                className={cn(styles.input, props.className)}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                status={invalid ? "error" : undefined}
              />
              <span className={styles.error}>{error?.message}</span>
            </WrapperComponent>
          )}
        />
      );
  }
};

export default Input;
