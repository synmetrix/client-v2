import RootLayout from "@/layouts/RootLayout";

import DataModelSelection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/RolesAndAccess/DataModelSelection",
  component: DataModelSelection,
} as Meta<typeof DataModelSelection>;

const Template: StoryFn<typeof DataModelSelection> = (args) => (
  <RootLayout>
    <DataModelSelection {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  resource: "github.demo.altinity.cloud",
  dataModels: [
    {
      title: "LineItems",
      access: "partial",
    },
    {
      title: "Companies",
      access: "no",
    },
    {
      title: "Orders",
      access: "partial",
    },
  ],
  onChange: console.log,
};
