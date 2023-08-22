import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
import useDataSources from "@/hooks/useDataSources";
import useCheckResponse from "@/hooks/useCheckResponse";
import type {
  Datasources_Pk_Columns_Input,
  Datasources_Set_Input,
  Scalars,
} from "@/graphql/generated";

import type { FC } from "react";

interface DataSourceFormBodyProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onFinish: (data: DataSourceForm) => void;
  setState: React.Dispatch<React.SetStateAction<DataSourceForm>>;
  isEditing?: boolean;
  formState?: DataSourceForm;
  onTestConnection?: (data: DataSourceSetupForm) => void;
}

const DataSourceFormBody: FC<DataSourceFormBodyProps> = ({
  isEditing,
  step,
  setStep,
  formState,
  setState,
  onFinish,
}) => {
  const { t } = useTranslation(["dataSourceStepForm"]);

  const {
    mutations: {
      createMutation,
      execCreateMutation,
      updateMutation,
      execUpdateMutation,
      checkConnectionMutation,
      execCheckConnection,
      fetchTablesQuery,
      execFetchTables,
      genSchemaMutation,
      execGenSchemaMutation,
    },
  } = useDataSources({});

  useCheckResponse(checkConnectionMutation, () => {}, {
    successMessage: t("connection_ok"),
    errorMessage: t("connection_error"),
  });

  useCheckResponse(createMutation, () => {}, {
    successMessage: t("datasource_created"),
  });

  useCheckResponse(fetchTablesQuery as any, (res) => {
    const schema = res?.fetch_tables?.schema;
    if (schema) {
      setState((prev) => ({
        ...prev,
        schema,
      }));
    }
  });

  useCheckResponse(genSchemaMutation, () => {}, {
    successMessage: t("schema_generated"),
  });

  useEffect(() => {
    const id = formState?.dataSourceSetup?.id;

    if (id) {
      execFetchTables({ variables: { id: id } });
    }
  }, [execFetchTables, formState?.dataSourceSetup?.id]);

  const saveOrCreate = (data: DataSourceSetupForm) => {
    const id = formState?.dataSourceSetup?.id;
    console.log(data);
    if (isEditing && id) {
      execUpdateMutation({
        variables: {
          pk_columns: { id },
          _set: data,
        },
      });
    } else {
      execCreateMutation({ variables: { object: data } });
    }
  };

  const onGoBack = () => setStep((prevState) => prevState - 1);
  const onSkip = () => console.log("skip");
  const onTestConnection = (data: DataSourceSetupForm) => {
    const newDataSource = {
      ...data,
      db_type: formState?.dataSource?.value?.toUpperCase(),
    };

    saveOrCreate(newDataSource);
  };

  const onDataSourceSelect = (value: DataSource) => {
    setState((prevState) => ({ ...prevState, dataSource: value }));
    setStep(1);
  };

  const onDataSourceSetupSubmit = (data: DataSourceSetupForm) => {
    setState((prevState) => ({ ...prevState, dataSourceSetup: data }));
    saveOrCreate(data);

    if (!isEditing) {
      setStep(2);
    }
  };

  const onDataModelGenerationSubmit = (data: DynamicForm) => {
    // TODO get data from api
    const apiSetup: ApiSetupForm = {
      name: "gh-api.clickhouse.tech (Yandex Demo)",
      host: "gh-api.clickhouse.tech",
      user: "user@api.clickhouse.tech",
      username: "user@api.clickhouse.tech",
      port: "12346",
      password: "132456456",
      db_username: "db_username",
      db: "db",
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
    if (formState) onFinish(formState);
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
            isEditing={isEditing}
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
            name: formState?.dataSource?.name,
          }}
          schema={formState?.schema || {}}
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
            initialValue={formState?.apiSetup}
            onSubmit={onApiSetupSubmit}
            onGoBack={onGoBack}
            onSkip={onSkip}
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
