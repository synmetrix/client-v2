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
import useUserData from "@/hooks/useUserData";
import useAppSettings from "@/hooks/useAppSettings";
import useLocation from "@/hooks/useLocation";
import useSchemasIde from "@/hooks/useSchemasIde";
import useSchemas from "@/hooks/useSchemas";
import useSources from "@/hooks/useSources";
import useCheckResponse from "@/hooks/useCheckResponse";
import usePermissions from "@/hooks/usePermissions";
import equals from "@/utils/helpers/equals";
import calcChecksum from "@/utils/helpers/dataschemasChecksum";
import type { DataSourceInfo } from "@/types/dataSource";
import type {
  AllDataSchemasQuery,
  Branches_Insert_Input,
} from "@/graphql/generated";

import ModelsActiveIcon from "@/assets/models-active.svg";

import styles from "./index.module.less";

import type { MenuProps } from "antd";
import type { ChangeEvent } from "react";

interface ModelsProps {
  branchMenu: MenuProps["items"];
  ideMenu: MenuProps["items"];
  branches: AllDataSchemasQuery["branches"];
  onSetDefault: (branchId?: string) => void;
  onChangeBranch: (branchId?: string) => void;
  onCreateBranch: (name: string) => Promise<void>;
  onSchemaDelete: (id: string) => void;
  onSchemaUpdate: (
    editId: string,
    values: Partial<
      AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"][number]
    >
  ) => void;
  dataSource?: DataSourceInfo;
  versions?: AllDataSchemasQuery["branches"][number]["versions"];
  currentBranch?: AllDataSchemasQuery["branches"][number];
  currentVersion?: AllDataSchemasQuery["branches"][number]["versions"][number];
  dataschemas?: AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"];
  onSchemaCreate: (
    values: Partial<
      AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"][number]
    >
  ) => void;
  onCodeSave: (id: string, code: string) => void;
  onRunSQL: (query: string, limit: number) => void;
  dataSchemaName: string;
  fetching?: boolean;
  genSchemaModalVisible?: boolean;
  versionsModalVisible?: boolean;
  data?: object[];
  validationError?: string;
  isConsoleOpen?: boolean;
  toggleConsole?: () => void;
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
}) => {
  const {
    editTab,
    activeTab,
    changeActiveTab,
    openTab,
    openedTabs,
    openSchema,
  } = useSchemasIde({ dataSourceId: dataSource?.id || "" });

  const openedSchemas = useMemo(
    () =>
      Object.keys(openedTabs)
        .map((id) => dataschemas.find((schema) => schema.id === id))
        .filter(Boolean),
    [dataschemas, openedTabs]
  ) as AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"];

  useEffect(() => {
    if (dataSchemaName) {
      const schemaObj = dataschemas.find(
        (schema) => schema.name === dataSchemaName
      );

      if (schemaObj && !Object.keys(openedTabs).includes(schemaObj.id)) {
        openTab(schemaObj);
      }
    }
  }, [dataschemas, dataSchemaName, openTab, openedTabs]);

  return (
    <SidebarLayout
      title={dataSource?.name}
      subTitle={
        <Space size={7} align="center">
          <ModelsActiveIcon />
          <Title className={styles.sidebarTitle} level={4}>
            Models
          </Title>
        </Space>
      }
      divider
      items={
        <ModelsSidebar
          onSchemaDelete={onSchemaDelete}
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
        />
      }
    >
      <Spin spinning={fetching}>
        <div className={styles.editor}>
          <CodeEditor
            schemas={openedSchemas}
            onClose={(id) => editTab(id, "remove")}
            onTabChange={changeActiveTab}
            active={activeTab}
            onRunSQL={onRunSQL}
            onCodeSave={onCodeSave}
            data={data}
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
      </Spin>
    </SidebarLayout>
  );
};

const reservedSlugs = ["sqlrunner", "genschema", "docs"];

const getTables = (obj: object, prefix: string = "") => {
  return Object.entries(obj).reduce((acc: { name: string }[], [key, value]) => {
    let result = acc;
    const newPath = prefix ? `${prefix}.${key}` : key;

    if (value === true) {
      const lastSlashIndex = newPath.lastIndexOf("/");
      const formattedPath = `${newPath.slice(
        0,
        lastSlashIndex
      )}.${newPath.slice(lastSlashIndex + 1)}`;
      result.push({ name: formattedPath });
    }

    if (typeof value === "object") {
      const childResults = getTables(value, newPath);
      result = acc.concat(childResults);
    }

    return result;
  }, []);
};

