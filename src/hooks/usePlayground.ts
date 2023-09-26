// //@ts-nocheck
// import { useMemo, useCallback, useState, useEffect, useReducer } from "react";

// import useExplorationData from "@/hooks/useExplorationData";
// import useLocation from "@/hooks/useLocation";
// import useAppSettings from "@/hooks/useAppSettings";
// import useExplorations from "@/hooks/useExplorations";
// import useDataSourceMeta from "@/hooks/useDataSourceMeta";
// import useAnalyticsQuery, {
//   queryState,
//   initialState,
// } from "@/hooks/useAnalyticsQuery";
// import useDeepCompareEffect from "@/hooks/useDeepCompareEffect";
// import trackEvent from "@/utils/helpers/trackEvent";
// import pickKeys from "@/utils/helpers/pickKeys";
// import equals from "@/utils/helpers/equals";
// import { Cube, FilterMember, CubeMember } from "@/types/cube";

// const queryStateKeys = Object.keys(queryState);

// interface State {
//   hideCubeNamse: string[] | false;
//   hideIndexCoumn: boolean;
// }

// interface Action {
//   type: "hideCubeNames" | "hideIndexColumn" | "update";
//   payload: string[] | string | State | boolean;
// }

// const initialSettings = {
//   hideCubeNames: false,
//   hideIndexColumn: false,
// };

// const reducer = (state: State, action) => {
//   if (action.type === "hideCubeNames") {
//     return {
//       ...state,
//       hideCubeNames: action.payload,
//     };
//   }
//   if (action.type === "hideIndexColumn") {
//     return {
//       ...state,
//       hideIndexColumn: action.payload,
//     };
//   }
//   if (action.type === "update") {
//     return action.payload;
//   }

//   throw new Error(`Unknown action ${action.type}.`);
// };

// export const getTitle = (
//   settings: { hideCubeNames?: boolean },
//   column: { shortTitle: string; title: string }
// ) => (settings.hideCubeNames ? column.shortTitle : column.title);

// export const getColumns = (
//   selectedQueryMembers: {
//     measures: any;
//     dimensions: any;
//     segments: any;
//     timeDimensions: CubeMember[];
//     filters: FilterMember;
//   },
//   settings = {}
// ) =>
//   [
//     ...Object.values(selectedQueryMembers.dimensions || {}).map((d: any) => ({
//       ...d,
//       name: d.granularity ? `${d.dimension}.${d.granularity}` : d.name,
//     })),
//     ...Object.values(selectedQueryMembers.measures || {}),
//   ].map((c) => ({
//     id: c.name,
//     Header: getTitle(settings, c),
//     accessor: (row: Cube) => row[c.name as keyof Cube],
//     colId: c.name,
//     type: c.type,
//   }));

// interface Props {
//   dataSourceId: string;
//   meta: [];
//   editId: string;
//   rowsLimit: number;
//   offset: number;
// }
// export default ({
//   dataSourceId,
//   meta = [],
//   editId,
//   rowsLimit,
//   offset,
// }: Props) => {
//   const [, setLocation] = useLocation();
//   const { withAuthPrefix } = useAppSettings();
//   const [settings, dispatchSettings] = useReducer(reducer, initialSettings);

//   const {
//     current,
//     currentProgress,
//     queries: { currentData, execQueryCurrent },
//     mutations: {
//       createMutation,
//       execCreateMutation,
//       genSqlMutation,
//       execGenSqlMutation,
//     },
//   } = useExplorations({
//     params: {
//       editId,
//       rowsLimit,
//       offset,
//     },
//     pauseQueryAll: true,
//   });

//   useEffect(() => {
//     if (editId) {
//       execGenSqlMutation({ exploration_id: editId });
//     }
//   }, [editId, execGenSqlMutation]);

//   const playgroundSettings = useMemo(
//     () => current.playground_settings || {},
//     [current]
//   );

//   useDeepCompareEffect(() => {
//     dispatchSettings({ type: "update", value: playgroundSettings });
//   }, [playgroundSettings]);

//   const {
//     state: currPlaygroundState,
//     dispatch,
//     updateMember,
//     setLimit,
//     setOffset,
//     setPage,
//     setOrderBy,
//     doReset,
//   } = useAnalyticsQuery();

//   const { selectedQueryMembers, availableQueryMembers } = useDataSourceMeta({
//     meta,
//     playgroundState: currPlaygroundState,
//   });

//   const { rows, hitLimit, skippedMembers } = useExplorationData({
//     explorationResult: currentData.data?.fetch_dataset,
//   });

