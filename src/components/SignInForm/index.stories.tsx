import RootLayout from "@/layouts/RootLayout";

import SignInForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Auth/SignInForm",
  component: SignInForm,
} as Meta<typeof SignInForm>;

const Template: StoryFn<typeof SignInForm> = (args) => (
  <RootLayout>
    <SignInForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: console.log,
};
