import { Space } from "antd";

import RootLayout from "@/layouts/RootLayout";
import Button from "@/components/Button";

import Sidebar from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
} as Meta<typeof Sidebar>;

const Template: StoryFn<typeof Sidebar> = (args) => (
  <RootLayout>
    <Sidebar {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  title: "Sidebar",
  children: (
    <Space direction="vertical">
      <Button type="link">link 1</Button>
      <Button type="link">link 2</Button>
      <Button type="link">link 3</Button>
    </Space>
  ),
};
