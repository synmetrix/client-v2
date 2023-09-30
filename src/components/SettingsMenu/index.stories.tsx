import RootLayout from "@/layouts/RootLayout";

import SettingsMenu from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/SettingsMenu",
  component: SettingsMenu,
} as Meta<typeof SettingsMenu>;

const Template: StoryFn<typeof SettingsMenu> = (args) => (
  <RootLayout>
    <SettingsMenu {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
