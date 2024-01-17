import cn from "classnames";
import { Button, Space } from "antd";

import type { CubeMember } from "@/types/cube";

import FilterIcon from "@/assets/explore-filter.svg";

import s from "./index.module.less";

import type { FC, MouseEventHandler } from "react";

const CategoryItemFilter: FC<CategoryItemFilterProps> = ({
  isVisible,
  selectedFilterIndex,
  onFilterUpdate,
  member,
}) => {
  const filterMember: Partial<CubeMember> = { dimension: member };

  const addFilter: MouseEventHandler<HTMLAnchorElement> &
    MouseEventHandler<HTMLButtonElement> = (e) => {
    onFilterUpdate.add(filterMember as CubeMember);

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const toggleFilter: MouseEventHandler<HTMLAnchorElement> &
    MouseEventHandler<HTMLButtonElement> = (e) => {
    if (selectedFilterIndex === -1) {
      onFilterUpdate.add(filterMember as CubeMember);
    }

    onFilterUpdate.remove({
      ...(filterMember as CubeMember),
      index: selectedFilterIndex,
    });

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Space>
      <Button
        size="small"
        type="text"
        className={cn(s.filter, { active: selectedFilterIndex > -1 })}
        onClick={toggleFilter}
        onMouseDown={(e) => e.preventDefault()}
        data-testid="remove-filter-button"
      >
        <FilterIcon className={s.filterIcon} />
      </Button>
      {selectedFilterIndex > -1 && (
        <Button
          size="small"
          className={cn(s.filter, s.plus)}
          onClick={addFilter}
          onMouseDown={(e) => e.preventDefault()}
        >
          +
        </Button>
      )}
    </Space>
  );
};

interface CategoryItemFilterProps {
  isVisible: boolean;
  onFilterUpdate: {
    add: (member: CubeMember) => void;
    remove: (member: CubeMember) => void;
  };
  member: CubeMember;
  selectedFilterIndex: number;
}

export default CategoryItemFilter;
