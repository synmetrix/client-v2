import RootLayout from "@/layouts/RootLayout";

import SidebarMenu from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/SidebarMenu",
  component: SidebarMenu,
} as Meta<typeof SidebarMenu>;

const Template: StoryFn<typeof SidebarMenu> = (args) => (
  <RootLayout>
    <SidebarMenu {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
