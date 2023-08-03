import RootLayout from "@/layouts/RootLayout";

import AlertForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Alert/AlertForm",
  component: AlertForm,
} as Meta<typeof AlertForm>;

const Template: StoryFn<typeof AlertForm> = (args) => (
  <RootLayout>
    <AlertForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
