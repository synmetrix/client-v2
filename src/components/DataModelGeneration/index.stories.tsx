import RootLayout from "@/layouts/RootLayout";

import Postgres from "@/assets/databases/postgre.svg";

import DataModelGeneration from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Onboarding/DataModelGeneration",
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
  schema: {
    dev_pre_aggregations: {
      orders_orders_rollup_0bohozfp_hle2okkq_1i85rfl: [
        { attributes: [], name: "users__last_name", type: "character varying" },
      ],
    },
    dev_prod_preaggregations: {
      orders_orders_rollup_0bohozfp_hle2okkq_1i85rfl: [
        { attributes: [], name: "users__last_name", type: "character varying" },
      ],
    },
  },
  onSubmit: console.log,
};
