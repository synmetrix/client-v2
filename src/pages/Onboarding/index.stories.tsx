import RootLayout from "@/layouts/RootLayout";

import Onboarding from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Onboarding",
  component: Onboarding,
} as Meta<typeof Onboarding>;

const Template: StoryFn<typeof Onboarding> = (args) => (
  <RootLayout>
    <Onboarding {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
