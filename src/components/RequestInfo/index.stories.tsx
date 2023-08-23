import RootLayout from "@/layouts/RootLayout";

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

Default.args = {
  id: "2e0eb16a-b569-45a9-9fc2-0fbbb3b015df-span-1",
  path: "/Synmetrixjs/datasources/v1/load",
  duration: 450,
  startTime: "2023-06-15 20:08:09.915",
  endtTime: "2023-06-15 20:08:10.365",
  queryKey: "e2801cc08321653583545092da0d7ede",
};
