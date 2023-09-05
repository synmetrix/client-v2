import { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Spin, Space } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import PageHeader from "@/components/PageHeader";
import NoCredentials from "@/components/NoCredentials";
import CredentialsTable from "@/components/CredentialsTable";
import Modal from "@/components/Modal";
import ApiSetup from "@/components/ApiSetup";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useLocation from "@/hooks/useLocation";
import useCheckResponse from "@/hooks/useCheckResponse";
import { prepareDataSourceData } from "@/hooks/useUserData";
import { useDatasourcesQuery, useCredentialsQuery } from "@/graphql/generated";
import type {
  CredentialsQuery,
  Datasources,
  Sql_Credentials,
} from "@/graphql/generated";
import genName from "@/utils/helpers/genName";
import formatTime from "@/utils/helpers/formatTime";
import { dbTiles } from "@/mocks/dataSources";
import type { DataSourceInfo } from "@/types/dataSource";

import styles from "./index.module.less";

interface SqlApiProps {
  credentials: any;
  dataSources?: DataSourceInfo[];
  loading?: boolean;
  onFinish: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const SqlApi = ({
  credentials = [],
  dataSources,
  loading = false,
  onEdit = () => {},
  onDelete = () => {},
  onFinish = () => {},
}: SqlApiProps) => {
  const { t } = useTranslation(["settings", "pages"]);
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = () => setIsOpen(true);

  const onClose = () => {
    setIsOpen(false);
    setLocation("/settings/sql");
  };

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:settings.sql_api") }}
    >
      <Spin spinning={loading}>
        <Space className={styles.wrapper} direction="vertical" size={13}>
          <PageHeader
            title={t("settings:sql_api.title")}
            action={t("settings:sql_api.action")}
            actionProps={{
              type: "primary",
              size: "large",
            }}
            onClick={onOpen}
          />
          {credentials.length ? (
            <CredentialsTable credentials={credentials} />
          ) : (
            <NoCredentials />
          )}
        </Space>
      </Spin>

      <Modal width={1000} open={isOpen} onClose={onClose} closable>
        <ApiSetup dataSources={dataSources} initialValue={{}} />
      </Modal>
    </BasicLayout>
  );
};

const prepareCredentialsData = (data: Sql_Credentials[]) => {
  if (!data?.length) return [];
  return data.map((c) => ({
    id: c.id,
    login: c.username,
    createdAt: formatTime(c.created_at),
    member: {
      displayName: c.user.display_name,
    },
    dataSource: {
      url: c.datasource.db_params.host,
      ...dbTiles.find((t) => t.value === c.datasource.db_type.toLowerCase()),
    },
  }));
};

const SqlApiWrapper = () => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const { currentUser, currentTeamId } = CurrentUserStore();
  const [location, setLocation] = useLocation();

  const [credentialsData, execCredentialsQuery] = useCredentialsQuery({
    variables: {
      teamId: currentTeamId,
    },
    pause: true,
  });

  const [dataSourcesData, execDataSourcesQuery] = useDatasourcesQuery({
    variables: {
      where: {
        team_id: {
          _eq: currentTeamId,
        },
      },
    },
    pause: true,
  });

  console.log(dataSourcesData?.data?.datasources);
  const onFinish = () => {
    setLocation("/settings/sql");
  };

  const onDelete = (dataSourceId: string) => {};

  const onEdit = (dataSourceId: string) => {};

  useEffect(() => {
    if (currentTeamId) {
      execCredentialsQuery();
      execDataSourcesQuery();
    }
  }, [currentTeamId, execCredentialsQuery, execDataSourcesQuery]);

  const loading = useMemo(
    () => !!credentialsData.fetching,
    [credentialsData.fetching]
  );
  const credentials = useMemo(
    () =>
      prepareCredentialsData(
        credentialsData?.data?.sql_credentials as Sql_Credentials[]
      ),
    [credentialsData.data]
  );
  const dataSources = useMemo(
    () =>
      prepareDataSourceData(
        dataSourcesData?.data?.datasources as Datasources[]
      ),
    [dataSourcesData.data?.datasources]
  );

  return (
    <SqlApi
      loading={loading}
      dataSources={dataSources}
      credentials={credentials}
      onEdit={onEdit}
      onDelete={onDelete}
      onFinish={onFinish}
    />
  );
};

export default SqlApiWrapper;
