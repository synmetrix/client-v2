import RootLayout from "@/layouts/RootLayout";

import DataSchemaForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Models/DataSchemaForm",
  component: DataSchemaForm,
} as Meta<typeof DataSchemaForm>;

const Template: StoryFn<typeof DataSchemaForm> = (args) => (
  <RootLayout>
    <DataSchemaForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  onSubmit: console.log,
};
