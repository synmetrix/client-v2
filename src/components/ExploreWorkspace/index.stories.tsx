import RootLayout from "@/layouts/RootLayout";
import DataSourcesMenu from "@/components/DataSourcesMenu";
import { meta } from "@/mocks/explore";

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
  meta,
  params: {
    dataSourceId: "35c549a8-c38a-4ff1-90a5-b3081a35aa93",
    explorationId: "b24d941c-94ac-4bca-8a3a-9e179a4fc06e",
    screenshotMode: false,
  },
  source: {
    id: "35c549a8-c38a-4ff1-90a5-b3081a35aa93",
    name: "github.demo.altinity.cloud",
    db_type: "CLICKHOUSE",
    db_params: {
      ssl: true,
      host: "github.demo.altinity.cloud",
      port: "8443",
      user: "demo",
      database: "default",
      password: "demo",
    },
    created_at: "2021-09-09T11:52:58.347143+00:00",
    updated_at: "2023-08-25T07:04:44.238898+00:00",
  },
  title: "Explore",
  header: (
    <DataSourcesMenu
      entities={[
        { id: "1", name: "datasource1" },
        { id: "2", name: "datasource2" },
      ]}
    />
  ),
};
