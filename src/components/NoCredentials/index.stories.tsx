import RootLayout from "@/layouts/RootLayout";

import NoCredentials from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/SQLApi/NoCredentials",
  component: NoCredentials,
} as Meta<typeof NoCredentials>;

const Template: StoryFn<typeof NoCredentials> = (args) => (
  <RootLayout>
    <NoCredentials {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
