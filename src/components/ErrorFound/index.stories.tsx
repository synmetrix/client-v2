import RootLayout from "@/layouts/RootLayout";

import ErrorFound from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/ErrorFound",
  component: ErrorFound,
} as Meta<typeof ErrorFound>;

const Template: StoryFn<typeof ErrorFound> = (args) => (
  <RootLayout>
    <ErrorFound {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
