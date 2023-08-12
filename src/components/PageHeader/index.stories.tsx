import RootLayout from "@/layouts/RootLayout";

import PageHeader from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/PageHeader",
  component: PageHeader,
} as Meta<typeof PageHeader>;

const Template: StoryFn<typeof PageHeader> = (args) => (
  <RootLayout>
    <PageHeader {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  action: "Action",
  onClick: console.log,
};
