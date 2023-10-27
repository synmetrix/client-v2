import RootLayout from "@/layouts/RootLayout";
import { queryFiltersMock } from "@/mocks/queryFilters";

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
  dataSources: queryFiltersMock,
  onChange: console.log,
};
