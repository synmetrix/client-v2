import cn from "classnames";
import { Breadcrumb } from "antd";
import { useResponsive } from "ahooks";

import styles from "./index.module.less";

import type { FC } from "react";

interface StepFormHeaderProps {
  steps: string[];
  currentStep: number;
  numbers?: boolean;
  onChange?: (step: number) => void;
}

const StepFormHeader: FC<StepFormHeaderProps> = ({
  steps,
  currentStep,
  numbers = true,
  onChange,
}) => {
  const windowSize = useResponsive();
  return (
    <div className={styles.wrapper}>
      {numbers && (
        <div className={styles.currentStep}>
          {currentStep + 1}/{steps.length}
        </div>
      )}
      <Breadcrumb
        separator={
          <span
            className={cn(styles.separator, { [styles.none]: !windowSize.md })}
          />
        }
        items={steps.map((t, i) => ({
          title: (
            <span
              className={cn(styles.step, { [styles.active]: currentStep >= i })}
              onClick={() => onChange?.(i)}
            >
              {numbers && i + 1 + "."} {t}
            </span>
          ),
        }))}
      />
    </div>
  );
};

export default StepFormHeader;
