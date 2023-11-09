import { useCallback, useReducer } from "react";
import { set, remove } from "unchanged";

import type { Reducer } from "react";

interface State {
  tabs: Record<string, string>;
  activeTab: string | null;
}

interface OpenAction {
  type: "open";
  data: {
    id: string;
    name: string;
  };
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
        activeTab: action.data.id,
        tabs: { ...state.tabs, [action.data.id]: action.data.name },
      } as State;

    case "changeTab":
      return set("activeTab", action.id, state) as State;

    case "change":
      return set(["tabs", action.id], action.value, state) as State;

    case "close": {
      const tabs = remove(action.id, state.tabs);
      const activeTab =
        action.id === state.activeTab ? action.fallbackId : state.activeTab;

      return { tabs, activeTab } as State;
    }

    case "replace":
      return set("tabs", action.value, state) as State;

    default:
      return state as State;
  }
};

const initialState = {
  tabs: {},
  activeTab: null,
};

export default (defaultState = {}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...defaultState,
  });

  const openTab = useCallback(
    (data: { id: string; name: string }) => dispatch({ type: "open", data }),
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
  const replaceTabs = useCallback(
    (tabs: Record<string, string>) =>
      dispatch({ type: "replace", value: tabs }),
    [dispatch]
  );

  return {
    state,
    openTab,
    closeTab,
    changeActiveTab,
    replaceTabs,
  };
};
