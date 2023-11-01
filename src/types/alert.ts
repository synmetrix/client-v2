import type { Status } from "./status";
import type { User, RawUser } from "./user";
import type { Exploration } from "./exploration";

export type AlertType = "WEBHOOK" | "SLACK" | "EMAIL";

export interface AlertTriggerConfig {
  lowerBound: number;
  upperBound: number;
  timeoutOnFire: number;
  requestTimeout: number;
  measures: Record<string, Measure>;
}

export interface AlertDeliveryConfig {
  url?: string | null;
  address?: string | null;
}

export type RawAlert = { [key in AlertType]?: string } & {
  id: string;
  created_at: string;
  delivery_config: AlertDeliveryConfig;
  delivery_type: AlertType;
  exploration: Exploration;
  name: string;
  schedule: string;
  trigger_config: AlertTriggerConfig;
  updated_at: string;
  user: RawUser;
};

export type Alert = { [key in AlertType]?: string } & {
  id?: string | undefined;
  name: string;
  type: AlertType;
  schedule: string;
  creator: User;
  updatedAt: string;
  createdAt: string;
  lastActivity: string | null;
  exploration: Exploration;
  status: Status;
  deliveryConfig: AlertDeliveryConfig;
  triggerConfig: AlertTriggerConfig;
};

interface Measure {
  lowerBound: number;
  upperBound: number;
}

export type AlertFormType = Omit<
  Alert,
  "status" | "creator" | "createdAt" | "updatedAt" | "lastActivity"
>;
