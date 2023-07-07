import { Controller } from "react-hook-form";
import { Input as AntInput, Form } from "antd";

import type { Control, Path, PathValue, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  label?: string;
  placeholder?: string;
}

const Input: <T extends FieldValues>(props: InputProps<T>) => JSX.Element = ({
  control,
  name,
  defaultValue,
  label,
  placeholder,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <Form.Item label={label}>
          <AntInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    />
  );
};

export default Input;
