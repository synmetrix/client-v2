import { Card, Spin } from "antd";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

import StepFormHeader from "@/components/StepFormHeader";
import BouncingDotsLoader from "@/components/BouncingDotsLoader";
import DataSourceFormBody from "@/components/DataSourceFormBody";
import type { DataSourceSetupForm, DynamicForm } from "@/types/dataSource";
import DataSourceStore from "@/stores/DataSourceStore";

import styles from "./index.module.less";

import type { FC } from "react";

interface DataSourceFormProps {
  onFinish: () => void;
  onTestConnection?: (data: DataSourceSetupForm) => void;
  onDataSourceSetupSubmit?: (data: DataSourceSetupForm) => void;
  onDataModelGenerationSubmit?: (data: DynamicForm) => void;
  onChangeStep?: (value: number) => void;
  step?: number;
  bordered?: boolean;
  loading?: boolean;
  shadow?: boolean;
}

const DataSourceForm: FC<DataSourceFormProps> = ({
  onFinish = () => {},
  onTestConnection = () => {},
  onDataSourceSetupSubmit = () => {},
  onDataModelGenerationSubmit = () => {},
  onChangeStep,
  step: curStep,
  bordered = true,
  loading = false,
  shadow = true,
}) => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const { step, setStep } = DataSourceStore();

  useEffect(() => {
    if (curStep) {
      setStep(step);
    }
  }, [curStep, setStep, step]);

  return (
    <Card
      style={shadow === false ? { boxShadow: "0 0 0 0" } : undefined}
      bordered={bordered}
    >
      <Spin spinning={loading}>
        {onChangeStep && (
          <div className={styles.header}>
            <StepFormHeader
              currentStep={step}
              steps={[t("step1"), t("step2"), t("step3"), t("step4")]}
              onChange={onChangeStep}
            />
          </div>
        )}
        <Suspense fallback={<BouncingDotsLoader />}>
          <DataSourceFormBody
            onFinish={onFinish}
            onTestConnection={onTestConnection}
            onDataSourceSetupSubmit={onDataSourceSetupSubmit}
            onDataModelGenerationSubmit={onDataModelGenerationSubmit}
          />
        </Suspense>
      </Spin>
    </Card>
  );
};

export default DataSourceForm;
