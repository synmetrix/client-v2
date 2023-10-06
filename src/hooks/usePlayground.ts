import { useMemo, useCallback, useState, useEffect, useReducer } from "react";
import { useDeepCompareEffect } from "ahooks";

import useLocation from "@/hooks/useLocation";
import useAppSettings from "@/hooks/useAppSettings";
import useDataSourceMeta from "@/hooks/useDataSourcesMeta";
import useAnalyticsQuery, {
  queryState,
  initialState,
} from "@/hooks/useAnalyticsQuery";
import useExplorationData from "@/hooks/useExplorationData";
import trackEvent from "@/utils/helpers/trackEvent";
import pickKeys from "@/utils/helpers/pickKeys";
import equals from "@/utils/helpers/equals";
import type { CubeMember, CubeMembers } from "@/types/cube";
import { exploreMock } from "@/mocks/explore";
import { getTitle } from "@/utils/helpers/getTitles";
import type { SortBy } from "@/types/sort";
import type { LoadingProgress } from "@/types/loading";
import type { QuerySettings } from "@/types/querySettings";

import type { Reducer } from "react";

const queryStateKeys = Object.keys(queryState);

const initialSettings: QuerySettings = {
  hideCubeNames: false,
  hideIndexColumn: false,
};

interface UpdateAction {
  type: "update";
  value: QuerySettings;
}

interface HideCubeNamesAction {
  type: "hideCubeNames";
  value: boolean;
}

interface HideIndexAction {
  type: "hideIndexColumn";
  value: boolean;
}

type Action = UpdateAction | HideCubeNamesAction | HideIndexAction;

const reducer: Reducer<QuerySettings, Action> = (
  state,
  action
): QuerySettings => {
  if (action.type === "hideCubeNames") {
    return {
      ...state,
      hideCubeNames: action.value,
    };
  }
  if (action.type === "hideIndexColumn") {
    return {
      ...state,
      hideIndexColumn: action.value,
    };
  }
  if (action.type === "update") {
    return action.value;
  }

  return state;
};

export const getColumns = (selectedQueryMembers: CubeMembers, settings = {}) =>
  [
    ...Object.values(selectedQueryMembers.dimensions || {}).map((d) => ({
      ...d,
      name: d.granularity ? `${d.dimension}.${d.granularity}` : d.name,
    })),
    ...Object.values(selectedQueryMembers.measures || {}),
  ].map((c) => ({
    id: c.name,
    Header: getTitle(settings, c),
    accessor: (row: any) => row[c.name],
    colId: c.name,
    type: c.type,
  }));

interface Props {
  dataSourceId: string;
  editId: string;
  meta?: Record<string, any>[];
  rowsLimit?: number;
  offset?: number;
}

export interface PlaygroundState {
  dimensions?: CubeMember[];
  filters?: string[];
  limit?: number;
  measures?: CubeMember[];
  offset?: number;
  order?: SortBy[];
  page?: number;
  segments?: CubeMember[];
  timeDimensions?: { dimension: string; granularity: string }[];
  timezone?: string;
}

export interface ExplorationState extends PlaygroundState {
  modelingSection?: string;
  rows: object[];
  columns: object[];
  settings: QuerySettings;
  loading: boolean;
  progress: LoadingProgress;
  skippedMembers?: string[];
  error?: boolean;
  hitLimit?: number;
  limit?: number;
  rawSql?: { params: any[]; preAggregations: any[]; sql: string };
}

