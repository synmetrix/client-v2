import RootLayout from "@/layouts/RootLayout";

import Navbar from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Navbar",
  component: Navbar,
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = (args) => (
  <RootLayout>
    <Navbar {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
