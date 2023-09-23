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
    test: {
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
      measures: [],
      dimensions: [],
    },
  },
  selectedQueryMembers: [
    {
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
      measures: [],
      dimensions: [],
    },
  ],
};
