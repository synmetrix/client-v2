import RootLayout from "@/layouts/RootLayout";

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
  logs: [
    {
      id: "1",
      dataSource: "gh-api.clickhouse.tech",
      path: "/Synmetrixjs/datasources/v1/meta",
      events: 3,
      creator: {
        id: "1",
        displayName: "User Name",
        email: "user@email.com",
      },
      duration: 395,
      startTime: "2023-06-13 19:16:09.773",
      createdAt: "2023-06-13 19:16:09.773",
    },
    {
      id: "2",
      dataSource: "gh-api.clickhouse.tech",
      path: "/Synmetrixjs/datasources/v1/meta",
      events: 3,
      creator: {
        id: "1",
        displayName: "User Name",
        email: "user@email.com",
      },
      duration: 395,
      startTime: "2023-06-13 19:16:09.773",
      createdAt: "2023-06-13 19:16:09.773",
    },
  ],
};
