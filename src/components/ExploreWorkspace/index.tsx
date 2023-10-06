import { Space, Typography } from "antd";
import { useTranslation } from "react-i18next";

import SidebarLayout from "@/layouts/SidebarLayout";
import ExploreDataSection from "@/components/ExploreDataSection";
import ErrorFound from "@/components/ErrorFound";
import ExploreCubes from "@/components/ExploreCubes";
import usePlayground from "@/hooks/usePlayground";
import usePermissions from "@/hooks/usePermissions";
import useExploreWorkspace from "@/hooks/useExploreWorkspace";
import useDimensions from "@/hooks/useDimensions";
import ExploreFiltersSection from "@/components/ExploreFiltersSection";
import AppLayout from "@/layouts/AppLayout";

import type { FC, ReactNode } from "react";

const DEFAULT_ROW_HEIGHT = 20;

interface ExploreWorkSpaceProps {
  basePath: string;
  loading: boolean;
  meta: Record<string, any>[];
  params: {
    explorationId: string;
    screenshotMode: boolean;
    dataSourceId: string;
  };
  source: {
    id: string;
    name: string;
    db_type: string;
    db_params: {
      ssl: boolean;
      host: string;
      port: string;
      user: string;
      database: string;
      password: string;
    };
    created_at: "2021-09-09T11:52:58.347143+00:00";
    updated_at: string;
  };
  header?: ReactNode;
  subTitle?: ReactNode;
  title?: ReactNode;
}

const ExploreWorkSpace: FC<ExploreWorkSpaceProps> = (props) => {
  const {
    header = null,
    subTitle = <span style={{ fontSize: 20, fontWeight: 600 }}>Explore</span>,
    title = null,
    source: dataSource,
    meta,
    params: { explorationId, screenshotMode },
  } = props;

  const { t } = useTranslation(["pages"]);

  const selector = screenshotMode
    ? document.querySelector(".ant-layout-content")
    : document.querySelector("#data-view");

  const { size } = useDimensions(selector);
  const width = size?.width;

  const {
    selectedQueryMembers = {},
    availableQueryMembers = {},
    exploration,
    state: explorationState,
    analyticsQuery: {
      updateMember,
      isQueryChanged,
      runQuery,
      setLimit,
      setOffset,
      setPage,
      setOrderBy,
    },
    dispatchSettings,
  } = usePlayground({
    dataSourceId: dataSource.id as string,
    editId: explorationId as string,
    meta,
  });
  const explorationRowId = useMemo(() => exploration?.id, [exploration]);

  const { collapseState, state, onDataSectionChange, onToggleSection } =
    useExploreWorkspace({ selectedQueryMembers });

  // const {
  //   mutations: { validateMutation, execValidateMutation },
  // } = useSources({
  //   pauseQueryAll: true,
  // });

  // TODO use graphQL API
  const validateMutation: any = () => {};

  const tableHeight = useMemo(
    () => DEFAULT_ROW_HEIGHT * explorationState.rows.length + 30,
    [explorationState.rows.length]
  );

  // useTrackedEffect((changes, previousDeps, currentDeps) => {
  //   const prevData = previousDeps?.[0];
  //   const currData = currentDeps?.[0];

  //   let dataDiff = false;
  //   if (!prevData || !currData) {
  //     dataDiff = false;
  //   } else {
  //     dataDiff = !equals(prevData, currData);
  //   }

  //   if (dataDiff) {
  //     execValidateMutation({ id: dataSource.id });
  //   }
  // }, [currentUser.dataschemas, execValidateMutation]);

  // useEffect(() => {
  //   if (dataSource.id) {
  //     execValidateMutation({ id: dataSource.id });
  //   }
  // }, [dataSource.id, execValidateMutation]);

  const onRunQuery = useCallback(
    (e: Event) => {
      runQuery();

      e.preventDefault();
      e.stopPropagation();
    },
    [runQuery]
  );
  const onQueryChange = useCallback(
    (type: string, ...args: any) => {
      switch (type) {
        case "limit":
          setLimit(args[0]);
          break;
        case "offset":
          setOffset(args[0]);
          break;
        case "page":
          setPage(args[0]);
          break;
        case "order":
          return setOrderBy;
        case "hideCubeNames":
          dispatchSettings({ type: "hideCubeNames", value: args[0] });
          break;
        case "hideIndexColumn":
          dispatchSettings({ type: "hideIndexColumn", value: args[0] });
          break;
        default:
          return () => {};
      }
    },
    [dispatchSettings, setLimit, setOffset, setOrderBy, setPage]
  );

  const { fallback: cubesFallback } = usePermissions({
    scope: "explore/workspace/cubes",
  });
  const { fallback: filtersFallback } = usePermissions({
    scope: "explore/workspace/filters",
  });

  if (Object.keys(dataSource).length && !availableQueryMembers) {
    return <ErrorFound status={500} />;
  }

  const dataSection = (
    <ExploreDataSection
      key="dataSec"
      width={width}
      height={screenshotMode ? tableHeight : undefined}
      selectedQueryMembers={selectedQueryMembers}
      onExec={onRunQuery}
      onQueryChange={onQueryChange}
      disabled={!isQueryChanged}
      state={state}
      queryState={explorationState}
      explorationRowId={explorationRowId}
      screenshotMode={screenshotMode}
      rowHeight={DEFAULT_ROW_HEIGHT}
      onToggleSection={onToggleSection}
      onSectionChange={(e) => onToggleSection(e.target.value)}
      isActive={collapseState.activePanelKey.includes("dataSec")}
    />
  );

  if (screenshotMode) {
    return dataSection;
  }

  const sidebar = (
    <>
      {header}
      <ExploreCubes
        availableQueryMembers={availableQueryMembers}
        selectedQueryMembers={selectedQueryMembers}
        onMemberSelect={updateMember}
        dataSchemaValidation={validateMutation}
      />
    </>
  );

  const filtersSection = !filtersFallback ? (
    <ExploreFiltersSection
      key="filtersSec"
      availableQueryMembers={availableQueryMembers}
      selectedQueryMembers={selectedQueryMembers}
      onToggleSection={onToggleSection}
      onMemberChange={updateMember}
      state={state}
      isActive={collapseState.activePanelKey.includes("filtersSec")}
    />
  ) : null;

  const Layout = cubesFallback ? AppLayout : SidebarLayout;

  return (
    <Layout title={title} divider={false} subTitle={subTitle} items={sidebar}>
      <div id="data-view">
        {dataSection} {filtersSection}
      </div>
    </Layout>
  );
};

export default ExploreWorkSpace;
