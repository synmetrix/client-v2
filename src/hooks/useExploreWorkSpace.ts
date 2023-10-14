import { useMemo, useCallback, useEffect } from "react";
import { getOr } from "unchanged";
import { useSetState } from "ahooks";

import useCollapse from "@/hooks/useCollapse";
import type { CubeMember } from "@/types/cube";

import type { ChangeEvent } from "react";

const FILTERS_SEC = "filtersSec";
const DATA_SEC = "dataSec";
const MODEL_SEC = "modelingSec";
const ENRICHMENT_SEC = "enrichmentSec";

const defaultSections = [FILTERS_SEC, DATA_SEC, MODEL_SEC];

interface Props {
  selectedQueryMembers: Record<string, CubeMember[]>;
}

export interface ExploreWorkspaceState {
  modelingSection: string;
  dataSection: string;
  filtersCount: number;
  experimentsCount: number;
}

export default ({ selectedQueryMembers }: Props) => {
  const {
    state: collapseState,
    setActiveKeys,
    getSectionIndex,
    onToggleSection,
  } = useCollapse([]);

  const [state, updateState] = useSetState({
    modelingSection: "modelDefinition",
    dataSection: "results",
    filtersCount: 0,
    experimentsCount: 0,
  });

  const filtersCount = useMemo(
    () => getOr([], "filters", selectedQueryMembers).length,
    [selectedQueryMembers]
  );

  useEffect(() => {
    if (!collapseState.activePanelKey.length) {
      const activePanelKey = (state.filtersCount > 0 && defaultSections) || [
        DATA_SEC,
        MODEL_SEC,
        ENRICHMENT_SEC,
      ];

      setActiveKeys(activePanelKey);
    }
  });

  useEffect(
    () =>
      updateState((prev) => {
        const { filtersCount: prevFiltersCount } = prev;

        if (prevFiltersCount !== filtersCount) {
          const pos = getSectionIndex(FILTERS_SEC);
          if (pos === -1 && filtersCount > 0) {
            onToggleSection(FILTERS_SEC);
          }

          if (pos > -1 && filtersCount === 0 && prevFiltersCount > 0) {
            onToggleSection(FILTERS_SEC);
          }

          return {
            ...prev,
            filtersCount,
          };
        }

        return prev;
      }),
    [filtersCount, getSectionIndex, onToggleSection, updateState]
  );

  const onDataSectionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      updateState({ dataSection: value });
    },
    [updateState]
  );

  const onModelingSectionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      updateState({ modelingSection: value });
    },
    [updateState]
  );

  const incExperimentsCnt = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      experimentsCount: (prev.experimentsCount || 0) + 1,
    }));
  }, [updateState]);

  return {
    collapseState,
    state,
    updateState,
    incExperimentsCnt,
    onToggleSection,
    onDataSectionChange,
    onModelingSectionChange,
  };
};
