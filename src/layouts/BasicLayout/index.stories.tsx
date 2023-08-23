import { Row, Col } from "antd";
import { Router } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";

import BasicLayout from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Layouts/BasicLayout",
  component: BasicLayout,
} as Meta<typeof BasicLayout>;

const Template: StoryFn<typeof BasicLayout> = (args) => (
  // <Router basename="/">
  <RootLayout>
    <BasicLayout {...args} />
  </RootLayout>
  // </Router>
);

export const Default = Template.bind({});

Default.args = {
  children: (
    <Row justify="center">
      <Col>Hello world</Col>
    </Row>
  ),
};
