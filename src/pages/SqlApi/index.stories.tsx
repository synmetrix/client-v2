import RootLayout from "@/layouts/RootLayout";

import { SqlApi } from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/SqlApi",
  component: SqlApi,
} as Meta<typeof SqlApi>;

const Template: StoryFn<typeof SqlApi> = (args) => (
  <RootLayout>
    <SqlApi {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {};
