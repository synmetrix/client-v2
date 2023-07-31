import RootLayout from "@/layouts/RootLayout";

import CickHouseIcon from "@/assets/databases/click-house.svg";

import AccessCard from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/RolesAndAccess/AccessCard",
  component: AccessCard,
  argTypes: {
    active: {
      type: "boolean",
      description: "Active state",
      defaultValue: false,
      options: [true, false],
      control: {
        type: "radio",
      },
    },
  },
} as Meta<typeof AccessCard>;

const Template: StoryFn<typeof AccessCard> = (args) => (
  <RootLayout>
    <AccessCard {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  id: "1",
  url: "gh-api.clickhouse.tech",
  access: "full",
  dataSource: {
    name: "Clickhouse",
    icon: <CickHouseIcon />,
  },
  active: false,
  onClick: console.log,
};
