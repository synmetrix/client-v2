import { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Spin, Space, message } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import PageHeader from "@/components/PageHeader";
import NoCredentials from "@/components/NoCredentials";
import type { DataSourceCredentials } from "@/components/CredentialsTable";
import CredentialsTable from "@/components/CredentialsTable";
import Modal from "@/components/Modal";
import ApiSetup, {
  CONNECTION_DEFAULT,
  connectionUrls,
} from "@/components/ApiSetup";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useLocation from "@/hooks/useLocation";
import useCheckResponse from "@/hooks/useCheckResponse";
import { prepareDataSourceData } from "@/hooks/useUserData";
import {
  useDatasourcesQuery,
  useCredentialsQuery,
  useInsertSqlCredentialsMutation,
  useSubCredentialsSubscription,
  useDeleteCredentialsMutation,
} from "@/graphql/generated";
import type { Datasources, Sql_Credentials } from "@/graphql/generated";
import genName from "@/utils/helpers/genName";
import formatTime from "@/utils/helpers/formatTime";
import type { ApiSetupForm, DataSourceInfo } from "@/types/dataSource";
import type { Member } from "@/types/team";

import styles from "./index.module.less";

interface SqlApiProps {
  editPermission?: boolean;
  teamMembers?: Member[];
  dataSources?: DataSourceInfo[];
  editId?: string;
  credentials: DataSourceCredentials[];
  initialValue: ApiSetupForm;
  loading?: boolean;
  onFinish: (data: ApiSetupForm) => void;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export const SqlApi = ({
  editPermission,
  teamMembers,
  dataSources,
  credentials = [],
  initialValue,
  editId,
  loading = false,
  onEdit = () => {},
  onRemove = () => {},
  onFinish = () => {},
}: SqlApiProps) => {
  const { t } = useTranslation(["settings", "pages"]);
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = () => setIsOpen(true);

  const onClose = () => {
    setLocation("/settings/sql");
    setIsOpen(false);
  };

  const onFinishForm = (data: ApiSetupForm) => {
    if (!editId) {
      onFinish(data);
    }
    onClose();
  };

  useEffect(() => {
    if (editId) {
      onOpen();
    }
  }, [editId]);

  const action =
    editPermission && credentials.length ? t("settings:sql_api.action") : null;

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
            action={action}
            actionProps={{
              type: "primary",
              size: "large",
            }}
            onClick={onOpen}
          />
          {credentials.length ? (
            <CredentialsTable
              credentials={credentials}
              editPermission={editPermission}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          ) : (
            <NoCredentials editPermission={editPermission} onAttach={onOpen} />
          )}
        </Space>
      </Spin>

      <Modal
        width={1000}
        open={isOpen}
        onClose={onClose}
        closable
        destroyOnClose
      >
        <ApiSetup
          editId={editId}
          dataSources={dataSources}
          teamMembers={teamMembers}
          initialValue={initialValue}
          onSubmit={onFinishForm}
        />
      </Modal>
    </BasicLayout>
  );
};

const prepareCredentialsData = (
  data: Sql_Credentials[]
): DataSourceCredentials[] => {
  if (!data?.length) return [];
  return data.map(
    (c) =>
      ({
        id: c.id,
        login: c.username,
        createdAt: formatTime(c.created_at),
        member: {
          userId: c?.user?.id,
          displayName: c.user?.display_name,
        },
        dataSourceData: {
          ...prepareDataSourceData([c.datasource])[0],
        } as DataSourceInfo,
      } as DataSourceCredentials)
  );
};

export const prepareInitValues = (
  dataSourceId: string | null | undefined,
  dataSourceName: string,
  userId: string,
  username: string | undefined = undefined
): ApiSetupForm =>
  ({
    user_id: userId,
    datasource_id: dataSourceId,
    name: dataSourceName,
    host: connectionUrls[CONNECTION_DEFAULT],
    db: "db",
    db_username: username || genName(10),
    password: genName(10),
  } as ApiSetupForm);

const SqlApiWrapper = () => {
  const { t } = useTranslation(["apiSetup", "pages"]);
  const { currentTeam, currentTeamId } = CurrentUserStore();
  const [location, setLocation] = useLocation();
  const { id: editId } = location.query;

  const [createMutation, execCreateMutation] =
    useInsertSqlCredentialsMutation();
  const [deleteMutation, execDeleteMutation] = useDeleteCredentialsMutation();
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

  const [subscriptionData] = useSubCredentialsSubscription({
    variables: { teamId: currentTeamId },
  });

  useCheckResponse(
    createMutation,
    (_data, err) => {
      if (err) {
        if (err.message.includes("Uniqueness violation")) {
          message.error(t("apiSetup:uniq_violation"));
        } else {
          message.error(err);
        }
      }
    },
    {
      successMessage: t("apiSetup:sql_credentials_created"),
      errorMessage: "",
    }
  );

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: t("apiSetup:sql_credentials_deleted"),
  });

  const onFinish = (data: ApiSetupForm) => {
    execCreateMutation({
      object: {
        user_id: data.user_id,
        datasource_id: data.datasource_id,
        username: data.db_username,
        password: data.password,
      },
    });
  };

  const onRemove = (id: string) => {
    execDeleteMutation({ id });
  };

  const onEdit = (id: string) => {
    setLocation(`/settings/sql?id=${id}`);
  };

  useEffect(() => {
    if (currentTeamId) {
      execDataSourcesQuery();
    }
  }, [currentTeamId, execCredentialsQuery, execDataSourcesQuery]);

  useEffect(() => {
    if (subscriptionData.data) {
      execCredentialsQuery();
    }
  }, [execCredentialsQuery, subscriptionData.data]);

  const loading = useMemo(
    () =>
      credentialsData.fetching ||
      createMutation.fetching ||
      deleteMutation.fetching,
    [createMutation.fetching, credentialsData.fetching, deleteMutation.fetching]
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

  const initialValue = useMemo(() => {
    if (editId && credentials.length) {
      const curCredentials = credentials.find((c) => c.id === editId);

      if (curCredentials) {
        return prepareInitValues(
          curCredentials.dataSourceData.id,
          curCredentials.dataSourceData.name,
          curCredentials.member.userId,
          curCredentials.login
        );
      } else {
        message.warning(t("apiSetup:not_found"));
      }
    }

    return prepareInitValues(
      dataSources?.[0]?.id,
      dataSources?.[0]?.name,
      currentTeam?.members?.[0]?.id as string
    );
  }, [credentials, editId, currentTeam?.members, dataSources, t]);

  return (
    <SqlApi
      loading={loading}
      editId={editId}
      editPermission={currentTeam?.role !== "member"}
      teamMembers={currentTeam?.members}
      dataSources={dataSources}
      credentials={credentials}
      initialValue={initialValue}
      onEdit={onEdit}
      onRemove={onRemove}
      onFinish={onFinish}
    />
  );
};

export default SqlApiWrapper;
