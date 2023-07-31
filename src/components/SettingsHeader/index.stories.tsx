import RootLayout from "@/layouts/RootLayout";

import SettingsHeader from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/SettingsHeader",
  component: SettingsHeader,
} as Meta<typeof SettingsHeader>;

const Template: StoryFn<typeof SettingsHeader> = (args) => (
  <RootLayout>
    <SettingsHeader {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  action: "Action",
  onClick: console.log,
};
