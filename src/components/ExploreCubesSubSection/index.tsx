import { useState } from "react";
import cn from "classnames";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

import CategoryItemFilter from "@/components/ExploreCubesCategoryItemFilter";

import s from "./index.module.less";

import type { FC, ReactNode } from "react";

const { Panel } = Collapse;

const defaultExtra = <div>•</div>;

const ExploreCubesSubSection: FC<ExploreCubesSubSectionProps> = ({
  name,
  subSection,
  children,
  onFilterUpdate,
  selectedFilters,
}) => {
  const [openedSubSection, setOpenedSubSection] = useState<
    string | number | (string | number)[] | undefined
  >();

  const { haveSelected, subSectionType } = subSection;

  let extra = haveSelected ? defaultExtra : null;

  if (subSectionType === "time") {
    const member = subSection.members.find((item: any) => !item.granularity);
    const selectedFilterIndex = selectedFilters.indexOf(member!.name);

    extra = (
      <CategoryItemFilter
        isVisible
        onFilterUpdate={onFilterUpdate}
        selectedFilterIndex={selectedFilterIndex}
        member={member!}
      />
    );
  }

  return (
    <Collapse
      bordered={false}
      activeKey={openedSubSection}
      defaultActiveKey={openedSubSection}
      onChange={setOpenedSubSection}
      className={cn({
        [s.subSection]: true,
        [s.active]: !!haveSelected,
      })}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      <Panel
        key={name}
        header={name}
        className={s.panelSubSection}
        extra={extra}
      >
        {children}
      </Panel>
    </Collapse>
  );
};

interface ExploreCubesSubSectionProps {
  name: string;
  subSection: {
    haveSelected: boolean;
    subSectionType: string;
    members: {
      name: string;
      type: string;
      shortTitle: string;
      granularity: string;
    }[];
  };
  onFilterUpdate: {
    add: (value: any) => void;
    remove: (value: any) => void;
  };
  children: ReactNode;
  selectedFilters: string[];
}

export default ExploreCubesSubSection;
