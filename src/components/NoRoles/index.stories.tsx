import RootLayout from "@/layouts/RootLayout";

import NoRoles from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/DataSources/NoRoles",
  component: NoRoles,
} as Meta<typeof NoRoles>;

const Template: StoryFn<typeof NoRoles> = (args) => (
  <RootLayout>
    <NoRoles {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
