import RootLayout from "@/layouts/RootLayout";

import InfoBlock from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/InfoBlock",
  component: InfoBlock,
} as Meta<typeof InfoBlock>;

const Template: StoryFn<typeof InfoBlock> = (args) => (
  <RootLayout>
    <InfoBlock {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  href: "www.test.com",
  linkText: "test",
  text: "Please go to",
};
