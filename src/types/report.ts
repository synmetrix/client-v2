import type { AlertType } from "./alert";
import type { User } from "./user";

export type Report = { [key in AlertType]?: string } & {
  id: string;
  name: string;
  type: AlertType;
  schedule: string;
  creator: User;
  updatedAt: string;
  createdAt: string;
  lastActivity: string | null;
  status: "success" | "processing" | "error" | "default" | "warning";
};

export type ReportFormType = Omit<
  Report,
  "status" | "creator" | "id" | "createdAt" | "updatedAt" | "lastActivity"
>;
