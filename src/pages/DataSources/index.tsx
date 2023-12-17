import { Col, Dropdown, Row, Space, Spin } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useResponsive } from "ahooks";
import { useEffect, useMemo } from "react";
import { useParams } from "@vitjs/runtime";
import { useTranslation } from "react-i18next";

import DataSourceForm from "@/components/DataSourceForm";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import NoDataSource from "@/components/NoDataSource";
import PageHeader from "@/components/PageHeader";
import formatTime from "@/utils/helpers/formatTime";
import DataSourceTag from "@/components/DataSourceTag";
import ConfirmModal from "@/components/ConfirmModal";
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
import { Roles } from "@/types/team";
import type { DataSourceState } from "@/stores/DataSourceStore";
import type {
  DataSourceInfo,
  DataSourceSetupForm,
  DynamicForm,
} from "@/types/dataSource";

import styles from "./index.module.less";

interface DataSourcesProps {
  dataSources: DataSourceInfo[];
  disableCreate: boolean;
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
  disableCreate = false,
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
  const responsive = useResponsive();

  const onOpen = () => {
    setIsOnboarding(true);
    setLocation("/settings/sources/new");
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

  const renderCard = (dataSource: DataSourceInfo) => {
    return (
      <Card
        title={dataSource.name}
        titleTooltip={dataSource.name}
        onTitleClick={() => dataSource.id && onEdit(dataSource.id)}
        extra={
          <Dropdown
            className={styles.btn}
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "edit",
                  label: t("common:words.edit"),
                  onClick: () => dataSource.id && onEdit(dataSource.id),
                },
                {
                  key: "generate",
                  label: t("common:words.generate_models"),
                  onClick: () =>
                    dataSource.id && onGenerateModel(dataSource.id),
                },
                {
                  key: "delete",
                  className: styles.deleteItem,
                  label: (
                    <ConfirmModal
                      title={t("common:words.delete_datasource")}
                      className={styles.deleteText}
                      onConfirm={() => dataSource.id && onDelete(dataSource.id)}
                    >
                      {t("common:words.delete")}
                    </ConfirmModal>
                  ),
                },
              ],
            }}
          >
            <SettingOutlined key="setting" />
          </Dropdown>
        }
      >
        <dl>
          {dataSource.dbParams.host && (
            <>
              <dt>{t("common:words.host")}</dt>
              <dd title={dataSource.dbParams.host}>
                {dataSource.dbParams.host}
              </dd>
            </>
          )}

          {dataSource.type && (
            <>
              <dt>{t("common:words.type")}</dt>
              <dd>
                <DataSourceTag dataSource={dataSource.type} />
              </dd>
            </>
          )}

          {dataSource.createdAt && (
            <>
              <dt>{t("common:words.created_at")}</dt>
              <dd title={formatTime(dataSource.createdAt)}>
                {formatTime(dataSource.createdAt)}
              </dd>
            </>
          )}

          {dataSource.updatedAt && (
            <>
              <dt>{t("common:words.updated_at")}</dt>
              <dd title={formatTime(dataSource.updatedAt)}>
                {formatTime(dataSource.updatedAt)}
              </dd>
            </>
          )}
        </dl>
      </Card>
    );
  };

  return (
    <>
      <Spin spinning={loading}>
        {dataSources.length === 0 && (
          <NoDataSource onConnect={!disableCreate ? onOpen : undefined} />
        )}
        {dataSources.length > 0 && (
          <Space className={styles.wrapper} direction="vertical" size={13}>
            <PageHeader
              title={
                !responsive.sm
                  ? t("settings:data_sources.title_mobile")
                  : t("settings:data_sources.title")
              }
              action={!disableCreate && t("settings:data_sources.create_now")}
              actionProps={{
                type: "primary",
                size: "large",
              }}
              onClick={onOpen}
            />

            <div className={styles.body}>
              <Row justify={"start"} gutter={[32, 32]}>
                {dataSources.map((d) => (
                  <Col xs={24} sm={12} xl={8} key={d.id}>
                    {renderCard(d)}
                  </Col>
                ))}
              </Row>
            </div>
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
          loading={loading}
          bordered={false}
          shadow={false}
        />
      </Modal>
    </>
  );
};

const DataSourcesWrapper = () => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const { currentUser, currentTeam, teamData, loading, setLoading } =
    CurrentUserStore();
  const { withAuthPrefix } = useAppSettings();
  const [, setLocation] = useLocation();
  const { editId, generate } = useParams();

  const basePath = withAuthPrefix("/settings/sources");
  const modelsPath = withAuthPrefix("/models");
  const connect = editId === "new";

  const {
    formState: { step0: dataSource, step1: dataSourceSetup, step3: apiSetup },
    schema,
    step,
    isOnboarding,
    isGenerate,
    setIsGenerate,
    setSchema,
    setFormStateData,
    nextStep,
    setStep,
    setIsOnboarding,
    clean,
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
    [dataSources, editId, dataSourceSetup?.id]
  );
  const activeBranchId = useMemo(
    () =>
      curDataSource?.branches?.find((b) => b.status === "active")?.id ||
      curDataSource?.branches?.[0]?.id,
    [curDataSource?.branches]
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

  const onFinish = useCallback(() => {
    let finishPath = modelsPath;

    if (dataSourceSetup?.id) {
      finishPath = `${finishPath}/${dataSourceSetup.id}`;
    }

    clean();
    setLocation(finishPath);
  }, [dataSourceSetup?.id, modelsPath, clean, setLocation]);

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

  const createOrUpdateDataSource = async (data: DataSourceSetupForm) => {
    setLoading(true);
    let dataSourceId;

    if (connect && !dataSourceSetup?.id) {
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

    if (!apiSetup && isOnboarding) {
      await createSQLApi(resultId, data.name);
    }

    nextStep();
  };

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

      if (isOnboarding) {
        nextStep();
        return true;
      }

      onFinish();
    }
  };

  const onDelete = (dataSourceId: string) => {
    setLoading(true);
    execDeleteMutation({ id: dataSourceId });
  };

  const onEdit = (dataSourceId: string) => {
    setLocation(`${basePath}/${dataSourceId}`);
  };

  useEffect(() => {
    if (!connect && dataSources.length && editId && !curDataSource) {
      setLocation(basePath);
    }
  }, [
    basePath,
    curDataSource,
    editId,
    dataSources.length,
    setLocation,
    connect,
  ]);

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
    if (connect) {
      setIsOnboarding(true);
    }
  }, [connect, setIsOnboarding]);

  useEffect(() => {
    if (!connect && editId && !generate) {
      setStep(1);
    }
  }, [connect, editId, generate, setStep]);

  useEffect(() => {
    if (generate && generate === "generate") {
      setIsGenerate(true);
    }
  }, [generate, setIsGenerate]);

  useEffect(() => {
    if (isGenerate && curDataSource) {
      setStep(2);
    }
  }, [isGenerate, curDataSource, setStep]);

  const onGenerate = (id: string) => {
    setLocation(`${basePath}/${id}/generate`);
  };

  const isMember = currentTeam?.role === Roles.member;

  return (
    <DataSources
      defaultOpen={!!editId}
      disableCreate={isMember}
      dataSources={dataSources}
      loading={loading}
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
