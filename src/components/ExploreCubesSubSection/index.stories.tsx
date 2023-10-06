import RootLayout from "@/layouts/RootLayout";

import ExploreCubesSubSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreCubesSubSection",
  component: ExploreCubesSubSection,
} as Meta<typeof ExploreCubesSubSection>;

const Template: StoryFn<typeof ExploreCubesSubSection> = (args) => (
  <RootLayout>
    <ExploreCubesSubSection {...args}>Cube subsection</ExploreCubesSubSection>
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  subSection: {
    haveSelected: true,
    subSectionType: "time",
    members: [
      {
        index: 0,
        isVisible: true,
        name: "Airports.airportid",
        shortTitle: "Airportid",
        suggestFilterValues: true,
        title: "Airports Airportid",
        type: "string",
      },
      {
        index: 1,
        isVisible: true,
        name: "Airports.name",
        shortTitle: "Name",
        suggestFilterValues: true,
        title: "Airports Name",
        type: "string",
      },
    ],
  },
  name: "airports",
  selectedFilters: ["test dimension"],
};
