import RootLayout from "@/layouts/RootLayout";

import CickHouseIcon from "@/assets/databases/click-house.svg";

import AccessSelection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/RolesAndAccess/AccessSelection",
  component: AccessSelection,
} as Meta<typeof AccessSelection>;

const Template: StoryFn<typeof AccessSelection> = (args) => {
  const [active, setActive] = useState<string>();
  return (
    <RootLayout>
      <AccessSelection
        {...args}
        onSelect={(a) => setActive(a.id)}
        active={active}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  items: [
    {
      id: "1",
      name: "gh-api.clickhouse.tech1",
      access: "full",
      dataSource: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
    },
    {
      id: "2",
      name: "gh-api.clickhouse.tech2",
      access: "no",
      dataSource: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
    },
    {
      id: "3",
      name: "gh-api.clickhouse.tech3",
      access: "full",
      dataSource: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
    },
    {
      id: "4",
      name: "gh-api.clickhouse.tech4",
      access: "full",
      dataSource: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
    },
    {
      id: "5",
      name: "gh-api.clickhouse.tech5",
      access: "full",
      dataSource: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
    },
    {
      id: "6",
      name: "gh-api.clickhouse.tech6",
      access: "full",
      dataSource: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
    },
    {
      id: "7",
      name: "gh-api.clickhouse.tech8",
      access: "full",
      dataSource: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
    },
    {
      id: "9",
      name: "gh-api.clickhouse.tech9",
      access: "full",
      dataSource: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
    },
  ],
};
