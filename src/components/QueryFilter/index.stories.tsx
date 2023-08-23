import RootLayout from "@/layouts/RootLayout";

import QueryFilter from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Logs/QueryFilter",
  component: QueryFilter,
} as Meta<typeof QueryFilter>;

const Template: StoryFn<typeof QueryFilter> = (args) => (
  <RootLayout>
    <QueryFilter {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  dataSources: ["datasource1", "datasource2"],
  onChange: console.log,
};
