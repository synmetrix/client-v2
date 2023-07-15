import RootLayout from "@/layouts/RootLayout";

import LogoutSessions from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/PersonalInfo/LogoutSessions",
  component: LogoutSessions,
} as Meta<typeof LogoutSessions>;

const Template: StoryFn<typeof LogoutSessions> = (args) => (
  <RootLayout>
    <LogoutSessions {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
