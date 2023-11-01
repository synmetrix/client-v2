import type { AlertType, AlertDeliveryConfig } from "./alert";
import type { User, RawUser } from "./user";
import type { Exploration } from "./exploration";

export type RawReport = { [key in AlertType]?: string } & {
  id: string;
  created_at: string;
  delivery_config: AlertDeliveryConfig;
  delivery_type: AlertType;
  exploration: Exploration;
  name: string;
  schedule: string;
  updated_at: string;
  user: RawUser;
};

export type Report = { [key in AlertType]?: string } & {
  id?: string | undefined;
  name: string;
  type: AlertType;
  schedule: string;
  creator: User;
  updatedAt: string;
  createdAt: string;
  exploration: Exploration;
  deliveryConfig: AlertDeliveryConfig;
  lastActivity: string | null;
  status: "success" | "processing" | "error" | "default" | "warning";
};

export type ReportFormType = Omit<
  Report,
  "status" | "creator" | "createdAt" | "updatedAt" | "lastActivity"
>;
