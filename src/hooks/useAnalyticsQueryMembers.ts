import { useMemo } from "react";

import { getTitle } from "@/utils/helpers/getTitles";
import type { CubeMember, CubeMembers } from "@/types/cube";
import type { QuerySettings } from "@/types/querySettings";

interface Props {
  selectedQueryMembers?: CubeMembers;
  settings?: QuerySettings;
}

const useAnalyticsQueryMembers = ({
  selectedQueryMembers,
  settings = {},
}: Props) => {
  const baseMembers = useMemo(() => {
    const {
      measures = [],
      dimensions = [],
      timeDimensions = [],
    } = selectedQueryMembers || {};
    const members = dimensions.concat(measures);

    // selectedQueryMembers contains arrays in sections, but we use Object.values just because safer
    const measuresValues = Object.values(measures).map((obj: CubeMember) => ({
      [getTitle(settings, obj)]: obj.name,
    }));

    const dimensionsValues = Object.values(dimensions).map(
      (obj: CubeMember) => ({
        [getTitle(settings, obj)]: obj.name,
      })
    );

    const timeDimensionsValues = Object.values(timeDimensions).map(
      (obj: CubeMember) => ({
        [getTitle(settings, obj)]: obj.name,
      })
    );

    const allMembers = measuresValues
      .concat(dimensionsValues)
      .concat(timeDimensionsValues);

    const index = members.reduce(
      (acc: Record<string, CubeMember>, curr: CubeMember) => ({
        ...acc,
        [curr.name]: curr,
      }),
      {}
    );

    return {
      index,
      allMembers,
      measures: measuresValues,
      dimensions: dimensionsValues.concat(timeDimensionsValues),
    };
  }, [selectedQueryMembers, settings]);

  return {
    baseMembers,
  };
};

export default useAnalyticsQueryMembers;
