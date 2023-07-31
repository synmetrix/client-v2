import RootLayout from "@/layouts/RootLayout";

import SignIn from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/SignIn",
  component: SignIn,
} as Meta<typeof SignIn>;

const Template: StoryFn<typeof SignIn> = (args) => (
  <RootLayout>
    <SignIn {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
