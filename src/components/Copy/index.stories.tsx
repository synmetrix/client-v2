import RootLayout from "@/layouts/RootLayout";

import Copy from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/Copy",
  component: Copy,
} as Meta<typeof Copy>;

const Template: StoryFn<typeof Copy> = (args) => (
  <RootLayout>
    <Copy {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  value:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dicta aperiam minima, sunt et voluptatem iure qui soluta nam rem, autem quae maiores! Voluptate officia delectus sed eos explicabo eaque?",
  label: "label",
  layout: "vertical",
};
