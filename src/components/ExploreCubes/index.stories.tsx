import RootLayout from "@/layouts/RootLayout";

import ExploreCubes from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreCubes",
  component: ExploreCubes,
} as Meta<typeof ExploreCubes>;

const Template: StoryFn<typeof ExploreCubes> = (args) => (
  <RootLayout>
    <ExploreCubes {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  header: "test header",
  availableQueryMembers: {
    Tripdata: {
      connectedComponent: 1,
      title: "Tripdata",
      name: "Tripdata",
      type: "string",
      operator: "string",
      shortTitle: "string",
      granularity: "string",
      dimension: {
        name: "string",
      },
      meta: {
        subSection: "string",
        subSectionType: "string",
      },
      measures: [
        {
          name: "Tripdata.testmeasure",
          title: "Tripdatatestmeasure",
          shortTitle: "Tripdatatestmeasure",
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
          name: "Tripdata.testdimension",
          title: "Tripdatatestdimensions",
          shortTitle: "Tripdatatestdimension",
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
    Airports: {
      connectedComponent: 1,
      title: "Airports",
      name: "Airports",
      type: "string",
      operator: "string",
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
          name: "Airports.testmeasure",
          title: "Airportstestmeasure",
          shortTitle: "Airportstestmeasure",
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
          name: "Airports.testdimension",
          title: "Airportstestdimension",
          shortTitle: "Airportstestdimension",
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
  selectedQueryMembers: {
    dimensions: [
      {
        name: "Tripdata.testdimension",
        title: "Tripdatatestdimension",
        shortTitle: "Tripdatatestdimension",
        isVisible: true,
        aggType: "string",
        cumulative: true,
        cumulativeTotal: true,
        drillMembers: [],
        granularity: "Tripdata.testdimension2.granularity",
        drillMembersGrouped: {
          dimensions: [],
          measures: [],
        },
      },
    ],
  },
};
