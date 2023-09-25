import RootLayout from "@/layouts/RootLayout";

import ExploreSidebar from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreSidebar",
  component: ExploreSidebar,
} as Meta<typeof ExploreSidebar>;

const Template: StoryFn<typeof ExploreSidebar> = (args) => (
  <RootLayout>
    <ExploreSidebar {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  availableQueryMembers: {
    dsadsasd: {
      connectedComponent: 1,
      title: "test",
      name: "string",
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
          name: "dsadsasd.testmeasure",
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
          name: "dsadsasd.testdimensions",
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
    dsasa231313d: {
      connectedComponent: 1,
      title: "test",
      name: "string",
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
          name: "dsasa231313d.testmeasure",
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
          name: "dsasa231313d.testdimension",
          title: "string1",
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
  selectedQueryMembers: {
    "dsasa231313d.testmeasure": {
      name: "dsasa231313d.testmeasure1",
      title: "string",
      shortTitle: "string",
      isVisible: true,
      aggType: "string",
      cumulative: true,
      cumulativeTotal: true,
      drillMembers: [],
      granularity: "dsasa231313d.testmeasure1.granularity",
      drillMembersGrouped: {
        dimensions: [],
        measures: [],
      },
    },
    "dsasa231313d.testdimension": {
      name: "dsasa231313d.testdimension1",
      title: "string1",
      shortTitle: "string",
      isVisible: true,
      aggType: "string",
      cumulative: true,
      cumulativeTotal: true,
      drillMembers: [],
      granularity: "dsasa231313d.testdimension1.granularity",
      drillMembersGrouped: {
        dimensions: [],
        measures: [],
      },
    },
    "dsadsasd.testmeasure": {
      name: "dsadsasd.testmeasure2",
      title: "string",
      shortTitle: "string",
      isVisible: true,
      aggType: "string",
      cumulative: true,
      cumulativeTotal: true,
      drillMembers: [],
      granularity: "dsadsasd.testmeasure2.granularity",
      drillMembersGrouped: {
        dimensions: [],
        measures: [],
      },
    },
    "dsadsasd.testdimension": {
      name: "dsadsasd.testdimension2",
      title: "string1",
      shortTitle: "string",
      isVisible: true,
      aggType: "string",
      cumulative: true,
      cumulativeTotal: true,
      drillMembers: [],
      granularity: "dsadsasd.testdimension2.granularity",
      drillMembersGrouped: {
        dimensions: [],
        measures: [],
      },
    },
  },
};
