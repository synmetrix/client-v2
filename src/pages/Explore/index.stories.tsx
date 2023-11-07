import RootLayout from "@/layouts/RootLayout";
import { meta, exploreMock } from "@/mocks/explore";

import CickHouseIcon from "@/assets/databases/click-house.svg";

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
  meta,
  exploration: {
    id: "ec5c3d03-ffed-414f-82b7-576f88f29956",
    datasourceId: "65d47193-5242-4722-b2fc-f50a618642c3",
    playgroundSettings: {},
    playgroundState: {
      page: 0,
      limit: 1000,
      order: [],
      offset: 0,
      filters: [],
      measures: [],
      segments: [],
      timezone: "UTC",
      dimensions: ["Animals.image", "Animals.type"],
      timeDimensions: [],
    },
    createdAt: "2023-11-07T13:44:33.353289+00:00",
    updatedAt: "2023-11-07T13:44:33.353289+00:00",
  },
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
