import { Space, Spin, Typography, message } from "antd";
import { useParams } from "@vitjs/runtime";
import { useTranslation } from "react-i18next";
import { useLocalStorageState, useTrackedEffect } from "ahooks";
import { getOr } from "unchanged";
import JSZip from "jszip";
import { load } from "js-yaml";
import md5 from "md5";

import CodeEditor from "@/components/CodeEditor";
import ErrorFound from "@/components/ErrorFound";
import ModelsSidebar from "@/components/ModelsSidebar";
import SidebarLayout from "@/layouts/SidebarLayout";
import Console from "@/components/Console";
import Modal from "@/components/Modal";
import DataModelGeneration from "@/components/DataModelGeneration";
import VersionsList from "@/components/VersionsList";
import NoDataSource from "@/components/NoDataSource";
import useUserData from "@/hooks/useUserData";
import useAppSettings from "@/hooks/useAppSettings";
import useLocation from "@/hooks/useLocation";
import useModelsIde from "@/hooks/useModelsIde";
import useModels from "@/hooks/useModels";
import useSources from "@/hooks/useSources";
import useCheckResponse from "@/hooks/useCheckResponse";
import usePermissions from "@/hooks/usePermissions";
import equals from "@/utils/helpers/equals";
import calcChecksum from "@/utils/helpers/dataschemasChecksum";
import getTables from "@/utils/helpers/getTables";
import getCurrentBranch from "@/utils/helpers/getCurrentBranch";
import type { Branch, DataSourceInfo, Schema } from "@/types/dataSource";
import type { Dataschema } from "@/types/dataschema";
import type { Version } from "@/types/version";
import type { Branches_Insert_Input } from "@/graphql/generated";

import ModelsActiveIcon from "@/assets/models-active.svg";

import styles from "./index.module.less";

import type { MenuProps } from "antd";
import type { ChangeEvent } from "react";

interface ModelsProps {
  dataSources: DataSourceInfo[];
  branchMenu: MenuProps["items"];
  ideMenu: MenuProps["items"];
  branches: Branch[];
  onSetDefault: (branchId?: string) => void;
  onChangeBranch: (branchId?: string) => void;
  onCreateBranch: (name: string) => Promise<void>;
  onSchemaDelete: (id: string) => void;
  onSchemaUpdate: (editId: string, values: Partial<Dataschema>) => void;
  dataSource?: DataSourceInfo;
  versions?: Version[];
  currentBranch?: Branch;
  currentVersion?: Version;
  dataschemas?: Dataschema[];
  onSchemaCreate: (values: Partial<Dataschema>) => void;
  onCodeSave: (id: string, code: string) => void;
  onRunSQL: (query: string, limit: number) => void;
  dataSchemaName: string;
  fetching?: boolean;
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
  onConnect: () => void;
}

const { Title } = Typography;

export const Models: React.FC<ModelsProps> = ({
  dataSource,
  versions,
  dataSchemaName,
  branchMenu,
  ideMenu,
  branches,
  currentBranch,
  currentVersion,
  onChangeBranch,
  onCreateBranch,
  onSetDefault,
  fetching,
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
  onModalClose,
  onGenSubmit,
  onSaveVersion,
  onDataSourceChange,
  dataSources,
  sqlError,
  onConnect,
}) => {
  const { t } = useTranslation(["pages"]);

  const {
    editTab,
    activeTab,
    changeActiveTab,
    openTab,
    openedTabs,
    openSchema,
    resetTabs,
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
    (changes, prevDeps, currDeps) => {
      if (prevDeps?.[0]?.id !== currDeps?.[0]?.id) {
        resetTabs();
      }
    },
    [currentVersion]
  );

  useEffect(() => {
    if (dataSchemaName) {
      const schemaObj = dataschemas.find(
        (schema) => schema.name === dataSchemaName
      );

      if (schemaObj) {
        openTab(schemaObj.name);
      }
    }
  }, [dataschemas, dataSchemaName, openTab]);

  return (
    <SidebarLayout
      title={dataSource?.name}
      subTitle={
        <Space size={7} align="center">
          <ModelsActiveIcon />
          <Title className={styles.sidebarTitle} level={4}>
            {t("models")}
          </Title>
        </Space>
      }
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
            onSchemaUpdate={onSchemaUpdate}
            version={currentVersion?.checksum}
            branchMenu={branchMenu}
            ideMenu={ideMenu}
            branches={branches}
            currentBranch={currentBranch}
            onChangeBranch={onChangeBranch}
            onSetDefault={onSetDefault}
            docs={`/docs/${currentVersion?.id}`}
            files={dataschemas}
            onCreateBranch={onCreateBranch}
            onCreateFile={onSchemaCreate}
            onSelectFile={openSchema}
            dataSources={dataSources}
            dataSourceId={dataSource?.id}
          />
        </Spin>
      }
    >
      {!dataSources?.length && !fetching ? (
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
              />
            </div>

            {isConsoleOpen && activeTab !== "sqlrunner" && (
              <div className={styles.console}>
                <Console
                  onClose={() => toggleConsole?.()}
                  errors={validationError}
                />
              </div>
            )}
          </div>

          {dataSource && (
            <Modal
              open={genSchemaModalVisible}
              onClose={onModalClose}
              width={1004}
            >
              <DataModelGeneration
                dataSource={dataSource!}
                schema={tablesSchema}
                isOnboarding={false}
                loading={schemaFetching}
                onSubmit={onGenSubmit}
                resetOnSubmit
              />
            </Modal>
          )}

          {versions && (
            <Modal
              width={1004}
              open={versionsModalVisible}
              onClose={onModalClose}
            >
              <VersionsList versions={versions} onRestore={onSaveVersion} />
            </Modal>
          )}
        </Spin>
      )}
    </SidebarLayout>
  );
};

