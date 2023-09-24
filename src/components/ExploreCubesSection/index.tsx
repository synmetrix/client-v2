import { useState } from "react";
import { set, getOr, get } from "unchanged";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import { SHOWN_CATEGORIES } from "@/components/ExploreSidebar";
import ExploreCubesSubSection from "@/components/ExploreCubesSubSection";
import ExploreCubesCategoryItem from "@/components/ExploreCubesCategoryItem";
import useKeyPress from "@/hooks/useKeyPress";
import useAnalyticsQueryMembers from "@/hooks/useAnalyticsQueryMembers";
import { granularities } from "@/hooks/useDataSourceMeta";
import clearSelection from "@/utils/helpers/clearSelection";
import type {
  CubeMeta,
  SubSection,
  Metric,
  CubeMembers,
  FilterMember,
} from "@/types/cube";

import s from "./index.module.less";

import type { ReactNode } from "react";

const { Text } = Typography;

const toFilter = (member: FilterMember) => ({
  dimension: member.dimension.name,
  operator: member.operator,
  values: member.values,
});

const granulateMember = (member: Metric): Metric[] => {
  const newMembers: Metric[] = [];

  granularities.forEach((granularity) => {
    let newName = member.name;
    let newTitle = member.title;
    let newShortTitle = member.shortTitle;
    let granularityName = null;

    if (granularity.name) {
      granularityName = granularity.name;
      newName += `+${granularity.name}`;
      newTitle = `by ${granularity.title}`;
      newShortTitle = `by ${granularity.name}`;
    } else {
      newTitle = "Raw";
      newShortTitle = "Raw";
    }

    const newMember: Metric = {
      ...member,
      name: newName,
      title: newTitle,
      shortTitle: newShortTitle,
      granularity: granularityName as string,
      meta: {
        subSection: member.shortTitle,
        subSectionType: member.type,
      },
    };

    newMembers.push(newMember);
  });

  return newMembers;
};

const getSubSections = (
  catMembers: Metric[],
  membersIndex: Record<string, Metric>
) => {
  const subSections: Record<string, SubSection> = {};
  const freeMembers: Metric[] = [];

  catMembers.forEach((member: Metric) => {
    const subSection = getOr(false, "meta.subSection", member);
    const subSectionType = getOr("string", "meta.subSectionType", member);

    if (!subSection) {
      freeMembers.push(member);
      return;
    }

    if (!subSections[subSection]) {
      subSections[subSection] = {
        members: [],
        haveSelected: false,
        subSectionType,
      };
    }

    subSections[subSection].members.push(member);
  });

  Object.keys(subSections).forEach((subSection) => {
    const foundSelected = subSections[subSection].members.find(
      (subMember: Metric) => get([subMember.name], membersIndex)
    );

    if (foundSelected) {
      subSections[subSection].haveSelected = true;
    }
  });

  return {
    subSections,
    freeMembers,
  };
};

