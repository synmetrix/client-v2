import { MemoryRouter } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";
import BasicLayout from "@/layouts/BasicLayout";

import RolesAndAccess from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/RolesAndAccess",
  component: RolesAndAccess,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/settings/roles_and_access"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof RolesAndAccess>;

const Template: StoryFn<typeof RolesAndAccess> = (args) => (
  <RootLayout>
    <BasicLayout loggedIn>
      <RolesAndAccess {...args} />
    </BasicLayout>
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
};
