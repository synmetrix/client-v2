import RootLayout from "@/layouts/RootLayout";

import TeamSettings from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/Members/TeamSettings",
  component: TeamSettings,
} as Meta<typeof TeamSettings>;

const Template: StoryFn<typeof TeamSettings> = (args) => (
  <RootLayout>
    <TeamSettings {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  onSubmit: console.log,
};
