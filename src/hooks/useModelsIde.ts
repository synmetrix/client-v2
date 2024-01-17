import { useCallback } from "react";

import useLocation from "@/hooks/useLocation";
import useTabs from "@/hooks/useTabs";
import { MODELS } from "@/utils/constants/paths";

interface Props {
  dataSourceId: string;
  branchId?: string;
}

interface Tab {
  name: string;
  id: string;
}

export default ({ dataSourceId, branchId }: Props) => {
  const [location, setLocation] = useLocation();
  const defaultTabId = "sqlrunner";

  const {
    state: tabsState,
    openTab,
    closeTab,
    changeActiveTab,
    reset,
  } = useTabs({ defaultTab: defaultTabId });

  const changePath = useCallback(
    (activeKey?: string) => {
      const basePath = [MODELS, dataSourceId, branchId, activeKey]
        .filter((v) => !!v)
        .join("/");

      if (location.pathname !== basePath) {
        setLocation(basePath);
      }
    },
    [dataSourceId, branchId, location.pathname, setLocation]
  );

  const changeTab = useCallback(
    (dataschema?: Tab) => {
      changePath(dataschema?.name || "sqlrunner");
      changeActiveTab(dataschema?.name || "sqlrunner");
    },
    [changeActiveTab, changePath]
  );

  const openSchema = useCallback(
    (name: string, hash?: string) => {
      openTab(name);

      changePath(name);

      if (hash) {
        window.location.hash = hash;
      }
    },
    [changePath, openTab]
  );

  const getTabId = (schema: { id: string }) => schema && schema.id;

  const editTab = useCallback(
    (id: string, action: string) => {
      if (action === "remove") {
        const { activeTab, tabs: tabsSet } = tabsState;
        const tabs = Array.from(tabsSet);
        const tabIdx = tabs.indexOf(id);
        closeTab(id);

        const anyOtherTabIdx = tabIdx > 1 ? tabIdx - 1 : tabIdx + 1;
        const anyOtherTabName = tabs[anyOtherTabIdx] || defaultTabId;

        // if we're closing the active tab and there are any other tabs
        if (activeTab === id && anyOtherTabName) {
          changeActiveTab(anyOtherTabName);

          // if other tab is not the default one then open it
          if (anyOtherTabName !== defaultTabId) {
            openSchema(anyOtherTabName);
            // else change path only
          } else {
            changePath(anyOtherTabName);
          }
          // else move to active
        } else {
          const activeTabName = activeTab ? activeTab : undefined;
          changePath(activeTabName);
        }
      }
    },
    [changeActiveTab, changePath, closeTab, openSchema, tabsState]
  );

  const resetTabs = useCallback(() => {
    reset({ activeTab: defaultTabId });
  }, [reset]);

  return {
    openSchema,
    openedTabs: tabsState.tabs,
    activeTab: tabsState.activeTab,
    changeActiveTab: changeTab,
    getTabId,
    editTab,
    closeTab,
    openTab,
    resetTabs,
    tabsState,
  };
};
