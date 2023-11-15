import { Spin } from "antd";
import { useTrackedEffect } from "ahooks";

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
import equals from "@/utils/helpers/equals";
import useAppSettings from "@/hooks/useAppSettings";
import type { DataSourceInfo } from "@/types/dataSource";
import type { QuerySettings } from "@/types/querySettings";
import type {
  Exploration,
  RawSql,
  DataSchemaValidation,
} from "@/types/exploration";

import NoDataSource from "../NoDataSource";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

const DEFAULT_ROW_HEIGHT = 20;

interface ExploreProps {
  loading: boolean;
  meta: Record<string, any>[];
  metaLoading?: boolean;
  params: {
    screenshotMode: boolean;
  };
  source?: DataSourceInfo;
  dataSources?: DataSourceInfo[];
  exploration?: Exploration;
  rawSql?: RawSql;
  dataSet: any;
  dataSchemaValidation?: DataSchemaValidation;
  runQuery: (state: object, settings: QuerySettings) => void;
  onOpenModal: (type: string) => void;
  header?: ReactNode;
  subTitle?: ReactNode;
}

const Explore: FC<ExploreProps> = (props) => {
  const {
    header = null,
    subTitle = <span style={{ fontSize: 20, fontWeight: 600 }}>Explore</span>,
    source: dataSource,
    meta,
    exploration,
    rawSql,
    dataSet,
    dataSchemaValidation,
    runQuery = () => {},
    onOpenModal = () => {},
    loading = false,
    metaLoading = false,
    params: { screenshotMode } = {},
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
        onRunQuery();
      }
    },
    [playgroundState?.order]
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
          dataSchemaValidation={dataSchemaValidation}
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

  const Layout = cubesFallback || !dataSource?.id ? AppLayout : SidebarLayout;

  return (
    <Layout
      title={dataSource?.name}
      divider={false}
      subTitle={subTitle}
      items={sidebar}
    >
      {dataSource?.id ? (
        <div id="data-view">
          {dataSection} {filtersSection}
        </div>
      ) : (
        <NoDataSource
          onConnect={() => setLocation(withAuthPrefix("/settings/sources"))}
        />
      )}
    </Layout>
  );
};

export default Explore;
