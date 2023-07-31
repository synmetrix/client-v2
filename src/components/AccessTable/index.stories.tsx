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
  access: [
    {
      id: "1",
      name: "Team manager",
      count: 5,
      createdAt: "10 days ago",
      updatedAt: "10 days ago",
      dataSources: [
        {
          url: "gh-api.clickhouse.tech1",
          type: "full",
        },
        {
          url: "gh-api.clickhouse.tech2",
          type: "partial",
        },
      ],
    },
    {
      id: "2",
      name: "Developer",
      count: 100,
      createdAt: "10 days ago",
      updatedAt: "10 days ago",
      dataSources: [
        {
          url: "gh-api.clickhouse.tech2",
          type: "partial",
        },
      ],
    },
  ],
  onRemove: (access) => console.log("remove", access),
  onEdit: (access) => console.log("edit", access),
};
