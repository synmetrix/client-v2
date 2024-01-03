import { Spin } from "antd";

import SidebarLayout from "@/layouts/SidebarLayout";
import ExploreDataSection from "@/components/ExploreDataSection";
import ErrorFound from "@/components/ErrorFound";
import ExploreCubes from "@/components/ExploreCubes";
import usePlayground, { queryStateKeys } from "@/hooks/usePlayground";
import useExploreWorkspace from "@/hooks/useExploreWorkspace";
import useDimensions from "@/hooks/useDimensions";
import useLocation from "@/hooks/useLocation";
import ExploreFiltersSection from "@/components/ExploreFiltersSection";
import AppLayout from "@/layouts/AppLayout";
import pickKeys from "@/utils/helpers/pickKeys";
import useAppSettings from "@/hooks/useAppSettings";
import type { DataSourceInfo } from "@/types/dataSource";
import type { QuerySettings } from "@/types/querySettings";
import type { ExplorationData, RawSql } from "@/types/exploration";
import type { Meta } from "@/types/cube";
import { SOURCES } from "@/utils/constants/paths";

import NoDataSource from "../NoDataSource";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

const DEFAULT_ROW_HEIGHT = 36;
const DEFAULT_HEADER_HEIGHT = 36;

interface ExploreWorkspaceProps {
  loading: boolean;
  meta: Meta;
  source?: DataSourceInfo;
  dataSources?: DataSourceInfo[];
  explorationData?: ExplorationData;
  rawSql?: RawSql;
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
    explorationData,
    rawSql,
    runQuery = () => {},
    onOpenModal = () => {},
    loading = false,
    icon,
  } = props;

  const [location, setLocation] = useLocation();
  const { screenshotMode } = location?.query || {};
  const isScreenshotMode = screenshotMode !== undefined;
  const selector = isScreenshotMode
    ? document.querySelector(".ant-layout-content")
    : document.querySelector("#data-view");

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
    explorationData,
    meta: meta.data,
    rawSql,
  });

  const { collapseState, state, onToggleSection } = useExploreWorkspace({
    selectedQueryMembers,
  });

  const tableHeight = useMemo(
    () =>
      DEFAULT_ROW_HEIGHT * explorationState.rows.length + DEFAULT_HEADER_HEIGHT,
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

  if (Object.keys(dataSource || {}).length && !availableQueryMembers) {
    return <ErrorFound status={500} />;
  }

  const dataSection = (
    <ExploreDataSection
      key="dataSec"
      width={width}
      height={isScreenshotMode ? tableHeight : 450}
      selectedQueryMembers={selectedQueryMembers}
      onExec={onRunQuery}
      onQueryChange={onQueryChange}
      onOpenModal={onOpenModal}
      disabled={!isQueryChanged}
      state={state}
      loading={loading}
      queryState={explorationState}
      disableButtons={!explorationData?.exploration?.id}
      screenshotMode={isScreenshotMode}
      rowHeight={DEFAULT_ROW_HEIGHT}
      onToggleSection={onToggleSection}
      onSectionChange={(e) => onToggleSection(e.target.value)}
      isActive={collapseState.activePanelKey.includes("dataSec")}
    />
  );

  if (isScreenshotMode) {
    return dataSection;
  }

  const sidebar = (
    <>
      {header}
      <Spin spinning={meta.loading} wrapperClassName={styles.spinWrapper}>
        <ExploreCubes
          availableQueryMembers={availableQueryMembers}
          selectedQueryMembers={selectedQueryMembers}
          onMemberSelect={updateMember}
          error={meta.error}
        />
      </Spin>
    </>
  );

  const Layout = !!!dataSources?.length ? AppLayout : SidebarLayout;
  const showFiltersSection = !!state.filtersCount;

  return (
    <Layout
      title={dataSource?.name || "Explore"}
      divider
      subTitle={subTitle}
      items={sidebar}
      icon={icon}
      burgerTitle={subTitle as any}
    >
      {!!dataSources?.length ? (
        <div id="data-view">
          {dataSection}

          {showFiltersSection && (
            <ExploreFiltersSection
              key="filtersSec"
              availableQueryMembers={availableQueryMembers}
              selectedQueryMembers={selectedQueryMembers}
              onToggleSection={onToggleSection}
              onMemberChange={updateMember}
              state={state}
              isActive={collapseState.activePanelKey.includes("filtersSec")}
            />
          )}
        </div>
      ) : (
        <NoDataSource
          onConnect={() => setLocation(withAuthPrefix(`${SOURCES}/new`))}
        />
      )}
    </Layout>
  );
};

export default ExploreWorkspace;
