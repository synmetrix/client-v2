import { Col, Dropdown, Row, Space, Spin, message } from "antd";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import { useParams } from "@vitjs/runtime";
import { SettingOutlined } from "@ant-design/icons";

import ApiSetup, {
  CONNECTION_DEFAULT,
  connectionUrls,
} from "@/components/ApiSetup";
import type { DataSourceCredentials } from "@/components/CredentialsTable";
import Modal from "@/components/Modal";
import NoCredentials from "@/components/NoCredentials";
import PageHeader from "@/components/PageHeader";
import type { Datasources, Sql_Credentials } from "@/graphql/generated";
import {
  Order_By,
  useCredentialsQuery,
  useDatasourcesQuery,
  useDeleteCredentialsMutation,
  useInsertSqlCredentialsMutation,
  useSubCredentialsSubscription,
} from "@/graphql/generated";
import useCheckResponse from "@/hooks/useCheckResponse";
import useLocation from "@/hooks/useLocation";
import { prepareDataSourceData } from "@/hooks/useUserData";
import useAppSettings from "@/hooks/useAppSettings";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type { ApiSetupForm, DataSourceInfo } from "@/types/dataSource";
import type { Member } from "@/types/team";
import formatTime from "@/utils/helpers/formatTime";
import genName from "@/utils/helpers/genName";
import DataSourceTag from "@/components/DataSourceTag";
import ConfirmModal from "@/components/ConfirmModal";
import Card from "@/components/Card";

import styles from "./index.module.less";

