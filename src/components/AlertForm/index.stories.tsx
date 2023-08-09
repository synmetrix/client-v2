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
  type: "webhook",
  measures: ["stories.count", "data_table2.count"],
  segments: ["product_categories.toys"],
  dimensions: ["stories.category"],
  timeDimensions: ["stories.time"],
  order: [
    {
      name: "stories.count",
      order: "desc",
    },
  ],
  initialValue: {
    name: "asd",
    type: "webhook",
    measures: {
      "stories.count": {
        lowerBound: 1,
        upperBound: 2,
      },
    },
    schedule: "test",
    requestTimeout: 1,
    timeoutOnFire: 2,
    webhook: "test",
  },
  onSubmit: console.log,
  onTest: console.log,
};
