import type { DataSourceInfo } from "@/types/dataSource";

export const dbMock: DataSourceInfo[] = [
  {
    id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
    name: "Ecom (demo db)",
    dbParams: {
      host: "demo-db.cube.dev",
      port: "5432",
      user: "cube",
      database: "ecom",
      password: "12345",
    },
    createdAt: "2023-05-05T16:17:29.337004+00:00",
    updatedAt: "2023-10-27T14:33:29.331151+00:00",
    type: {
      name: "Postgres",
      value: "postgres",
      icon: { key: null, ref: null, props: {}, _owner: null, _store: {} },
    },
    branch: {
      id: "0630a814-c97d-47c1-8330-1831031dd44a",
      name: "New branch",
      status: "active",
      versions: [
        {
          id: "5739eeb2-c758-463c-a2b7-9c3fdb35bf03",
          dataschemas_aggregate: { aggregate: { count: 3 } },
        },
      ],
    },
  },
  {
    id: "35c549a8-c38a-4ff1-90a5-b3081a35aa93",
    name: "github.demo.altinity.cloud",
    dbParams: {
      ssl: true,
      host: "github.demo.altinity.cloud",
      port: "8443",
      user: "demo",
      database: "default",
      password: "demo",
    },
    createdAt: "2021-09-09T11:52:58.347143+00:00",
    updatedAt: "2023-10-27T14:34:25.180839+00:00",
    type: {
      name: "ClickHouse",
      value: "clickhouse",
      icon: { key: null, ref: null, props: {}, _owner: null, _store: {} },
    },
    branch: {
      id: "d1b64683-cd00-4827-971e-8111786ad0c0",
      name: "main",
      status: "active",
      versions: [
        {
          id: "2dcb6416-0f08-40a2-9cc1-1bc69af7a464",
          dataschemas_aggregate: { aggregate: { count: 2 } },
        },
      ],
    },
  },
  {
    id: "d6ac8421-57a6-41a8-a8cb-d1cb416146eb",
    name: "gh-api.clickhouse.tech (Yandex Demo)",
    dbParams: {
      ssl: true,
      host: "gh-api.clickhouse.tech",
      port: "443",
      user: "play",
      database: "default",
    },
    createdAt: "2021-09-30T08:49:58.660791+00:00",
    updatedAt: "2023-08-25T11:01:50.311173+00:00",
    type: {
      name: "ClickHouse",
      value: "clickhouse",
      icon: { key: null, ref: null, props: {}, _owner: null, _store: {} },
    },
    branch: {
      id: "4c89d897-2a6c-4285-966b-7da14978e503",
      name: "main",
      status: "active",
      versions: [
        {
          id: "63516456-df8a-43f0-b082-ab4083a0f44d",
          dataschemas_aggregate: { aggregate: { count: 3 } },
        },
      ],
    },
  },
];
