import { useEffect } from "react";

import type {
  ApiSetupForm,
  DataSource,
  DataSourceSetupForm,
  DynamicForm,
} from "@/types/dataSource";
import DataSourceSelection from "@/components/DataSourceSelection";
import DataSourceSetup from "@/components/DataSourceSetup";
import DataModelGeneration from "@/components/DataModelGeneration";
import ApiSetup from "@/components/ApiSetup";
import { dataSourceForms, dbTiles } from "@/mocks/dataSources";
import DataSourceStore from "@/stores/DataSourceStore";
import type { FormState } from "@/stores/DataSourceStore";

import type { FC } from "react";

interface DataSourceFormBodyProps {
  activeStep?: number;
  formState?: FormState;
  onFinish: (data: ApiSetupForm) => void;
  onTestConnection?: (data: DataSourceSetupForm) => void;
  onDataSourceSetupSubmit?: (data: DataSourceSetupForm) => void;
  onDataModelGenerationSubmit?: (data: DynamicForm) => void;
}

const DataSourceFormBody: FC<DataSourceFormBodyProps> = ({
  activeStep,
  formState,
  onFinish = () => {},
  onTestConnection = () => {},
  onDataSourceSetupSubmit = () => {},
  onDataModelGenerationSubmit = () => {},
}) => {
  const {
    editId,
    step,
    isOnboarding,
    formState: formData,
    schema,
    setStep,
    nextStep,
    setFormStateData,
  } = DataSourceStore();

  const onGoBack = () => setStep(step - 1);
  const onSkip = () => setStep(step + 1);

  const onDataSourceSelect = (value: DataSource) => {
    setFormStateData(0, value);
    nextStep();
  };

  const onDataSourceSetup = async (data: DataSourceSetupForm) => {
    await onDataSourceSetupSubmit(data);
  };

  const onDataModelGeneration = async (data: DynamicForm) => {
    await onDataModelGenerationSubmit(data);
  };

  useEffect(() => {
    if (activeStep) {
      setStep(activeStep);
    }
  }, [activeStep, setStep]);

  useEffect(() => {
    if (editId) {
      setStep(1);
    }
  }, [editId, setStep]);

  const curDataSource = formState?.step0 || formData?.step0;
  switch (step) {
    case 0:
      return (
        <DataSourceSelection
          onSubmit={onDataSourceSelect}
          initialValue={curDataSource}
          options={dbTiles}
        />
      );
    case 1:
      if (curDataSource) {
        const initialValue = formState?.step1 || formData?.step1;
        return (
          <DataSourceSetup
            dataSource={curDataSource}
            fields={
              dataSourceForms[
                Object.keys(dataSourceForms).find(
                  (f) => f === curDataSource?.value
                ) ?? "default"
              ]
            }
            isOnboarding={isOnboarding}
            initialValue={initialValue}
            onSubmit={onDataSourceSetup}
            onGoBack={onGoBack}
            onSkip={onSkip}
            onTestConnection={onTestConnection}
          />
        );
      }
    case 2:
      return (
        <DataModelGeneration
          dataSource={{
            icon: curDataSource?.icon,
            name: curDataSource?.name,
          }}
          isOnboarding={isOnboarding}
          schema={schema}
          onSubmit={onDataModelGeneration}
          onGoBack={onGoBack}
          onSkip={onSkip}
          initialValue={formState?.step2 || formData?.step2 || {}}
        />
      );
    case 3:
      const initialValue = formState?.step3 || formData?.step3;
      return (
        <ApiSetup
          initialValue={initialValue}
          onSubmit={onFinish}
          onGoBack={onGoBack}
        />
      );
  }

  return (
    <DataSourceSelection
      onSubmit={onDataSourceSelect}
      initialValue={curDataSource}
      options={dbTiles}
    />
  );
};

export default DataSourceFormBody;