const reservedSlugs = ["sqlrunner", "genschema", "docs"];

const ModelsWrapper: React.FC = () => {
  const { t } = useTranslation(["models", "common"]);

  const { currentUser } = useUserData();
  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix("/models");

  const [isConsoleOpen, toggleConsole] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const [dataSourceId, branch, slug] = useMemo<[string, string, string]>(
    () => [
      getOr("", "dataSourceId", params),
      getOr("", "branch", params),
      getOr("", "slug", params),
    ],
    [params]
  );
  const dataSource = useMemo(
    () => currentUser?.dataSources?.find((d) => d.id === dataSourceId),
    [dataSourceId, currentUser]
  );

  const [currentBranchId, setCurrentBranchId] = useLocalStorageState<string>(
    `${dataSourceId}:currentBranch`
  );

  const onModalClose = (goBack: boolean = false) => {
    if (history.state && goBack) {
      history.back();
    } else {
      setLocation(`${basePath}/${dataSourceId}`);
    }
  };
  const dataSchemaName = (reservedSlugs.indexOf(slug) === -1 && slug) || null;

  const {
    all,
    queries: { allData, execAllData },
    mutations: {
      deleteMutation,
      execDeleteMutation,
      exportMutation,
      createBranchMutation,
      execCreateBranchMutation,
      createVersionMutation,
      execCreateVersionMutation,
      setDefaultMutation,
      execSetDefaultMutation,
    },
  } = useModels({
    params: {
      dataSourceId,
    },
    pauseQueryAll: false,
  });

  const {
    queries: { tablesData, execQueryTables },
    mutations: {
      runQueryMutation,
      execRunQueryMutation,
      validateMutation,
      execValidateMutation,
      genSchemaMutation,
      execGenSchemaMutation,
    },
  } = useSources({
    params: {
      editId: dataSourceId,
    },
    pauseQueryAll: true,
    disableSubscription: true,
  });

  const genSchemaModalVisible = slug === "genschema";
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

  useEffect(() => {
    if (!branch && !currentBranchId && dataSource) {
      const currentId = dataSource?.branch.id || all?.[0]?.id;
      setCurrentBranchId(currentId);
      setLocation(`${basePath}/${dataSourceId}/${currentId}`);
    } else if (branch !== currentBranchId) {
      setCurrentBranchId(branch);
    }
  }, [
    all,
    basePath,
    branch,
    currentBranchId,
    dataSource,
    dataSource?.branch,
    dataSourceId,
    setCurrentBranchId,
    setLocation,
  ]);

  const currentBranch = useMemo(
    () =>
      (all || []).find((b) => b.id === currentBranchId) || dataSource?.branch,
    [all, currentBranchId, dataSource?.branch]
  );
  const currentVersion = useMemo(
    () => currentBranch?.versions?.[0] || ({} as Version),
    [currentBranch]
  );
  const dataschemas = useMemo(
    () => currentVersion?.dataschemas || [],
    [currentVersion]
  );

  useTrackedEffect(
    (changes, previousDeps, currentDeps) => {
      const prevData = previousDeps?.[0];
      const currData = currentDeps?.[0];

      let dataDiff = false;
      if (!prevData || !currData) {
        dataDiff = false;
      } else {
        dataDiff = !equals(prevData, currData);
      }

      if (dataDiff) {
        execAllData({ requestPolicy: "network-only" });
      }
    },
    [currentUser, execAllData]
  );

  useCheckResponse(
    genSchemaMutation,
    (res) => {
      if (res) {
        execAllData();
      }
    },
    {
      successMessage: t("alerts.schema_generated"),
    }
  );

  useCheckResponse(
    createBranchMutation,
    (res) => {
      if (res) {
        execAllData();
      }
    },
    {
      successMessage: t("alerts.branch_created"),
    }
  );

  useCheckResponse(
    createVersionMutation,
    (res) => {
      if (res) {
        execAllData();
      }
    },
    {
      successMessage: t("alerts.version_created"),
    }
  );

  useCheckResponse(
    setDefaultMutation,
    (res) => {
      if (res) {
        execAllData();
      }
    },
    {
      successMessage: `${t(`alerts.branch`)} "${currentBranch?.name}" ${t(
        "alerts.is_now_default"
      )}`,
    }
  );

  useCheckResponse(
    deleteMutation,
    (res) => {
      if (res) {
        execAllData();
      }
    },
    {
      successMessage: t("alerts.branch_removed"),
    }
  );

  useCheckResponse(validateMutation, undefined, {
    successMessage: t("alerts.compilation_success"),
    errorMessage: t("alerts.compilation_error"),
    showResponseMessage: false,
  });

  const validationError = useMemo(
    () => validateMutation?.error?.message,
    [validateMutation.error]
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

  useLayoutEffect(() => {
    if (!dataSourceId && currentUser?.dataSources?.length) {
      setLocation(`${basePath}/${currentUser.dataSources[0].id}`);
    }
  }, [dataSourceId, currentUser, basePath, setLocation, dataSource?.branch.id]);

  const inputFile = useRef<HTMLInputElement>(null);

  const uploadFile = () => {
    inputFile.current?.click();
  };

  const onGenSubmit = async (values: object, format: string) => {
    const tables = getTables(values);

    execGenSchemaMutation({
      datasource_id: dataSourceId,
      branch_id: currentBranchId,
      tables,
      format,
      overwrite: true,
    });

    onModalClose(true);
  };

  const { fallback } = usePermissions({ scope: "dataschemas" });

  if (fallback) {
    return fallback;
  }

  const fetching =
    allData.fetching ||
    deleteMutation.fetching ||
    setDefaultMutation.fetching ||
    validateMutation.fetching ||
    genSchemaMutation.fetching ||
    tablesData.fetching ||
    exportMutation.fetching;

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
      branch_id: currentBranchId,
      dataschemas: {
        data: preparedDataschemas,
      },
    };

    if (versionsModalVisible) {
      onModalClose();
    }

    await execCreateVersionMutation({ object: versionData });
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

    message.info(t("alerts.file_change"));

    await createNewVersion(checksum, newDataschemas);

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
    await execValidateMutation({ id: dataSourceId });
    execAllData();
  };

  const onRunSQL = (query: string, limit: number) => {
    execRunQueryMutation({
      datasource_id: dataSourceId,
      query,
      limit,
    });
  };

  const onCreateBranch = async (name: string) => {
    const newSchemas = dataschemas.map((schema) => ({
      name: schema.name,
      code: schema.code,
      user_id: currentUser.id,
      datasource_id: dataSourceId,
    }));

    const branchData = {
      name,
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

  const ideMenu = [
    {
      key: "gen",
      label: t("ide_menu.generate_schema"),
      onClick: () =>
        setLocation(`${basePath}/${dataSourceId}/${currentBranchId}/genschema`),
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
      onClick: () => window.open(`/export/${dataSourceId}`),
    },
  ] as MenuProps["items"];

  const branchMenu = [
    {
      key: "versions",
      label: t("branch_menu.show_versions"),
      onClick: () =>
        setLocation(`${basePath}/${dataSourceId}/${currentBranchId}/versions`),
    },
    all.length > 1 && {
      key: "remove",
      label: t("branch_menu.remove_branch"),
      onClick: () => {
        execDeleteMutation({ id: currentBranchId });
        setLocation(`${basePath}/${dataSourceId}`);
      },
    },
  ].filter(Boolean) as MenuProps["items"];

  return (
    <Models
      onSchemaCreate={onClickCreate}
      onSchemaUpdate={onClickUpdate}
      onSchemaDelete={onClickDelete}
      dataschemas={dataschemas}
      dataSource={dataSource}
      branchMenu={branchMenu}
      ideMenu={ideMenu}
      branches={all}
      fetching={fetching || runQueryMutation?.fetching}
      currentBranch={currentBranch}
      versions={currentBranch?.versions}
      onChangeBranch={(branchId) => {
        setCurrentBranchId(branchId);
        setLocation(`${basePath}/${dataSourceId}/${branchId}/sqlrunner`);
      }}
      onSetDefault={onSetDefault}
      onCreateBranch={onCreateBranch}
      currentVersion={currentVersion}
      dataSchemaName={dataSchemaName || ""}
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
      onDataSourceChange={(ds) =>
        setLocation(`${basePath}/${ds?.id}/${getCurrentBranch(ds)}/sqlrunner`)
      }
      dataSources={currentUser?.dataSources || []}
      sqlError={runQueryMutation?.error}
      onConnect={() => setLocation("/settings/sources?connect=true")}
    />
  );
};

export default ModelsWrapper;
