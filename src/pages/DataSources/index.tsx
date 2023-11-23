import { Col, Dropdown, Row, Space, Spin, message } from "antd";
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
  const responsive = useResponsive();

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

                {
                  key: "generate",
                  label: t("common:words.generate_models"),
                  onClick: () =>
                    dataSource.id && onGenerateModel(dataSource.id),
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
        {dataSources.length === 0 && <NoDataSource onConnect={onOpen} />}
        {dataSources.length > 0 && (
          <Space className={styles.wrapper} direction="vertical" size={13}>
            <PageHeader
              title={
                !responsive.sm
                  ? t("settings:data_sources.title_mobile")
                  : t("settings:data_sources.title")
              }
              action={t("settings:data_sources.create_now")}
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
    loading,
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

  useCheckResponse(genSchemaMutation, () => {}, {
    successMessage: t("schema_generated"),
  });

  useCheckResponse(checkConnectionMutation, () => {}, {
    successMessage: t("connection_ok"),
  });

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
    const test = await execCheckConnection({
      id: dataSourceSetup?.id || data?.id,
    });

    if (!test.data?.check_connection) {
      return null;
    }
    return true;
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
