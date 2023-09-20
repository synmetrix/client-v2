import { useMemo } from "react";

import { getTitle } from "./usePlayground";

interface Props {
  selectedQueryMembers: {
    measures: { name: string; shortTitle: string; title: string }[];
    dimensions: { name: string; shortTitle: string; title: string }[];
    timeDimensions: { name: string; shortTitle: string; title: string }[];
  };
  settings: { hideCubeNames?: boolean };
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
    const measuresValues = Object.values(measures).map((obj) => ({
      [getTitle(settings, obj)]: obj.name,
    }));

    const dimensionsValues = Object.values(dimensions).map((obj) => ({
      [getTitle(settings, obj)]: obj.name,
    }));

    const timeDimensionsValues = Object.values(timeDimensions).map((obj) => ({
      [getTitle(settings, obj)]: obj.name,
    }));

    const allMembers = measuresValues
      .concat(dimensionsValues)
      .concat(timeDimensionsValues);

    const index = members.reduce(
      (acc, curr) => ({
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
