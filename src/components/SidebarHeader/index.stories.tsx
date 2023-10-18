import RootLayout from "@/layouts/RootLayout";

import LogsIcon from "@/assets/logs-active.svg";

import SidebarHeader from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/SidebarHeader",
  component: SidebarHeader,
} as Meta<typeof SidebarHeader>;

const Template: StoryFn<typeof SidebarHeader> = (args) => (
  <RootLayout>
    <SidebarHeader {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  title: "Logs",
  icon: <LogsIcon />,
};
