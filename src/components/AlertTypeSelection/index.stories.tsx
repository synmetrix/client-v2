import RootLayout from "@/layouts/RootLayout";
import { alertTypes } from "@/mocks/alertTypes";

import AlertTypeSelection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Alerts/AlertTypeSelection",
  component: AlertTypeSelection,
} as Meta<typeof AlertTypeSelection>;

const Template: StoryFn<typeof AlertTypeSelection> = (args) => (
  <RootLayout>
    <AlertTypeSelection {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  options: alertTypes,
  onSubmit: console.log,
};
