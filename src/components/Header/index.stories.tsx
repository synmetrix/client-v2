import { Button, Space } from "antd";

import RootLayout from "@/layouts/RootLayout";
import Navbar from "@/components/Navbar";
import { userMenu } from "@/mocks/user";

import Header from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Header",
  component: Header,
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => (
  <RootLayout>
    <Header {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  withLogo: true,
};

export const WithAuth = Template.bind({});
WithAuth.args = {
  title: "Auth",
  content: (
    <Navbar
      direction={"horizontal"}
      userMenu={userMenu}
      username={"user name"}
    />
  ),
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: "Roles and access",
  bordered: true,
  content: (
    <Space>
      <Button type="link">Sign in</Button>
      <Button type="primary">Sign up</Button>
    </Space>
  ),
};
