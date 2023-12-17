import RootLayout from "@/layouts/RootLayout";

import { RolesAndAccess } from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/RolesAndAccess",
  component: RolesAndAccess,
} as Meta<typeof RolesAndAccess>;

const Template: StoryFn<typeof RolesAndAccess> = (args) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <RootLayout>
      <RolesAndAccess
        {...args}
        isOpen={isOpen}
        onCreate={() => setIsOpen(true)}
        onEdit={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    </RootLayout>
  );
};
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
          name: "gh-api.clickhouse.tech1",
          type: "full",
        },
        {
          name: "gh-api.clickhouse.tech2",
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
          name: "gh-api.clickhouse.tech2",
          type: "partial",
        },
      ],
    },
  ],
  loading: false,
};