export default ({
  dataSourceId,
  meta = [],
  editId,
}: // rowsLimit,
// offset,
Props) => {
  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const [settings, dispatchSettings] = useReducer(reducer, initialSettings);

  // const {
  //   current,
  //   currentProgress,
  //   queries: { currentData, execQueryCurrent },
  //   mutations: {
  //     createMutation,
  //     execCreateMutation,
  //     genSqlMutation,
  //     execGenSqlMutation,
  //   },
  // } = useExplorations({
  //   params: {
  //     editId,
  //     rowsLimit,
  //     offset,
  //   },
  //   pauseQueryAll: true,
  // });

  const current = exploreMock.exploration.data.explorations_by_pk;
  const currentData = exploreMock.exploration;
  const genSqlMutation = exploreMock.sql;
  const createMutation = exploreMock.exploration;
  //TODO use mutation
  const execQueryCurrent = (arg: any) => {};
  const execCreateMutation = (arg: any) => {};
  const execGenSqlMutation = (arg: any) => {};

  useEffect(() => {
    if (editId) {
      execGenSqlMutation({ exploration_id: editId });
    }
  }, [editId, execGenSqlMutation]);

  // const {
  //   current,
  //   currentProgress,
  //   queries: {
  //     currentData,
  //     execQueryCurrent,
  //   },
  //   mutations: {
  //     createMutation,
  //     execCreateMutation,
  //     genSqlMutation,
  //     execGenSqlMutation,
  //   }
  // } = useExplorations({
  //   params: {
  //     editId,
  //     rowsLimit,
  //     offset,
  //   },
  //   pauseQueryAll: true,
  // });

  // useEffect(() => {
  //   if (editId) {
  //     execGenSqlMutation({ exploration_id: editId });
  //   }
  // }, [editId, execGenSqlMutation]);

  const playgroundSettings = useMemo(
    () => current.playground_settings || {},
    [current]
  );

  useDeepCompareEffect(() => {
    dispatchSettings({
      type: "update",
      value: playgroundSettings as QuerySettings,
    });
  }, [playgroundSettings]);

  const {
    state: currPlaygroundState,
    dispatch,
    updateMember,
    setLimit,
    setOffset,
    setPage,
    setOrderBy,
    doReset,
  } = useAnalyticsQuery();

  const { selectedQueryMembers, availableQueryMembers } = useDataSourceMeta({
    meta,
    playgroundState: currPlaygroundState,
  });

  const { rows, hitLimit, skippedMembers } = useExplorationData({
    explorationResult: currentData.data?.fetch_dataset,
  });

  const columns: object[] = useMemo(() => {
    if (!selectedQueryMembers) {
      return [];
    }

    return getColumns(selectedQueryMembers, settings);
  }, [selectedQueryMembers, settings]);

  const explorationState: ExplorationState = useMemo(
    () => ({
      loading: false,
      progress: {},
      hitLimit,
      columns,
      rows,
      ...currPlaygroundState,
      rawSql: genSqlMutation.data.gen_sql.result,
      skippedMembers,
      settings,
    }),
    [
      genSqlMutation.data,
      hitLimit,
      columns,
      rows,
      currPlaygroundState,
      skippedMembers,
      settings,
    ]
  );

  const [isQueryChanged, setChangedStatus] = useState(false);

  useEffect(() => {
    const { playground_state: playgroundState = queryState } = current;

    const isChanged = !equals(
      pickKeys(queryStateKeys, playgroundState),
      pickKeys(queryStateKeys, currPlaygroundState)
    );

    if (isQueryChanged !== isChanged) {
      setChangedStatus(isChanged);
    }
  }, [isQueryChanged, currPlaygroundState, current]);

  useEffect(() => {
    const newState = current.playground_state;

    if (newState) {
      doReset(newState as unknown as PlaygroundState);
    }
  }, [current.playground_state, doReset]);

  useEffect(() => {
    if (!editId) {
      doReset(initialState);
    }
  }, [editId, doReset]);

  const runQuery = useCallback(() => {
    trackEvent("Run Query");

    const explorationQueryState = pickKeys(queryStateKeys, currPlaygroundState);
    const newExplorationObj = {
      datasource_id: dataSourceId,
      playground_state: explorationQueryState,
      playground_settings: settings,
    };

    return execCreateMutation({ object: newExplorationObj });
  }, [currPlaygroundState, dataSourceId, settings]);

  const reset = useCallback(
    (explorationId: string) =>
      setLocation(withAuthPrefix(`/explore/${dataSourceId}/${explorationId}`)),
    [dataSourceId, setLocation, withAuthPrefix]
  );

  useEffect(() => {
    if (createMutation.data) {
      reset(createMutation.data?.insert_explorations_one?.id);
      // createMutation.data = null as any;
    }
  }, [createMutation, reset]);

  return {
    state: explorationState,
    exploration: current,
    explorationLoading: currentData.fetching,
    loadExploration: execQueryCurrent,
    selectedQueryMembers,
    availableQueryMembers,
    analyticsQuery: {
      state: currPlaygroundState,
      dispatch,
      updateMember,
      isQueryChanged,
      runQuery,
      setLimit,
      setOffset,
      setPage,
      setOrderBy,
    },
    dispatchSettings,
  };
};
