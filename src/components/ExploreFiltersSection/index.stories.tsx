import type { CubeMember } from "@/types/cube";
import RootLayout from "@/layouts/RootLayout";
import {
  availableQueryMembers,
  dataSectionProps,
  selectedQueryMembers,
} from "@/mocks/explore";

import ExploreFiltersSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreFiltersSection",
  component: ExploreFiltersSection,
} as Meta<typeof ExploreFiltersSection>;

const Template: StoryFn<typeof ExploreFiltersSection> = (args) => {
  const [members, setMembers] = useState(args.selectedQueryMembers);

  const updateMethods = () => ({
    update: (member: CubeMember, newMember: CubeMember) =>
      setMembers((prev) => {
        const newState = { ...prev };
        const memberIndex = prev.filters.findIndex(
          (m) => JSON.stringify(m) === JSON.stringify(member)
        );
        newState.filters[memberIndex] = newMember;
        return newState;
      }),
    remove: (_: CubeMember) => setMembers({}),
    add: () => {},
  });
  const [isActive, setIsActive] = useState(false);

  return (
    <RootLayout>
      <ExploreFiltersSection
        {...args}
        isActive={isActive}
        selectedQueryMembers={members}
        onToggleSection={() => setIsActive(!isActive)}
        onMemberChange={updateMethods}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  availableQueryMembers,
  selectedQueryMembers: {
    filters: [
      {
        name: "name",
        title: "title",
        isVisible: true,
        type: "string",
        shortTitle: "shortTitle",
        dimension: {
          isVisible: true,
          name: "Orders.status",
          shortTitle: "Status",
          suggestFilterValues: true,
          title: "Orders Status",
          type: "string",
        },
        operator: "set",
        operators: [
          {
            name: "contains",
            title: "contains",
          },
          {
            name: "notContains",
            title: "does not contain",
          },
          {
            name: "equals",
            title: "equals",
          },
          {
            name: "notEquals",
            title: "does not equal",
          },
          {
            name: "set",
            title: "is set",
          },
          {
            name: "notSet",
            title: "is not set",
          },
        ],
        index: 0,
      },
    ],
  },
  state: dataSectionProps.state,
};
