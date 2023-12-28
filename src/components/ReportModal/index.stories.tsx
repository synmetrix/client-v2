import RootLayout from "@/layouts/RootLayout";
import { alerts } from "@/mocks/alerts";
import { SAMPLE_EXPLORATION } from "@/mocks/exploration";

import ReportModal from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Reports/ReportModal",
  component: ReportModal,
} as Meta<typeof ReportModal>;

const Template: StoryFn<typeof ReportModal> = (args) => (
  <RootLayout>
    <ReportModal {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  isOpen: true,
  report: alerts?.[0],
  exploration: SAMPLE_EXPLORATION,
};
