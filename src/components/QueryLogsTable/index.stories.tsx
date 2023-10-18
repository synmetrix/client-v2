import RootLayout from "@/layouts/RootLayout";
import { queryMocks } from "@/mocks/logs";

import QueryLogsTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Logs/QueryLogsTable",
  component: QueryLogsTable,
} as Meta<typeof QueryLogsTable>;

const Template: StoryFn<typeof QueryLogsTable> = (args) => (
  <RootLayout>
    <QueryLogsTable {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  logs: queryMocks,
};
