import cn from "classnames";
import { Fragment } from "react";

import styles from "./index.module.less";

import type { FC } from "react";

interface StepFormHeaderProps {
  steps: string[];
  currentStep: number;
  onChange?: (step: number) => void;
}

const StepFormHeader: FC<StepFormHeaderProps> = ({
  steps,
  currentStep,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.currentStep}>
        {currentStep + 1}/{steps.length}
      </div>
      <div className={styles.steps}>
        {steps.map((s, i) => (
          <Fragment key={s}>
            {i > 0 && <span className={styles.separator} />}
            <div
              className={cn(styles.step, { [styles.active]: currentStep >= i })}
              onClick={() => onChange?.(i)}
            >
              {i + 1}. {s}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepFormHeader;
