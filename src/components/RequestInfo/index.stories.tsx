import RootLayout from "@/layouts/RootLayout";
import { request } from "@/mocks/request";

import RequestInfo from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Logs/RequestInfo",
  component: RequestInfo,
} as Meta<typeof RequestInfo>;

const Template: StoryFn<typeof RequestInfo> = (args) => (
  <RootLayout>
    <RequestInfo {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = request;
