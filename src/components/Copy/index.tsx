import { Form, Input } from "antd";
import cn from "classnames";

import CopyIcon from "@/assets/copy.svg";

import styles from "./index.module.less";

import type { FormLayout } from "antd/es/form/Form";
import type { FC } from "react";

interface CopyProps {
  value: string;
  layout?: FormLayout;
  label?: string;
}

const Copy: FC<CopyProps> = ({ layout = "vertical", value, label }) => {
  return (
    <Form layout={layout}>
      <Form.Item
        className={cn(styles.textareaWrapper, styles.label)}
        label={label}
      >
        <Input.TextArea
          className={styles.input}
          style={{ resize: "none" }}
          autoSize
          value={value}
          disabled
        />
        <CopyIcon
          className={cn(styles.icon, styles.textareaCopy)}
          onClick={() => navigator.clipboard.writeText(value)}
        />
      </Form.Item>
    </Form>
  );
};

export default Copy;
