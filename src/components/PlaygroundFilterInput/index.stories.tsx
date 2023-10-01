import RootLayout from "@/layouts/RootLayout";

import PlaygroundFilterInput from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/PlaygroundFilterInput",
  component: PlaygroundFilterInput,
} as Meta<typeof PlaygroundFilterInput>;

const Template: StoryFn<typeof PlaygroundFilterInput> = (args) => (
  <RootLayout>
    <PlaygroundFilterInput {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  member: {
    dimension: {
      isVisible: true,
      name: "Orders.status",
      shortTitle: "Status",
      suggestFilterValues: true,
      title: "Orders Status",
      type: "string",
    },
    operator: "operator",
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
  addMemberName: "Filter",
  updateMethods: {
    update: console.log,
    remove: console.log,
  },
};
