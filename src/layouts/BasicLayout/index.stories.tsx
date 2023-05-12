import { Row, Col } from "antd";

import RootLayout from "@/layouts/RootLayout";

import BasicLayout from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Layouts/BasicLayout",
  component: BasicLayout,
} as Meta<typeof BasicLayout>;

const Template: StoryFn<typeof BasicLayout> = (args) => (
  <RootLayout>
    <BasicLayout {...args} />
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
