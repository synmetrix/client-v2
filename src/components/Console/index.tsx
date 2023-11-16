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
            style={{ marginRight: 18 }}
            size="small"
            icon={<CloseOutlined />}
            onClick={onClose}
          />
        }
      >
        <Tabs.TabPane tab="Errors" key="errors" closable={false}>
          <div className={s.errorText}>{errors}</div>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default Console;
