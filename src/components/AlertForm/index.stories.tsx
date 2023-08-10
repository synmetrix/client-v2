import RootLayout from "@/layouts/RootLayout";
import { queryPreviewMock } from "@/mocks/queryPreview";

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
  ...queryPreviewMock,
  type: "webhook",
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
