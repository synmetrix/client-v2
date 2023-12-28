import RootLayout from "@/layouts/RootLayout";
import DataSourcesMenu from "@/components/DataSourcesMenu";
import { meta } from "@/mocks/explore";
import { dataSourcesMock } from "@/mocks/dataSources";

import ExploreWorkspace from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreWorkspace",
  component: ExploreWorkspace,
} as Meta<typeof ExploreWorkspace>;

const Template: StoryFn<typeof ExploreWorkspace> = (args) => (
  <RootLayout>
    <ExploreWorkspace {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  loading: false,
  meta: {
    loading: false,
    data: meta,
  },
  dataSources: dataSourcesMock,
  source: dataSourcesMock[0],
  header: <DataSourcesMenu selectedId="1" entities={dataSourcesMock} />,
};
