import type { AlertType } from "./alert";
import type { Status } from "./status";
import type { User } from "./user";

export interface Log {
  id: string;
  date: string;
  status: Status;
  name: string;
  type: AlertType;
  message: string;
}

export interface QueryLog {
  id: string;
  dataSource: string;
  path: string;
  events: number;
  creator: User;
  duration: number;
  startTime: string;
  createdAt: string;
}
