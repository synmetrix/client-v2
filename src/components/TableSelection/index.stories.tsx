import { useForm } from "react-hook-form";

import RootLayout from "@/layouts/RootLayout";

import TableSelection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/TableSelection",
  component: TableSelection,
} as Meta<typeof TableSelection>;

const Template: StoryFn<typeof TableSelection> = (args) => {
  const { control } = useForm();
  return (
    <RootLayout>
      <TableSelection {...args} control={control} type="js" />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  schema: {
    dev_pre_aggregations: {
      orders_orders_rollup_0bohozfp_hle2okkq_1i85rfl: [
        {
          attributes: [],
          name: "users__last_name",
          type: "character varying",
        },
      ],
    },
    dev_prod_preaggregations: {
      orders_second_rollup_0bohozfp_hle2okkq_1i85rfl: [
        {
          attributes: [],
          name: "users__last_name",
          type: "character varying",
        },
      ],
    },
  },
  initialValue: {
    name: "gh-api.clickhouse.tech (Yandex Demo)",
    host: "gh-api.clickhouse.tech",
    user: "user@api.clickhouse.tech",
    username: "user@api.clickhouse.tech",
    port: "12346",
    password: "132456456",
    db_username: "db_username",
    db: "db",
  },
  path: "dev_pre_aggregations",
};
