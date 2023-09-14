import RootLayout from "@/layouts/RootLayout";

import AccessTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/RolesAndAccess/AccessTable",
  component: AccessTable,
} as Meta<typeof AccessTable>;

const Template: StoryFn<typeof AccessTable> = (args) => (
  <RootLayout>
    <AccessTable {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  accessLists: [
    {
      id: "1",
      name: "Team manager",
      count: 5,
      createdAt: "10 days ago",
      updatedAt: "10 days ago",
      dataSources: [
        {
          id: "1",
          name: "gh-api.clickhouse.tech1",
          type: "full",
        },
        {
          id: "2",
          name: "gh-api.clickhouse.tech2",
          type: "partial",
        },
      ],
      config: {},
    },
    {
      id: "2",
      name: "Developer",
      count: 100,
      createdAt: "10 days ago",
      updatedAt: "10 days ago",
      dataSources: [
        {
          id: "1",
          name: "gh-api.clickhouse.tech2",
          type: "partial",
        },
      ],
      config: {},
    },
  ],
};
