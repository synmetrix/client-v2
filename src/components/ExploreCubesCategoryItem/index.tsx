import cn from "classnames";
import { Row, Col, Typography } from "antd";

import CategoryItemFilter from "@/components/ExploreCubesCategoryItemFilter";
import type { CubeMember } from "@/types/cube";

import s from "./index.module.less";

import type { FC } from "react";

const { Paragraph } = Typography;

const CategoryItem: FC<CategoryItemProps> = ({
  onAction,
  member,
  category,
  selectedIndex,
  onFilterUpdate,
  selectedFilterIndex,
  hoverState,
}) => {
  const isFilterVisible = member.type !== "time" && category !== "segments";

  return (
    <div
      key={member.name}
      onBlur={() => {}}
      onFocus={() => {}}
      onClick={() => onAction("click", member)}
      onMouseOver={() => onAction("over", member)}
      onMouseOut={() => onAction("out", member)}
      onPointerDown={() => onAction("focus", member)}
      onPointerUp={() => onAction("out", member)}
      onMouseDown={() => onAction("focus", member)}
      onMouseUp={() => onAction("out", member)}
      className={cn({
        [s.pointer]: true,
        [s.memberActive]: selectedIndex > -1,
        [s.memberHovered]: hoverState === "over",
        [s.memberFocused]: hoverState === "focus",
      })}
    >
      <Paragraph className={s.memberSection}>
        <Row justify="space-between" align="middle">
          <Col xs={16}>
            <a className={cn(s.member)}>{member.shortTitle}</a>
          </Col>
          <CategoryItemFilter
            isVisible={isFilterVisible}
            onFilterUpdate={onFilterUpdate}
            selectedFilterIndex={selectedFilterIndex}
            member={member}
          />
        </Row>
      </Paragraph>
    </div>
  );
};

interface CategoryItemProps {
  member: CubeMember;
  category: string;
  selectedIndex: number;
  selectedFilterIndex: number;
  onFilterUpdate: {
    add: (value: any) => void;
    remove: (value: any) => void;
  };
  onAction: (actions: string, member: CubeMember) => void;
  hoverState: "over" | "focus" | false;
}

const CategoryItemMemo = memo<CategoryItemProps>(
  CategoryItem,
  (prevProps, nextProps) => {
    // memo only by these props
    if (
      prevProps.selectedIndex === nextProps.selectedIndex &&
      prevProps.selectedFilterIndex === nextProps.selectedFilterIndex &&
      prevProps.member.name === nextProps.member.name &&
      prevProps.hoverState === nextProps.hoverState
    ) {
      return true;
    }

    return false;
  }
);

export default CategoryItemMemo;
