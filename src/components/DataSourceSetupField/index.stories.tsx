import RootLayout from "@/layouts/RootLayout";

import DataSourceSetupField from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/DataSourceSetupField",
  component: DataSourceSetupField,
} as Meta<typeof DataSourceSetupField>;

const Template: StoryFn<typeof DataSourceSetupField> = (args) => (
  <RootLayout>
    <DataSourceSetupField {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
