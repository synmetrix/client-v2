import { Suspense } from "react";

import DataSourceSelection from "@/components/DataSourceSelection";
import DataSourceSetup from "@/components/DataSourceSetup";
import DataModelGeneration from "@/components/DataModelGeneration";
import ApiSetup from "@/components/ApiSetup";
import StepFormHeader from "@/components/StepFormHeader";
import BouncingDotsLoader from "@/components/BouncingDotsLoader";
import type {
  DataSource,
  DataSourceSetupForm,
  DynamicForm,
} from "@/types/dataSource";

import { dataSourceForms, dbTiles } from "./data";

import type { FC } from "react";

interface Form {
  dataSource?: DataSource;
  dataSourceSetup?: DataSourceSetupForm;
  dataModel?: DynamicForm;
  apiSetup?: DynamicForm;
}

const DataSourceForm: FC = () => {
  const [formData, setFormData] = useState<Form>();
  const [step, setStep] = useState<number>(0);

  const onGoBack = () => setStep((prevState) => prevState - 1);
  const onSkip = () => console.log("skip");
  const onDownload = () => console.log("download");
  const onTestConnection = () => console.log("test connection");

  const onDataSourceSelect = (value: DataSource) => {
    setFormData((prevState) => ({ ...prevState, dataSource: value }));
    setStep(1);
  };

  const onDataSourceSetupSubmit = (data: DataSourceSetupForm) => {
    setFormData((prevState) => ({ ...prevState, dataSourceSetup: data }));
    setStep(2);
  };

  const onDataModelGenerationSubmit = (data: DynamicForm) => {
    setFormData((prevState) => ({ ...prevState, dataModel: data }));
    setStep(3);
  };

  const onApiSetupSubmit = (data: DynamicForm) => {
    setFormData((prevState) => ({ ...prevState, apiSetup: data }));
  };

  const renderStep = (currentStep: number) => {
    if (!formData?.dataSource && currentStep > 0) setStep(0);
    switch (currentStep) {
      case 0:
        return (
          <DataSourceSelection
            onSubmit={onDataSourceSelect}
            initialValue={formData?.dataSource}
            options={dbTiles}
          />
        );
      case 1:
        if (formData?.dataSource)
          return (
            <DataSourceSetup
              dataSource={formData.dataSource}
              fields={
                dataSourceForms[
                  Object.keys(dataSourceForms).find(
                    (f) => f === formData?.dataSource?.value
                  ) ?? "default"
                ]
              }
              initialValue={formData?.dataSourceSetup}
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
              icon: formData?.dataSource?.icon,
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
                orders_orders_rollup_0bohozfp_hle2okkq_1i85rfl: [
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
            initialValue={formData?.dataModel}
          />
        );
      case 3:
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
            connectionOptions={[
              {
                value: "mysql",
                label: "MySQL",
                disabled: false,
                name: "connection",
              },
              {
                value: "psql",
                label: "PSQL",
                disabled: false,
                name: "connection",
              },
            ]}
            connectionString={`MYSQL  --host=gh-api.clickhouse.tech
      - -user=user@api.clickhouse.tech
      - -port=5121
      - -password=**********`}
            initialValue={formData?.apiSetup}
            onSubmit={onApiSetupSubmit}
            onGoBack={onGoBack}
            onSkip={onSkip}
            onDownload={onDownload}
          />
        );
    }
  };

  return (
    <>
      <StepFormHeader
        currentStep={step}
        steps={[
          "Connect Data Source",
          "Data Source Setup",
          "Generate Data Model Files",
          "SQL API",
        ]}
        onChange={setStep}
      />
      <Suspense fallback={<BouncingDotsLoader />}>{renderStep(step)}</Suspense>
    </>
  );
};

export default DataSourceForm;
