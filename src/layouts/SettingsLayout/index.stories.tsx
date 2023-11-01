import { Row, Col } from "antd";

import RootLayout from "@/layouts/RootLayout";

import SettingsLayout from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Layouts/SettingsLayout",
  component: SettingsLayout,
} as Meta<typeof SettingsLayout>;

const Template: StoryFn<typeof SettingsLayout> = (args) => (
  <RootLayout>
    <SettingsLayout {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  title: "Test title",
  children: (
    <Row justify="center">
      <Col>Hello world</Col>
    </Row>
  ),
};
