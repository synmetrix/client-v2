import { useCallback, useReducer } from "react";
import { set } from "unchanged";

import type { Reducer } from "react";

interface State {
  tabs: Set<string>;
  activeTab: string | null;
}

interface OpenAction {
  type: "open";
  data: string;
}

interface ChangeTabAction {
  type: "changeTab";
  id: string;
}

interface ChangeAction {
  type: "change";
  id: string;
  value: string;
}

interface CloseAction {
  type: "close";
  id: string;
  fallbackId?: string;
}

interface ReplaceAction {
  type: "replace";
  value: Record<string, string>;
}

type Action =
  | OpenAction
  | ChangeTabAction
  | ChangeAction
  | CloseAction
  | ReplaceAction;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "open":
      return {
        ...state,
        activeTab: action.data,
        tabs: new Set([...state.tabs, action.data]),
      } as State;

    case "changeTab":
      return set("activeTab", action.id, state) as State;

    case "close": {
      const tabs = Array.from(state.tabs).filter((t) => t !== action.id);
      const activeTab =
        action.id === state.activeTab ? action.fallbackId : state.activeTab;

      return { tabs: new Set(tabs), activeTab } as State;
    }

    case "replace":
      return set("tabs", action.value, state) as State;

    default:
      return state as State;
  }
};

const initialState = {
  tabs: new Set([]),
  activeTab: null,
};

export default (defaultState: Partial<State> = {}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...defaultState,
  });

  const openTab = useCallback(
    (data: string) => dispatch({ type: "open", data }),
    [dispatch]
  );
  const closeTab = useCallback(
    (id: string, fallbackId?: string) =>
      dispatch({ type: "close", id, fallbackId }),
    [dispatch]
  );
  const changeActiveTab = useCallback(
    (id: string) => dispatch({ type: "changeTab", id }),
    [dispatch]
  );

  return {
    state,
    openTab,
    closeTab,
    changeActiveTab,
  };
};
