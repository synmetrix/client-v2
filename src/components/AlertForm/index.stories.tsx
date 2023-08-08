import RootLayout from "@/layouts/RootLayout";

import AlertForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Alert/AlertForm",
  component: AlertForm,
} as Meta<typeof AlertForm>;

const Template: StoryFn<typeof AlertForm> = (args) => (
  <RootLayout>
    <AlertForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  measures: ["stories.count", "data_table2.count"],
  dimensions: ["stories.category"],
  timeDimensions: ["stories.time"],
  order: [
    {
      name: "stories.count",
      order: "desc",
    },
  ],
};
