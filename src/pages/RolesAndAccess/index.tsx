import { Dropdown, Space, Spin, Typography } from "antd";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useTranslation } from "react-i18next";
import { SettingOutlined } from "@ant-design/icons";
import { useParams } from "@vitjs/runtime";

import Modal from "@/components/Modal";
import PageHeader from "@/components/PageHeader";
import RoleForm from "@/components/RoleForm";
import type { AllAccessListsQuery, Datasources } from "@/graphql/generated";
import {
  useAllAccessListsQuery,
  useCreateAccessListMutation,
  useDatasourcesQuery,
  useDeleteAccessListMutation,
  useSubAccessListsSubscription,
  useUpdateAccessListMutation,
  Order_By,
} from "@/graphql/generated";
import useCheckResponse from "@/hooks/useCheckResponse";
import useLocation from "@/hooks/useLocation";
import { prepareDataSourceData } from "@/hooks/useUserData";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type {
  AccessList,
  DataSourceAccess,
  RoleForm as RoleFormType,
} from "@/types/access";
import type { Cube, DataSourceInfo } from "@/types/dataSource";
import formatTime from "@/utils/helpers/formatTime";
import ConfirmModal from "@/components/ConfirmModal";
import Card from "@/components/Card";
import NoRoles from "@/components/NoRoles";
import { AccessTypeWrapper } from "@/components/AccessType";
import type { Team } from "@/types/team";
import { Roles } from "@/types/team";

import styles from "./index.module.less";

const { Paragraph } = Typography;

interface RolesAndAccessProps {
  initialValues?: RoleFormType;
  currentTeam: Team | null;
  accessLists: AccessList[];
  dataSourceAccess: DataSourceAccess[];
  loading?: boolean;
  editId?: string;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
  onFinish?: (data: RoleFormType) => void;
  onCreate?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
}

