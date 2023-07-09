import RootLayout from "@/layouts/RootLayout";

import DataSourceForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Onboarding/DataSourceForm",
  component: DataSourceForm,
} as Meta<typeof DataSourceForm>;

const Template: StoryFn<typeof DataSourceForm> = (args) => (
  <RootLayout>
    <DataSourceForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
