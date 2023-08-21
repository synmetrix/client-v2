import RootLayout from "@/layouts/RootLayout";

import LogsTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Logs/LogsTable",
  component: LogsTable,
} as Meta<typeof LogsTable>;

const Template: StoryFn<typeof LogsTable> = (args) => (
  <RootLayout>
    <LogsTable {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  logs: [
    {
      id: "1",
      date: "2023/06/06 at 10:30:31",
      status: "success",
      name: "first",
      type: "webhook",
      message: "Success: Webhook request completed without errors.",
    },
    {
      id: "2",
      date: "2023/06/06 at 10:30:31",
      status: "error",
      name: "second",
      type: "slack",
      message:
        "Error: Slack request completed with errors. Slack request completed with errors. Slack request completed with errors. Slack request completed with errors.",
    },
  ],
};