export const RolesAndAccess: React.FC<RolesAndAccessProps> = ({
  currentTeam,
  initialValues,
  accessLists,
  loading,
  onEdit,
  onRemove,
  dataSourceAccess,
  onFinish = () => {},
  isOpen = false,
  onCreate = () => {},
  onClose = () => {},
}) => {
  const { t } = useTranslation(["settings", "pages"]);

  const onModalOpen = () => {
    onCreate();
  };

  const onModalClose = () => {
    onClose();
  };

  const onFormFinish = (data: RoleFormType) => {
    onFinish(data);
    onClose();
  };

  const isMember = currentTeam?.role === Roles.member;

  const renderCard = (accessList: AccessList) => {
    return (
      <Card
        key={accessList.id}
        title={accessList.name}
        titleTooltip={accessList.name}
        onTitleClick={() => !isMember && onEdit?.(accessList.id)}
        extra={
          !isMember && (
            <Dropdown
              className={styles.btn}
              trigger={["click"]}
              menu={{
                items: [
                  {
                    key: "edit",
                    label: t("common:words.edit"),
                    onClick: () => onEdit?.(accessList.id),
                  },
                  {
                    key: "delete",
                    label: (
                      <ConfirmModal
                        title={t("common:words.delete_role")}
                        onConfirm={() => onRemove?.(accessList.id)}
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
          )
        }
      >
        <dl>
          {accessList.createdAt && (
            <>
              <dt>{t("common:words.created_at")}</dt>
              <dd title={formatTime(accessList.createdAt)}>
                {formatTime(accessList.createdAt)}
              </dd>
            </>
          )}

          {accessList.updatedAt && (
            <>
              <dt>{t("common:words.updated_at")}</dt>
              <dd title={formatTime(accessList.updatedAt)}>
                {formatTime(accessList.updatedAt)}
              </dd>
            </>
          )}
        </dl>

        <div className={styles.datasources}>
          {dataSourceAccess.map((d) => {
            const permissions = accessList?.config?.datasources?.[d.id]?.cubes;
            return (
              <div key={d.id} className={styles.dataSource}>
                <Paragraph title={d.name} ellipsis className={styles.label}>
                  {d.name}
                </Paragraph>
                <div className={styles.access}>
                  <AccessTypeWrapper
                    dataSourceId={d.id}
                    permissions={permissions}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  return (
    <>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={t("settings:roles_and_access.manage_roles")}
          action={!isMember && t("settings:roles_and_access.create_now")}
          onClick={onModalOpen}
        />

        <Spin spinning={loading}>
          {accessLists.length ? (
            <div className={styles.body}>
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 900: 2, 1200: 4 }}
              >
                <Masonry gutter="32px">
                  {accessLists.map((a) => renderCard(a))}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          ) : (
            <NoRoles onCreate={onModalOpen} />
          )}
        </Spin>
      </Space>

      <Modal
        width={1000}
        open={isOpen}
        onClose={onModalClose}
        closable
        destroyOnClose
      >
        <RoleForm
          initialValues={initialValues}
          dataSourceAccess={dataSourceAccess}
          onSubmit={onFormFinish}
        />
      </Modal>
    </>
  );
};

const prepareAccessData = (
  accessData: AllAccessListsQuery | undefined,
  dataSources: DataSourceInfo[]
) => {
  return (accessData?.access_lists || []).map((a) => {
    const accessDataSourceIds = Object.keys(a?.config?.datasources || {});
    const sources = dataSources.filter((d) =>
      accessDataSourceIds.includes(d.id || "")
    );

    return {
      id: a.id as string,
      name: a.name as string,
      count: sources.length as number,
      createdAt: a.created_at as string,
      updatedAt: a.updated_at as string,
      dataSources: sources,
      config: a.config,
    } as unknown as AccessList;
  });
};

const prepareDataSourceAccess = (
  dataSources: DataSourceInfo[]
): DataSourceAccess[] =>
  dataSources.map((d) => ({
    id: d.id as string,
    name: d.name,
    dataSource: d.type,
  }));

const filterEmpty = (data: Cube) =>
  Object.entries(data).reduce((acc, [name, value]) => {
    let filteredValue = value;

    if (typeof filteredValue === "object") {
      filteredValue = filterEmpty(value);
    }
    if (Object.keys(filteredValue).length) {
      return {
        ...acc,
        [name]: value,
      };
    }
    return acc;
  }, {});

const RolesAndAccessWrapper: React.FC = () => {
  const { t } = useTranslation(["settings", "pages"]);
  const { currentTeam } = CurrentUserStore();
  const [, setLocation] = useLocation();
  const { editId } = useParams();
  const isNew = editId === "new";

  const [createMutation, execCreateMutation] = useCreateAccessListMutation();
  const [updateMutation, execUpdateMutation] = useUpdateAccessListMutation();
  const [deleteMutation, execDeleteMutation] = useDeleteAccessListMutation();
  const [dataSourcesData, execDataSourcesQuery] = useDatasourcesQuery({
    variables: {
      where: {
        team_id: {
          _eq: currentTeam?.id,
        },
      },
    },
  });

  const [accessListsData, execAccessLists] = useAllAccessListsQuery({
    variables: {
      where: {
        team_id: {
          _eq: currentTeam?.id,
        },
      },
      order_by: {
        created_at: Order_By.Desc,
      },
    },
    pause: true,
  });

  const [subscriptionData] = useSubAccessListsSubscription({
    variables: {
      where: {
        team_id: {
          _eq: currentTeam?.id,
        },
      },
    },
  });

  useCheckResponse(createMutation, () => {}, {
    successMessage: t("settings:roles_and_access.access_list_created"),
  });

  useCheckResponse(updateMutation, () => {}, {
    successMessage: t("settings:roles_and_access.access_list_updated"),
  });

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: t("settings:roles_and_access.access_list_removed"),
  });

  const dataSources = useMemo(
    () =>
      prepareDataSourceData(
        dataSourcesData?.data?.datasources as Datasources[]
      ),
    [dataSourcesData.data?.datasources]
  );
  const dataSourceAccess = useMemo(
    () => prepareDataSourceAccess(dataSources),
    [dataSources]
  );
  const accessLists = useMemo(
    () => prepareAccessData(accessListsData?.data, dataSources),
    [accessListsData.data, dataSources]
  );

  const onFinish = (data: RoleFormType) => {
    const datasources = Object.entries(data.access).reduce(
      (acc, [id, cubes]) => {
        const filteredCubes = filterEmpty(cubes as unknown as Cube);

        if (
          !Object.keys(filteredCubes).length ||
          !dataSources.find((d) => d.id === id)
        ) {
          return acc;
        }

        return {
          ...acc,
          [id]: {
            cubes,
          },
        };
      },
      {}
    );

    if (!isNew) {
      execUpdateMutation({
        pk_columns: { id: editId },
        _set: {
          name: data.name,
          config: {
            datasources,
          },
        },
      });
    } else {
      execCreateMutation({
        object: {
          name: data.name,
          team_id: currentTeam?.id,
          config: {
            datasources,
          },
        },
      });
    }
  };

  const onEdit = (id: string) => {
    setLocation(`/settings/access/${id}`);
  };

  const onRemove = (id: string) => {
    execDeleteMutation({
      id,
    });
  };

  useEffect(() => {
    if (currentTeam?.id) {
      execAccessLists();
      execDataSourcesQuery();
    }
  }, [currentTeam?.id, execAccessLists, execDataSourcesQuery]);

  useEffect(() => {
    if (subscriptionData.data) {
      execAccessLists();
    }
  }, [execAccessLists, subscriptionData.data]);

  const initialValues = useMemo(() => {
    if (!isNew && editId) {
      const curAccessList = accessLists.find((a) => a.id === editId);

      if (!curAccessList) {
        return;
      }

      const data = Object.entries(
        curAccessList?.config?.datasources || {}
      ).reduce((acc, [id, values]: any) => {
        return {
          ...acc,
          [id]: {
            ...values.cubes,
          },
        };
      }, {});

      return {
        name: curAccessList?.name,
        access: data,
      } as RoleFormType;
    }
  }, [accessLists, editId, isNew]);

  const loading = useMemo(
    () =>
      createMutation.fetching ||
      updateMutation.fetching ||
      deleteMutation.fetching ||
      accessListsData.fetching,
    [
      accessListsData.fetching,
      createMutation.fetching,
      updateMutation.fetching,
      deleteMutation.fetching,
    ]
  );

  return (
    <RolesAndAccess
      currentTeam={currentTeam}
      accessLists={accessLists}
      loading={loading}
      onEdit={onEdit}
      onRemove={onRemove}
      initialValues={initialValues}
      dataSourceAccess={dataSourceAccess}
      onFinish={onFinish}
      isOpen={!!editId}
      onCreate={() => setLocation("/settings/access/new")}
      onClose={() => setLocation("/settings/access")}
    />
  );
};

export default RolesAndAccessWrapper;
