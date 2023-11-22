import { Col, Row, Space, Spin, message } from "antd";
import { useEffect, useMemo } from "react";
import { useParams } from "@vitjs/runtime";
import { useTranslation } from "react-i18next";

import DataSourceCard from "@/components/DataSourceCard";
import DataSourceForm from "@/components/DataSourceForm";
import Modal from "@/components/Modal";
import NoDataSource from "@/components/NoDataSource";
import PageHeader from "@/components/PageHeader";
import type {
  Datasources_Pk_Columns_Input,
  Datasources_Set_Input,
} from "@/graphql/generated";
import {
  useCheckConnectionMutation,
  useCreateDataSourceMutation,
  useDeleteDataSourceMutation,
  useFetchTablesQuery,
  useGenDataSchemasMutation,
  useInsertSqlCredentialsMutation,
  Branch_Statuses_Enum,
  useUpdateDataSourceMutation,
} from "@/graphql/generated";
import useAppSettings from "@/hooks/useAppSettings";
import useCheckResponse from "@/hooks/useCheckResponse";
import useLocation from "@/hooks/useLocation";
import { prepareInitValues } from "@/pages/SqlApi";
import CurrentUserStore from "@/stores/CurrentUserStore";
import DataSourceStore, { defaultFormState } from "@/stores/DataSourceStore";
import type { DataSourceState } from "@/stores/DataSourceStore";
import type {
  DataSourceInfo,
  DataSourceSetupForm,
  DynamicForm,
} from "@/types/dataSource";

import styles from "./index.module.less";

interface DataSourcesProps {
  dataSources: DataSourceInfo[];
  loading?: boolean;
  defaultOpen?: boolean;
  onFinish: () => void;
  onTestConnection?: (data: DataSourceSetupForm) => void;
  onDataSourceSetupSubmit?: (data: DataSourceSetupForm) => void;
  onDataModelGenerationSubmit?: (data: DynamicForm) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onGenerate?: (id: string) => void;
}

export const DataSources = ({
  dataSources = [],
  loading = false,
  defaultOpen = false,
  onTestConnection = () => {},
  onDataSourceSetupSubmit = () => {},
  onDataModelGenerationSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onFinish = () => {},
  onGenerate = () => {},
}: DataSourcesProps) => {
  const { t } = useTranslation(["settings", "pages"]);
  const [, setLocation] = useLocation();
  const { setStep, clean, setIsOnboarding } = DataSourceStore();

  const onOpen = () => {
    setIsOnboarding(true);
    setLocation("/settings/sources/connect");
  };

  const onClose = useCallback(() => {
    setLocation("/settings/sources");
  }, [setLocation]);

  const onFormFinish = () => {
    onClose();
    onFinish();
  };

  const onGenerateModel = (id: string) => {
    onGenerate(id);
    setStep(2);
  };

  return (
    <>
      <Spin spinning={loading}>
        {dataSources.length === 0 && <NoDataSource onConnect={onOpen} />}
        {dataSources.length > 0 && (
          <Space className={styles.wrapper} direction="vertical" size={13}>
            <PageHeader
              title={t("settings:data_sources.title")}
              action={t("settings:data_sources.create_now")}
              actionProps={{
                type: "primary",
                size: "large",
              }}
              onClick={onOpen}
            />

            <Row className={styles.body} justify={"start"} gutter={[32, 32]}>
              {dataSources.map((d) => (
                <Col key={d.id}>
                  <DataSourceCard
                    dataSource={d}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onGenerate={onGenerateModel}
                  />
                </Col>
              ))}
            </Row>
          </Space>
        )}
      </Spin>

      <Modal
        width={1000}
        afterClose={clean}
        open={defaultOpen}
        onClose={onClose}
        destroyOnClose
        closable
      >
        <DataSourceForm
          onFinish={onFormFinish}
          onTestConnection={onTestConnection}
          onDataSourceSetupSubmit={onDataSourceSetupSubmit}
          onDataModelGenerationSubmit={onDataModelGenerationSubmit}
          bordered={false}
          shadow={false}
        />
      </Modal>
    </>
  );
};

