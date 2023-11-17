import RootLayout from "@/layouts/RootLayout";

import RoleCard from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Logs/RoleCard",
  component: RoleCard,
} as Meta<typeof RoleCard>;

const Template: StoryFn<typeof RoleCard> = (args) => (
  <RootLayout>
    <RoleCard {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  accessList: {
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
};