//   const columns = useMemo(() => {
//     if (!selectedQueryMembers) {
//       return [];
//     }

//     return getColumns(selectedQueryMembers, settings);
//   }, [selectedQueryMembers, settings]);

//   const explorationState = useMemo(
//     () => ({
//       loading: currentData.fetching,
//       progress: currentProgress,
//       hitLimit,
//       columns,
//       rows,
//       ...currPlaygroundState,
//       rawSql: genSqlMutation.data?.gen_sql?.result,
//       skippedMembers,
//       settings,
//     }),
//     [
//       currentData.fetching,
//       genSqlMutation.data,
//       currentProgress,
//       hitLimit,
//       columns,
//       rows,
//       currPlaygroundState,
//       skippedMembers,
//       settings,
//     ]
//   );

//   const [isQueryChanged, setChangedStatus] = useState(false);

//   useEffect(() => {
//     const { playground_state: playgroundState = queryState } = current;

//     const isChanged = !equals(
//       pickKeys(queryStateKeys, playgroundState),
//       pickKeys(queryStateKeys, currPlaygroundState)
//     );

//     if (isQueryChanged !== isChanged) {
//       setChangedStatus(isChanged);
//     }
//   }, [isQueryChanged, currPlaygroundState, current]);

//   useEffect(() => {
//     const newState = current.playground_state;

//     if (newState) {
//       doReset(newState);
//     }
//   }, [current.playground_state, doReset]);

//   useEffect(() => {
//     if (!editId) {
//       doReset(initialState);
//     }
//   }, [editId, doReset]);

//   const runQuery = useCallback(() => {
//     trackEvent("Run Query");

//     const explorationQueryState = pickKeys(queryStateKeys, currPlaygroundState);
//     const newExplorationObj = {
//       datasource_id: dataSourceId,
//       playground_state: explorationQueryState,
//       playground_settings: settings,
//     };

//     return execCreateMutation({ object: newExplorationObj });
//   }, [currPlaygroundState, dataSourceId, execCreateMutation, settings]);

//   const reset = useCallback(
//     (explorationId: string) =>
//       setLocation(withAuthPrefix(`/explore/${dataSourceId}/${explorationId}`)),
//     [dataSourceId, setLocation, withAuthPrefix]
//   );

//   useEffect(() => {
//     if (createMutation.data) {
//       reset(createMutation.data?.insert_explorations_one?.id);
//       createMutation.data = null;
//     }
//   }, [createMutation, createMutation.data, reset]);

//   return {
//     state: explorationState,
//     exploration: current,
//     explorationLoading: currentData.fetching,
//     loadExploration: execQueryCurrent,
//     selectedQueryMembers,
//     availableQueryMembers,
//     analyticsQuery: {
//       state: currPlaygroundState,
//       dispatch,
//       updateMember,
//       isQueryChanged,
//       runQuery,
//       setLimit,
//       setOffset,
//       setPage,
//       setOrderBy,
//     },
//     dispatchSettings,
//   };
// };

//@ts-nocheck

import { useMemo, useCallback, useState, useEffect, useReducer } from "react";

import trackEvent from "@/utils/helpers/trackEvent";
import pickKeys from "@/utils/helpers/pickKeys";
import useExplorationData from "@/hooks/useExplorationData";
import useLocation from "@/hooks/useLocation";
import useAppSettings from "@/hooks/useAppSettings";
import useExplorations from "@/hooks/useExplorations";
import useDataSourceMeta from "@/hooks/useDataSourceMeta";
import useAnalyticsQuery, {
  queryState,
  initialState,
} from "@/hooks/useAnalyticsQuery";
import useDeepCompareEffect from "@/hooks/useDeepCompareEffect";
// import equals from "@/utils/helpers/equals";

const queryStateKeys = Object.keys(queryState);

const initialSettings = {
  hideCubeNames: false,
  hideIndexColumn: false,
};

const reducer = (state, action) => {
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

  throw new Error(`Unknown action ${action.type}.`);
};

export const getTitle = (settings, column) =>
  settings.hideCubeNames ? column.shortTitle : column.title;

export const getColumns = (selectedQueryMembers, settings = {}) =>
  [
    ...Object.values(selectedQueryMembers.dimensions || {}).map((d) => ({
      ...d,
      name: d.granularity ? `${d.dimension}.${d.granularity}` : d.name,
    })),
    ...Object.values(selectedQueryMembers.measures || {}),
  ].map((c) => ({
    id: c.name,
    Header: getTitle(settings, c),
    accessor: (row) => row[c.name],
    colId: c.name,
    type: c.type,
  }));

