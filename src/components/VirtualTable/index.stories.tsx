import RootLayout from "@/layouts/RootLayout";

import VirtualTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/VirtualTable",
  component: VirtualTable,
} as Meta<typeof VirtualTable>;

const Template: StoryFn<typeof VirtualTable> = (args) => {
  const [sort, setSort] = useState<any>();

  return (
    <RootLayout>
      <VirtualTable {...args} sortBy={sort} onSortUpdate={setSort} />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  width: "100%",
  messages: [
    {
      type: "error",
      text: "test",
    },
  ],
  data: [
    {
      name: "name1",
      age: "1",
      date: "date1",
    },
    {
      name: "name2",
      age: "3",
      date: "date2",
    },
    {
      name: "name3",
      age: "2",
      date: "date3",
    },
  ],
};
