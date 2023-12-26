import { Spin } from "antd";

import SidebarLayout from "@/layouts/SidebarLayout";
import ExploreDataSection from "@/components/ExploreDataSection";
import ErrorFound from "@/components/ErrorFound";
import ExploreCubes from "@/components/ExploreCubes";
import usePlayground, { queryStateKeys } from "@/hooks/usePlayground";
import usePermissions from "@/hooks/usePermissions";
import useExploreWorkspace from "@/hooks/useExploreWorkspace";
import useDimensions from "@/hooks/useDimensions";
import useLocation from "@/hooks/useLocation";
import ExploreFiltersSection from "@/components/ExploreFiltersSection";
import AppLayout from "@/layouts/AppLayout";
import pickKeys from "@/utils/helpers/pickKeys";
import useAppSettings from "@/hooks/useAppSettings";
import type { DataSourceInfo } from "@/types/dataSource";
import type { QuerySettings } from "@/types/querySettings";
import type { Exploration, RawSql } from "@/types/exploration";

import NoDataSource from "../NoDataSource";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

const DEFAULT_ROW_HEIGHT = 20;

interface ExploreWorkspaceProps {
  loading: boolean;
  meta: Record<string, any>[];
  metaError?: string;
  metaLoading?: boolean;
  params: {
    screenshotMode: boolean;
  };
  source?: DataSourceInfo;
  dataSources?: DataSourceInfo[];
  exploration?: Exploration;
  rawSql?: RawSql;
  dataSet: any;
  runQuery: (state: object, settings: QuerySettings) => void;
  onOpenModal: (type: string) => void;
  header?: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
}

const ExploreWorkspace: FC<ExploreWorkspaceProps> = (props) => {
  const {
    header = null,
    subTitle = "Explore",
    source: dataSource,
    dataSources,
    meta,
    metaError,
    exploration,
    rawSql,
    dataSet,
    runQuery = () => {},
    onOpenModal = () => {},
    loading = false,
    metaLoading = false,
    params: { screenshotMode } = {},
    icon,
  } = props;

  const selector = screenshotMode
    ? document.querySelector(".ant-layout-content")
    : document.querySelector("#data-view");

  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const { size } = useDimensions(selector);
  const width = size?.width;

  const {
    selectedQueryMembers = {},
    availableQueryMembers = {},
    state: explorationState,
    analyticsQuery: {
      state: playgroundState,
      updateMember,
      isQueryChanged,
      setLimit,
      setOffset,
      setPage,
      setOrderBy,
    },
    settings,
    dispatchSettings,
  } = usePlayground({
    exploration,
    meta,
    rawSql,
    dataSet,
  });

  const explorationRowId = useMemo(() => exploration?.id, [exploration]);

  const { collapseState, state, onToggleSection } = useExploreWorkspace({
    selectedQueryMembers,
  });

  const tableHeight = useMemo(
    () => DEFAULT_ROW_HEIGHT * explorationState.rows.length + 30,
    [explorationState.rows.length]
  );

  const onRunQuery = useCallback(
    (e?: Event) => {
      const curExplorationState = pickKeys(queryStateKeys, playgroundState);
      runQuery(curExplorationState, settings);

      e?.preventDefault();
      e?.stopPropagation();
    },
    [playgroundState, runQuery, settings]
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

  if (Object.keys(dataSource || {}).length && !availableQueryMembers) {
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
      onOpenModal={onOpenModal}
      disabled={!isQueryChanged}
      state={state}
      loading={loading}
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
      <Spin spinning={metaLoading} wrapperClassName={styles.spinWrapper}>
        <ExploreCubes
          availableQueryMembers={availableQueryMembers}
          selectedQueryMembers={selectedQueryMembers}
          onMemberSelect={updateMember}
          metaError={metaError}
        />
      </Spin>
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

  const Layout =
    cubesFallback || !!!dataSources?.length ? AppLayout : SidebarLayout;

  return (
    <Layout
      title={dataSource?.name || "Explore"}
      divider={!dataSources?.length}
      subTitle={subTitle}
      items={sidebar}
      icon={icon}
      burgerTitle={subTitle as any}
    >
      {!!dataSources?.length ? (
        <div id="data-view" className={styles.dataView}>
          {dataSection} {filtersSection}
        </div>
      ) : (
        <NoDataSource
          onConnect={() => setLocation(withAuthPrefix("/settings/sources/new"))}
        />
      )}
    </Layout>
  );
};

export default ExploreWorkspace;
