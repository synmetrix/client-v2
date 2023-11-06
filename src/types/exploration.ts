import type { QueryState } from "./queryState";

export interface Exploration {
  id: string;
  playground_state: QueryState;
}
