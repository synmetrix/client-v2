import RootLayout from "@/layouts/RootLayout";
import { queryStateMock } from "@/mocks/queryState";
import { SAMPLE_EXPLORATION } from "@/mocks/exploration";
import { WEBHOOK_PLACEHOLDER } from "@/utils/constants/links";

import AlertForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Alerts/AlertForm",
  component: AlertForm,
} as Meta<typeof AlertForm>;

const Template: StoryFn<typeof AlertForm> = (args) => (
  <RootLayout>
    <AlertForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  query: queryStateMock,
  type: "WEBHOOK",
  initialValue: {
    name: "asd",
    type: "WEBHOOK",
    schedule: "test",
    deliveryConfig: {
      url: WEBHOOK_PLACEHOLDER,
    },
    exploration: SAMPLE_EXPLORATION,
    triggerConfig: {
      lowerBound: 1,
      upperBound: 2,
      measures: {
        "GithubEvents.count": {
          lowerBound: 1,
          upperBound: 2,
        },
      },
      timeoutOnFire: 1,
      requestTimeout: 1,
    },
  },
  onSubmit: console.log,
  onTest: console.log,
};
