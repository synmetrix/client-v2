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
  width: "100%",
  // rowHeight: 300,
  messages: [
    {
      type: "error",
      text: "test",
    },
  ],
  data: [
    {
      name: "name1",
      age: "age1",
      date: "date1",
    },
    {
      name: "name2",
      age: "age2",
      date: "date2",
    },
    {
      name: "name3",
      age: "age3",
      date: "date3",
    },
  ],
};
