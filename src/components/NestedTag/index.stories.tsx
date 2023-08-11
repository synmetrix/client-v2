import RootLayout from "@/layouts/RootLayout";

import NestedTag from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/NestedTag",
  component: NestedTag,
} as Meta<typeof NestedTag>;

const Template: StoryFn<typeof NestedTag> = (args) => (
  <RootLayout>
    <NestedTag {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  tag: {
    title: "tag1",
    color: "#470D6999",
  },
  nested: [
    {
      title: "tag2",
      color: "#470D6999",
      key: "tag2",
    },
    {
      title: "tag3",
      color: "#470D6999",
      key: "tag3",
    },
  ],
};
