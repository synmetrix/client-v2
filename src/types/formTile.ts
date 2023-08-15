import type { ReactNode } from "react";
import type { AlertType } from "./alert";

export interface Tile {
  name: string;
  icon: ReactNode;
  value: AlertType;
}
