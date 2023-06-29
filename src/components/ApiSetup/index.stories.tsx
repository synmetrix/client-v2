import RootLayout from "@/layouts/RootLayout";

import ApiSetup from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/ApiSetup",
  component: ApiSetup,
} as Meta<typeof ApiSetup>;

const Template: StoryFn<typeof ApiSetup> = (args) => (
  <RootLayout>
    <ApiSetup {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
