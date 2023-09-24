import RootLayout from "@/layouts/RootLayout";

import ExploreCubesSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreCubesSection",
  component: ExploreCubesSection,
} as Meta<typeof ExploreCubesSection>;

const Template: StoryFn<typeof ExploreCubesSection> = (args) => (
  <RootLayout>
    <ExploreCubesSection {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  members: {
    measures: [
      {
        name: "test measure",
        title: "string",
        shortTitle: "string",
        isVisible: true,
        aggType: "string",
        cumulative: true,
        cumulativeTotal: true,
        drillMembers: [],
        drillMembersGrouped: {
          dimensions: [],
          measures: [],
        },
      },
    ],
    dimensions: [
      {
        name: "test dimension",
        title: "string1",
        shortTitle: "string1",
        isVisible: true,
        aggType: "string1",
        cumulative: true,
        cumulativeTotal: true,
        drillMembers: [],
        drillMembersGrouped: {
          dimensions: [],
          measures: [],
        },
      },
    ],
  },
  selectedMembers: {
    measures: [
      {
        name: "test measure",
        title: "string",
        shortTitle: "string",
        isVisible: true,
        aggType: "string",
        cumulative: true,
        cumulativeTotal: true,
        drillMembers: [],
        drillMembersGrouped: {
          dimensions: [],
          measures: [],
        },
      },
    ],
    dimensions: [
      {
        name: "test dimension",
        title: "string1",
        shortTitle: "string1",
        isVisible: true,
        aggType: "string1",
        cumulative: true,
        cumulativeTotal: true,
        drillMembers: [],
        drillMembersGrouped: {
          dimensions: [],
          measures: [],
        },
      },
    ],
  },
  onMemberSelect: () => ({
    add: () => {},
    remove: () => {},
  }),
};
