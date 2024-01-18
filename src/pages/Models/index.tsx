import { Space, Spin, message } from "antd";
import { useParams } from "@vitjs/runtime";
import { useTranslation } from "react-i18next";
import { useLocalStorageState, useResponsive, useTrackedEffect } from "ahooks";
import { getOr } from "unchanged";
import JSZip from "jszip";
import { load } from "js-yaml";
import md5 from "md5";

import AppLayout from "@/layouts/AppLayout";
import CodeEditor from "@/components/CodeEditor";
import ErrorFound from "@/components/ErrorFound";
import ModelsSidebar from "@/components/ModelsSidebar";
import StatusBadge from "@/components/StatusBadge";
import SidebarLayout from "@/layouts/SidebarLayout";
import Modal from "@/components/Modal";
import DataModelGeneration from "@/components/DataModelGeneration";
import VersionsList from "@/components/VersionsList";
import NoDataSource from "@/components/NoDataSource";
import useLocation from "@/hooks/useLocation";
import useModelsIde from "@/hooks/useModelsIde";
import useSources from "@/hooks/useSources";
import useCheckResponse from "@/hooks/useCheckResponse";
import calcChecksum from "@/utils/helpers/dataschemasChecksum";
import getTables from "@/utils/helpers/getTables";
import getCurrentBranch from "@/utils/helpers/getCurrentBranch";
import type { Branch, DataSourceInfo, Schema } from "@/types/dataSource";
import type { Dataschema } from "@/types/dataschema";
import type { Version } from "@/types/version";
import type { Branches_Insert_Input } from "@/graphql/generated";
import type { CreateBranchFormValues } from "@/components/BranchSelection";
import CurrentUserStore from "@/stores/CurrentUserStore";
import {
  useDeleteSchemaMutation,
  useCreateBranchMutation,
  useCreateVersionMutation,
  useSetDefaultBranchMutation,
  useCurrentVersionQuery,
  useVersionsCountSubscription,
  Branch_Statuses_Enum,
} from "@/graphql/generated";
import { EXPORT, MODELS, ONBOARDING, SOURCES } from "@/utils/constants/paths";

import ModelsActiveIcon from "@/assets/models-active.svg";

import styles from "./index.module.less";

import type { MenuProps } from "antd";
import type { ChangeEvent } from "react";

interface ModelsProps {
  ideMenu: MenuProps["items"];
  branches: Branch[];
  onSetDefault: (branchId?: string) => void;
  onChangeBranch: (branchId?: string) => void;
  onCreateBranch: (data: CreateBranchFormValues) => Promise<void>;
  onDeleteBranch: (branchId: string) => void;
  onSchemaDelete: (id: string) => void;
  onSchemaUpdate: (editId: string, values: Partial<Dataschema>) => void;
  dataSource?: DataSourceInfo;
  currentBranch?: Branch;
  currentVersion?: Version;
  dataschemas?: Dataschema[];
  onSchemaCreate: (values: Partial<Dataschema>) => void;
  onCodeSave: (id: string, code: string) => void;
  onRunSQL: (query: string, limit: number) => void;
  dataSchemaName: string;
  fetching?: boolean;
  branchLoading?: boolean;
  genSchemaModalVisible?: boolean;
  versionsModalVisible?: boolean;
  tablesSchema: Schema;
  schemaFetching?: boolean;
  onModalClose: () => void;
  data?: object[];
  validationError?: string;
  isConsoleOpen?: boolean;
  toggleConsole?: () => void;
  onSaveVersion: (
    checksum: string,
    data: ({
      user_id?: string;
    } & Partial<Dataschema>)[]
  ) => void;
  onGenSubmit: (values: object, format: string) => void;
  onDataSourceChange: (dataSource: DataSourceInfo | null) => void;
  sqlError?: object;
  dataSources?: DataSourceInfo[];
  onConnect: () => void;
  versionsCount?: number;
  onVersionsOpen?: () => void;
}

