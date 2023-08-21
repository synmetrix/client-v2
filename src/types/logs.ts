import type { AlertType } from "./alert";
import type { Status } from "./status";

export interface Log {
  id: string;
  date: string;
  status: Status;
  name: string;
  type: AlertType;
  message: string;
}
