import { Card, Spin } from "antd";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

import StepFormHeader from "@/components/StepFormHeader";
import BouncingDotsLoader from "@/components/BouncingDotsLoader";
import DataSourceFormBody from "@/components/DataSourceFormBody";
import type {
  DataSource,
  DataSourceSetupForm,
  DynamicForm,
} from "@/types/dataSource";
import DataSourceStore from "@/stores/DataSourceStore";

import styles from "./index.module.less";

import type { FC } from "react";

interface DataSourceFormProps {
  onFinish: () => void;
  onDataSourceSelect?: (data: DataSource) => void;
  onTestConnection?: (data: DataSourceSetupForm) => void;
  onDataSourceSetupSubmit?: (data: DataSourceSetupForm) => void;
  onDataModelGenerationSubmit?: (data: DynamicForm) => void;
  onChangeStep?: (value: number) => void;
  bordered?: boolean;
  loading?: boolean;
  shadow?: boolean;
}

const DataSourceForm: FC<DataSourceFormProps> = ({
  onFinish = () => {},
  onDataSourceSelect = () => {},
  onTestConnection = () => {},
  onDataSourceSetupSubmit = () => {},
  onDataModelGenerationSubmit = () => {},
  onChangeStep,
  bordered = true,
  loading = false,
  shadow = true,
}) => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const { step } = DataSourceStore();

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
            onDataSourceSelect={onDataSourceSelect}
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
