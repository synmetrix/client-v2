import RootLayout from "@/layouts/RootLayout";
import { alerts } from "@/mocks/alerts";
import { queryStateMock } from "@/mocks/queryState";

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
  query: queryStateMock,
};
