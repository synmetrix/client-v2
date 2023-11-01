import { useCallback } from "react";

import useLocation from "@/hooks/useLocation";
import useTabs from "@/hooks/useTabs";
import useAppSettings from "@/hooks/useAppSettings";
import type { AllDataSchemasQuery } from "@/graphql/generated";

interface Props {
  dataSourceId: string;
}

export default ({ dataSourceId }: Props) => {
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
    (activeKey: string) => {
      const basePath = [withAuthPrefix("/models"), dataSourceId, activeKey]
        .filter((v) => !!v)
        .join("/");

      if (location.pathname !== basePath) {
        setLocation(basePath);
      }
    },
    [withAuthPrefix, dataSourceId, location.pathname, setLocation]
  );

  const openSchema = useCallback(
    (
      schema: AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"][number],
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

        if (!anyOtherTab) return;

        const anyOtherTabName = tabsState.tabs[anyOtherTab] || defaultTabId;

        // if we're closing the active tab and there are any other tabs
        if (activeTab === id) {
          changeActiveTab(anyOtherTabName);

          // if other tab is not the default one then open it
          if (anyOtherTabName !== defaultTabId) {
            openSchema({
              id: anyOtherTab,
              name: anyOtherTabName,
            } as AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"][number]);
            // else change path only
          } else {
            changePath(anyOtherTabName);
          }
          // else move to active
        } else {
          if (activeTab) {
            const activeTabName = tabsState.tabs[activeTab];
            changePath(activeTabName);
          }
        }
      }
    },
    [changeActiveTab, changePath, closeTab, openSchema, tabsState]
  );

  return {
    openSchema,
    openedTabs: tabsState.tabs,
    activeTab: tabsState.activeTab,
    changeActiveTab,
    getTabId,
    editTab,
    closeTab,
    openTab,
  };
};
