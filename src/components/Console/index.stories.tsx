import RootLayout from "@/layouts/RootLayout";

import Console from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Models/Console",
  component: Console,
} as Meta<typeof Console>;

const Template: StoryFn<typeof Console> = (args) => (
  <RootLayout>
    <Console {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  errors: "any error text",
  onClose: () => {},
};
