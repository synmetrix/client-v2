import { useCallback } from "react";

import useLocation from "@/hooks/useLocation";
import useTabs from "@/hooks/useTabs";
import useAppSettings from "@/hooks/useAppSettings";
import type { Dataschema } from "@/types/dataschema";

interface Props {
  dataSourceId: string;
  branchId: string;
}

export default ({ dataSourceId, branchId }: Props) => {
  const [location, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const defaultTabId = "sqlrunner";

  const {
    state: tabsState,
    openTab,
    closeTab,
    changeActiveTab,
  } = useTabs({ activeTab: defaultTabId });

  const changePath = useCallback(
    (activeKey?: string) => {
      const basePath = [
        withAuthPrefix("/models"),
        dataSourceId,
        branchId,
        activeKey,
      ]
        .filter((v) => !!v)
        .join("/");

      if (location.pathname !== basePath) {
        setLocation(basePath);
      }
    },
    [withAuthPrefix, dataSourceId, branchId, location.pathname, setLocation]
  );

  const changeTab = (dataschema?: Dataschema) => {
    changePath(dataschema?.name || "sqlrunner");
    changeActiveTab(dataschema?.id || "sqlrunner");
  };

  const openSchema = useCallback(
    (
      schema: {
        id: string;
        name: string;
      },
      hash?: string
    ) => {
      openTab(schema);
      changePath(schema.name);

      if (hash) {
        window.location.hash = hash;
      }
    },
    [openTab, changePath]
  );

  const getTabId = (schema: { id: string }) => schema && schema.id;

  const editTab = useCallback(
    (id: string, action: string) => {
      if (action === "remove") {
        const { activeTab } = tabsState;
        closeTab(id);

        const anyOtherTab = Object.keys(tabsState.tabs).find(
          (tabId) => tabId !== id
        );
        const anyOtherTabName = anyOtherTab
          ? tabsState.tabs[anyOtherTab]
          : defaultTabId;

        // if we're closing the active tab and there are any other tabs
        if (activeTab === id && anyOtherTabName) {
          changeActiveTab(anyOtherTabName);

          // if other tab is not the default one then open it
          if (anyOtherTabName !== defaultTabId) {
            openSchema({
              id: anyOtherTab!,
              name: anyOtherTabName,
            });
            // else change path only
          } else {
            changePath(anyOtherTabName);
          }
          // else move to active
        } else {
          const activeTabName = activeTab
            ? tabsState.tabs[activeTab]
            : undefined;
          changePath(activeTabName);
        }
      }
    },
    [changeActiveTab, changePath, closeTab, openSchema, tabsState]
  );

  return {
    openSchema,
    openedTabs: tabsState.tabs,
    activeTab: tabsState.activeTab,
    changeActiveTab: changeTab,
    getTabId,
    editTab,
    closeTab,
    openTab,
  };
};
