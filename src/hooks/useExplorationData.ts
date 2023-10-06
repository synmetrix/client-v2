import { useMemo } from "react";
import { getOr } from "unchanged";

export default ({
  explorationResult,
}: any): {
  rows: object[];
  hitLimit: boolean;
  skippedMembers: string[];
} => {
  return useMemo(() => {
    const rows = getOr([], "data", explorationResult);
    const hitLimit = getOr(false, "hitLimit", explorationResult);
    const skippedMembers = getOr(
      [],
      "annotation.skippedMembers",
      explorationResult
    );

    return {
      rows,
      hitLimit,
      skippedMembers,
    };
  }, [explorationResult]);
};
