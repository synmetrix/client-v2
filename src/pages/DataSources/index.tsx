import { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Space, Spin } from "antd";

import PageHeader from "@/components/PageHeader";
import BasicLayout from "@/layouts/BasicLayout";
import DataSourceCard from "@/components/DataSourceCard";
import Modal from "@/components/Modal";
import DataSourceForm from "@/components/DataSourceForm";
import NoDataSource from "@/components/NoDataSource";
import type {
  ApiSetupForm,
  DataSourceInfo,
  DataSourceSetupForm,
  DynamicForm,
} from "@/types/dataSource";
import CurrentUserStore from "@/stores/CurrentUserStore";
import DataSourceStore, { defaultFormState } from "@/stores/DataSourceStore";
import useLocation from "@/hooks/useLocation";
import useDataSources from "@/hooks/useDataSources";
import useCheckResponse from "@/hooks/useCheckResponse";
import type {
  Datasources_Pk_Columns_Input,
  Datasources_Set_Input,
} from "@/graphql/generated";
import genName from "@/utils/helpers/genName";

import styles from "./index.module.less";

interface DataSourcesProps {
  dataSources: DataSourceInfo[];
  loading?: boolean;
  onFinish: () => void;
  onTestConnection?: (data: DataSourceSetupForm) => void;
  onDataSourceSetupSubmit?: (data: DataSourceSetupForm) => void;
  onDataModelGenerationSubmit?: (data: DynamicForm) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const DataSources = ({
  dataSources = [],
  loading = false,
  onTestConnection = () => {},
  onDataSourceSetupSubmit = () => {},
  onDataModelGenerationSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onFinish = () => {},
}: DataSourcesProps) => {
  const { t } = useTranslation(["settings", "pages"]);
  const { editId, clean } = DataSourceStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = () => setIsOpen(true);

  const onClose = () => {
    clean();
    setIsOpen(false);
  };

  const onFormFinish = () => {
    onClose();
    onFinish();
  };

  useEffect(() => {
    if (editId) {
      setIsOpen(true);
    }
  }, [editId, setIsOpen]);

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:settings.data_sources") }}
    >
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
                  />
                </Col>
              ))}
            </Row>
          </Space>
        )}
      </Spin>

      <Modal width={1000} open={isOpen} onClose={onClose} closable>
        <DataSourceForm
          onFinish={onFormFinish}
          onTestConnection={onTestConnection}
          onDataSourceSetupSubmit={onDataSourceSetupSubmit}
          onDataModelGenerationSubmit={onDataModelGenerationSubmit}
          bordered={false}
          shadow={false}
        />
      </Modal>
    </BasicLayout>
  );
};

