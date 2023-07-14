import RootLayout from "@/layouts/RootLayout";

import SideMenu from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/SideMenu",
  component: SideMenu,
} as Meta<typeof SideMenu>;

const Template: StoryFn<typeof SideMenu> = (args) => (
  <RootLayout>
    <SideMenu {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
