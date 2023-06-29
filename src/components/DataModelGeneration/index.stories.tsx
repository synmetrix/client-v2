import RootLayout from "@/layouts/RootLayout";

import Postgres from "@/assets/databases/postgre.svg";

import DataModelGeneration from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/DataModelGeneration",
  component: DataModelGeneration,
} as Meta<typeof DataModelGeneration>;

const Template: StoryFn<typeof DataModelGeneration> = (args) => (
  <RootLayout>
    <DataModelGeneration {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  dataSource: {
    icon: <Postgres />,
    name: "gh-api.clickhouse.tech (Yandex Demo)",
  },
};
