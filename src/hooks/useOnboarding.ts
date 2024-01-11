import { useTranslation } from "react-i18next";

import type {
  Datasources_Pk_Columns_Input,
  Datasources_Set_Input,
} from "@/graphql/generated";
import {
  Branch_Statuses_Enum,
  useCheckConnectionMutation,
  useCreateDataSourceMutation,
  useFetchTablesQuery,
  useGenDataSchemasMutation,
  useInsertSqlCredentialsMutation,
  useUpdateDataSourceMutation,
} from "@/graphql/generated";
import { prepareInitValues } from "@/pages/SqlApi";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type { DataSourceState } from "@/stores/DataSourceStore";
import DataSourceStore, { defaultFormState } from "@/stores/DataSourceStore";
import type {
  DataSourceInfo,
  DataSourceSetupForm,
  DynamicForm,
} from "@/types/dataSource";
import useCheckResponse from "@/hooks/useCheckResponse";

interface Props {
  editId?: string;
}

export default ({ editId }: Props) => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const { currentTeam, teamData, currentUser, loading, setLoading } =
    CurrentUserStore();

  const [, execInsertSqlCredentialsMutation] =
    useInsertSqlCredentialsMutation();
  const [checkConnectionMutation, execCheckConnection] =
    useCheckConnectionMutation();
  const [createMutation, execCreateMutation] = useCreateDataSourceMutation();
  const [updateMutation, execUpdateMutation] = useUpdateDataSourceMutation();
  const [genSchemaMutation, execGenSchemaMutation] =
    useGenDataSchemasMutation();

  const {
    formState: { step0: dataSource, step1: dataSourceSetup, step3: apiSetup },
    schema,
    step,
    isOnboarding,
    setSchema,
    setFormStateData,
  } = DataSourceStore();

  const [fetchTablesQuery, execFetchTables] = useFetchTablesQuery({
    variables: { id: dataSourceSetup?.id },
    pause: true,
  });

  useCheckResponse(createMutation, () => {}, {
    successMessage: t("datasource_created"),
  });

  useCheckResponse(updateMutation, () => {}, {
    successMessage: t("datasource_updated"),
  });

  useCheckResponse(fetchTablesQuery, () => {}, {
    showMessage: false,
  });

  useCheckResponse(genSchemaMutation, () => {}, {
    successMessage: t("schema_generated"),
  });

  useCheckResponse(checkConnectionMutation, () => {}, {
    successMessage: t("connection_ok"),
  });

  const dataSources = useMemo(
    () => teamData?.dataSources || [],
    [teamData]
  ) as DataSourceInfo[];
  const curDataSource = useMemo(
    () =>
      dataSources.find((d) => d.id === editId || d.id === dataSourceSetup?.id),
    [editId, dataSourceSetup?.id, dataSources]
  );
  const activeBranchId = useMemo(
    () => curDataSource?.branches?.find((b) => b.status === "active")?.id,
    [curDataSource?.branches]
  );

  const onDataModelGenerationSubmit = async (data: DynamicForm) => {
    setLoading(true);

    let tables = { ...data } as any;
    delete tables.type;
    tables = Object.values(tables).reduce(
      (acc: any, value: any) => [
        ...acc,
        ...Object.keys(value).map((v) => ({ name: v })),
      ],
      []
    );

    if (dataSourceSetup) {
      const res = await execGenSchemaMutation({
        datasource_id: dataSourceSetup.id,
        branch_id: activeBranchId,
        tables,
        format: data?.type || "yaml",
        overwrite: true,
      });

      if (res.error) {
        return null;
      }

      return true;
    }
  };

  const createOrUpdateDataSource = async (data: DataSourceSetupForm) => {
    setLoading(true);
    let dataSourceId;

    if (!dataSourceSetup?.id) {
      const newData = {
        ...data,
        db_type: dataSource?.value?.toUpperCase(),
      } as Datasources_Set_Input;

      if (currentTeam?.id) {
        newData.team_id = currentTeam?.id;
      }

      const result = await execCreateMutation({
        object: {
          ...newData,
          branches: {
            data: [
              {
                status: Branch_Statuses_Enum.Active,
                user_id: currentUser.id,
              },
            ],
          },
        },
      });

      dataSourceId = result?.data?.insert_datasources_one?.id;
    } else {
      delete data.id;
      const newData = {
        pk_columns: { id: dataSourceSetup?.id } as Datasources_Pk_Columns_Input,
        _set: data as Datasources_Set_Input,
      };

      const result = await execUpdateMutation(newData);

      dataSourceId = result?.data?.update_datasources_by_pk?.id;
    }

    if (dataSourceId) {
      setFormStateData(1, {
        ...data,
        id: dataSourceId,
      });
      return dataSourceId;
    }
  };

  const createSQLApi = useCallback(
    async (dataSourceId: string, dataSourceName: string) => {
      const apiConfig = prepareInitValues(
        dataSourceId,
        dataSourceName,
        currentUser.id
      );
      const credentialParams = {
        user_id: currentUser.id,
        datasource_id: dataSourceId,
        username: apiConfig.db_username,
        password: apiConfig.password,
      };

      const sqlApiResult = await execInsertSqlCredentialsMutation({
        object: credentialParams,
      });
      const newSqlApiId = sqlApiResult.data?.insert_sql_credentials_one?.id;

      if (newSqlApiId) {
        setFormStateData(3, apiConfig);
      }
    },
    [currentUser.id, execInsertSqlCredentialsMutation, setFormStateData]
  );

  const onTestConnection = async (data: DataSourceSetupForm) => {
    const test = await execCheckConnection({
      id: dataSourceSetup?.id || data?.id,
    });

    setLoading(false);
    if (!test.data?.check_connection) {
      return null;
    }
    return true;
  };

  const onDataSourceSetupSubmit = async (
    data: DataSourceSetupForm,
    isTest?: boolean,
    callback?: () => void
  ) => {
    const resultId = await createOrUpdateDataSource(data);

    const testResult = await onTestConnection({
      id: resultId,
    } as DataSourceSetupForm);

    if (!testResult || isTest) {
      return;
    }

    if (!apiSetup && isOnboarding) {
      await createSQLApi(resultId, data.name);
    }

    callback?.();
  };

  useEffect(() => {
    if (curDataSource) {
      DataSourceStore.setState(
        (prev) =>
          ({
            ...prev,
            formState: {
              ...defaultFormState,
              ...prev.formState,
              step0: curDataSource.type,
              step1: {
                id: curDataSource?.id,
                db_params: { ...curDataSource.dbParams },
                name: curDataSource.name,
              },
            },
          } as Partial<DataSourceState>)
      );
    }
  }, [curDataSource]);

  useEffect(() => {
    if (step === 2 && dataSourceSetup?.id && !schema) {
      execFetchTables();
    }
  }, [dataSourceSetup?.id, schema, step, execFetchTables]);

  useEffect(() => {
    if (fetchTablesQuery.data) {
      setLoading(false);
      setSchema(fetchTablesQuery.data?.fetch_tables?.schema);
    }
  }, [fetchTablesQuery.data, setSchema, setLoading]);

  useEffect(() => {
    const isLoading =
      loading ||
      createMutation.fetching ||
      updateMutation.fetching ||
      checkConnectionMutation.fetching ||
      genSchemaMutation.fetching ||
      fetchTablesQuery.fetching;

    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    loading,
    createMutation.fetching,
    updateMutation.fetching,
    checkConnectionMutation.fetching,
    genSchemaMutation.fetching,
    fetchTablesQuery.fetching,
    setLoading,
  ]);

  return {
    dataSources,
    curDataSource,
    createSQLApi,
    onTestConnection,
    createOrUpdateDataSource,
    onDataModelGenerationSubmit,
    onDataSourceSetupSubmit,
  };
};
