import { Row, Col } from "antd";

import RootLayout from "@/layouts/RootLayout";

import SidebarLayout from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Layouts/SidebarLayout",
  component: SidebarLayout,
} as Meta<typeof SidebarLayout>;

const Template: StoryFn<typeof SidebarLayout> = (args) => (
  <RootLayout>
    <SidebarLayout {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  children: (
    <Row justify="center">
      <Col>Hello world</Col>
    </Row>
  ),
};
