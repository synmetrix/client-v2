import RootLayout from "@/layouts/RootLayout";

import CickHouseIcon from "@/assets/databases/click-house.svg";

import DataSourceTag from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/DataSourceTag",
  component: DataSourceTag,
} as Meta<typeof DataSourceTag>;

const Template: StoryFn<typeof DataSourceTag> = (args) => (
  <RootLayout>
    <DataSourceTag {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  dataSource: {
    name: "Clickhouse",
    icon: <CickHouseIcon />,
  },
};
