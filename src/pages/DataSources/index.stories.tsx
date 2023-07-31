import RootLayout from "@/layouts/RootLayout";

import CickHouseIcon from "@/assets/databases/click-house.svg";

import DataSources from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/DataSources",
  component: DataSources,
} as Meta<typeof DataSources>;

const Template: StoryFn<typeof DataSources> = (args) => (
  <RootLayout>
    <DataSources {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  dataSources: [
    {
      id: "1",
      type: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
      host: "gh-api.clickhouse.tech",
      updatedAt: "02.11.2022/ 3:32 PM",
      createdAt: "02.11.2022/ 3:32 PM",
    },
    {
      id: "2",
      type: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
      host: "gh-api.clickhouse.tech",
      updatedAt: "02.11.2022/ 3:32 PM",
      createdAt: "02.11.2022/ 3:32 PM",
    },
    {
      id: "3",
      type: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
      host: "gh-api.clickhouse.tech",
      updatedAt: "02.11.2022/ 3:32 PM",
      createdAt: "02.11.2022/ 3:32 PM",
    },
  ],
};
