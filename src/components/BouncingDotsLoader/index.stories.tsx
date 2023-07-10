import RootLayout from "@/layouts/RootLayout";

import BouncingDotsLoader from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/BouncingDotsLoader",
  component: BouncingDotsLoader,
} as Meta<typeof BouncingDotsLoader>;

const Template: StoryFn<typeof BouncingDotsLoader> = (args) => (
  <RootLayout>
    <BouncingDotsLoader {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
