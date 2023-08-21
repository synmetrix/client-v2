import type { Log } from "@/types/logs";

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
