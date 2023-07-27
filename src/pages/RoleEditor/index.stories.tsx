import RootLayout from "@/layouts/RootLayout";
import BasicLayout from "@/layouts/BasicLayout";
import type { DataResource, DataSourceAccess } from "@/types/access";

import CickHouseIcon from "@/assets/databases/click-house.svg";

import RoleEditor from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/RoleEditor",
  component: RoleEditor,
} as Meta<typeof RoleEditor>;

const Template: StoryFn<typeof RoleEditor> = (args) => (
  <RootLayout>
    <BasicLayout>
      <RoleEditor {...args} />
    </BasicLayout>
  </RootLayout>
);

const accessItems: DataSourceAccess[] = [
  {
    id: "1",
    url: "gh-api.clickhouse.tech1",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "2",
    url: "gh-api.clickhouse.tech2",
    access: "no",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "3",
    url: "gh-api.clickhouse.tech3",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "4",
    url: "gh-api.clickhouse.tech4",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "5",
    url: "gh-api.clickhouse.tech5",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "6",
    url: "gh-api.clickhouse.tech6",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "7",
    url: "gh-api.clickhouse.tech8",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "9",
    url: "gh-api.clickhouse.tech9",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
];

const resourceMock: DataResource[] = [
  {
    id: "1",
    title: "github.demo.altinity.cloud",
    dataModels: [
      {
        title: "LineItems",
        measures: ["Stocks"],
        dimensions: ["Name", "Address", "Stocks"],
        segments: ["Stocks"],
      },
      {
        title: "Companies",
        measures: ["Stocks"],
        dimensions: ["Name", "Address", "Stocks"],
        segments: ["Stocks"],
      },
      {
        title: "Orders",
        measures: ["Stocks"],
        dimensions: ["Name", "Address", "Stocks"],
        segments: ["Stocks"],
      },
    ],
  },
];

export const Default = Template.bind({});

Default.args = {
  resources: resourceMock,
  accessItems,
};