// export default ({ dataSourceId, meta = [], editId, rowsLimit, offset }) => {
//   const [, setLocation] = useLocation();
//   const { withAuthPrefix } = useAppSettings();
//   const [settings, dispatchSettings] = useReducer(reducer, initialSettings);

//   const {
//     current,
//     currentProgress,
//     queries: { currentData, execQueryCurrent },
//     mutations: {
//       createMutation,
//       execCreateMutation,
//       genSqlMutation,
//       execGenSqlMutation,
//     },
//   } = useExplorations({
//     params: {
//       editId,
//       rowsLimit,
//       offset,
//     },
//     pauseQueryAll: true,
//   });

//   useEffect(() => {
//     if (editId) {
//       execGenSqlMutation({ exploration_id: editId });
//     }
//   }, [editId, execGenSqlMutation]);

//   const playgroundSettings = useMemo(
//     () => current.playground_settings || {},
//     [current]
//   );

//   useDeepCompareEffect(() => {
//     dispatchSettings({ type: "update", value: playgroundSettings });
//   }, [playgroundSettings]);

//   const {
//     state: currPlaygroundState,
//     dispatch,
//     updateMember,
//     setLimit,
//     setOffset,
//     setPage,
//     setOrderBy,
//     doReset,
//   } = useAnalyticsQuery();

//   const { selectedQueryMembers, availableQueryMembers } = useDataSourceMeta({
//     meta,
//     playgroundState: currPlaygroundState,
//   });

//   const { rows, hitLimit, skippedMembers } = useExplorationData({
//     explorationResult: currentData.data?.fetch_dataset,
//   });

//   const columns = useMemo(() => {
//     if (!selectedQueryMembers) {
//       return [];
//     }

//     return getColumns(selectedQueryMembers, settings);
//   }, [selectedQueryMembers, settings]);

//   const explorationState = useMemo(
//     () => ({
//       loading: currentData.fetching,
//       progress: currentProgress,
//       hitLimit,
//       columns,
//       rows,
//       ...currPlaygroundState,
//       rawSql: genSqlMutation.data?.gen_sql?.result,
//       skippedMembers,
//       settings,
//     }),
//     [
//       currentData.fetching,
//       genSqlMutation.data,
//       currentProgress,
//       hitLimit,
//       columns,
//       rows,
//       currPlaygroundState,
//       skippedMembers,
//       settings,
//     ]
//   );

//   const [isQueryChanged, setChangedStatus] = useState(false);

//   useEffect(() => {
//     const { playground_state: playgroundState = queryState } = current;

//     const isChanged = !equals(
//       pickKeys(queryStateKeys, playgroundState),
//       pickKeys(queryStateKeys, currPlaygroundState)
//     );

//     if (isQueryChanged !== isChanged) {
//       setChangedStatus(isChanged);
//     }
//   }, [isQueryChanged, currPlaygroundState, current]);

//   useEffect(() => {
//     const newState = current.playground_state;

//     if (newState) {
//       doReset(newState);
//     }
//   }, [current.playground_state, doReset]);

//   useEffect(() => {
//     if (!editId) {
//       doReset(initialState);
//     }
//   }, [editId, doReset]);

//   const runQuery = useCallback(() => {
//     trackEvent("Run Query");

//     const explorationQueryState = pickKeys(queryStateKeys, currPlaygroundState);
//     const newExplorationObj = {
//       datasource_id: dataSourceId,
//       playground_state: explorationQueryState,
//       playground_settings: settings,
//     };

//     return execCreateMutation({ object: newExplorationObj });
//   }, [currPlaygroundState, dataSourceId, execCreateMutation, settings]);

//   const reset = useCallback(
//     (explorationId) =>
//       setLocation(withAuthPrefix(`/explore/${dataSourceId}/${explorationId}`)),
//     [dataSourceId, setLocation, withAuthPrefix]
//   );

//   useEffect(() => {
//     if (createMutation.data) {
//       reset(createMutation.data?.insert_explorations_one?.id);
//       createMutation.data = null;
//     }
//   }, [createMutation.data, reset]);

//   return {
//     state: explorationState,
//     exploration: current,
//     explorationLoading: currentData.fetching,
//     loadExploration: execQueryCurrent,
//     selectedQueryMembers,
//     availableQueryMembers,
//     analyticsQuery: {
//       state: currPlaygroundState,
//       dispatch,
//       updateMember,
//       isQueryChanged,
//       runQuery,
//       setLimit,
//       setOffset,
//       setPage,
//       setOrderBy,
//     },
//     dispatchSettings,
//   };
// };
