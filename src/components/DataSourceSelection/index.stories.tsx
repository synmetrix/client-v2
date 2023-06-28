import RootLayout from "@/layouts/RootLayout";

import Postgres from "@/assets/databases/postgre.svg";
import Mysql from "@/assets/databases/my-sql.svg";
import Mongo from "@/assets/databases/mongo.svg";
import ClickHouse from "@/assets/databases/click-house.svg";

import DataSourceSelection from ".";

const data = [
  { title: "Postgres", icon: <Postgres /> },
  { title: "MySQL", icon: <Mysql /> },
  { title: "Mongo DB", icon: <Mongo /> },
  { title: "ClickHouse", icon: <ClickHouse /> },
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
