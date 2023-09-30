import RootLayout from "@/layouts/RootLayout";

import AuthLinks from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Auth/AuthLinks",
  component: AuthLinks,
} as Meta<typeof AuthLinks>;

const Template: StoryFn<typeof AuthLinks> = (args) => (
  <RootLayout>
    <AuthLinks {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
