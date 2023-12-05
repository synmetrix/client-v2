import type { CubeMember } from "./cube";
import type { LoadingProgress } from "./loading";
import type { QuerySettings } from "./querySettings";
import type { QueryState } from "./queryState";
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
  progress: LoadingProgress;
  skippedMembers?: string[];
  loading?: boolean;
  error?: boolean;
  hitLimit?: boolean;
  limit?: number;
  rawSql?: RawSql;
}

export interface Exploration {
  id: string;
  datasource_id: string;
  playground_settings: PlaygroundState;
  playground_state: QueryState;
  created_at: string;
  updated_at: string;
}

export interface DataSchemaValidation {
  code: string;
  message: string;
  error?: {
    message: string;
  };
}
