import type { Log, QueryLog } from "@/types/logs";

export const logs: Log[] = [
  {
    id: "1",
    date: "2023/06/06 at 10:30:31",
    status: "success",
    name: "first",
    type: "webhook",
    message: "Success: Webhook request completed without errors.",
  },
  {
    id: "2",
    date: "2023/06/06 at 10:30:31",
    status: "error",
    name: "second",
    type: "slack",
    message:
      "Error: Slack request completed with errors. Slack request completed with errors. Slack request completed with errors. Slack request completed with errors.",
  },
];

export const queryMocks: QueryLog[] = [
  {
    id: "1",
    dataSource: "gh-api.clickhouse.tech",
    path: "/Synmetrixjs/datasources/v1/meta",
    events: 3,
    creator: {
      id: "1",
      displayName: "User Name",
      email: "user@email.com",
    },
    duration: 395,
    startTime: "2023-06-13 19:16:09.773",
    createdAt: "2023-06-13 19:16:09.773",
  },
  {
    id: "2",
    dataSource: "gh-api.clickhouse.tech",
    path: "/Synmetrixjs/datasources/v1/meta",
    events: 3,
    creator: {
      id: "1",
      displayName: "User Name",
      email: "user@email.com",
    },
    duration: 395,
    startTime: "2023-06-13 19:16:09.773",
    createdAt: "2023-06-13 19:16:09.773",
  },
];
