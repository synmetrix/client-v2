import RootLayout from "@/layouts/RootLayout";

import Markdown from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/Markdown",
  component: Markdown,
} as Meta<typeof Markdown>;

const Template: StoryFn<typeof Markdown> = (args) => (
  <RootLayout>
    <Markdown {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  children: "# Here's a Heading",
};
