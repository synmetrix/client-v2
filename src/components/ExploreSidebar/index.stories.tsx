import RootLayout from "@/layouts/RootLayout";

import ExploreSidebar from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreSidebar",
  component: ExploreSidebar,
} as Meta<typeof ExploreSidebar>;

const Template: StoryFn<typeof ExploreSidebar> = (args) => {
  const [selected, setSelected] = useState<string>("gh-api.clickhouse.tech");
  return (
    <RootLayout>
      <ExploreSidebar
        {...args}
        selected={selected}
        onDataBaseChange={setSelected}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  dataBases: [
    {
      name: "gh-api.clickhouse.tech",
      tables: {
        stocks: {
          deminsions: ["Stocks"],
          measures: ["Stocks"],
        },
        stocks2: {
          deminsions: ["Stocks"],
          measures: ["Stocks"],
        },
      },
    },
    {
      name: "gh-api.clickhouse2.tech",
      tables: {
        stocks: {
          deminsions: ["Stocks"],
          measures: ["Stocks"],
        },
      },
    },
  ],
};
