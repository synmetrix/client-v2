import { Select as BasicSelect, Space } from "antd";

import type { SelectProps } from "antd";
import type { FC, ReactNode } from "react";

interface IconSelectProps extends SelectProps {
  prefixIcon?: ReactNode;
}

const Select: FC<IconSelectProps> = ({ prefixIcon, options, ...props }) => {
  const ValueLabel: FC<{ label: ReactNode }> = ({ label }) => (
    <Space size={5} align="center">
      {prefixIcon} {label}
    </Space>
  );

  return (
    <BasicSelect
      {...props}
      optionLabelProp="valueLabel"
      options={options?.map((o) => ({
        ...o,
        valueLabel: prefixIcon ? <ValueLabel label={o.label} /> : o.label,
      }))}
    />
  );
};

export default Select;
