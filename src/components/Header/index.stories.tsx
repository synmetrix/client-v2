import RootLayout from "@/layouts/RootLayout";

import Header from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Header",
  component: Header,
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => (
  <RootLayout>
    <Header {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
