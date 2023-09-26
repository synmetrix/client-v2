import RootLayout from "@/layouts/RootLayout";

import DataSourcesMenu from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/DataSourcesMenu",
  component: DataSourcesMenu,
} as Meta<typeof DataSourcesMenu>;

const Template: StoryFn<typeof DataSourcesMenu> = (args) => {
  const [selected, setSelected] = useState<string>("");
  return (
    <RootLayout>
      <DataSourcesMenu {...args} selectedId={selected} onChange={setSelected} />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  entities: [
    { id: "1", name: "datasource1" },
    { id: "2", name: "datasource2" },
  ],
};
