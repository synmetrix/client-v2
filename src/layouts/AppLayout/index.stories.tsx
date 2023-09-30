import { Row, Col } from "antd";

import RootLayout from "@/layouts/RootLayout";

import AppLayout from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Layouts/AppLayout",
  component: AppLayout,
} as Meta<typeof AppLayout>;

const Template: StoryFn<typeof AppLayout> = (args) => (
  <RootLayout>
    <AppLayout {...args} />
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
