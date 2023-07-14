import RootLayout from "@/layouts/RootLayout";

import NoDataSource from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/NoDataSource",
  component: NoDataSource,
} as Meta<typeof NoDataSource>;

const Template: StoryFn<typeof NoDataSource> = (args) => (
  <RootLayout>
    <NoDataSource {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
