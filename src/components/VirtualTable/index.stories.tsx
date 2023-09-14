import RootLayout from "@/layouts/RootLayout";

import VirtualTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/VirtualTable",
  component: VirtualTable,
} as Meta<typeof VirtualTable>;

const Template: StoryFn<typeof VirtualTable> = (args) => (
  <RootLayout>
    <VirtualTable {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  messages: [
    {
      type: "error",
      text: "test",
    },
  ],
};
