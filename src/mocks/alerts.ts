import type { Alert } from "@/types/alert";

export const alerts: Alert[] = [
  {
    id: "1",
    name: "First",
    type: "webhook",
    schedule: "dasdasdadad",
    creator: {
      fullName: "User Name",
      email: "usermail@mail.com",
    },
    updatedAt: "5 day ago",
    createdAt: "5 day ago",
    lastActivity: "1h/ago (Success)",
    status: "success",
    webhook: "test",
    measures: {
      "stories.count": {
        lowerBound: 15,
        upperBound: 20,
      },
    },
    requestTimeout: 20,
    timeoutOnFire: 30,
  },
  {
    id: "2",
    name: "First",
    type: "email",
    schedule: "dasdasdadad",
    creator: {
      fullName: "User Name",
      email: "usermail@mail.com",
    },
    updatedAt: "5 day ago",
    createdAt: "5 day ago",
    lastActivity: "error",
    status: "error",
    email: "test",
    measures: {
      "data_table2.count": {
        lowerBound: 15,
        upperBound: 20,
      },
    },
    requestTimeout: 20,
    timeoutOnFire: 30,
  },
];
