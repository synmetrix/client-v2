import RootLayout from "@/layouts/RootLayout";

import ExploreCubesSubSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreCubesSubSection",
  component: ExploreCubesSubSection,
} as Meta<typeof ExploreCubesSubSection>;

const Template: StoryFn<typeof ExploreCubesSubSection> = (args) => (
  <RootLayout>
    <ExploreCubesSubSection {...args}>dsadsad</ExploreCubesSubSection>
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  subSection: {
    haveSelected: true,
    subSectionType: "time",
    members: [
      {
        name: "airports.measure",
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

      {
        name: "airports.dimension",
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
  name: "airports",
  selectedFilters: ["test dimension"],
};
