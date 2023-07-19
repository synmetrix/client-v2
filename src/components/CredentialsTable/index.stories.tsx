import RootLayout from "@/layouts/RootLayout";

import CickHouseIcon from "@/assets/databases/click-house.svg";

import CredentialsTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/SQLApi/CredentialsTable",
  component: CredentialsTable,
} as Meta<typeof CredentialsTable>;

const Template: StoryFn<typeof CredentialsTable> = (args) => (
  <RootLayout>
    <CredentialsTable {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  credentials: [
    {
      id: "1",
      member: {
        fullName: "Ivan Fokeev",
      },
      dataSource: {
        url: "gh-api.clickhouse.tech",
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
      login: "mysql_db",
      createdAt: "02.11.2022/ 3:32 PM",
    },
    {
      id: "2",
      member: {
        fullName: "Ivan Fokeev",
      },
      dataSource: {
        url: "gh-api.clickhouse.tech",
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
      login: "mysql_db",
      createdAt: "02.11.2022/ 3:32 PM",
    },
  ],
};
