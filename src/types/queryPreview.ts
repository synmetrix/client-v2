import type { Sort } from "./sort";

export interface QueryPreview {
  measures?: string[];
  dimensions?: string[];
  segments?: string[];
  timeDimensions?: {
    dimension: string;
    granularity: string;
  }[];
  order?: Record<string, Sort>;
}
