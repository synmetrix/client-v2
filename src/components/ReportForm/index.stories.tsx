import RootLayout from "@/layouts/RootLayout";
import { queryStateMock } from "@/mocks/queryState";

import ReportForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Reports/ReportForm",
  component: ReportForm,
} as Meta<typeof ReportForm>;

const Template: StoryFn<typeof ReportForm> = (args) => (
  <RootLayout>
    <ReportForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  query: queryStateMock,
  type: "EMAIL",
  onSubmit: console.log,
};
