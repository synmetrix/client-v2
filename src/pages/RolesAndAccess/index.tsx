import { Space, Spin } from "antd";
import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import AccessTable from "@/components/AccessTable";
import PageHeader from "@/components/PageHeader";
import Modal from "@/components/Modal";
import RoleForm from "@/components/RoleForm";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useLocation from "@/hooks/useLocation";
import useCheckResponse from "@/hooks/useCheckResponse";
import { prepareDataSourceData } from "@/hooks/useUserData";
import {
  useAllAccessListsQuery,
  useCreateAccessListMutation,
  useDatasourcesQuery,
  useDeleteAccessListMutation,
  useSubAccessListsSubscription,
  useUpdateAccessListMutation,
} from "@/graphql/generated";
import type { DataSourceAccess, Role } from "@/types/access";
import type { Datasources } from "@/graphql/generated";

import styles from "./index.module.less";
interface RolesAndAccessProps {
  initialValues?: any;
  accessLists: Role[];
  loading?: boolean;
  // resources: any;
  dataSourceAccess: DataSourceAccess[];
  editId?: string;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
  onFinish?: (data: any) => void;
}

export const RolesAndAccess: React.FC<RolesAndAccessProps> = ({
  initialValues,
  accessLists,
  loading,
  onEdit,
  onRemove,
  // resources,
  dataSourceAccess,
  onFinish,
}) => {
  const { t } = useTranslation(["settings", "pages"]);
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);

  const onClose = () => {
    setIsOpen(false);
    setLocation("/settings/access");
  };

  const onFormFinish = (data) => {
    onFinish(data);
    onClose();
  };

  useEffect(() => {
    if (initialValues) {
      setIsOpen(true);
    }
  }, [initialValues, setIsOpen]);

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:settings.roles_and_access") }}
    >
      <Spin spinning={loading}>
        <Space className={styles.wrapper} direction="vertical" size={13}>
          <PageHeader
            title={t("settings:roles_and_access.manage_roles")}
            action={t("settings:roles_and_access.create_role")}
            onClick={onOpen}
          />
          <AccessTable
            accessLists={accessLists}
            onRemove={onRemove}
            onEdit={onEdit}
          />
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
          // resources={resources}
          onSubmit={onFormFinish}
        />
      </Modal>
    </BasicLayout>
  );
};

const prepareAccessData = (accessData, dataSources): Role[] => {
  return accessData.map((a) => {
    const accessDataSourceIds = Object.keys(a?.config?.datasources || {});
    const sources = dataSources.filter((d) =>
      accessDataSourceIds.includes(d.id)
    );

    return {
      id: a.id,
      name: a.name,
      count: sources.length,
      createdAt: a.created_at,
      updatedAt: a.updated_at,
      dataSources: sources,
      config: a.config,
    };
  });
};

const prepareDataSourceAccess = (dataSources) =>
  dataSources.map((d) => ({
    id: d.id,
    url: d.name,
    dataSource: d.type,
  }));

const filterEmpty = (data) =>
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
    successMessage: "Access list created.",
  });

  useCheckResponse(updateMutation, () => {}, {
    successMessage: "Access list updated.",
  });

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: "Access list removed.",
  });

  const onFinish = (data) => {
    const datasources = Object.entries(data.access).reduce(
      (acc, [id, cubes]) => {
        const filteredCubes = filterEmpty(cubes);

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
    () =>
      prepareAccessData(accessListsData?.data?.access_lists || [], dataSources),
    [accessListsData.data?.access_lists, dataSources]
  );

  const initialValues = useMemo(() => {
    if (editId) {
      const curAccessList = accessLists.find((a) => a.id === editId);
      const data = Object.entries(
        curAccessList?.config?.datasources || {}
      ).reduce((acc, [id, values]) => {
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
      };
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
