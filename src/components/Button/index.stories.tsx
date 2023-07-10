import RootLayout from "@/layouts/RootLayout";

import Button from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/Button",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <RootLayout>
    <Button {...args}> Button </Button>
  </RootLayout>
);

export const Default = Template.bind({});
