import RootLayout from "@/layouts/RootLayout";

import ExploreCubesCategoryItem from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreCubesCategoryItem",
  component: ExploreCubesCategoryItem,
} as Meta<typeof ExploreCubesCategoryItem>;

const Template: StoryFn<typeof ExploreCubesCategoryItem> = (args) => (
  <RootLayout>
    <ExploreCubesCategoryItem {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  member: {
    connectedComponent: 1,
    title: "test",
    name: "string",
    type: "string",
    operator: "string",
    values: 1,
    shortTitle: "string",
    granularity: "string",
    dimension: {
      name: "string",
    },
    meta: {
      subSection: " string",
      subSectionType: "string",
    },
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
  },
};
