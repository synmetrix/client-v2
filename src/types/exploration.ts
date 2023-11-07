import type { CubeMember } from "./cube";
import type { LoadingProgress } from "./loading";
import type { QuerySettings } from "./querySettings";
import type { SortBy } from "./sort";

export interface RawSql {
  params: any[];
  preAggregations: any[];
  sql: string;
}

export interface PlaygroundState {
  dimensions?: string[];
  filters?: string[];
  limit?: number;
  measures?: CubeMember[];
  offset?: number;
  order?: SortBy[];
  page?: number;
  segments?: CubeMember[];
  timeDimensions?: { dimension: string; granularity: string }[];
  timezone?: string;
}

export interface ExplorationState extends PlaygroundState {
  modelingSection?: string;
  rows: object[];
  columns: object[];
  settings: QuerySettings;
  loading: boolean;
  progress: LoadingProgress;
  skippedMembers?: string[];
  error?: boolean;
  hitLimit?: boolean;
  limit?: number;
  rawSql?: RawSql;
}

export interface Exploration {
  id: string;
  datasourceId: string;
  playgroundSettings: PlaygroundState;
  playgroundState: PlaygroundState;
  createdAt: string;
  updatedAt: string;
}

export interface DataSchemaValidation {
  code: string;
  message: string;
  error?: {
    message: string;
  };
}