export const Models: React.FC<ModelsProps> = ({
  dataSource,
  dataSchemaName,
  ideMenu,
  branches,
  currentBranch,
  currentVersion,
  onChangeBranch,
  onCreateBranch,
  onDeleteBranch,
  onSetDefault,
  fetching = false,
  onSchemaCreate,
  onSchemaDelete,
  onSchemaUpdate,
  dataschemas = [],
  onRunSQL,
  onCodeSave,
  genSchemaModalVisible,
  versionsModalVisible,
  validationError = "",
  isConsoleOpen,
  toggleConsole,
  data,
  tablesSchema,
  schemaFetching,
  branchLoading,
  onModalClose,
  onGenSubmit,
  onSaveVersion,
  onDataSourceChange,
  dataSources,
  sqlError,
  onConnect,
  versionsCount,
  onVersionsOpen,
}) => {
  const { t } = useTranslation(["pages", "models"]);
  const windowSize = useResponsive();
  const isMobile = windowSize.md === false;

  const {
    editTab,
    activeTab,
    changeActiveTab,
    openTab,
    openedTabs,
    openSchema,
    tabsState,
  } = useModelsIde({
    dataSourceId: dataSource?.id || "",
    branchId: currentBranch?.id,
  });

  const openedSchemas = useMemo(
    () =>
      Array.from(openedTabs)
        .map((id) => dataschemas.find((schema) => schema.name === id))
        .filter(Boolean),
    [dataschemas, openedTabs]
  ) as Dataschema[];

  useTrackedEffect(
    (changes, prevDeps, newDeps) => {
      if (dataSchemaName) {
        const schema = dataschemas.find((s) => s.name === dataSchemaName);

        if (schema && activeTab !== schema.name) {
          openTab(schema.name);
        } else if (
          dataSchemaName === "sqlrunner" &&
          prevDeps?.[0] !== newDeps?.[0]
        ) {
          openTab(dataSchemaName);
        }
      }
    },
    [dataSchemaName, dataschemas, openSchema, openTab]
  );

  const onUpdateSchema: typeof onSchemaUpdate = (editId, values) => {
    const schema = dataschemas.find((s) => s.id === editId);

    if (schema && values.name) {
      tabsState.tabs.delete(schema.name);
      tabsState.tabs.add(values.name);
    }

    return onSchemaUpdate(editId, values);
  };

  const Layout =
    dataSources && dataSources.length === 0 ? AppLayout : SidebarLayout;

  return (
    <Layout
      icon={<ModelsActiveIcon />}
      title={
        dataSource?.name ? (
          <Space align="start" size={16}>
            {dataSource.name}

            {!isMobile && validationError && (
              <StatusBadge className={styles.errorBadge} status="error">
                {t("models:alerts.compilation_error")}
              </StatusBadge>
            )}
          </Space>
        ) : (
          t("models")
        )
      }
      subTitle={t("models")}
      burgerTitle={t("models")}
      divider
      items={
        <Spin spinning={fetching}>
          <ModelsSidebar
            onDataSourceChange={onDataSourceChange}
            onSchemaDelete={(schema) => {
              if (openedTabs.has(schema.name)) {
                editTab(schema.name, "remove");
              }
              onSchemaDelete(schema.id);
            }}
            onSchemaUpdate={onUpdateSchema}
            version={currentVersion?.checksum}
            ideMenu={ideMenu}
            branches={branches}
            branchLoading={branchLoading}
            currentBranch={currentBranch}
            onChangeBranch={onChangeBranch}
            onDeleteBranch={onDeleteBranch}
            onSetDefault={onSetDefault}
            docs={`/docs/${currentVersion?.id}`}
            files={dataschemas}
            onCreateBranch={onCreateBranch}
            onCreateFile={onSchemaCreate}
            onSelectFile={openSchema}
            dataSources={dataSources || []}
            dataSourceId={dataSource?.id}
            versionsCount={versionsCount}
            onVersionsOpen={onVersionsOpen}
          />
        </Spin>
      }
    >
      {!dataSources?.length ? (
        <NoDataSource onConnect={onConnect} />
      ) : (
        <Spin spinning={fetching}>
          <div className={styles.wrapper}>
            <div className={styles.editor}>
              <CodeEditor
                schemas={openedSchemas}
                onClose={(id) => editTab(id, "remove")}
                onTabChange={(dataschema) => {
                  changeActiveTab(dataschema);
                }}
                active={activeTab}
                onRunSQL={onRunSQL}
                onCodeSave={onCodeSave}
                data={data}
                sqlError={sqlError}
                showConsole={isConsoleOpen}
                toggleConsole={toggleConsole}
                validationError={validationError}
              />
            </div>
          </div>

          {dataSource && (
            <Modal
              open={!!genSchemaModalVisible}
              onClose={onModalClose}
              width={1004}
            >
              <DataModelGeneration
                dataSource={dataSource!}
                schema={tablesSchema}
                isGenerate={true}
                isOnboarding={false}
                loading={schemaFetching}
                onSubmit={onGenSubmit}
                resetOnSubmit
              />
            </Modal>
          )}
          <Modal
            width={1004}
            open={!!versionsModalVisible}
            onClose={onModalClose}
          >
            <VersionsList
              onRestore={onSaveVersion}
              branch={currentBranch?.id}
            />
          </Modal>
        </Spin>
      )}
    </Layout>
  );
};

