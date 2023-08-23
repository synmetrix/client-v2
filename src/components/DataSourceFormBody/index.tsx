import { useEffect } from "react";
// import { useTranslation } from "react-i18next";

import type {
  ApiSetupForm,
  DataSource,
  DataSourceForm,
  DataSourceSetupForm,
  DynamicForm,
} from "@/types/dataSource";
import DataSourceSelection from "@/components/DataSourceSelection";
import DataSourceSetup from "@/components/DataSourceSetup";
import DataModelGeneration from "@/components/DataModelGeneration";
import ApiSetup from "@/components/ApiSetup";
import { dataSourceForms, dbTiles } from "@/mocks/dataSources";
import DataSourceStore from "@/stores/DataSourceStore";
import type { DataSourceData } from "@/stores/DataSourceStore";

import type { FC } from "react";

interface DataSourceFormBodyProps {
  defaultData?:
    | {
        step: number;
        apiSetup: DataSourceForm | null;
        dataModel: DynamicForm | null;
        dataSource: DataSource | undefined;
        dataSourceSetup: DataSourceSetupForm | undefined;
        formState: DataSourceForm | null;
        schema: any;
      }
    | undefined;
  onFinish: (data: ApiSetupForm) => void;
  onTestConnection?: (data: DataSourceSetupForm) => void;
  onDataSourceSetupSubmit?: (data: DataSourceSetupForm) => void;
  onDataModelGenerationSubmit?: (data: DynamicForm) => void;
}

const DataSourceFormBody: FC<DataSourceFormBodyProps> = ({
  defaultData,
  onFinish = () => {},
  onTestConnection = () => {},
  onDataSourceSetupSubmit = () => {},
  onDataModelGenerationSubmit = () => {},
}) => {
  const {
    id,
    step,
    dataSource,
    dataSourceSetup,
    dataModel,
    apiSetup,
    schema,
    setStep,
    setData,
    setDataSource,
    setDataSourceSetup,
    clean,
  } = DataSourceStore();

  const onGoBack = () => setStep(step - 1);
  const onSkip = () => setStep(step + 1);

  const onDataSourceSelect = (value: DataSource) => {
    setDataSource(value);
    setStep(1);
  };

  const onDataSourceSetup = async (data: DataSourceSetupForm) => {
    setDataSourceSetup(data);
    setStep(2);

    await onDataSourceSetupSubmit(data);
  };

  const onDataModelGeneration = async (data: DynamicForm) => {
    setStep(3);

    await onDataModelGenerationSubmit(data);
    clean();
  };

  useEffect(() => {
    if (defaultData) {
      setData(defaultData as DataSourceData);
    }
  }, [defaultData, setData]);

  useEffect(() => {
    if (id) {
      setStep(1);
    }
  }, [id, setStep]);

  if (!dataSource && step > 0) setStep(0);
  switch (step) {
    case 0:
      return (
        <DataSourceSelection
          onSubmit={onDataSourceSelect}
          initialValue={dataSource}
          options={dbTiles}
        />
      );
    case 1:
      if (dataSource)
        return (
          <DataSourceSetup
            dataSource={dataSource}
            fields={
              dataSourceForms[
                Object.keys(dataSourceForms).find(
                  (f) => f === dataSource?.value
                ) ?? "default"
              ]
            }
            initialValue={dataSourceSetup}
            onSubmit={onDataSourceSetup}
            onGoBack={onGoBack}
            onSkip={onSkip}
            onTestConnection={onTestConnection}
          />
        );
    case 2:
      return (
        <DataModelGeneration
          dataSource={{
            icon: dataSource?.icon,
            name: dataSource?.name,
          }}
          schema={schema || {}}
          onSubmit={onDataModelGeneration}
          onGoBack={onGoBack}
          onSkip={onSkip}
          initialValue={dataModel || {}}
        />
      );
    case 3:
      if (apiSetup)
        return (
          <ApiSetup
            initialValue={apiSetup}
            onSubmit={onFinish}
            onGoBack={onGoBack}
            onSkip={onSkip}
          />
        );
  }

  return (
    <DataSourceSelection
      onSubmit={onDataSourceSelect}
      initialValue={dataSource}
      options={dbTiles}
    />
  );
};

export default DataSourceFormBody;
