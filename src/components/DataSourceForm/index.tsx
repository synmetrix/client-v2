import { Suspense } from "react";

import DataSourceSelection from "@/components/DataSourceSelection";
import DataSourceSetup from "@/components/DataSourceSetup";
import DataModelGeneration from "@/components/DataModelGeneration";
import ApiSetup from "@/components/ApiSetup";
import StepFormHeader from "@/components/StepFormHeader";
import BouncingDotsLoader from "@/components/BouncingDotsLoader";
import type { DataSource, DynamicForm } from "@/types/dataSource";

import { dataSourceForms, dbTiles } from "./data";

import type { FC } from "react";

const DataSourceForm: FC = () => {
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource>();
  const [step, setStep] = useState<number>(0);

  const onDataSourceSelect = (value: DataSource) => {
    setSelectedDataSource(value);
    setStep(1);
  };

  const onDataSourceSetupSubmit = (data: DynamicForm) => {
    console.log(data);
  };

  const onDataModelGenerationSubmit = (data: DynamicForm) => {
    console.log(data);
  };

  const onApiSetupSubmit = (data: DynamicForm) => {
    console.log(data);
  };

  const renderStep = (currentStep: number) => {
    if (!selectedDataSource && step !== 0) setStep(0);

    switch (currentStep) {
      case 0:
        return (
          <DataSourceSelection
            onSubmit={onDataSourceSelect}
            initialValue={selectedDataSource}
            options={dbTiles}
          />
        );
      case 1:
        return (
          <DataSourceSetup
            dataSource={selectedDataSource!}
            fields={
              dataSourceForms[
                Object.keys(dataSourceForms).find(
                  (f) => f === selectedDataSource?.value
                ) ?? "default"
              ]
            }
            name="gh-api.clickhouse.tech (Yandex Demo)"
            onSubmit={onDataSourceSetupSubmit}
          />
        );
      case 2:
        return (
          <DataModelGeneration
            key={2}
            dataSource={{
              icon: selectedDataSource?.icon,
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
          />
        );
      case 3:
        return (
          <ApiSetup
            key={3}
            onSubmit={onApiSetupSubmit}
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
            initialValue={{
              name: "gh-api.clickhouse.tech (Yandex Demo)",
              connection: "mysql",
            }}
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
