import RootLayout from "@/layouts/RootLayout";

import NoMember from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/Members/NoMember",
  component: NoMember,
} as Meta<typeof NoMember>;

const Template: StoryFn<typeof NoMember> = (args) => (
  <RootLayout>
    <NoMember {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