const DataSourcesWrapper = ({
  dataSources = [],
}: {
  dataSources: DataSourceInfo[];
}) => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const { currentUser } = CurrentUserStore();
  const [location, setLocation] = useLocation();
  const { id: curId } = location.query;
  const {
    editId,
    formState: { step0: dataSource, step1: dataSourceSetup },
    setSchema,
    setFormStateData,
    setLoading,
    setMessage,
    setError,
    nextStep,
  } = DataSourceStore();

  const {
    queries: { execFetchTables, fetchTablesQuery },
    mutations: {
      createMutation,
      execCreateMutation,
      updateMutation,
      execUpdateMutation,
      checkConnectionMutation,
      execCheckConnection,
      genSchemaMutation,
      execGenSchemaMutation,
      deleteMutation,
      execDeleteMutation,
      execInsertSqlCredentialsMutation,
    },
  } = useDataSources({});

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: t("datasource_deleted"),
  });

  useCheckResponse(createMutation, () => {}, {
    successMessage: t("datasource_created"),
  });

  const createOrUpdateDataSource = async (data: DataSourceSetupForm) => {
    let dataSourceId;
    if (!editId && !dataSourceSetup?.id) {
      const newData = {
        ...data,
        db_type: dataSource?.value?.toUpperCase(),
      } as Datasources_Set_Input;

      const result = await execCreateMutation({
        variables: { object: newData },
      });

      dataSourceId = result?.data?.insert_datasources_one?.id;
    } else {
      const id = editId || dataSourceSetup?.id;
      const newData = {
        pk_columns: { id } as Datasources_Pk_Columns_Input,
        _set: data as Datasources_Set_Input,
      };

      const result = await execUpdateMutation({ variables: newData });

      setMessage(t("datasource_updated"));
      dataSourceId = result?.data?.update_datasources_by_pk?.id;
    }

    setFormStateData(1, {
      ...data,
      id: dataSourceId,
    });
    return dataSourceId;
  };

  const onDataSourceSetupSubmit = async (data: DataSourceSetupForm) => {
    const dataSourceId = await createOrUpdateDataSource(data);

    if (editId) {
      return;
    }

    const tables = await execFetchTables({ variables: { id: dataSourceId } });
    const schema = tables.data?.fetch_tables?.schema;

    if (schema) {
      setSchema(schema);
      nextStep();
      return;
    } else {
      setMessage(t("no_schema"));
    }
  };

  const onFinish = () => {
    setLocation("/settings/sources");
  };

  const onTestConnection = async (data: DataSourceSetupForm) => {
    try {
      const dataSourceId = await createOrUpdateDataSource(data);
      await execCheckConnection({ variables: { id: dataSourceId } });
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
      const genData = {
        datasource_id: dataSourceSetup.id,
        branch_id: "main",
        tables,
        format: data?.type || "yml",
      };

      try {
        await execGenSchemaMutation({ variables: genData });
        setMessage(t("schema_generated"));
      } catch (error) {
        setError(JSON.stringify(error));
        return null;
      }

      const credentialParams = {
        user_id: currentUser.id,
        datasource_id: dataSourceSetup.id,
        username: genName(10),
        password: genName(10),
      };

      const apiSetup = {
        name: dataSourceSetup?.name,
        host: dataSourceSetup?.db_params?.host,
        user: dataSourceSetup?.db_params?.user,
        port: dataSourceSetup?.db_params?.port,
        db: dataSourceSetup?.db_params?.database,
        db_username: credentialParams.username,
        username: credentialParams.username,
        password: credentialParams.password,
      } as ApiSetupForm;

      setFormStateData(3, apiSetup);

      try {
        await execInsertSqlCredentialsMutation({
          variables: {
            object: credentialParams,
          },
        });
        nextStep();
      } catch (error) {
        setError(JSON.stringify(error));
      }
    }
  };

  const onDelete = (dataSourceId: string) => {
    execDeleteMutation({ variables: { id: dataSourceId } });
  };

  const onEdit = (dataSourceId: string) => {
    setLocation(`/settings/sources?id=${dataSourceId}`);
  };

  const datasources = useMemo(
    () => (dataSources.length ? dataSources : currentUser.dataSources || []),
    [dataSources, currentUser]
  ) as DataSourceInfo[];
  const curDataSource = useMemo(
    () => datasources.find((d) => d.id === curId),
    [curId, datasources]
  );

  useEffect(() => {
    if (curDataSource) {
      DataSourceStore.setState({
        editId: curId,
        formState: {
          ...defaultFormState,
          step0: curDataSource.type,
          step1: {
            db_params: { ...curDataSource.dbParams },
            name: curDataSource.name,
          },
        },
      });
    }
  }, [curId, curDataSource]);

  useEffect(() => {
    const isLoading =
      createMutation.loading ||
      updateMutation.loading ||
      checkConnectionMutation.loading ||
      genSchemaMutation.loading ||
      fetchTablesQuery.loading;

    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    createMutation.loading,
    updateMutation.loading,
    checkConnectionMutation.loading,
    genSchemaMutation.loading,
    fetchTablesQuery.loading,
    setLoading,
  ]);

  return (
    <DataSources
      dataSources={datasources}
      onEdit={onEdit}
      onDelete={onDelete}
      onFinish={onFinish}
      onTestConnection={onTestConnection}
      onDataSourceSetupSubmit={onDataSourceSetupSubmit}
      onDataModelGenerationSubmit={onDataModelGenerationSubmit}
    />
  );
};

export default DataSourcesWrapper;
