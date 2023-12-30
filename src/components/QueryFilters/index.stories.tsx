import RootLayout from "@/layouts/RootLayout";
import { dataSourcesMock } from "@/mocks/dataSources";

import QueryFilters from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Logs/QueryFilters",
  component: QueryFilters,
} as Meta<typeof QueryFilters>;

const Template: StoryFn<typeof QueryFilters> = (args) => (
  <RootLayout>
    <QueryFilters {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  dataSources: dataSourcesMock,
  onChange: console.log,
};