interface SqlApiProps {
  editPermission?: boolean;
  teamMembers?: Member[];
  dataSources?: DataSourceInfo[];
  isNew?: boolean;
  editId?: string;
  credentials: DataSourceCredentials[];
  initialValue: ApiSetupForm;
  loading?: boolean;
  onFinish: (data: ApiSetupForm) => void;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export const SqlApi = ({
  editPermission,
  teamMembers,
  dataSources,
  credentials = [],
  initialValue,
  isNew,
  editId,
  loading = false,
  onEdit = () => {},
  onRemove = () => {},
  onFinish = () => {},
  onOpen = () => {},
  onClose = () => {},
}: SqlApiProps) => {
  const { t } = useTranslation(["settings", "pages"]);
  const responsive = useResponsive();

  const action =
    editPermission && credentials.length ? t("settings:sql_api.action") : null;

  const renderCard = (credential: DataSourceCredentials) => {
    return (
      <Card
        title={credential.dataSourceData.name}
        titleTooltip={credential.dataSourceData.name}
        onTitleClick={() => credential.id && onEdit(credential.id)}
        extra={
          <Dropdown
            className={styles.btn}
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "edit",
                  label: t("common:words.edit"),
                  onClick: () => credential.id && onEdit(credential.id),
                },
                {
                  key: "delete",
                  label: (
                    <ConfirmModal
                      title={t("common:words.delete_datasource")}
                      onConfirm={() => credential.id && onRemove(credential.id)}
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
          {credential.dataSourceData.dbParams.host && (
            <>
              <dt>{t("common:words.host")}</dt>
              <dd title={credential.dataSourceData.dbParams.host}>
                {credential.dataSourceData.dbParams.host}
              </dd>
            </>
          )}

          {credential.dataSourceData.type && (
            <>
              <dt>{t("common:words.type")}</dt>
              <dd>
                <DataSourceTag dataSource={credential.dataSourceData.type} />
              </dd>
            </>
          )}

          {credential.login && (
            <>
              <dt>{t("common:words.login")}</dt>
              <dd title={credential.login}>{credential.login}</dd>
            </>
          )}

          {credential.createdAt && (
            <>
              <dt>{t("common:words.created_at")}</dt>
              <dd title={formatTime(credential.createdAt)}>
                {formatTime(credential.createdAt)}
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
        <Space className={styles.wrapper} direction="vertical" size={13}>
          <PageHeader
            title={
              !responsive.sm
                ? t("settings:sql_api.title_mobile")
                : t("settings:sql_api.title")
            }
            action={action}
            actionProps={{
              type: "primary",
              size: "large",
            }}
            onClick={onOpen}
          />
          <div className={styles.body}>
            {!!credentials?.length ? (
              <Row gutter={[32, 32]}>
                {credentials.map((c) => (
                  <Col xs={24} sm={12} xl={8} key={c.id}>
                    {renderCard(c)}
                  </Col>
                ))}
              </Row>
            ) : (
              <NoCredentials
                editPermission={editPermission}
                onAttach={onOpen}
              />
            )}
          </div>
        </Space>
      </Spin>

      <Modal
        width={1000}
        open={!!editId}
        onClose={onClose}
        closable
        destroyOnClose
      >
        <ApiSetup
          isNew={isNew}
          isOnboarding={!!editId}
          dataSources={dataSources}
          teamMembers={teamMembers}
          initialValue={initialValue}
          onSubmit={onFinish}
        />
      </Modal>
    </>
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
        dataSourceData: prepareDataSourceData([
          c.datasource,
        ])?.[0] as DataSourceInfo,
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
  const { currentTeam, teamData } = CurrentUserStore();
  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const { editId } = useParams();
  const isNew = editId === "new";
  const basePath = withAuthPrefix("/settings/sql-api");

  const [createMutation, execCreateMutation] =
    useInsertSqlCredentialsMutation();
  const [deleteMutation, execDeleteMutation] = useDeleteCredentialsMutation();
  const [credentialsData, execCredentialsQuery] = useCredentialsQuery({
    variables: {
      teamId: currentTeam?.id,
    },
    pause: true,
  });

  const [dataSourcesData, execDataSourcesQuery] = useDatasourcesQuery({
    variables: {
      where: {
        team_id: {
          _eq: currentTeam?.id,
        },
      },
      order_by: [
        {
          created_at: Order_By.Desc,
        },
      ],
    },
    pause: true,
  });

  const [subscriptionData] = useSubCredentialsSubscription({
    variables: { teamId: currentTeam?.id },
  });

  const onClose = () => {
    setLocation(basePath);
  };

  useCheckResponse(
    createMutation,
    (data, err) => {
      if (data?.insert_sql_credentials_one?.id) {
        message.success(t("apiSetup:sql_credentials_created"));
        onClose();
        return;
      }

      if (err) {
        if (err?.message?.includes("Uniqueness violation")) {
          message.error(t("apiSetup:uniq_violation"));
        } else {
          message.error(err);
        }
      }
    },
    {
      showMessage: false,
      showResponseMessage: false,
    }
  );

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: t("apiSetup:sql_credentials_deleted"),
  });

  const onRemove = (id: string) => {
    execDeleteMutation({ id });
  };

  const onEdit = (id: string) => {
    setLocation(`${basePath}/${id}`);
  };

  const onOpen = () => {
    setLocation(`${basePath}/new`);
  };

  const onFinish = (data: ApiSetupForm) => {
    if (isNew) {
      execCreateMutation({
        object: {
          user_id: data.user_id,
          datasource_id: data.datasource_id,
          username: data.db_username,
          password: data.password,
        },
      });
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (currentTeam?.id) {
      execDataSourcesQuery();
    }
  }, [currentTeam?.id, execCredentialsQuery, execDataSourcesQuery]);

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
    if (!isNew && editId && credentials.length) {
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
      teamData?.members?.[0]?.user_id as string
    );
  }, [credentials, isNew, editId, teamData?.members, dataSources, t]);

  return (
    <SqlApi
      loading={loading}
      isNew={isNew}
      editId={editId}
      editPermission={currentTeam?.role !== "member"}
      teamMembers={teamData?.members}
      dataSources={dataSources}
      credentials={credentials}
      initialValue={initialValue}
      onEdit={onEdit}
      onRemove={onRemove}
      onFinish={onFinish}
      onOpen={onOpen}
      onClose={onClose}
    />
  );
};

export default SqlApiWrapper;
