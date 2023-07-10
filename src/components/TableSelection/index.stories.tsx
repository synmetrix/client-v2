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
      orders_orders_rollup_0bohozfp_hle2okkq_1i85rfl: [
        {
          attributes: [],
          name: "users__last_name",
          type: "character varying",
        },
      ],
    },
  },
  path: "dev_pre_aggregations",
};
