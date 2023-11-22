import { Col, Dropdown, Row, Space, Spin } from "antd";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { SettingOutlined } from "@ant-design/icons";

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
import { AccessTypeWrapper } from "@/components/AccessType";

import styles from "./index.module.less";
interface RolesAndAccessProps {
  initialValues?: RoleFormType;
  accessLists: AccessList[];
  dataSourceAccess: DataSourceAccess[];
  loading?: boolean;
  editId?: string;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
  onFinish?: (data: RoleFormType) => void;
}

export const RolesAndAccess: React.FC<RolesAndAccessProps> = ({
  initialValues,
  accessLists,
  loading,
  onEdit,
  onRemove,
  dataSourceAccess,
  onFinish = () => {},
}) => {
  const { t } = useTranslation(["settings", "pages"]);
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);

  const onClose = () => {
    setIsOpen(false);
    setLocation("/settings/access");
  };

  const onFormFinish = (data: RoleFormType) => {
    onFinish(data);
    onClose();
  };

  useEffect(() => {
    if (initialValues) {
      setIsOpen(true);
    }
  }, [initialValues, setIsOpen]);

  const renderCard = (accessList: AccessList) => {
    const fields = ["updatedAt", "createdAt"];

    const renderObject = Object.fromEntries(
      Object.entries(alert).filter(([key]) => fields.includes(key))
    );

    return (
      <Card
        title={accessList.name}
        onTitleClick={() => onEdit?.(accessList.id)}
        extra={
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
        }
      >
        <dl>
          {Object.entries(renderObject).map(([key, value]) => {
            if (key === "createdAt" || key === "updatedAt") {
              return (
                <Fragment key={key}>
                  <dt>{t(`common:words.${key}`, key)}</dt>
                  <dd>{formatTime(value as string)}</dd>
                </Fragment>
              );
            }

            if (typeof value === "string") {
              return (
                <Fragment key={key}>
                  <dt>{t(`common:words.${key}`, key)}</dt>
                  <dd>{value}</dd>
                </Fragment>
              );
            }

            return null;
          })}
        </dl>

        {accessList.dataSources.map((d) => {
          const permissions = accessList?.config?.datasources?.[d.id]?.cubes;
          return (
            <Row
              className={styles.item}
              justify={"space-between"}
              key={d.id}
              gutter={[5, 5]}
            >
              <Col className={styles.label}>{d.name}</Col>
              <Col>
                <AccessTypeWrapper
                  dataSourceId={d.id}
                  permissions={permissions}
                />
              </Col>
            </Row>
          );
        })}
      </Card>
    );
  };

  return (
    <>
      <Spin spinning={loading}>
        <Space className={styles.wrapper} direction="vertical" size={13}>
          <PageHeader
            title={t("settings:roles_and_access.manage_roles")}
            action={t("settings:roles_and_access.create_now")}
            onClick={onOpen}
          />
          <div className={styles.body}>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 900: 2, 1200: 3 }}
            >
              <Masonry gutter="32px">
                {accessLists.map((a) => renderCard(a))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </Space>
      </Spin>

      <Modal
        width={1000}
        open={isOpen}
        onClose={onClose}
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
  const [location, setLocation] = useLocation();
  const { id: editId } = location.query;

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

  const onFinish = (data: RoleFormType) => {
    const datasources = Object.entries(data.access).reduce(
      (acc, [id, cubes]) => {
        const filteredCubes = filterEmpty(cubes as unknown as Cube);

        if (!Object.keys(filteredCubes).length) return acc;

        return {
          ...acc,
          [id]: {
            cubes,
          },
        };
      },
      {}
    );

    if (editId) {
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
    setLocation(`/settings/access?id=${id}`);
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

  const initialValues = useMemo(() => {
    if (editId) {
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
  }, [accessLists, editId]);

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
      accessLists={accessLists}
      loading={loading}
      onEdit={onEdit}
      onRemove={onRemove}
      initialValues={initialValues}
      dataSourceAccess={dataSourceAccess}
      onFinish={onFinish}
    />
  );
};

export default RolesAndAccessWrapper;
