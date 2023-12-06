import { PlusOutlined } from "@ant-design/icons";
import cn from "classnames";
import { Button } from "antd";

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
    <div style={{ textAlign: "right" }}>
      <Button
        size="small"
        type="text"
        className={cn(s.filter, { active: selectedFilterIndex > -1 })}
        onClick={toggleFilter}
        onMouseDown={(e) => e.preventDefault()}
      >
        <FilterIcon className={s.filterIcon} />
      </Button>
      {selectedFilterIndex > -1 && (
        <Button
          size="small"
          className={cn(s.filter, s.plus)}
          style={{ marginLeft: 5 }}
          onClick={addFilter}
          onMouseDown={(e) => e.preventDefault()}
        >
          +
        </Button>
      )}
    </div>
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
