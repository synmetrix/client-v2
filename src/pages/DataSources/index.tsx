import { Col, Dropdown, Row, Space, Spin } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useResponsive } from "ahooks";
import { useEffect, useMemo } from "react";
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
import useCheckResponse from "@/hooks/useCheckResponse";
import useLocation from "@/hooks/useLocation";
import { prepareInitValues } from "@/pages/SqlApi";
import CurrentUserStore from "@/stores/CurrentUserStore";
import DataSourceStore, { defaultFormState } from "@/stores/DataSourceStore";
import { Roles } from "@/types/team";
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
  const { setStep, editId, clean, setIsOnboarding } = DataSourceStore();
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const responsive = useResponsive();

  const onOpen = () => {
    setIsOnboarding(true);
    setIsOpen(true);
  };

  const onClose = useCallback(() => {
    clean();
    setIsOpen(false);
    setLocation("/settings/sources");
  }, [clean, setLocation]);

  const onFormFinish = () => {
    onClose();
    onFinish();
  };

  const onGenerateModel = (id: string) => {
    onGenerate(id);
    setIsOpen(true);
    setStep(2);
  };

  useEffect(() => {
    if (editId) {
      setIsOpen(true);
    }
  }, [editId, setIsOpen]);

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
                  label: (
                    <ConfirmModal
                      title={t("common:words.delete_datasource")}
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
        open={isOpen}
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

const DataSourcesWrapper = ({
  dataSources = [],
}: {
  dataSources: DataSourceInfo[];
}) => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const {
    currentUser,
    currentTeamId,
    currentTeam,
    teamData,
    loading,
    setLoading,
  } = CurrentUserStore();
  const [location, setLocation] = useLocation();
  const { id: curId, connect } = location.query;
  const {
    editId,
    formState: { step0: dataSource, step1: dataSourceSetup },
    schema,
    isOnboarding,
    setSchema,
    setFormStateData,
    // setLoading,
    setMessage,
    setError,
    nextStep,
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
    variables: { id: dataSourceSetup?.id || editId },
    pause: true,
  });

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: t("datasource_deleted"),
  });

  useCheckResponse(createMutation, () => {}, {
    successMessage: t("datasource_created"),
  });

  const datasources = useMemo(
    () => (dataSources.length ? dataSources : teamData.dataSources || []),
    [dataSources, teamData]
  ) as DataSourceInfo[];
  const curDataSource = useMemo(
    () =>
      datasources.find((d) => d.id === curId || d.id === dataSourceSetup?.id),
    [curId, dataSourceSetup?.id, datasources]
  );
  const activeBranchId = useMemo(
    () => curDataSource?.branch?.id,
    [curDataSource?.branch?.id]
  );

  const createOrUpdateDataSource = async (data: DataSourceSetupForm) => {
    let dataSourceId;
    if (!editId && !dataSourceSetup?.id) {
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
      const id = editId || dataSourceSetup?.id;

      delete data.id;
      const newData = {
        pk_columns: { id } as Datasources_Pk_Columns_Input,
        _set: data as Datasources_Set_Input,
      };

      const result = await execUpdateMutation(newData);

      dataSourceId = result?.data?.update_datasources_by_pk?.id;

      if (dataSourceId) {
        setMessage(t("datasource_updated"));
      } else {
        setError(t("datasource_update_error"));
      }
    }

    setFormStateData(1, {
      ...data,
      id: dataSourceId,
    });
    return dataSourceId;
  };

  const onDataSourceSetupSubmit = async (data: DataSourceSetupForm) => {
    await createOrUpdateDataSource(data);

    if (!isOnboarding) {
      return;
    }

    nextStep();
  };

  const onFinish = () => {
    setLocation("/settings/sources");
  };

  const onTestConnection = async (data: DataSourceSetupForm) => {
    try {
      const dataSourceId = await createOrUpdateDataSource(data);
      const test = await execCheckConnection({ id: dataSourceId });

      if (!test.data?.check_connection) {
        setError(t("connection_error"));
        return null;
      }
      setMessage(t("connection_ok"));
    } catch (error) {
      setError(JSON.stringify(error));
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
          setError(t("no_schema"));
          return null;
        }
        setMessage(t("schema_generated"));
      } catch (error) {
        setError(JSON.stringify(error));
        return null;
      }

      if (isOnboarding) {
        const apiSetup = prepareInitValues(
          dataSourceSetup.id,
          dataSourceSetup.name,
          currentUser.id
        );
        const credentialParams = {
          user_id: currentUser.id,
          datasource_id: dataSourceSetup.id,
          username: apiSetup.db_username,
          password: apiSetup.password,
        };

        setFormStateData(3, apiSetup);

        try {
          await execInsertSqlCredentialsMutation({ object: credentialParams });
          nextStep();
        } catch (error) {
          setError(JSON.stringify(error));
        }
      }
    }
  };

  const onDelete = (dataSourceId: string) => {
    execDeleteMutation({ id: dataSourceId });
  };

  const onEdit = (dataSourceId: string) => {
    setLocation(`/settings/sources?id=${dataSourceId}`);
  };

  useEffect(() => {
    if (curDataSource) {
      DataSourceStore.setState((prev) => ({
        editId: curId,
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
      }));
    }
  }, [curId, curDataSource]);

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
    if (!editId && dataSourceSetup?.id && !schema) {
      execFetchTables();
    }
  }, [dataSourceSetup?.id, schema, editId, execFetchTables]);

  useEffect(() => {
    if (fetchTablesQuery.data) {
      setSchema(fetchTablesQuery.data?.fetch_tables?.schema);
    }
  }, [fetchTablesQuery.data, setSchema]);

  const onGenerate = (id: string) => {
    setFormStateData(1, { ...dataSourceSetup, id });
  };

  const isMember = currentTeam?.role === Roles.member;

  return (
    <DataSources
      defaultOpen={!!connect}
      disableCreate={isMember}
      dataSources={datasources}
      onEdit={onEdit}
      onDelete={onDelete}
      onFinish={onFinish}
      onGenerate={onGenerate}
      onTestConnection={onTestConnection}
      onDataSourceSetupSubmit={onDataSourceSetupSubmit}
      onDataModelGenerationSubmit={onDataModelGenerationSubmit}
    />
  );
};

export default DataSourcesWrapper;
