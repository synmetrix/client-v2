import type { DataSourceInfo } from "@/types/dataSource";

export const queryFiltersMock: DataSourceInfo[] = [
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
    updatedAt: "2023-08-25T07:04:44.238898+00:00",
    type: {
      name: "ClickHouse",
      value: "clickhouse",
      icon: { key: null, ref: null, props: {}, _owner: null, _store: {} },
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
  },
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
    updatedAt: "2023-10-07T05:38:58.088981+00:00",
    type: {
      name: "Postgres",
      value: "postgres",
      icon: { key: null, ref: null, props: {}, _owner: null, _store: {} },
    },
  },
];
