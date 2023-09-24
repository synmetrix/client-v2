import { useReducer, useCallback } from "react";
import { set, remove, getOr } from "unchanged";

import type { FilterMember, Metric } from "@/types/cube";

interface State {
  measure: Metric[];
  dimensions: Metric[];
  filters: FilterMember[];
  timeDimensions: Metric[];
  segments: Metric[];
  order: [];
  timezone: string;
  limit: number;
  offset: number;
  page: number;
}

const defaultFilterValues = {
  time: {
    operator: "onTheDate",
    values: "This year",
  },
  string: {
    operator: "set",
  },
  number: {
    operator: "set",
  },
};

const reducer = (state: State, action: any) => {
  let { memberType } = action;

  if (action.type === "add") {
    let { value } = action;

    if (memberType !== "filters") {
      const [memberName, granularity = null] = action?.value?.split(
        /\+/
      ) as string[];

      if (granularity) {
        memberType = "timeDimensions";
        value = {
          dimension: memberName,
          granularity,
        };
      }

      const slice = state[memberType as keyof State] as Metric[];

      const isMemberExists = !!slice.find(
        (member) =>
          member.dimension?.name === memberName &&
          member.granularity === granularity
      );

      if (isMemberExists) {
        return state;
      }
    } else {
      value = {
        ...action.value,
        ...defaultFilterValues[
          action.operatorType as keyof typeof defaultFilterValues
        ],
      };
    }

    const elementsCount = getOr([], memberType, state).length;

    return set([memberType, elementsCount], value, state);
  }

  if (action.type === "update") {
    return set([action.memberType, action.index], action.newValue, state);
  }

  if (action.type === "setLimit") {
    return {
      ...state,
      limit: parseInt(action.rowsLimit, 10),
    };
  }
  if (action.type === "setOffset") {
    return {
      ...state,
      offset: parseInt(action.value, 10),
    };
  }
  if (action.type === "setPage") {
    return {
      ...state,
      page: parseInt(action.value, 10),
    };
  }
  if (action.type === "setOrder") {
    const { value } = action;

    return set("order", value, state);
  }

  if (action.type === "remove") {
    let { index } = action;
    const { value } = action;

    if (memberType !== "filters") {
      const [memberName, granularity = null] = value?.split(/\+/);

      if (granularity) {
        memberType = "timeDimensions";
        const slice = state[memberType as keyof State] as Metric[];

        index = slice.findIndex(
          (member) =>
            member.dimension === memberName &&
            member.granularity === granularity
        );
      }
    }

    return remove([memberType, index], state);
  }

  if (action.type === "reset") {
    return action.newState;
  }

  throw new Error(`Unknown action ${action.type}.`);
};

const queryBaseMembers = {
  measures: [],
  dimensions: [],
  filters: [],
  timeDimensions: [],
  segments: [],
};

export const queryState = {
  ...queryBaseMembers,
  order: [],
  timezone: "UTC",
  limit: 1000,
  offset: 0,
  page: 0,
};

export const initialState = {
  ...queryState,
};

const getName = (member: { name?: string }) => member.name;

const getOperatorType = (member: Metric) => getOr("", "dimension.type", member);

const useAnalyticsQuery = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateMember = useCallback(
    (memberType: string, toQuery = getName) => ({
      add: (member: Metric) =>
        dispatch({
          type: "add",
          memberType,
          value: toQuery(member),
          operatorType: getOperatorType(member),
        }),
      remove: (member: Metric | FilterMember) =>
        dispatch({
          type: "remove",
          memberType,
          value: toQuery(member as Metric),
          index: (member as FilterMember).index,
        }),
      update: (member: Metric | FilterMember, newValue: any) =>
        dispatch({
          type: "update",
          memberType,
          index: (member as FilterMember).index,
          newValue: toQuery(newValue),
        }),
    }),
    [dispatch]
  );

  const setLimit = useCallback(
    (rowsLimit: string | number) => dispatch({ type: "setLimit", rowsLimit }),
    [dispatch]
  );
  const setOffset = useCallback(
    (value: string | number) => dispatch({ type: "setOffset", value }),
    [dispatch]
  );
  const setPage = useCallback(
    (value: string | number) => dispatch({ type: "setPage", value }),
    [dispatch]
  );
  const setOrderBy = useCallback(
    (value: string) => dispatch({ type: "setOrder", value }),
    [dispatch]
  );
  const doReset = useCallback(
    (newState: State) => dispatch({ type: "reset", newState }),
    [dispatch]
  );

  return {
    state,
    dispatch,
    updateMember,
    setLimit,
    setOffset,
    setPage,
    setOrderBy,
    doReset,
  };
};

export default useAnalyticsQuery;
