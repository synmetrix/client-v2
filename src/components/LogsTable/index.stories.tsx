import RootLayout from "@/layouts/RootLayout";
import { logs } from "@/mocks/logs";

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
  logs,
};
