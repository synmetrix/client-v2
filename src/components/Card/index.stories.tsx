import RootLayout from "@/layouts/RootLayout";

import Card from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/Card",
  component: Card,
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => (
  <RootLayout>
    <Card {...args}>any children</Card>
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  title: "Title",
};
