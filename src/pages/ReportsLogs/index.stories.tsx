import RootLayout from "@/layouts/RootLayout";
import { logs } from "@/mocks/logs";

import ReportsLogs from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/ReportsLogs",
  component: ReportsLogs,
} as Meta<typeof ReportsLogs>;

const Template: StoryFn<typeof ReportsLogs> = (args) => (
  <RootLayout>
    <ReportsLogs {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  logs,
};