const DataSourcesWrapper = () => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const { currentUser, currentTeamId } = CurrentUserStore();
  const { withAuthPrefix } = useAppSettings();
  const [, setLocation] = useLocation();
  const { slug, generate } = useParams();
  const basePath = withAuthPrefix("/settings/sources");
  const isGenerate = generate === "generate";
  const connect = slug === "connect";
  const curId = !connect && slug;
  const {
    formState: { step0: dataSource, step1: dataSourceSetup, step3: apiSetup },
    schema,
    step,
    isOnboarding,
    setSchema,
    setFormStateData,
    setLoading,
    nextStep,
    setStep,
    setIsOnboarding,
  } = DataSourceStore();

  const [createMutation, execCreateMutation] = useCreateDataSourceMutation();
  const [updateMutation, execUpdateMutation] = useUpdateDataSourceMutation();
  const [deleteMutation, execDeleteMutation] = useDeleteDataSourceMutation();
  const [checkConnectionMutation, execCheckConnection] =
    useCheckConnectionMutation();
  const [genSchemaMutation, execGenSchemaMutation] =
    useGenDataSchemasMutation();
  const [, execInsertSqlCredentialsMutation] =
    useInsertSqlCredentialsMutation();
  const [fetchTablesQuery, execFetchTables] = useFetchTablesQuery({
    variables: { id: dataSourceSetup?.id },
    pause: true,
  });

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: t("datasource_deleted"),
  });

  useCheckResponse(createMutation, () => {}, {
    successMessage: t("datasource_created"),
  });

  useCheckResponse(updateMutation, () => {}, {
    successMessage: t("datasource_updated"),
  });

  useCheckResponse(
    fetchTablesQuery,
    (_data, err) => {
      if (err?.message) {
        message.error(err?.message);
        delete fetchTablesQuery.error;
      }
    },
    {
      showMessage: false,
      showResponseMessage: false,
    }
  );

  useCheckResponse(
    genSchemaMutation,
    (_data, err) => {
      if (err?.message) {
        message.error(err.message);
        delete fetchTablesQuery.error;
      }
    },
    {
      showMessage: false,
      showResponseMessage: false,
    }
  );

  const dataSources = useMemo(
    () => currentUser?.dataSources || [],
    [currentUser]
  ) as DataSourceInfo[];
  const curDataSource = useMemo(
    () =>
      dataSources.find((d) => d.id === curId || d.id === dataSourceSetup?.id),
    [curId, dataSourceSetup?.id, dataSources]
  );
  const activeBranchId = useMemo(
    () => curDataSource?.branch?.id,
    [curDataSource?.branch?.id]
  );

  const onTestConnection = async (data: DataSourceSetupForm) => {
    try {
      const test = await execCheckConnection({
        id: dataSourceSetup?.id || data?.id,
      });

      if (!test.data?.check_connection) {
        message.error(t("connection_error"));
        return null;
      }
      message.success(t("connection_ok"));
      return true;
    } catch (error) {
      message.error(JSON.stringify(error));
    }
  };

  const onFinish = useCallback(() => {
    setLocation(basePath);
  }, [basePath, setLocation]);

  const createSQLApi = useCallback(async () => {
    if (dataSourceSetup?.id) {
      const apiConfig = prepareInitValues(
        dataSourceSetup.id,
        dataSourceSetup.name,
        currentUser.id
      );
      const credentialParams = {
        user_id: currentUser.id,
        datasource_id: dataSourceSetup.id,
        username: apiConfig.db_username,
        password: apiConfig.password,
      };

      setFormStateData(3, apiConfig);
      execInsertSqlCredentialsMutation({ object: credentialParams });
    }
  }, [
    currentUser.id,
    dataSourceSetup,
    execInsertSqlCredentialsMutation,
    setFormStateData,
  ]);

  const createOrUpdateDataSource = async (data: DataSourceSetupForm) => {
    let dataSourceId;
    if (!curId && !dataSourceSetup?.id) {
      const newData = {
        ...data,
        db_type: dataSource?.value?.toUpperCase(),
      } as Datasources_Set_Input;

      if (currentTeamId) {
        newData.team_id = currentTeamId;
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

  const onDataSourceSetupSubmit = async (
    data: DataSourceSetupForm,
    isTest?: boolean
  ) => {
    const resultId = await createOrUpdateDataSource(data);

    const testResult = await onTestConnection({
      id: resultId,
    } as DataSourceSetupForm);

    if (!testResult || isTest) {
      return;
    }

    if (isOnboarding) {
      nextStep();
    } else {
      onFinish();
    }
  };

  const onDataModelGenerationSubmit = async (data: DynamicForm) => {
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
      try {
        const res = await execGenSchemaMutation({
          datasource_id: dataSourceSetup.id,
          branch_id: activeBranchId,
          tables,
          format: data?.type || "yaml",
          overwrite: true,
        });

        if (res.error) {
          message.error(res.error.message);
          return null;
        }
        message.success(t("schema_generated"));
      } catch (error) {
        message.error(JSON.stringify(error));
        return null;
      }

      if (!isOnboarding) {
        setLocation(basePath);
      } else {
        nextStep();
      }
    }
  };

  const onDelete = (dataSourceId: string) => {
    execDeleteMutation({ id: dataSourceId });
  };

  const onEdit = (dataSourceId: string) => {
    setLocation(`${basePath}/${dataSourceId}`);
  };

  useEffect(() => {
    if (dataSources.length && curId && !curDataSource) {
      onFinish();
    }
  }, [curDataSource, curId, dataSources.length, onFinish, setLocation, t]);

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
    const isLoading =
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
    createMutation.fetching,
    updateMutation.fetching,
    checkConnectionMutation.fetching,
    genSchemaMutation.fetching,
    fetchTablesQuery.fetching,
    setLoading,
  ]);

  useEffect(() => {
    if (step === 2 && dataSourceSetup?.id && !schema) {
      execFetchTables();
    }
  }, [dataSourceSetup?.id, schema, step, execFetchTables]);

  useEffect(() => {
    if (isOnboarding && !apiSetup && dataSourceSetup) {
      createSQLApi();
    }
  }, [apiSetup, createSQLApi, dataSourceSetup, isOnboarding]);

  useEffect(() => {
    if (fetchTablesQuery.data) {
      setSchema(fetchTablesQuery.data?.fetch_tables?.schema);
    }
  }, [fetchTablesQuery.data, setSchema]);

  useEffect(() => {
    if (connect) {
      setIsOnboarding(true);
    }
  }, [connect, setIsOnboarding]);

  useEffect(() => {
    if (curId) {
      setStep(1);
    }
  }, [curId, setStep]);

  useEffect(() => {
    if (isGenerate && curDataSource) {
      setStep(2);
    }
  }, [isGenerate, curDataSource, setStep]);

  const onGenerate = (id: string) => {
    setLocation(`${basePath}/${id}/generate`);
  };

  return (
    <DataSources
      defaultOpen={!!slug}
      dataSources={dataSources}
      onEdit={onEdit}
      onDelete={onDelete}
      onFinish={onFinish}
      onGenerate={onGenerate}
      onTestConnection={onDataSourceSetupSubmit}
      onDataSourceSetupSubmit={onDataSourceSetupSubmit}
      onDataModelGenerationSubmit={onDataModelGenerationSubmit}
    />
  );
};

export default DataSourcesWrapper;
