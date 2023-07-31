import RootLayout from "@/layouts/RootLayout";

import CickHouseIcon from "@/assets/databases/click-house.svg";

import DataSourceCard from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/DataSourceCard",
  component: DataSourceCard,
} as Meta<typeof DataSourceCard>;

const Template: StoryFn<typeof DataSourceCard> = (args) => (
  <RootLayout>
    <DataSourceCard {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  id: "1",
  type: {
    name: "Clickhouse",
    icon: <CickHouseIcon />,
  },
  host: "gh-api.clickhouse.tech",
  updatedAt: "02.11.2022/ 3:32 PM",
  createdAt: "02.11.2022/ 3:32 PM",
};
