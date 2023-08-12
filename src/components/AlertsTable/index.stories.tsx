import RootLayout from "@/layouts/RootLayout";

import AlertsTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Alerts/AlertsTable",
  component: AlertsTable,
} as Meta<typeof AlertsTable>;

const Template: StoryFn<typeof AlertsTable> = (args) => (
  <RootLayout>
    <AlertsTable {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  alerts: [
    {
      id: "1",
      name: "First",
      type: "webhook",
      schedule: "dasdasdadad",
      creator: {
        fullName: "User Name",
        email: "usermail@mail.com",
      },
      updatedAt: "5 day ago",
      createdAt: "5 day ago",
      lastActivity: "1h/ago (Success)",
      status: "success",
    },
    {
      id: "1",
      name: "First",
      type: "webhook",
      schedule: "dasdasdadad",
      creator: {
        fullName: "User Name",
        email: "usermail@mail.com",
      },
      updatedAt: "5 day ago",
      createdAt: "5 day ago",
      lastActivity: "error",
      status: "error",
    },
  ],
  onEdit: console.log,
  onRemove: console.log,
};
