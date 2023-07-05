import { useForm } from "react-hook-form";

import RootLayout from "@/layouts/RootLayout";
import type { DataSourceSetupForm } from "@/types/dataSource";

import DataSourceSetupField from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/DataSourceSetupField",
  component: DataSourceSetupField,
} as Meta<typeof DataSourceSetupField>;

const Template: StoryFn<typeof DataSourceSetupField> = (args) => {
  const { control } = useForm<DataSourceSetupForm>();
  return (
    <RootLayout>
      <DataSourceSetupField {...args} control={control} />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  name: "db_params.database",
  label: "Database Name",
  rules: {
    required: true,
  },
  placeholder: "ML_dbname",
  type: "text",
};
