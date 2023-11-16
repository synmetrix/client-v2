import type { Alert } from "@/types/alert";
import { WEBHOOK_PLACEHOLDER } from "@/utils/constants/links";

import { SAMPLE_EXPLORATION } from "./exploration";

export const alerts: Alert[] = [
  {
    id: "1",
    name: "First",
    type: "WEBHOOK",
    schedule: "dasdasdadad",
    creator: {
      id: "1",
      displayName: "User Name",
      email: "usermail@mail.com",
      teams: [],
      dataSources: [],
      alerts: [],
      reports: [],
    },
    updatedAt: "5 day ago",
    createdAt: "5 day ago",
    lastActivity: "1h/ago (Success)",
    status: "success",
    exploration: SAMPLE_EXPLORATION,
    deliveryConfig: {
      url: WEBHOOK_PLACEHOLDER,
    },
    triggerConfig: {
      lowerBound: 1,
      upperBound: 2,
      timeoutOnFire: 1,
      requestTimeout: 1,
      measures: {
        "test.count": {
          lowerBound: 1,
          upperBound: 2,
        },
      },
    },
  },
  {
    id: "2",
    name: "Second",
    type: "EMAIL",
    schedule: "* * * * *",
    creator: {
      id: "2",
      displayName: "User Name",
      email: "usermail@mail.com",
      teams: [],
      dataSources: [],
      alerts: [],
      reports: [],
    },
    updatedAt: "5 day ago",
    createdAt: "5 day ago",
    lastActivity: "error",
    status: "error",
    exploration: SAMPLE_EXPLORATION,
    deliveryConfig: {
      url: WEBHOOK_PLACEHOLDER,
    },
    triggerConfig: {
      lowerBound: 1,
      upperBound: 2,
      timeoutOnFire: 1,
      requestTimeout: 1,
      measures: {
        "test.count": {
          lowerBound: 1,
          upperBound: 2,
        },
      },
    },
  },
];
