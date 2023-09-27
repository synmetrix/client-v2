import { useEffect, useCallback } from "react";
import { add, remove } from "unchanged";
import { useSetState } from "ahooks";

export default (activePanelKey: string[] = []) => {
  const [state, updateState] = useSetState({
    activePanelKey,
  });

  useEffect(() => {
    if (activePanelKey.length) {
      updateState({ activePanelKey });
    }
  }, [activePanelKey, updateState]);

  const getSectionIndex = useCallback(
    (key: string) => state.activePanelKey.indexOf(key),
    [state.activePanelKey]
  );

  const setActiveKeys = useCallback(
    (keys: string[]) => {
      const uniqKeys = [...new Set(keys)];
      updateState({ activePanelKey: uniqKeys });
    },
    [updateState]
  );

  const onToggleSection = useCallback(
    (key: string) => {
      let keys: any = [];

      const strKey = key.toString();
      const pos = getSectionIndex(strKey);

      if (pos === -1) {
        keys = add([], strKey, state.activePanelKey);
      } else {
        keys = remove(pos, state.activePanelKey);
      }

      setActiveKeys(keys);
    },
    [getSectionIndex, setActiveKeys, state.activePanelKey]
  );

  return {
    state,
    updateState,
    getSectionIndex,
    onToggleSection,
    setActiveKeys,
  };
};
