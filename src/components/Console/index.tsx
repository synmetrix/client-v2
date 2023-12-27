import { Tabs, Card, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import s from "./index.module.less";

import type { FC } from "react";

interface ConsoleProps {
  errors: string;
  onClose: () => void;
}

const Console: FC<ConsoleProps> = ({ errors, onClose }) => {
  return (
    <Card className={s.card}>
      <Tabs
        activeKey="errors"
        animated={false}
        hideAdd
        tabBarExtraContent={
          <Button
            data-testid="close-console"
            style={{ marginRight: 18 }}
            size="small"
            icon={<CloseOutlined />}
            onClick={onClose}
          />
        }
        items={[
          {
            key: "errors",
            label: "Errors",
            closable: false,
            children: <div className={s.errorText}>{errors}</div>,
          },
        ]}
      />
    </Card>
  );
};

export default Console;