const ModelsWrapper: React.FC = () => {
  const { t } = useTranslation();

  const { currentUser } = useUserData();
  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix("/models");

  const [isConsoleOpen, toggleConsole] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const [dataSourceId, slug] = useMemo(
    () => [getOr("", "dataSourceId", params), getOr("", "slug", params)],
    [params]
  );
  const dataSource = useMemo(
    () => currentUser?.dataSources?.find((d) => d.id === dataSourceId),
    [dataSourceId, currentUser]
  );

  const [currentBranchId, setCurrentBranchId] = useLocalStorageState(
    `${dataSourceId}:currentBranch`
  );

  const onModalClose = () => setLocation(`${basePath}/${dataSourceId}`);
  const dataSchemaName = (reservedSlugs.indexOf(slug) === -1 && slug) || null;

  const {
    all,
    queries: { allData, execAllData },
    mutations: {
      deleteMutation,
      execDeleteMutation,
      exportMutation,
      execExportMutation,
      createBranchMutation,
      execCreateBranchMutation,
      createVersionMutation,
      execCreateVersionMutation,
      setDefaultMutation,
      execSetDefaultMutation,
    },
  } = useSchemas({
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
    {}
  );

  useCheckResponse(exportMutation, (res) => {
    if (res) {
      const url = res?.export_data_models?.download_url;
      window.location.assign(url);
    }
  });

  const currentBranch = useMemo(
    () => (all || []).find((branch) => branch.id === currentBranchId),
    [all, currentBranchId]
  );
  const currentVersion = useMemo(
    () =>
      currentBranch?.versions?.[0] ||
      ({} as AllDataSchemasQuery["branches"][number]["versions"][number]),
    [currentBranch]
  );
  const dataschemas = useMemo(
    () => currentVersion?.dataschemas || [],
    [currentVersion]
  );

  const schemaIdToCode = useMemo(
    () =>
      dataschemas.reduce(
        (acc: Record<string, { name: string; code: string }>, curr) => {
          acc[curr.id] = { name: curr.name, code: curr.code };
          return acc;
        },
        {}
      ),
    [dataschemas]
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
      successMessage: t("Schema generated"),
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
      successMessage: t("Branch created"),
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
      successMessage: t("Version created"),
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
      successMessage: t(`Branch "${currentBranch?.name}" is now default.`),
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
      successMessage: t("Branch removed"),
    }
  );

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

  useEffect(() => {
    if (!dataSourceId && currentUser?.dataSources?.length) {
      setLocation(`${basePath}/${currentUser.dataSources[0].id}`);
    }
  }, [dataSourceId, currentUser, basePath, setLocation]);

  const exportData = () => {
    execExportMutation({
      branch_id: currentBranchId as string,
    });
  };

  const inputFile = useRef<HTMLInputElement>(null);

  const uploadFile = () => {
    inputFile.current?.click();
  };

  const onGenSubmit = async (format?: string, values?: any) => {
    const tables = getTables(values);

    await execGenSchemaMutation({
      datasource_id: dataSourceId,
      branch_id: currentBranchId,
      tables,
      format,
      overwrite: true,
    });

    onModalClose();
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

  if (!all.length && !dataSourceId) {
    return <ErrorFound status={404} />;
  }

  const createNewVersion = async (checksum: string, data: any[]) => {
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

    await execCreateVersionMutation({ object: versionData });
  };

  const onClickCreate = async (
    values: Partial<
      AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"][number]
    >
  ) => {
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
      message.error(t("Format is unsupported."));
      return false;
    }

    const zip = new JSZip();

    try {
      await zip.loadAsync(file);
    } catch (err) {
      message.error(t("Bad archive."));
      return false;
    }

    if (!zip?.files?.["meta.yaml"]) {
      message.error(t("Wrong archive."));
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
            `${t("Checksum of file")} "${name}" ${t("do not match. Skipped.")}`
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
      await createNewVersion(schemasChecksum, newSchemas);
    }

    return newSchemas;
  };

  const onClickUpdate = async (
    editId: string,
    values: Partial<
      AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"][number]
    >
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

    if (currentVersion.checksum === checksum) {
      message.info(t("There is no changes."));
      return false;
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

    await createNewVersion(checksum, newDataschemas);
  };

  const onCodeSave = (id: string, code: string) => {
    onClickUpdate(id, { code });
    execValidateMutation({ id: dataSourceId });
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

    await execCreateBranchMutation({
      object: branchData,
    });
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
      label: t("Generate Schema"),
      onClick: () => setLocation(`${basePath}/${dataSourceId}/genschema`),
    },
    {
      key: "import",
      label: (
        <>
          {t("Import data models")}
          <input
            type="file"
            ref={inputFile}
            hidden
            onChange={onUploadFile}
            accept="application/zip"
          />
        </>
      ),
      onClick: () => {
        setLocation(`${basePath}/${dataSourceId}`);
        uploadFile();
      },
    },
    {
      key: "export",
      label: t("Export data models"),
      onClick: () => {
        setLocation(`${basePath}/${dataSourceId}`);
        exportData();
      },
    },
  ] as MenuProps["items"];

  const branchMenu = [
    {
      key: "versions",
      label: t("Show versions"),
      onClick: () => setLocation(`${basePath}/${dataSourceId}/versions`),
    },
    all.length > 1 && {
      key: "remove",
      label: t("Remove branch"),
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
      fetching={fetching}
      currentBranch={currentBranch}
      versions={currentBranch?.versions}
      onChangeBranch={setCurrentBranchId}
      onSetDefault={onSetDefault}
      onCreateBranch={onCreateBranch}
      currentVersion={currentVersion}
      dataSchemaName={dataSchemaName}
      onRunSQL={onRunSQL}
      onCodeSave={onCodeSave}
      genSchemaModalVisible={genSchemaModalVisible}
      versionsModalVisible={versionsModalVisible}
      data={sqlResult}
      validationError={validationError}
      isConsoleOpen={isConsoleOpen}
      toggleConsole={() => toggleConsole(false)}
    />
  );
};

export default ModelsWrapper;
