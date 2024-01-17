import { Card, Button } from "antd";

import CloseIcon from "@/assets/console-close.svg";

import s from "./index.module.less";

import type { FC } from "react";

interface ConsoleProps {
  errors: string;
  onClose: () => void;
}

const Console: FC<ConsoleProps> = ({ errors, onClose }) => {
  return (
    <Card className={s.card} bordered={false}>
      <div className={s.header}>
        <div className={s.tabBtn}>Errors</div>
        <CloseIcon
          className={s.closeButton}
          data-testid="close-console"
          onClick={onClose}
        />
      </div>
      <div className={s.body}>
        <div className={s.errorText}>{errors}</div>
      </div>
    </Card>
  );
};

export default Console;