const Cube = ({
  members,
  selectedMembers,
  onMemberSelect,
}: CubeProps): JSX.Element => {
  const { t } = useTranslation();
  // TODO look after useplayground hook
  const {
    baseMembers: { index: membersIndex },
  } = useAnalyticsQueryMembers({ selectedQueryMembers: selectedMembers });

  const shiftPress = useKeyPress("Shift");

  const [state, setState] = useState<CubeMeta>({
    lastClickedMember: {},
    hovered: {},
  });

  const getMemberId = (member: Metric) => member.name.replace(".", "_");
  const getMembersCategory = (category?: string): Metric[] => {
    return Object.values(members[category as keyof CubeMembers] || {});
  };
  const getSelectedCategoryMembers = (category?: string): string[] => {
    return Object.values(
      category ? selectedMembers[category as keyof CubeMembers] || {} : {}
    ).map((m: Metric) => m.name);
  };

  const onAction = (
    type = "over",
    member: Metric,
    memberMeta: CubeMeta = {}
  ) => {
    if (!member) {
      return;
    }

    const name = getMemberId(member);

    if (type === "click") {
      const {
        category: nextCategory,
        index: nextIndex,
        selectedIndex,
      } = memberMeta;

      setState((prev) => set(["lastClickedMember"], memberMeta, prev));

      // select more than one members if shift pressed
      if (shiftPress) {
        const { category: prevCategory, index: prevIndex } =
          state.lastClickedMember;

        // don't fire if not the same category
        if (prevCategory !== nextCategory) {
          return;
        }

        let catFilter: (_: unknown, index: number) => any = () => {};

        if (nextIndex && nextIndex > prevIndex) {
          catFilter = (_: unknown, index: number) =>
            index <= nextIndex && index > prevIndex;
        } else {
          catFilter = (_: unknown, index: number) =>
            nextIndex && index >= nextIndex && index < prevIndex;
        }

        const selectMembers =
          getMembersCategory(nextCategory).filter(catFilter);
        const categoryCubeMembers = getSelectedCategoryMembers(nextCategory);

        // need buffer because selectedMembers update is not immediately
        const categoryCubeMembersBuffer = categoryCubeMembers;
        selectMembers.forEach((catMember) => {
          const catSelectedIndex = categoryCubeMembersBuffer.findIndex(
            (m: any) => m.name === catMember.name
          );

          if (catSelectedIndex === -1) {
            onMemberSelect(nextCategory).add(catMember);
          } else {
            onMemberSelect(nextCategory).remove({
              ...catMember,
              index: catSelectedIndex,
            });
            categoryCubeMembersBuffer.splice(catSelectedIndex, 1);
          }
        });

        clearSelection();
        return;
      }

      if (selectedIndex === -1) {
        onMemberSelect(nextCategory).add(member);
      } else {
        onMemberSelect(nextCategory).remove({
          ...member,
          index: selectedIndex,
        });
      }

      return;
    }

    if (type === "over") {
      setState((prev) => set(["hovered", name], "over", prev));
      return;
    }

    if (type === "focus") {
      setState((prev) => set(["hovered", name], "focus", prev));
      return;
    }

    setState((prev) => set(["hovered", name], false, prev));
  };

  const getItem = (
    category: string,
    member: Metric,
    index: number,
    categoryCubeMembers: string[],
    selectedFilters: string[]
  ): ReactNode => {
    const selectedIndex = categoryCubeMembers.indexOf(member.name);
    const selectedFilterIndex = selectedFilters.indexOf(member.name);
    return (
      <ExploreCubesCategoryItem
        key={member.name}
        member={member}
        category={category}
        onAction={(...args) =>
          onAction(...args, { index, category, selectedIndex })
        }
        selectedIndex={selectedIndex}
        selectedFilterIndex={selectedFilterIndex}
        onFilterUpdate={onMemberSelect("filters", toFilter)}
        hoverState={state.hovered[getMemberId(member)]}
      />
    );
  };

  const getCategory = (category: string): ReactNode => {
    let catMembers = getMembersCategory(category);
    if (!catMembers.length) {
      return null;
    }

    catMembers = catMembers.reduce((acc: Metric[], member: Metric) => {
      let newMembers = acc;

      if (member.type === "time") {
        const granMembers = granulateMember(member);
        newMembers = newMembers.concat(granMembers);
      } else {
        newMembers.push(member);
      }
      return newMembers;
    }, []);

    const { subSections, freeMembers } = getSubSections(
      catMembers,
      membersIndex
    );

    const categoryCubeMembers = getSelectedCategoryMembers(category);
    const selectedFilters: string[] = Object.values(
      selectedMembers.filters || {}
    ).map((m) => m.dimension.name);

    return (
      <div key={category} className={s.categorySection}>
        <Text className={s.categoryTitle}>{t(category)}</Text>
        <div className={s.freeMembers}>
          {freeMembers.map((member, index) =>
            getItem(
              category,
              member,
              index,
              categoryCubeMembers,
              selectedFilters
            )
          )}
        </div>
        {Object.keys(subSections || {}).map((subSectionKey) => (
          <ExploreCubesSubSection
            key={subSectionKey}
            name={subSectionKey}
            subSection={subSections[subSectionKey]}
            onFilterUpdate={onMemberSelect("filters", toFilter)}
            selectedFilters={selectedFilters}
          >
            {subSections[subSectionKey].members.map(
              (member: Metric, index: number) =>
                getItem(
                  category,
                  member,
                  index,
                  categoryCubeMembers,
                  selectedFilters
                )
            )}
          </ExploreCubesSubSection>
        ))}
      </div>
    );
  };

  return <>{SHOWN_CATEGORIES.map(getCategory)}</>;
};

interface CubeProps {
  members: CubeMembers;
  onMemberSelect: (
    memberType?: string,
    cb?: (filter: FilterMember) => any
  ) => {
    add: (metric: Metric & { index?: number }) => void;
    remove: (metric: Metric & { index?: number }) => void;
  };
  selectedMembers: CubeMembers;
}

export default Cube;
