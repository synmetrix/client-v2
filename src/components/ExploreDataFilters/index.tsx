import { Empty } from "antd";
import { getOr } from "unchanged";

import FilterGroup from "@/components/PlaygroundFilterGroup";
import type { CubeMember, CubeMembers } from "@/types/cube";

import type { FC } from "react";

interface ExploreDataFiltersProps {
  availableQueryMembers: Record<
    string,
    Record<string, Record<string, CubeMember>>
  >;
  selectedQueryMembers: Record<string, (CubeMember | CubeMember)[]>;
  onMemberChange: {
    update: (member: CubeMember, newValue: any) => void;
    remove: (member: CubeMember) => void;
  };
}

const ExploreDataFilters: FC<ExploreDataFiltersProps> = ({
  availableQueryMembers,
  selectedQueryMembers,
  onMemberChange,
}) => {
  const { filters = [] } = selectedQueryMembers;

  const concatedMembers = useMemo(() => {
    const cubes: CubeMembers[] = Object.values(availableQueryMembers || {});

    const reducer = (acc: CubeMember[], cube: CubeMembers) =>
      [
        ...acc,
        ...Object.values(getOr({}, "dimensions", cube)),
        ...Object.values(getOr({}, "measures", cube)),
      ] as CubeMember[];

    return cubes.reduce<CubeMember[]>(reducer, []);
  }, [availableQueryMembers]);

  if (!filters.length) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <FilterGroup
      members={filters}
      availableMembers={concatedMembers}
      addMemberName="Filter"
      updateMethods={onMemberChange}
    />
  );
};

export default ExploreDataFilters;
