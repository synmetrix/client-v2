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
  selectedMembers: {
    dimensions: {
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
  },
  onMemberSelect: () => ({
    add: () => {},
    remove: () => {},
  }),
};
