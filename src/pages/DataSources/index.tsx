import { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Space } from "antd";

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
import DataSourceStore from "@/stores/DataSourceStore";
import useLocation from "@/hooks/useLocation";
import useDataSources from "@/hooks/useDataSources";
import useCheckResponse from "@/hooks/useCheckResponse";
import type {
  Datasources_Pk_Columns_Input,
  Datasources_Set_Input,
} from "@/graphql/generated";

import styles from "./index.module.less";

interface DataSourcesProps {
  dataSources: DataSourceInfo[];
  onFinish: (data: ApiSetupForm) => void;
  onTestConnection?: (data: DataSourceSetupForm) => void;
  onDataSourceSetupSubmit?: (data: DataSourceSetupForm) => void;
  onDataModelGenerationSubmit?: (data: DynamicForm) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  setLocation: (location: string) => void;
}

export const DataSources = ({
  dataSources = [],
  onTestConnection = () => {},
  onDataSourceSetupSubmit = () => {},
  onDataModelGenerationSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onFinish = () => {},
  setLocation,
}: DataSourcesProps) => {
  const { t } = useTranslation(["settings", "pages"]);
  const { id, clean } = DataSourceStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = () => setIsOpen(true);

  const onClose = () => {
    setIsOpen(false);
    setLocation("/settings/sources");
    clean();
  };

  useEffect(() => {
    if (id) {
      onOpen();
    }
  }, [id]);

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:settings.data_sources") }}
    >
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
                <DataSourceCard {...d} onEdit={onEdit} onDelete={onDelete} />
              </Col>
            ))}
          </Row>
        </Space>
      )}

      <Modal width={1000} open={isOpen} onClose={() => onClose()} closable>
        <DataSourceForm
          onFinish={onFinish}
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
  const { t } = useTranslation(["common"]);
  const { currentUser } = CurrentUserStore();
  const { id, dataSource, setSchema, setLoading } = DataSourceStore();
  const [location, setLocation] = useLocation();
  const { id: editId } = location.query;

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
      deleteMutation,
      execDeleteMutation,
    },
  } = useDataSources({});

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: "Data Source deleted",
  });

  useCheckResponse(checkConnectionMutation, () => {}, {
    successMessage: t("connection_ok"),
    errorMessage: t("connection_error"),
  });

  useCheckResponse(createMutation, () => {}, {
    successMessage: t("datasource_created"),
  });

  useCheckResponse(genSchemaMutation, () => {}, {
    successMessage: t("schema_generated"),
  });

  const createOrUpdateDataSource = async (data: DataSourceSetupForm) => {
    if (!id) {
      const newData = {
        ...data,
        db_type: dataSource?.value?.toUpperCase(),
      } as Datasources_Set_Input;

      const result = await execCreateMutation({
        variables: { object: newData },
      });
      return result?.data?.insert_datasources_one?.id;
    } else {
      const newData = {
        pk_columns: { id } as Datasources_Pk_Columns_Input,
        _set: data as Datasources_Set_Input,
      };

      const result = await execUpdateMutation({ variables: newData });
      return result?.data?.update_datasources_by_pk?.id;
    }
  };

  const onDataSourceSetupSubmit = async (data: DataSourceSetupForm) => {
    const dataSourceId = await createOrUpdateDataSource(data);
    const tables = await execFetchTables({ variables: { id: dataSourceId } });
    const schema = tables?.data?.fetch_tables?.schema;

    if (schema) {
      setSchema(schema);
    }
  };

  const onFinish = () => {};
  const onTestConnection = async (data: DataSourceSetupForm) => {
    const dataSourceId = await createOrUpdateDataSource(data);
    await execCheckConnection({ variables: { id: dataSourceId } });
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

    const genData = {
      datasource_id: id,
      branch_id: "main",
      tables,
      format: data?.type || "yml",
    };

    await execGenSchemaMutation({ variables: genData });
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
    () => datasources.find((d) => d.id === editId),
    [editId, datasources]
  );

  useEffect(() => {
    if (curDataSource) {
      DataSourceStore.setState({
        id: curDataSource.id,
        dataSource: curDataSource.type,
        dataSourceSetup: {
          db_params: { ...curDataSource.db_params },
          name: curDataSource.name,
        },
      });
    }
  }, [curDataSource]);

  useEffect(() => {
    const isLoading =
      createMutation.loading ||
      updateMutation.loading ||
      deleteMutation.loading ||
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
    deleteMutation.loading,
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
      setLocation={setLocation}
    />
  );
};

export default DataSourcesWrapper;
