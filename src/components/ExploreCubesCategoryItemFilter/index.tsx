import { PlusOutlined } from "@ant-design/icons";
import cn from "classnames";
import { Button } from "antd";

import { Cube, FilterMember } from "@/types/cube";

import s from "./index.module.less";

import type { FC, MouseEventHandler } from "react";

const CategoryItemFilter: FC<CategoryItemFilterProps> = ({
  isVisible,
  selectedFilterIndex,
  onFilterUpdate,
  member,
}) => {
  const filterMember = { dimension: member };

  const addFilter: MouseEventHandler<HTMLAnchorElement> &
    MouseEventHandler<HTMLButtonElement> = (e) => {
    onFilterUpdate.add(filterMember);

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const toggleFilter: MouseEventHandler<HTMLAnchorElement> &
    MouseEventHandler<HTMLButtonElement> = (e) => {
    if (selectedFilterIndex === -1) {
      onFilterUpdate.add(filterMember);
    }

    onFilterUpdate.remove({ ...filterMember, index: selectedFilterIndex });

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
        className={cn(s.filter, { active: selectedFilterIndex > -1 })}
        onClick={toggleFilter}
        onMouseDown={(e) => e.preventDefault()}
      >
        Filter
      </Button>
      {selectedFilterIndex > -1 && (
        <Button
          size="small"
          className={cn(s.filter)}
          style={{ marginLeft: 5 }}
          onClick={addFilter}
          onMouseDown={(e) => e.preventDefault()}
        >
          <PlusOutlined />
        </Button>
      )}
    </div>
  );
};

interface CategoryItemFilterProps {
  isVisible: boolean;
  onFilterUpdate: {
    add: (value: FilterMember) => void;
    remove: (value: FilterMember) => void;
  };
  member: Cube;
  selectedFilterIndex: number;
}

export default CategoryItemFilter;
