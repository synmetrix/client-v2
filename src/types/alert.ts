import type { Status } from "./status";
import type { User } from "./user";

export type AlertType = "webhook" | "slack" | "email";

export type Alert = { [key in AlertType]?: string } & {
  id: string;
  name: string;
  type: AlertType;
  schedule: string;
  creator: User;
  updatedAt: string;
  createdAt: string;
  lastActivity: string | null;
  status: Status;
  measures: Record<string, Measure>;
  requestTimeout: number;
  timeoutOnFire: number;
};

interface Measure {
  lowerBound: number;
  upperBound: number;
}

export type AlertFormType = Omit<
  Alert,
  "status" | "creator" | "id" | "createdAt" | "updatedAt" | "lastActivity"
>;
