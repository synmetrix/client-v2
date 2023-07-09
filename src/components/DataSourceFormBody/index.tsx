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
import { dataSourceForms, dbTiles } from "@/components/DataSourceFormBody/data";

import type { FC } from "react";

interface DataSourceFormBodyProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formState?: DataSourceForm;
  setState: React.Dispatch<React.SetStateAction<DataSourceForm>>;
}

const DataSourceFormBody: FC<DataSourceFormBodyProps> = ({
  step,
  setStep,
  formState,
  setState,
}) => {
  const onGoBack = () => setStep((prevState) => prevState - 1);
  const onSkip = () => console.log("skip");
  const onDownload = () => console.log("download");
  const onTestConnection = () => console.log("test connection");

  const onDataSourceSelect = (value: DataSource) => {
    setState((prevState) => ({ ...prevState, dataSource: value }));
    setStep(1);
  };

  const onDataSourceSetupSubmit = (data: DataSourceSetupForm) => {
    setState((prevState) => ({ ...prevState, dataSourceSetup: data }));
    setStep(2);
  };

  const onDataModelGenerationSubmit = (data: DynamicForm) => {
    // TODO get data from api
    const apiSetup: ApiSetupForm = {
      name: "gh-api.clickhouse.tech (Yandex Demo)",
      host: "gh-api.clickhouse.tech",
      user: "user@api.clickhouse.tech",
      port: "12346",
      password: "132456456",
    };
    setState((prevState) => ({
      ...prevState,
      dataModel: data,
      apiSetup,
    }));
    setStep(3);
  };

  const onApiSetupSubmit = (data: ApiSetupForm) => {
    setState((prevState) => ({ ...prevState, apiSetup: data }));
  };

  if (!formState?.dataSource && step > 0) setStep(0);
  switch (step) {
    case 0:
      return (
        <DataSourceSelection
          onSubmit={onDataSourceSelect}
          initialValue={formState?.dataSource}
          options={dbTiles}
        />
      );
    case 1:
      if (formState?.dataSource)
        return (
          <DataSourceSetup
            dataSource={formState.dataSource}
            fields={
              dataSourceForms[
                Object.keys(dataSourceForms).find(
                  (f) => f === formState?.dataSource?.value
                ) ?? "default"
              ]
            }
            initialValue={formState?.dataSourceSetup}
            onSubmit={onDataSourceSetupSubmit}
            onGoBack={onGoBack}
            onSkip={onSkip}
            onTestConnection={onTestConnection}
          />
        );
    case 2:
      return (
        <DataModelGeneration
          dataSource={{
            icon: formState?.dataSource?.icon,
            name: "gh-api.clickhouse.tech (Yandex Demo)",
          }}
          schema={{
            dev_pre_aggregations: {
              orders_orders_rollup_0bohozfp_hle2okkq_1i85rfl: [
                {
                  attributes: [],
                  name: "users__last_name",
                  type: "character varying",
                },
              ],
            },
            dev_prod_preaggregations: {
              orders_second_rollup_0bohozfp_hle2okkq_1i85rfl: [
                {
                  attributes: [],
                  name: "users__last_name",
                  type: "character varying",
                },
              ],
            },
          }}
          onSubmit={onDataModelGenerationSubmit}
          onGoBack={onGoBack}
          onSkip={onSkip}
          initialValue={formState?.dataModel}
        />
      );
    case 3:
      if (formState?.apiSetup)
        return (
          <ApiSetup
            connectionData={[
              { label: "Host/URL", value: "username", name: "username" },
              { label: "Database", value: "db", name: "db" },
              {
                label: "Login (auto-generated)",
                value: "db_username",
                name: "db_username",
              },
              {
                label: "Password (auto-generated)",
                value: "dasdasd",
                type: "password",
                name: "password",
              },
            ]}
            initialValue={formState?.apiSetup}
            onSubmit={onApiSetupSubmit}
            onGoBack={onGoBack}
            onSkip={onSkip}
            onDownload={onDownload}
          />
        );
  }

  return (
    <DataSourceSelection
      onSubmit={onDataSourceSelect}
      initialValue={formState?.dataSource}
      options={dbTiles}
    />
  );
};

export default DataSourceFormBody;
