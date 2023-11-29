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
  withSteps?: boolean;
  bordered?: boolean;
  loading?: boolean;
  shadow?: boolean;
}

const DataSourceForm: FC<DataSourceFormProps> = ({
  onFinish = () => {},
  onTestConnection = () => {},
  onDataSourceSetupSubmit = () => {},
  onDataModelGenerationSubmit = () => {},
  withSteps = false,
  bordered = true,
  loading = false,
  shadow = true,
}) => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const { step, setStep } = DataSourceStore();

  return (
    <Card
      style={shadow === false ? { boxShadow: "0 0 0 0" } : undefined}
      bordered={bordered}
    >
      <Spin spinning={loading}>
        {withSteps && (
          <div className={styles.header}>
            <StepFormHeader
              currentStep={step}
              steps={[t("step1"), t("step2"), t("step3"), t("step4")]}
              onChange={setStep}
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
