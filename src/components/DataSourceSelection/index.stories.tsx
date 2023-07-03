import RootLayout from "@/layouts/RootLayout";

import Postgres from "@/assets/databases/postgre.svg";
import Mysql from "@/assets/databases/my-sql.svg";
import Mongo from "@/assets/databases/mongo.svg";
import ClickHouse from "@/assets/databases/click-house.svg";

import DataSourceSelection from ".";

const data = [
  { name: "Postgres", value: "postgres", icon: <Postgres /> },
  { name: "MySQL", value: "mysql", icon: <Mysql /> },
  { name: "Mongo DB", value: "mongobi", icon: <Mongo /> },
  { name: "ClickHouse", value: "clickhouse", icon: <ClickHouse /> },
];

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/DataSourceSelection",
  component: DataSourceSelection,
} as Meta<typeof DataSourceSelection>;

const Template: StoryFn<typeof DataSourceSelection> = (args) => (
  <RootLayout>
    <DataSourceSelection {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  options: data,
};
