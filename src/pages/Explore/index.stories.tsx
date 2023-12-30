import RootLayout from "@/layouts/RootLayout";
import { meta, exploreMock } from "@/mocks/explore";
import { dataSourcesMock } from "@/mocks/dataSources";

import { Explore } from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Explore",
  component: Explore,
} as Meta<typeof Explore>;

const Template: StoryFn<typeof Explore> = (args) => (
  <RootLayout>
    <Explore {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  meta: {
    loading: false,
    data: meta,
  },
  explorationData: {
    exploration: exploreMock.exploration.data.explorations_by_pk,
    dataset: exploreMock.exploration.data.fetch_dataset,
  },
  rawSql: exploreMock.sql.data.gen_sql.result,
  dataSource: dataSourcesMock[0],
  params: {},
  dataSources: dataSourcesMock,
};
