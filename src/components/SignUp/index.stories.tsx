import RootLayout from "@/layouts/RootLayout";

import SignUp from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/SignUp",
  component: SignUp,
} as Meta<typeof SignUp>;

const Template: StoryFn<typeof SignUp> = (args) => (
  <RootLayout>
    <SignUp {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
