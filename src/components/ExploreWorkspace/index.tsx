import ExploreDataSection from "@/components/ExploreDataSection";
import ErrorFound from "@/components/ErrorFound";
import usePlayground from "@/hooks/usePlayground";
import usePermissions from "@/hooks/usePermissions";
import useExploreWorkspace from "@/hooks/useExploreWorkspace";
import useDimensions from "@/hooks/useDimensions";
import { dataSectionProps } from "@/mocks/explore";

import type { FC } from "react";

const DEFAULT_ACTIVE_TAB = 0;

const DEFAULT_ROW_HEIGHT = 20;

interface ExploreWorkSpaceProps {}

const ExploreWorkSpace: FC<any> = (props) => {
  const {
    header,
    source: dataSource,
    meta,
    params: { explorationId, tabId, chartId, screenshotMode },
  } = props;

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
  });

  const explorationRowId = useMemo(() => exploration?.id, [exploration]);

  const { collapseState, state, onDataSectionChange, onToggleSection } =
    useExploreWorkspace({ selectedQueryMembers });

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

  return (
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
};

export default ExploreWorkSpace;
