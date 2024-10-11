import RootLayout from "@/layouts/RootLayout";

import NoSqlCredentials from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/SQLApi/NoSqlCredentials",
  component: NoSqlCredentials,
} as Meta<typeof NoSqlCredentials>;

const Template: StoryFn<typeof NoSqlCredentials> = (args) => (
  <RootLayout>
    <NoSqlCredentials {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
