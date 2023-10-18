import RootLayout from "@/layouts/RootLayout";
import { queryMocks } from "@/mocks/logs";

import { QueryLogs } from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Logs/QueryLogs",
  component: QueryLogs,
} as Meta<typeof QueryLogs>;

const Template: StoryFn<typeof QueryLogs> = (args) => (
  <RootLayout>
    <QueryLogs {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  logs: queryMocks,
};
