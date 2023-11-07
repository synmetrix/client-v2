import RootLayout from "@/layouts/RootLayout";
import { meta, exploreMock } from "@/mocks/explore";
import type { Explorations } from "@/graphql/generated";

import CickHouseIcon from "@/assets/databases/click-house.svg";

import { Explore, prepareExplorationData } from ".";

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
  meta,
  exploration: prepareExplorationData(
    exploreMock.exploration.data.explorations_by_pk as Explorations
  ),
  rawSql: exploreMock.sql.data.gen_sql.result,
  dataSet: exploreMock.exploration.data.fetch_dataset,
  dataSchemaValidation: {
    code: "ok",
    message: "Validation is OK",
  },
  dataSource: {
    id: "1",
    branch: {
      id: "1",
      versions: [],
      name: "main",
      status: "active",
    },
    type: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
    name: "Clickhouse",
    dbParams: {
      host: "gh-api.clickhouse.tech",
    },
    updatedAt: "02.11.2022/ 3:32 PM",
    createdAt: "02.11.2022/ 3:32 PM",
  },
  params: {
    screenshotMode: false,
  },
  dataSources: [
    {
      id: "1",
      branch: {
        id: "1",
        versions: [],
        name: "main",
        status: "active",
      },
      type: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
      name: "Clickhouse",
      dbParams: {
        host: "gh-api.clickhouse.tech",
      },
      updatedAt: "02.11.2022/ 3:32 PM",
      createdAt: "02.11.2022/ 3:32 PM",
    },
    {
      id: "2",
      branch: {
        id: "1",
        versions: [],
        name: "main",
        status: "active",
      },
      type: {
        name: "Clickhouse",
        icon: <CickHouseIcon />,
      },
      name: "Clickhouse",
      dbParams: {
        host: "gh-api.clickhouse.tech",
      },
      updatedAt: "02.11.2022/ 3:32 PM",
      createdAt: "02.11.2022/ 3:32 PM",
    },
  ],
};
