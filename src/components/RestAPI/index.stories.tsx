import RootLayout from "@/layouts/RootLayout";

import RestAPI from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/RestAPI",
  component: RestAPI,
} as Meta<typeof RestAPI>;

const Template: StoryFn<typeof RestAPI> = (args) => (
  <RootLayout>
    <RestAPI {...args} dataSourceId="123" branchId="456" />
  </RootLayout>
);

export const Default = Template.bind({});
