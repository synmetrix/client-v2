import RootLayout from "@/layouts/RootLayout";
import { logs } from "@/mocks/logs";

import AlertsLogs from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/AlertsLogs",
  component: AlertsLogs,
} as Meta<typeof AlertsLogs>;

const Template: StoryFn<typeof AlertsLogs> = (args) => (
  <RootLayout>
    <AlertsLogs {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  logs,
};
