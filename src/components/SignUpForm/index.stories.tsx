import RootLayout from "@/layouts/RootLayout";

import SignUpForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/SignUpForm",
  component: SignUpForm,
} as Meta<typeof SignUpForm>;

const Template: StoryFn<typeof SignUpForm> = (args) => (
  <RootLayout>
    <SignUpForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: console.log,
};
