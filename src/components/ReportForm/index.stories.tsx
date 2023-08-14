import RootLayout from "@/layouts/RootLayout";
import { queryPreviewMock } from "@/mocks/queryPreview";

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
  query: queryPreviewMock,
  type: "email",
  onSubmit: console.log,
};
