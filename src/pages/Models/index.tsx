import { Space, Spin, Typography, message } from "antd";
import { useParams } from "@vitjs/runtime";
import { useTranslation } from "react-i18next";
import { useLocalStorageState } from "ahooks";
import { getOr } from "unchanged";
import JSZip from "jszip";
import { load } from "js-yaml";
import md5 from "md5";

import AppLayout from "@/layouts/AppLayout";
import CodeEditor from "@/components/CodeEditor";
import ErrorFound from "@/components/ErrorFound";
import ModelsSidebar from "@/components/ModelsSidebar";
import SidebarLayout from "@/layouts/SidebarLayout";
import Console from "@/components/Console";
import Modal from "@/components/Modal";
import DataModelGeneration from "@/components/DataModelGeneration";
import VersionsList from "@/components/VersionsList";
import NoDataSource from "@/components/NoDataSource";
import useAppSettings from "@/hooks/useAppSettings";
import useLocation from "@/hooks/useLocation";
import useModelsIde from "@/hooks/useModelsIde";
import useSources from "@/hooks/useSources";
import useCheckResponse from "@/hooks/useCheckResponse";
import usePermissions from "@/hooks/usePermissions";
import calcChecksum from "@/utils/helpers/dataschemasChecksum";
import getTables from "@/utils/helpers/getTables";
import getCurrentBranch from "@/utils/helpers/getCurrentBranch";
import type { Branch, DataSourceInfo, Schema } from "@/types/dataSource";
import type { Dataschema } from "@/types/dataschema";
import type { Version } from "@/types/version";
import type { Branches_Insert_Input } from "@/graphql/generated";
import CurrentUserStore from "@/stores/CurrentUserStore";
import {
  useDeleteSchemaMutation,
  useCreateBranchMutation,
  useCreateVersionMutation,
  useSetDefaultBranchMutation,
  useCurrentVersionQuery,
} from "@/graphql/generated";

import ModelsActiveIcon from "@/assets/models-active.svg";

import styles from "./index.module.less";

import type { MenuProps } from "antd";
import type { ChangeEvent } from "react";

interface ModelsProps {
  branchMenu: MenuProps["items"];
  ideMenu: MenuProps["items"];
  branches: Branch[];
  onSetDefault: (branchId?: string) => void;
  onChangeBranch: (branchId?: string) => void;
  onCreateBranch: (name: string) => Promise<void>;
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
}

const { Title } = Typography;

export const Models: React.FC<ModelsProps> = ({
  dataSource,
  dataSchemaName,
  branchMenu,
  ideMenu,
  branches,
  currentBranch,
  currentVersion,
  onChangeBranch,
  onCreateBranch,
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

  const Layout =
    dataSources && dataSources.length === 0 ? AppLayout : SidebarLayout;

  return (
    <Layout
      title={dataSource?.name || t("models")}
      subTitle={
        <Space size={7} align="center">
          <ModelsActiveIcon />
          <Title className={styles.sidebarTitle} level={4}>
            {t("models")}
          </Title>
        </Space>
      }
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
            dataSources={dataSources || []}
            dataSourceId={dataSource?.id}
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
            open={versionsModalVisible}
            onClose={onModalClose}
            destroyOnClose
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
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix("/models");

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
  const dataSource = useMemo(
    () =>
      teamData?.dataSources?.find((d: DataSourceInfo) => d.id === dataSourceId),
    [dataSourceId, teamData]
  );
  const branches = useMemo(
    () => dataSource?.branches || [],
    [dataSource?.branches]
  );

  const [currentBranchId, setCurrentBranchId] = useLocalStorageState<string>(
    `${dataSourceId}:currentBranch`
  );
  const [currentDataSourceId, setCurrentDataSourceId] = useLocalStorageState<
    string | null
  >("currentDataSourceId");

  const [version, execVersionAll] = useCurrentVersionQuery({
    variables: { branch_id: currentBranchId },
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

  const currentBranch = useMemo(
    () =>
      (branches || []).find((b) => b.id === currentBranchId) || branches?.[0],
    [branches, currentBranchId]
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

  useCheckResponse(setDefaultMutation, () => {}, {
    successMessage: `${t(`alerts.branch`)} "${currentBranch?.name}" ${t(
      "alerts.is_now_default"
    )}`,
  });

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: t("alerts.branch_removed"),
  });

  useCheckResponse(validateMutation, undefined, {
    successMessage: null,
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
    if (!dataSourceId && teamData?.dataSources?.length) {
      const isExist = teamData?.dataSources?.find(
        (ds) => ds.id === currentDataSourceId
      );
      if (isExist) {
        setLocation(`${basePath}/${currentDataSourceId}`);
      } else {
        setCurrentDataSourceId(teamData?.dataSources?.[0]?.id);
      }
    }

    if (dataSourceId && !teamData?.dataSources?.length) {
      setLocation(basePath);
    }

    if (dataSourceId) {
      const isExist = teamData?.dataSources?.find((d) => d.id === dataSourceId);

      if (isExist) {
        if (!branch && currentBranchId) {
          setLocation(`${basePath}/${dataSourceId}/${currentBranchId}`);
        }
      } else {
        setLocation(basePath);
      }
    }
  }, [
    dataSourceId,
    teamData,
    basePath,
    setLocation,
    currentDataSourceId,
    setCurrentDataSourceId,
    branch,
    currentBranchId,
  ]);

  const inputFile = useRef<HTMLInputElement>(null);

  const uploadFile = () => {
    inputFile.current?.click();
  };

  const onGenSubmit = async (values: object, format: string) => {
    const tables = getTables(values);

    await execGenSchemaMutation({
      datasource_id: dataSourceId,
      branch_id: currentBranchId,
      tables,
      format,
      overwrite: true,
    });

    execVersionAll();

    onModalClose(true);
  };

  const { fallback } = usePermissions({ scope: "dataschemas" });

  if (fallback) {
    return fallback;
  }

  const fetching =
    version?.fetching ||
    deleteMutation.fetching ||
    setDefaultMutation.fetching ||
    validateMutation.fetching ||
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
      branch_id: currentBranchId,
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
  };

  const onRunSQL = (query: string, limit: number) => {
    execRunQueryMutation({
      datasource_id: dataSourceId,
      query,
      limit,
    });
  };

  const onCreateBranch = async (name: string) => {
    const newSchemas = dataschemas.map((schema: Dataschema) => ({
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
        setLocation(`${basePath}/${dataSourceId}/${currentBranchId}/genmodels`),
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
    branches.length > 1 && {
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
      branches={branches}
      fetching={fetching}
      currentBranch={currentBranch}
      onChangeBranch={(branchId) => {
        setCurrentBranchId(branchId);
        setLocation(`${basePath}/${dataSourceId}/${branchId}`);
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
      dataSources={teamData?.dataSources}
      sqlError={runQueryMutation?.error}
      onConnect={() => setLocation(withAuthPrefix("/settings/sources/new"))}
    />
  );
};

export default ModelsWrapper;
