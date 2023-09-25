import { Row, Col } from "antd";

import RootLayout from "@/layouts/RootLayout";
import BasicLayout from "@/layouts/BasicLayout";

import AppLayout from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Layouts/AppLayout",
  component: AppLayout,
} as Meta<typeof AppLayout>;

const Template: StoryFn<typeof AppLayout> = (args) => (
  <RootLayout>
    <BasicLayout>
      <AppLayout {...args} />
    </BasicLayout>
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
