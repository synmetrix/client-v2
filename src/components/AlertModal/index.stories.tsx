import RootLayout from "@/layouts/RootLayout";
import { alerts } from "@/mocks/alerts";
import { SAMPLE_EXPLORATION } from "@/mocks/exploration";

import AlertModal from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Alerts/AlertModal",
  component: AlertModal,
} as Meta<typeof AlertModal>;

const Template: StoryFn<typeof AlertModal> = (args) => (
  <RootLayout>
    <AlertModal {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  isOpen: true,
  alert: alerts?.[0],
  exploration: SAMPLE_EXPLORATION,
};
