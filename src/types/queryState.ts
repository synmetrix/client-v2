import type { SortBy } from "./sort";

export interface QueryState {
  measures?: string[];
  dimensions?: string[];
  segments?: string[];
  timeDimensions?: {
    dimension: string;
    granularity: string;
  }[];
  order?: SortBy[];
}
