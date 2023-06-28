import RootLayout from "@/layouts/RootLayout";

import Postgres from "@/assets/databases/postgre.svg";
import Mysql from "@/assets/databases/my-sql.svg";
import Mongo from "@/assets/databases/mongo.svg";
import ClickHouse from "@/assets/databases/click-house.svg";

import DataSourceSelection from ".";

const data = [
  { title: "Postgres", value: "postgres", icon: <Postgres /> },
  { title: "MySQL", value: "mysql", icon: <Mysql /> },
  { title: "Mongo DB", value: "mongobi", icon: <Mongo /> },
  { title: "ClickHouse", value: "clickhouse", icon: <ClickHouse /> },
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
