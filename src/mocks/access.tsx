import type { DataResource, DataSourceAccess } from "@/types/access";

import CickHouseIcon from "@/assets/databases/click-house.svg";

export const accessItems: DataSourceAccess[] = [
  {
    id: "1",
    name: "gh-api.clickhouse.tech1",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "2",
    name: "gh-api.clickhouse.tech2",
    access: "no",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "3",
    name: "gh-api.clickhouse.tech3",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "4",
    name: "gh-api.clickhouse.tech4",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "5",
    name: "gh-api.clickhouse.tech5",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "6",
    name: "gh-api.clickhouse.tech6",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "7",
    name: "gh-api.clickhouse.tech8",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
  {
    id: "9",
    name: "gh-api.clickhouse.tech9",
    access: "full",
    dataSource: {
      name: "Clickhouse",
      icon: <CickHouseIcon />,
    },
  },
];

export const resourceMock: DataResource[] = [
  {
    id: "1",
    title: "github.demo.altinity.cloud",
    dataModels: [
      {
        title: "LineItems",
        measures: [{ label: "Stocks", value: "stocks" }],
        dimensions: [
          { label: "Name", value: "name" },
          { label: "Address", value: "adress" },
          { label: "Stocks", value: "stocks" },
        ],
        segments: [{ label: "Stocks", value: "stocks" }],
      },
      {
        title: "Companies",
        measures: [{ label: "Stocks", value: "stocks" }],
        dimensions: [
          { label: "Name", value: "name" },
          { label: "Address", value: "adress" },
          { label: "Stocks", value: "stocks" },
        ],
        segments: [{ label: "Stocks", value: "stocks" }],
      },
      {
        title: "Orders",
        measures: [{ label: "Stocks", value: "stocks" }],
        dimensions: [
          { label: "Name", value: "name" },
          { label: "Address", value: "adress" },
          { label: "Stocks", value: "stocks" },
        ],
        segments: [{ label: "Stocks", value: "stocks" }],
      },
    ],
  },
];
