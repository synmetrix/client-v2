import RootLayout from "@/layouts/RootLayout";

import PlaygroundFilterSelect from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/PlaygroundFilterSelect",
  component: PlaygroundFilterSelect,
} as Meta<typeof PlaygroundFilterSelect>;

const Template: StoryFn<typeof PlaygroundFilterSelect> = (args) => {
  const [val, setVal] = useState<string>();
  return (
    <RootLayout>
      <PlaygroundFilterSelect
        {...args}
        value={val}
        onChange={(m) => setVal(m?.title)}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  availableMembers: [
    {
      isVisible: true,
      name: "Orders.status",
      shortTitle: "Status",
      suggestFilterValues: true,
      title: "Orders Status",
      type: "string",
    },
    {
      isVisible: true,
      name: "Orders.createdAt",
      shortTitle: "Created at",
      suggestFilterValues: true,
      title: "Orders Created at",
      type: "time",
    },
  ],
};