const reservedSlugs = ["sqlrunner", "genmodels", "docs"];

const ModelsWrapper: React.FC = () => {
  const { t } = useTranslation(["models", "common"]);

  const { currentUser, teamData } = CurrentUserStore();
  const [, setLocation] = useLocation();
  const basePath = MODELS;

  const [deleteMutation, execDeleteMutation] = useDeleteSchemaMutation();
  const [createBranchMutation, execCreateBranchMutation] =
    useCreateBranchMutation();
  const [createVersionMutation, execCreateVersionMutation] =
    useCreateVersionMutation();
  const [setDefaultMutation, execSetDefaultMutation] =
    useSetDefaultBranchMutation();

  const [isConsoleOpen, toggleConsole] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const [dataSourceId, branch, slug] = useMemo<[string, string, string]>(
    () => [
      getOr("", "dataSourceId", params) as unknown as string,
      getOr("", "branch", params) as unknown as string,
      getOr("", "slug", params) as unknown as string,
    ],
    [params]
  );

  const [currentBranchId, setCurrentBranchId] = useLocalStorageState<string>(
    `${dataSourceId}:currentBranch`
  );
  const [currentDataSourceId, setCurrentDataSourceId] = useLocalStorageState<
    string | null
  >("currentDataSourceId", {
    defaultValue: dataSourceId,
  });

  const [versionsData] = useVersionsCountSubscription({
    variables: {
      branch_id: branch,
    },
  });

  const versionsCount = versionsData.data?.versions_aggregate.aggregate?.count;

  const [dataSource, currentBranch] = useMemo(() => {
    const source =
      (teamData?.dataSources || []).find((d) => d.id === dataSourceId) ||
      teamData?.dataSources.find((d) => d.id === currentDataSourceId) ||
      teamData?.dataSources?.[0];

    const curBranch =
      (source?.branches || []).find((b) => b.id === branch) ||
      (source?.branches || []).find((b) => b.id === currentBranchId) ||
      (source?.branches || []).find(
        (b) => b.status === Branch_Statuses_Enum.Active
      );

    let path = basePath;

    if (source?.id && source?.id !== dataSourceId) {
      path += `/${source?.id}`;
    }

    if (curBranch?.id && curBranch?.id !== branch) {
      path += `/${curBranch?.id}`;
    }

    if (!location.pathname.includes(path)) {
      setLocation(path);
    }

    return [source, curBranch];
  }, [
    basePath,
    branch,
    currentBranchId,
    currentDataSourceId,
    dataSourceId,
    setLocation,
    teamData?.dataSources,
  ]);

  const branches = useMemo(
    () => dataSource?.branches || [],
    [dataSource?.branches]
  );

  const [version, execVersionAll] = useCurrentVersionQuery({
    variables: { branch_id: branch },
  });

  const onModalClose = (goBack: boolean = false) => {
    if (history.state && goBack) {
      history.back();
    } else {
      setLocation(`${basePath}/${dataSourceId}`);
    }
  };
  const dataSchemaName = (reservedSlugs.indexOf(slug) === -1 && slug) || null;

  const {
    queries: { tablesData, execQueryTables, metaData, execQueryMeta },
    mutations: {
      runQueryMutation,
      execRunQueryMutation,
      genSchemaMutation,
      execGenSchemaMutation,
    },
  } = useSources({
    params: {
      editId: dataSourceId,
      branchId: branch,
    },
  });

  const genSchemaModalVisible = slug === "genmodels";
  const versionsModalVisible = slug === "versions";

  useEffect(() => {
    if (genSchemaModalVisible && dataSourceId) {
      execQueryTables();
    }
  }, [dataSourceId, execQueryTables, genSchemaModalVisible]);

  useCheckResponse(
    tablesData,
    (res, err) => {
      if (res) {
        setError(null);
      } else if (err) {
        setError(err);
      }
    },
    {
      successMessage: null,
    }
  );

  const currentVersion = useMemo(
    () => version?.data?.versions[0] || ({} as Version),
    [version]
  );
  const dataschemas = useMemo(
    () => currentVersion?.dataschemas || [],
    [currentVersion]
  );

  useCheckResponse(genSchemaMutation, () => {}, {
    successMessage: t("alerts.schema_generated"),
  });

  useCheckResponse(createBranchMutation, () => {}, {
    successMessage: t("alerts.branch_created"),
  });

  useCheckResponse(createVersionMutation, () => {}, {
    successMessage: null,
  });

  useCheckResponse(
    setDefaultMutation,
    (res) => {
      const branchName = res?.update_branches_by_pk?.name;
      if (branchName) {
        message.success(
          `${t(`alerts.branch`)} "${branchName}" ${t("alerts.is_now_default")}`
        );
      }
    },
    {
      successMessage: null,
    }
  );

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: t("alerts.branch_removed"),
  });

  useCheckResponse(metaData, undefined, {
    successMessage: null,
    errorMessage: t("alerts.compilation_error"),
    showResponseMessage: false,
  });

  const validationError = useMemo(
    () => metaData?.error?.message,
    [metaData.error]
  );

  useEffect(() => {
    toggleConsole(!!validationError);
  }, [validationError]);

  const sqlResult = useMemo(
    () => runQueryMutation.data?.run_query?.result || [],
    [runQueryMutation.data]
  );

  const [tablesSchema, setTablesSchema] = useState({});
  const sourceTablesSchema = tablesData.data?.fetch_tables?.schema;

  useEffect(() => {
    if (Object.keys(sourceTablesSchema || {}).length) {
      setTablesSchema(sourceTablesSchema);
    }
  }, [sourceTablesSchema]);

  useEffect(() => {
    if (currentUser.id && !teamData?.dataSources.length) {
      setLocation(ONBOARDING);
    }
  }, [currentUser.id, setLocation, teamData?.dataSources.length]);

  const inputFile = useRef<HTMLInputElement>(null);

  const uploadFile = () => {
    inputFile.current?.click();
  };

  const onGenSubmit = async (values: object, format: string) => {
    const tables = getTables(values);

    await execGenSchemaMutation({
      datasource_id: dataSourceId,
      branch_id: branch,
      tables,
      format,
      overwrite: true,
    });

    execVersionAll();

    onModalClose(true);
  };

  const fetching =
    version?.fetching ||
    deleteMutation.fetching ||
    setDefaultMutation.fetching ||
    metaData.fetching ||
    genSchemaMutation.fetching ||
    tablesData.fetching ||
    runQueryMutation.fetching;

  if (error) {
    return <ErrorFound status={404} />;
  }

  const createNewVersion = async (
    checksum: string,
    data: ({
      user_id?: string;
    } & Partial<Dataschema>)[]
  ) => {
    const preparedDataschemas = data.map((schema) => {
      const updatedData = {
        name: schema?.name,
        code: schema?.code || "",
        user_id: schema?.user_id || currentUser?.id,
        datasource_id: schema?.datasource_id || dataSourceId,
      };

      return updatedData;
    });

    const versionData = {
      checksum,
      user_id: currentUser?.id,
      branch_id: branch,
      dataschemas: {
        data: preparedDataschemas,
      },
    };

    if (versionsModalVisible) {
      onModalClose();
    }

    await execCreateVersionMutation({ object: versionData });
    execVersionAll();
  };

  const onClickCreate = async (values: Partial<Dataschema>) => {
    const newSchemas = [
      ...dataschemas,
      {
        ...values,
        code: "",
      },
    ];
    const checksum = calcChecksum(newSchemas);
    await createNewVersion(checksum, newSchemas);
  };

  const onUploadFile = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];

    if (file?.type !== "application/zip") {
      message.error(t("alerts.format_is_unsupported"));
      return false;
    }

    const zip = new JSZip();

    try {
      await zip.loadAsync(file);
    } catch (err) {
      message.error(t("alerts.bad_archive"));
      return false;
    }

    if (!zip?.files?.["meta.yaml"]) {
      message.error(t("alerts.wrong_archive"));
      return false;
    }

    const yamlFile = await zip.file("meta.yaml")?.async("string");
    const zipMeta: any = load(yamlFile as string);
    zipMeta.schemas = zipMeta.schemas.reduce(
      (acc: any, cur: any) => ({ ...acc, ...cur }),
      {}
    );

    zip.remove("meta.yaml");

    let newSchemas = await Promise.all(
      Object.entries(zip.files || []).map(async ([name, rawData]) => {
        const content = await rawData.async("string");
        const checksum = md5(`${name}-${content}`);

        if (zipMeta?.schemas?.[name]?.checksum !== checksum) {
          message.warning(
            `${t("alerts.checksum_of_file")} "${name}" ${t(
              "alerts.do_not_match"
            )}`
          );
          return false;
        }

        return {
          name,
          code: content,
        };
      })
    );

    newSchemas = newSchemas.filter(Boolean);
    const schemasChecksum = calcChecksum(newSchemas);

    if (newSchemas.length) {
      await createNewVersion(schemasChecksum, newSchemas as Dataschema[]);
    }

    return newSchemas;
  };

  const onClickUpdate = async (
    editId: string,
    values: Partial<Dataschema>,
    compareChecksum?: boolean
  ) => {
    const newDataschemas = [...dataschemas];
    const editSchemaIndex = newDataschemas.findIndex(
      (schema) => schema.id === editId
    );

    newDataschemas[editSchemaIndex] = {
      ...newDataschemas[editSchemaIndex],
      ...values,
    };

    const checksum = calcChecksum(newDataschemas);

    if (compareChecksum) {
      if (currentVersion.checksum === checksum) {
        message.info(t("alerts.no_changes"));
        return false;
      }
    }

    await createNewVersion(checksum, newDataschemas);

    if (
      dataSchemaName ===
        dataschemas.find((schema) => schema.id === editId)?.name &&
      values.name
    ) {
      setLocation(
        `${basePath}/${dataSourceId}/${currentBranchId}/${values.name}`
      );
    }

    return newDataschemas;
  };

  const onClickDelete = async (id: string) => {
    const newDataschemas = [...dataschemas];
    const deleteSchemaIndex = newDataschemas.findIndex(
      (schema) => schema.id === id
    );
    newDataschemas.splice(deleteSchemaIndex, 1);

    const checksum = calcChecksum(newDataschemas);

    message.info(t("alerts.deleting_a_file"));

    await createNewVersion(checksum, newDataschemas);
  };

  const onCodeSave = async (id: string, code: string) => {
    await onClickUpdate(id, { code }, true);
    await execQueryMeta({ id: dataSourceId, branch_id: branch });
  };

  const onRunSQL = (query: string, limit: number) => {
    execRunQueryMutation({
      datasource_id: dataSourceId,
      query,
      limit,
    });
  };

  const onCreateBranch = async (data: CreateBranchFormValues) => {
    const newSchemas = dataschemas.map((schema: Dataschema) => ({
      name: schema.name,
      code: schema.code,
      user_id: currentUser.id,
      datasource_id: dataSourceId,
    }));

    const branchData = {
      name: data.name,
      status: "created",
      user_id: currentUser.id,
      datasource_id: dataSourceId,
      versions: {
        data: {
          user_id: currentUser.id,
          checksum: currentVersion?.checksum || "No data",
          dataschemas: {
            data: newSchemas,
          },
        },
      },
    } as unknown as Branches_Insert_Input;

    const newBranch = await execCreateBranchMutation({
      object: branchData,
    });

    if (newBranch.data?.insert_branches_one?.id) {
      setCurrentBranchId(newBranch.data.insert_branches_one.id);
    }
  };

  const onSetDefault = (branchId?: string) => {
    execSetDefaultMutation({
      branch_id: branchId || currentBranchId,
      datasource_id: dataSourceId,
    });
  };

  const onDeleteBranch = (branchId?: string) => {
    execDeleteMutation({ id: branchId });
    setLocation(`${basePath}/${dataSourceId}`);
  };

  const ideMenu = [
    {
      key: "gen",
      label: t("ide_menu.generate_schema"),
      onClick: () =>
        setLocation(`${basePath}/${dataSourceId}/${branch}/genmodels`),
    },
    {
      key: "import",
      label: (
        <>
          {t("ide_menu.import_models")}
          <input
            type="file"
            ref={inputFile}
            hidden
            onChange={onUploadFile}
            accept="application/zip"
          />
        </>
      ),
      onClick: () => uploadFile(),
    },
    {
      key: "export",
      label: t("ide_menu.export_models"),
      onClick: () => window.open(`${EXPORT}/${dataSourceId}`),
    },
  ] as MenuProps["items"];

  return (
    <Models
      onSchemaCreate={onClickCreate}
      onSchemaUpdate={onClickUpdate}
      onSchemaDelete={onClickDelete}
      dataschemas={dataschemas}
      dataSource={dataSource}
      ideMenu={ideMenu}
      branches={branches}
      fetching={fetching}
      currentBranch={currentBranch}
      onChangeBranch={(branchId) => {
        setCurrentBranchId(branchId);
        setLocation(`${basePath}/${dataSourceId}/${branchId}/${slug}`);
      }}
      onSetDefault={onSetDefault}
      branchLoading={createBranchMutation.fetching}
      onCreateBranch={onCreateBranch}
      onDeleteBranch={onDeleteBranch}
      currentVersion={currentVersion}
      dataSchemaName={dataSchemaName || slug}
      onRunSQL={onRunSQL}
      onCodeSave={onCodeSave}
      genSchemaModalVisible={genSchemaModalVisible}
      versionsModalVisible={versionsModalVisible}
      data={sqlResult}
      validationError={validationError}
      isConsoleOpen={isConsoleOpen}
      toggleConsole={() => toggleConsole(false)}
      tablesSchema={tablesSchema}
      schemaFetching={tablesData?.fetching}
      onModalClose={() => onModalClose(true)}
      onGenSubmit={onGenSubmit}
      onSaveVersion={createNewVersion}
      onDataSourceChange={(ds) => {
        setCurrentDataSourceId(ds?.id);
        setLocation(`${basePath}/${ds?.id}/${getCurrentBranch(ds)}`);
      }}
      dataSources={teamData?.dataSources}
      sqlError={runQueryMutation?.error}
      onConnect={() => setLocation(`${SOURCES}/new`)}
      versionsCount={versionsCount}
    />
  );
};

export default ModelsWrapper;
