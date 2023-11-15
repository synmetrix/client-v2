import RootLayout from "@/layouts/RootLayout";
import { dbMock } from "@/mocks/db";

import DataSourcesMenu from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/DataSourcesMenu",
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
  entities: dbMock,
};
