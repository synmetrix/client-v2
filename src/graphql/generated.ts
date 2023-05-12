import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  citext: any;
  json: any;
  jsonb: any;
  timestamp: any;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["Boolean"]>;
  _gt?: InputMaybe<Scalars["Boolean"]>;
  _gte?: InputMaybe<Scalars["Boolean"]>;
  _in?: InputMaybe<Scalars["Boolean"][]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["Boolean"]>;
  _lte?: InputMaybe<Scalars["Boolean"]>;
  _neq?: InputMaybe<Scalars["Boolean"]>;
  _nin?: InputMaybe<Scalars["Boolean"][]>;
};

export type CheckConnectionOutput = {
  __typename?: "CheckConnectionOutput";
  code: Scalars["String"];
  message?: Maybe<Scalars["String"]>;
};

export type CreateTeamOutput = {
  __typename?: "CreateTeamOutput";
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
};

export type ExportDataModelsOutput = {
  __typename?: "ExportDataModelsOutput";
  download_url: Scalars["String"];
};

export type FetchDatasetOutput = {
  __typename?: "FetchDatasetOutput";
  annotation?: Maybe<Scalars["json"]>;
  data?: Maybe<Scalars["json"]>;
  dataSource?: Maybe<Scalars["String"]>;
  dbType?: Maybe<Scalars["String"]>;
  external?: Maybe<Scalars["Boolean"]>;
  hitLimit?: Maybe<Scalars["Boolean"]>;
  lastRefreshTime?: Maybe<Scalars["String"]>;
  progress?: Maybe<Scalars["json"]>;
  query?: Maybe<Scalars["json"]>;
  slowQuery?: Maybe<Scalars["Boolean"]>;
};

export type GenSqlOutput = {
  __typename?: "GenSQLOutput";
  result?: Maybe<Scalars["json"]>;
};

export type GenSourceSchemaOutput = {
  __typename?: "GenSourceSchemaOutput";
  code: Scalars["String"];
  message?: Maybe<Scalars["String"]>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["Int"]>;
  _gt?: InputMaybe<Scalars["Int"]>;
  _gte?: InputMaybe<Scalars["Int"]>;
  _in?: InputMaybe<Scalars["Int"][]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["Int"]>;
  _lte?: InputMaybe<Scalars["Int"]>;
  _neq?: InputMaybe<Scalars["Int"]>;
  _nin?: InputMaybe<Scalars["Int"][]>;
};

export type InviteTeamMemberOutput = {
  __typename?: "InviteTeamMemberOutput";
  code?: Maybe<Scalars["String"]>;
  memberId?: Maybe<Scalars["uuid"]>;
  message?: Maybe<Scalars["String"]>;
};

export type RunSourceQueryOutput = {
  __typename?: "RunSourceQueryOutput";
  result?: Maybe<Scalars["json"]>;
};

export type SourceMetaOutput = {
  __typename?: "SourceMetaOutput";
  cubes?: Maybe<Scalars["json"]>;
};

export type SourceTable = {
  name: Scalars["String"];
};

export type SourceTablesOutput = {
  __typename?: "SourceTablesOutput";
  schema?: Maybe<Scalars["json"]>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["String"]>;
  _gt?: InputMaybe<Scalars["String"]>;
  _gte?: InputMaybe<Scalars["String"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]>;
  _in?: InputMaybe<Scalars["String"][]>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]>;
  _lt?: InputMaybe<Scalars["String"]>;
  _lte?: InputMaybe<Scalars["String"]>;
  _neq?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]>;
  _nin?: InputMaybe<Scalars["String"][]>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]>;
};

export type ValidateSourceOutput = {
  __typename?: "ValidateSourceOutput";
  code: Scalars["String"];
  message?: Maybe<Scalars["String"]>;
};

/** columns and relationships of "alerts" */
export type Alerts = {
  __typename?: "alerts";
  created_at: Scalars["timestamptz"];
  delivery_config: Scalars["jsonb"];
  delivery_type: Scalars["String"];
  /** An object relationship */
  exploration: Explorations;
  exploration_id: Scalars["uuid"];
  id: Scalars["uuid"];
  locks_config: Scalars["jsonb"];
  name: Scalars["String"];
  schedule: Scalars["String"];
  /** An object relationship */
  team?: Maybe<Teams>;
  team_id?: Maybe<Scalars["uuid"]>;
  trigger_config: Scalars["jsonb"];
  updated_at: Scalars["timestamptz"];
  /** An object relationship */
  user: Users;
  user_id: Scalars["uuid"];
};

/** columns and relationships of "alerts" */
export type AlertsDelivery_ConfigArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "alerts" */
export type AlertsLocks_ConfigArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "alerts" */
export type AlertsTrigger_ConfigArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** aggregated selection of "alerts" */
export type Alerts_Aggregate = {
  __typename?: "alerts_aggregate";
  aggregate?: Maybe<Alerts_Aggregate_Fields>;
  nodes: Alerts[];
};

export type Alerts_Aggregate_Bool_Exp = {
  count?: InputMaybe<Alerts_Aggregate_Bool_Exp_Count>;
};

export type Alerts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Alerts_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Alerts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "alerts" */
export type Alerts_Aggregate_Fields = {
  __typename?: "alerts_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Alerts_Max_Fields>;
  min?: Maybe<Alerts_Min_Fields>;
};

/** aggregate fields of "alerts" */
export type Alerts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Alerts_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "alerts" */
export type Alerts_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Alerts_Max_Order_By>;
  min?: InputMaybe<Alerts_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Alerts_Append_Input = {
  delivery_config?: InputMaybe<Scalars["jsonb"]>;
  locks_config?: InputMaybe<Scalars["jsonb"]>;
  trigger_config?: InputMaybe<Scalars["jsonb"]>;
};

/** input type for inserting array relation for remote table "alerts" */
export type Alerts_Arr_Rel_Insert_Input = {
  data: Alerts_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Alerts_On_Conflict>;
};

/** Boolean expression to filter rows from the table "alerts". All fields are combined with a logical 'AND'. */
export type Alerts_Bool_Exp = {
  _and?: InputMaybe<Alerts_Bool_Exp[]>;
  _not?: InputMaybe<Alerts_Bool_Exp>;
  _or?: InputMaybe<Alerts_Bool_Exp[]>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  delivery_config?: InputMaybe<Jsonb_Comparison_Exp>;
  delivery_type?: InputMaybe<String_Comparison_Exp>;
  exploration?: InputMaybe<Explorations_Bool_Exp>;
  exploration_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  locks_config?: InputMaybe<Jsonb_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  schedule?: InputMaybe<String_Comparison_Exp>;
  team?: InputMaybe<Teams_Bool_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  trigger_config?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "alerts" */
export enum Alerts_Constraint {
  /** unique or primary key constraint on columns "id" */
  AlertsPkey = "alerts_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Alerts_Delete_At_Path_Input = {
  delivery_config?: InputMaybe<Scalars["String"][]>;
  locks_config?: InputMaybe<Scalars["String"][]>;
  trigger_config?: InputMaybe<Scalars["String"][]>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Alerts_Delete_Elem_Input = {
  delivery_config?: InputMaybe<Scalars["Int"]>;
  locks_config?: InputMaybe<Scalars["Int"]>;
  trigger_config?: InputMaybe<Scalars["Int"]>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Alerts_Delete_Key_Input = {
  delivery_config?: InputMaybe<Scalars["String"]>;
  locks_config?: InputMaybe<Scalars["String"]>;
  trigger_config?: InputMaybe<Scalars["String"]>;
};

/** input type for inserting data into table "alerts" */
export type Alerts_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  delivery_config?: InputMaybe<Scalars["jsonb"]>;
  delivery_type?: InputMaybe<Scalars["String"]>;
  exploration?: InputMaybe<Explorations_Obj_Rel_Insert_Input>;
  exploration_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  locks_config?: InputMaybe<Scalars["jsonb"]>;
  name?: InputMaybe<Scalars["String"]>;
  schedule?: InputMaybe<Scalars["String"]>;
  team?: InputMaybe<Teams_Obj_Rel_Insert_Input>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  trigger_config?: InputMaybe<Scalars["jsonb"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Alerts_Max_Fields = {
  __typename?: "alerts_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  delivery_type?: Maybe<Scalars["String"]>;
  exploration_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  schedule?: Maybe<Scalars["String"]>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "alerts" */
export type Alerts_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  delivery_type?: InputMaybe<Order_By>;
  exploration_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  schedule?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Alerts_Min_Fields = {
  __typename?: "alerts_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  delivery_type?: Maybe<Scalars["String"]>;
  exploration_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  schedule?: Maybe<Scalars["String"]>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "alerts" */
export type Alerts_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  delivery_type?: InputMaybe<Order_By>;
  exploration_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  schedule?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "alerts" */
export type Alerts_Mutation_Response = {
  __typename?: "alerts_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Alerts[];
};

/** on_conflict condition type for table "alerts" */
export type Alerts_On_Conflict = {
  constraint: Alerts_Constraint;
  update_columns?: Alerts_Update_Column[];
  where?: InputMaybe<Alerts_Bool_Exp>;
};

/** Ordering options when selecting data from "alerts". */
export type Alerts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  delivery_config?: InputMaybe<Order_By>;
  delivery_type?: InputMaybe<Order_By>;
  exploration?: InputMaybe<Explorations_Order_By>;
  exploration_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  locks_config?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  schedule?: InputMaybe<Order_By>;
  team?: InputMaybe<Teams_Order_By>;
  team_id?: InputMaybe<Order_By>;
  trigger_config?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: alerts */
export type Alerts_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Alerts_Prepend_Input = {
  delivery_config?: InputMaybe<Scalars["jsonb"]>;
  locks_config?: InputMaybe<Scalars["jsonb"]>;
  trigger_config?: InputMaybe<Scalars["jsonb"]>;
};

/** select columns of table "alerts" */
export enum Alerts_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DeliveryConfig = "delivery_config",
  /** column name */
  DeliveryType = "delivery_type",
  /** column name */
  ExplorationId = "exploration_id",
  /** column name */
  Id = "id",
  /** column name */
  LocksConfig = "locks_config",
  /** column name */
  Name = "name",
  /** column name */
  Schedule = "schedule",
  /** column name */
  TeamId = "team_id",
  /** column name */
  TriggerConfig = "trigger_config",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "alerts" */
export type Alerts_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  delivery_config?: InputMaybe<Scalars["jsonb"]>;
  delivery_type?: InputMaybe<Scalars["String"]>;
  exploration_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  locks_config?: InputMaybe<Scalars["jsonb"]>;
  name?: InputMaybe<Scalars["String"]>;
  schedule?: InputMaybe<Scalars["String"]>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  trigger_config?: InputMaybe<Scalars["jsonb"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "alerts" */
export type Alerts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Alerts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Alerts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  delivery_config?: InputMaybe<Scalars["jsonb"]>;
  delivery_type?: InputMaybe<Scalars["String"]>;
  exploration_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  locks_config?: InputMaybe<Scalars["jsonb"]>;
  name?: InputMaybe<Scalars["String"]>;
  schedule?: InputMaybe<Scalars["String"]>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  trigger_config?: InputMaybe<Scalars["jsonb"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "alerts" */
export enum Alerts_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DeliveryConfig = "delivery_config",
  /** column name */
  DeliveryType = "delivery_type",
  /** column name */
  ExplorationId = "exploration_id",
  /** column name */
  Id = "id",
  /** column name */
  LocksConfig = "locks_config",
  /** column name */
  Name = "name",
  /** column name */
  Schedule = "schedule",
  /** column name */
  TeamId = "team_id",
  /** column name */
  TriggerConfig = "trigger_config",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

export type Alerts_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Alerts_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Alerts_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Alerts_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Alerts_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Alerts_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Alerts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Alerts_Bool_Exp;
};

/** columns and relationships of "auth.account_providers" */
export type Auth_Account_Providers = {
  __typename?: "auth_account_providers";
  /** An object relationship */
  account: Auth_Accounts;
  account_id: Scalars["uuid"];
  auth_provider: Scalars["String"];
  auth_provider_unique_id: Scalars["String"];
  created_at: Scalars["timestamptz"];
  id: Scalars["uuid"];
  /** An object relationship */
  provider: Auth_Providers;
  updated_at: Scalars["timestamptz"];
};

/** aggregated selection of "auth.account_providers" */
export type Auth_Account_Providers_Aggregate = {
  __typename?: "auth_account_providers_aggregate";
  aggregate?: Maybe<Auth_Account_Providers_Aggregate_Fields>;
  nodes: Auth_Account_Providers[];
};

export type Auth_Account_Providers_Aggregate_Bool_Exp = {
  count?: InputMaybe<Auth_Account_Providers_Aggregate_Bool_Exp_Count>;
};

export type Auth_Account_Providers_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Auth_Account_Providers_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.account_providers" */
export type Auth_Account_Providers_Aggregate_Fields = {
  __typename?: "auth_account_providers_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Auth_Account_Providers_Max_Fields>;
  min?: Maybe<Auth_Account_Providers_Min_Fields>;
};

/** aggregate fields of "auth.account_providers" */
export type Auth_Account_Providers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Auth_Account_Providers_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "auth.account_providers" */
export type Auth_Account_Providers_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Auth_Account_Providers_Max_Order_By>;
  min?: InputMaybe<Auth_Account_Providers_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.account_providers" */
export type Auth_Account_Providers_Arr_Rel_Insert_Input = {
  data: Auth_Account_Providers_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Auth_Account_Providers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.account_providers". All fields are combined with a logical 'AND'. */
export type Auth_Account_Providers_Bool_Exp = {
  _and?: InputMaybe<Auth_Account_Providers_Bool_Exp[]>;
  _not?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
  _or?: InputMaybe<Auth_Account_Providers_Bool_Exp[]>;
  account?: InputMaybe<Auth_Accounts_Bool_Exp>;
  account_id?: InputMaybe<Uuid_Comparison_Exp>;
  auth_provider?: InputMaybe<String_Comparison_Exp>;
  auth_provider_unique_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  provider?: InputMaybe<Auth_Providers_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.account_providers" */
export enum Auth_Account_Providers_Constraint {
  /** unique or primary key constraint on columns "auth_provider", "account_id" */
  AccountProvidersAccountIdAuthProviderKey = "account_providers_account_id_auth_provider_key",
  /** unique or primary key constraint on columns "auth_provider", "auth_provider_unique_id" */
  AccountProvidersAuthProviderAuthProviderUniqueIdKey = "account_providers_auth_provider_auth_provider_unique_id_key",
  /** unique or primary key constraint on columns "id" */
  AccountProvidersPkey = "account_providers_pkey",
}

/** input type for inserting data into table "auth.account_providers" */
export type Auth_Account_Providers_Insert_Input = {
  account?: InputMaybe<Auth_Accounts_Obj_Rel_Insert_Input>;
  account_id?: InputMaybe<Scalars["uuid"]>;
  auth_provider?: InputMaybe<Scalars["String"]>;
  auth_provider_unique_id?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  provider?: InputMaybe<Auth_Providers_Obj_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** aggregate max on columns */
export type Auth_Account_Providers_Max_Fields = {
  __typename?: "auth_account_providers_max_fields";
  account_id?: Maybe<Scalars["uuid"]>;
  auth_provider?: Maybe<Scalars["String"]>;
  auth_provider_unique_id?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** order by max() on columns of table "auth.account_providers" */
export type Auth_Account_Providers_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  auth_provider?: InputMaybe<Order_By>;
  auth_provider_unique_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Auth_Account_Providers_Min_Fields = {
  __typename?: "auth_account_providers_min_fields";
  account_id?: Maybe<Scalars["uuid"]>;
  auth_provider?: Maybe<Scalars["String"]>;
  auth_provider_unique_id?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** order by min() on columns of table "auth.account_providers" */
export type Auth_Account_Providers_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  auth_provider?: InputMaybe<Order_By>;
  auth_provider_unique_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.account_providers" */
export type Auth_Account_Providers_Mutation_Response = {
  __typename?: "auth_account_providers_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Auth_Account_Providers[];
};

/** on_conflict condition type for table "auth.account_providers" */
export type Auth_Account_Providers_On_Conflict = {
  constraint: Auth_Account_Providers_Constraint;
  update_columns?: Auth_Account_Providers_Update_Column[];
  where?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.account_providers". */
export type Auth_Account_Providers_Order_By = {
  account?: InputMaybe<Auth_Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  auth_provider?: InputMaybe<Order_By>;
  auth_provider_unique_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  provider?: InputMaybe<Auth_Providers_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.account_providers */
export type Auth_Account_Providers_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "auth.account_providers" */
export enum Auth_Account_Providers_Select_Column {
  /** column name */
  AccountId = "account_id",
  /** column name */
  AuthProvider = "auth_provider",
  /** column name */
  AuthProviderUniqueId = "auth_provider_unique_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "auth.account_providers" */
export type Auth_Account_Providers_Set_Input = {
  account_id?: InputMaybe<Scalars["uuid"]>;
  auth_provider?: InputMaybe<Scalars["String"]>;
  auth_provider_unique_id?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** Streaming cursor of the table "auth_account_providers" */
export type Auth_Account_Providers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Auth_Account_Providers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Auth_Account_Providers_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars["uuid"]>;
  auth_provider?: InputMaybe<Scalars["String"]>;
  auth_provider_unique_id?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** update columns of table "auth.account_providers" */
export enum Auth_Account_Providers_Update_Column {
  /** column name */
  AccountId = "account_id",
  /** column name */
  AuthProvider = "auth_provider",
  /** column name */
  AuthProviderUniqueId = "auth_provider_unique_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  UpdatedAt = "updated_at",
}

export type Auth_Account_Providers_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Auth_Account_Providers_Set_Input>;
  /** filter the rows which have to be updated */
  where: Auth_Account_Providers_Bool_Exp;
};

/** columns and relationships of "auth.account_roles" */
export type Auth_Account_Roles = {
  __typename?: "auth_account_roles";
  /** An object relationship */
  account: Auth_Accounts;
  account_id: Scalars["uuid"];
  created_at: Scalars["timestamptz"];
  id: Scalars["uuid"];
  role: Scalars["String"];
  /** An object relationship */
  roleByRole: Auth_Roles;
};

/** aggregated selection of "auth.account_roles" */
export type Auth_Account_Roles_Aggregate = {
  __typename?: "auth_account_roles_aggregate";
  aggregate?: Maybe<Auth_Account_Roles_Aggregate_Fields>;
  nodes: Auth_Account_Roles[];
};

export type Auth_Account_Roles_Aggregate_Bool_Exp = {
  count?: InputMaybe<Auth_Account_Roles_Aggregate_Bool_Exp_Count>;
};

export type Auth_Account_Roles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Auth_Account_Roles_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.account_roles" */
export type Auth_Account_Roles_Aggregate_Fields = {
  __typename?: "auth_account_roles_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Auth_Account_Roles_Max_Fields>;
  min?: Maybe<Auth_Account_Roles_Min_Fields>;
};

/** aggregate fields of "auth.account_roles" */
export type Auth_Account_Roles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Auth_Account_Roles_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "auth.account_roles" */
export type Auth_Account_Roles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Auth_Account_Roles_Max_Order_By>;
  min?: InputMaybe<Auth_Account_Roles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.account_roles" */
export type Auth_Account_Roles_Arr_Rel_Insert_Input = {
  data: Auth_Account_Roles_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Auth_Account_Roles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.account_roles". All fields are combined with a logical 'AND'. */
export type Auth_Account_Roles_Bool_Exp = {
  _and?: InputMaybe<Auth_Account_Roles_Bool_Exp[]>;
  _not?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
  _or?: InputMaybe<Auth_Account_Roles_Bool_Exp[]>;
  account?: InputMaybe<Auth_Accounts_Bool_Exp>;
  account_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  roleByRole?: InputMaybe<Auth_Roles_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.account_roles" */
export enum Auth_Account_Roles_Constraint {
  /** unique or primary key constraint on columns "id" */
  AccountRolesPkey = "account_roles_pkey",
  /** unique or primary key constraint on columns "role", "account_id" */
  UserRolesAccountIdRoleKey = "user_roles_account_id_role_key",
}

/** input type for inserting data into table "auth.account_roles" */
export type Auth_Account_Roles_Insert_Input = {
  account?: InputMaybe<Auth_Accounts_Obj_Rel_Insert_Input>;
  account_id?: InputMaybe<Scalars["uuid"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  role?: InputMaybe<Scalars["String"]>;
  roleByRole?: InputMaybe<Auth_Roles_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Auth_Account_Roles_Max_Fields = {
  __typename?: "auth_account_roles_max_fields";
  account_id?: Maybe<Scalars["uuid"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  role?: Maybe<Scalars["String"]>;
};

/** order by max() on columns of table "auth.account_roles" */
export type Auth_Account_Roles_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Auth_Account_Roles_Min_Fields = {
  __typename?: "auth_account_roles_min_fields";
  account_id?: Maybe<Scalars["uuid"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  role?: Maybe<Scalars["String"]>;
};

/** order by min() on columns of table "auth.account_roles" */
export type Auth_Account_Roles_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.account_roles" */
export type Auth_Account_Roles_Mutation_Response = {
  __typename?: "auth_account_roles_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Auth_Account_Roles[];
};

/** on_conflict condition type for table "auth.account_roles" */
export type Auth_Account_Roles_On_Conflict = {
  constraint: Auth_Account_Roles_Constraint;
  update_columns?: Auth_Account_Roles_Update_Column[];
  where?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.account_roles". */
export type Auth_Account_Roles_Order_By = {
  account?: InputMaybe<Auth_Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  roleByRole?: InputMaybe<Auth_Roles_Order_By>;
};

/** primary key columns input for table: auth.account_roles */
export type Auth_Account_Roles_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "auth.account_roles" */
export enum Auth_Account_Roles_Select_Column {
  /** column name */
  AccountId = "account_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Role = "role",
}

/** input type for updating data in table "auth.account_roles" */
export type Auth_Account_Roles_Set_Input = {
  account_id?: InputMaybe<Scalars["uuid"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  role?: InputMaybe<Scalars["String"]>;
};

/** Streaming cursor of the table "auth_account_roles" */
export type Auth_Account_Roles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Auth_Account_Roles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Auth_Account_Roles_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars["uuid"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  role?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "auth.account_roles" */
export enum Auth_Account_Roles_Update_Column {
  /** column name */
  AccountId = "account_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Role = "role",
}

export type Auth_Account_Roles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Auth_Account_Roles_Set_Input>;
  /** filter the rows which have to be updated */
  where: Auth_Account_Roles_Bool_Exp;
};

/** columns and relationships of "auth.accounts" */
export type Auth_Accounts = {
  __typename?: "auth_accounts";
  /** An array relationship */
  account_providers: Auth_Account_Providers[];
  /** An aggregate relationship */
  account_providers_aggregate: Auth_Account_Providers_Aggregate;
  /** An array relationship */
  account_roles: Auth_Account_Roles[];
  /** An aggregate relationship */
  account_roles_aggregate: Auth_Account_Roles_Aggregate;
  active: Scalars["Boolean"];
  created_at: Scalars["timestamptz"];
  custom_register_data?: Maybe<Scalars["jsonb"]>;
  default_role: Scalars["String"];
  email?: Maybe<Scalars["citext"]>;
  id: Scalars["uuid"];
  is_anonymous: Scalars["Boolean"];
  mfa_enabled: Scalars["Boolean"];
  new_email?: Maybe<Scalars["citext"]>;
  otp_secret?: Maybe<Scalars["String"]>;
  password_hash?: Maybe<Scalars["String"]>;
  /** An array relationship */
  refresh_tokens: Auth_Refresh_Tokens[];
  /** An aggregate relationship */
  refresh_tokens_aggregate: Auth_Refresh_Tokens_Aggregate;
  /** An object relationship */
  role: Auth_Roles;
  ticket: Scalars["uuid"];
  ticket_expires_at: Scalars["timestamptz"];
  updated_at: Scalars["timestamptz"];
  /** An object relationship */
  user: Users;
  user_id: Scalars["uuid"];
};

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsAccount_ProvidersArgs = {
  distinct_on?: InputMaybe<Auth_Account_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
};

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsAccount_Providers_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Account_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
};

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsAccount_RolesArgs = {
  distinct_on?: InputMaybe<Auth_Account_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
};

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsAccount_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Account_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
};

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsCustom_Register_DataArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsRefresh_TokensArgs = {
  distinct_on?: InputMaybe<Auth_Refresh_Tokens_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Refresh_Tokens_Order_By[]>;
  where?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp>;
};

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsRefresh_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Refresh_Tokens_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Refresh_Tokens_Order_By[]>;
  where?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp>;
};

/** aggregated selection of "auth.accounts" */
export type Auth_Accounts_Aggregate = {
  __typename?: "auth_accounts_aggregate";
  aggregate?: Maybe<Auth_Accounts_Aggregate_Fields>;
  nodes: Auth_Accounts[];
};

export type Auth_Accounts_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Auth_Accounts_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Auth_Accounts_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Auth_Accounts_Aggregate_Bool_Exp_Count>;
};

export type Auth_Accounts_Aggregate_Bool_Exp_Bool_And = {
  arguments: Auth_Accounts_Select_Column_Auth_Accounts_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Auth_Accounts_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Auth_Accounts_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Auth_Accounts_Select_Column_Auth_Accounts_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Auth_Accounts_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Auth_Accounts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Auth_Accounts_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Auth_Accounts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.accounts" */
export type Auth_Accounts_Aggregate_Fields = {
  __typename?: "auth_accounts_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Auth_Accounts_Max_Fields>;
  min?: Maybe<Auth_Accounts_Min_Fields>;
};

/** aggregate fields of "auth.accounts" */
export type Auth_Accounts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Auth_Accounts_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "auth.accounts" */
export type Auth_Accounts_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Auth_Accounts_Max_Order_By>;
  min?: InputMaybe<Auth_Accounts_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Auth_Accounts_Append_Input = {
  custom_register_data?: InputMaybe<Scalars["jsonb"]>;
};

/** input type for inserting array relation for remote table "auth.accounts" */
export type Auth_Accounts_Arr_Rel_Insert_Input = {
  data: Auth_Accounts_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Auth_Accounts_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.accounts". All fields are combined with a logical 'AND'. */
export type Auth_Accounts_Bool_Exp = {
  _and?: InputMaybe<Auth_Accounts_Bool_Exp[]>;
  _not?: InputMaybe<Auth_Accounts_Bool_Exp>;
  _or?: InputMaybe<Auth_Accounts_Bool_Exp[]>;
  account_providers?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
  account_providers_aggregate?: InputMaybe<Auth_Account_Providers_Aggregate_Bool_Exp>;
  account_roles?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
  account_roles_aggregate?: InputMaybe<Auth_Account_Roles_Aggregate_Bool_Exp>;
  active?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  custom_register_data?: InputMaybe<Jsonb_Comparison_Exp>;
  default_role?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<Citext_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_anonymous?: InputMaybe<Boolean_Comparison_Exp>;
  mfa_enabled?: InputMaybe<Boolean_Comparison_Exp>;
  new_email?: InputMaybe<Citext_Comparison_Exp>;
  otp_secret?: InputMaybe<String_Comparison_Exp>;
  password_hash?: InputMaybe<String_Comparison_Exp>;
  refresh_tokens?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp>;
  refresh_tokens_aggregate?: InputMaybe<Auth_Refresh_Tokens_Aggregate_Bool_Exp>;
  role?: InputMaybe<Auth_Roles_Bool_Exp>;
  ticket?: InputMaybe<Uuid_Comparison_Exp>;
  ticket_expires_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.accounts" */
export enum Auth_Accounts_Constraint {
  /** unique or primary key constraint on columns "email" */
  AccountsEmailKey = "accounts_email_key",
  /** unique or primary key constraint on columns "new_email" */
  AccountsNewEmailKey = "accounts_new_email_key",
  /** unique or primary key constraint on columns "id" */
  AccountsPkey = "accounts_pkey",
  /** unique or primary key constraint on columns "user_id" */
  AccountsUserIdKey = "accounts_user_id_key",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Auth_Accounts_Delete_At_Path_Input = {
  custom_register_data?: InputMaybe<Scalars["String"][]>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Auth_Accounts_Delete_Elem_Input = {
  custom_register_data?: InputMaybe<Scalars["Int"]>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Auth_Accounts_Delete_Key_Input = {
  custom_register_data?: InputMaybe<Scalars["String"]>;
};

/** input type for inserting data into table "auth.accounts" */
export type Auth_Accounts_Insert_Input = {
  account_providers?: InputMaybe<Auth_Account_Providers_Arr_Rel_Insert_Input>;
  account_roles?: InputMaybe<Auth_Account_Roles_Arr_Rel_Insert_Input>;
  active?: InputMaybe<Scalars["Boolean"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  custom_register_data?: InputMaybe<Scalars["jsonb"]>;
  default_role?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["citext"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  is_anonymous?: InputMaybe<Scalars["Boolean"]>;
  mfa_enabled?: InputMaybe<Scalars["Boolean"]>;
  new_email?: InputMaybe<Scalars["citext"]>;
  otp_secret?: InputMaybe<Scalars["String"]>;
  password_hash?: InputMaybe<Scalars["String"]>;
  refresh_tokens?: InputMaybe<Auth_Refresh_Tokens_Arr_Rel_Insert_Input>;
  role?: InputMaybe<Auth_Roles_Obj_Rel_Insert_Input>;
  ticket?: InputMaybe<Scalars["uuid"]>;
  ticket_expires_at?: InputMaybe<Scalars["timestamptz"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Auth_Accounts_Max_Fields = {
  __typename?: "auth_accounts_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  default_role?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["citext"]>;
  id?: Maybe<Scalars["uuid"]>;
  new_email?: Maybe<Scalars["citext"]>;
  otp_secret?: Maybe<Scalars["String"]>;
  password_hash?: Maybe<Scalars["String"]>;
  ticket?: Maybe<Scalars["uuid"]>;
  ticket_expires_at?: Maybe<Scalars["timestamptz"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "auth.accounts" */
export type Auth_Accounts_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  default_role?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  new_email?: InputMaybe<Order_By>;
  otp_secret?: InputMaybe<Order_By>;
  password_hash?: InputMaybe<Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticket_expires_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Auth_Accounts_Min_Fields = {
  __typename?: "auth_accounts_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  default_role?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["citext"]>;
  id?: Maybe<Scalars["uuid"]>;
  new_email?: Maybe<Scalars["citext"]>;
  otp_secret?: Maybe<Scalars["String"]>;
  password_hash?: Maybe<Scalars["String"]>;
  ticket?: Maybe<Scalars["uuid"]>;
  ticket_expires_at?: Maybe<Scalars["timestamptz"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "auth.accounts" */
export type Auth_Accounts_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  default_role?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  new_email?: InputMaybe<Order_By>;
  otp_secret?: InputMaybe<Order_By>;
  password_hash?: InputMaybe<Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticket_expires_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.accounts" */
export type Auth_Accounts_Mutation_Response = {
  __typename?: "auth_accounts_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Auth_Accounts[];
};

/** input type for inserting object relation for remote table "auth.accounts" */
export type Auth_Accounts_Obj_Rel_Insert_Input = {
  data: Auth_Accounts_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Auth_Accounts_On_Conflict>;
};

/** on_conflict condition type for table "auth.accounts" */
export type Auth_Accounts_On_Conflict = {
  constraint: Auth_Accounts_Constraint;
  update_columns?: Auth_Accounts_Update_Column[];
  where?: InputMaybe<Auth_Accounts_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.accounts". */
export type Auth_Accounts_Order_By = {
  account_providers_aggregate?: InputMaybe<Auth_Account_Providers_Aggregate_Order_By>;
  account_roles_aggregate?: InputMaybe<Auth_Account_Roles_Aggregate_Order_By>;
  active?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  custom_register_data?: InputMaybe<Order_By>;
  default_role?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_anonymous?: InputMaybe<Order_By>;
  mfa_enabled?: InputMaybe<Order_By>;
  new_email?: InputMaybe<Order_By>;
  otp_secret?: InputMaybe<Order_By>;
  password_hash?: InputMaybe<Order_By>;
  refresh_tokens_aggregate?: InputMaybe<Auth_Refresh_Tokens_Aggregate_Order_By>;
  role?: InputMaybe<Auth_Roles_Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticket_expires_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.accounts */
export type Auth_Accounts_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Auth_Accounts_Prepend_Input = {
  custom_register_data?: InputMaybe<Scalars["jsonb"]>;
};

/** select columns of table "auth.accounts" */
export enum Auth_Accounts_Select_Column {
  /** column name */
  Active = "active",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  CustomRegisterData = "custom_register_data",
  /** column name */
  DefaultRole = "default_role",
  /** column name */
  Email = "email",
  /** column name */
  Id = "id",
  /** column name */
  IsAnonymous = "is_anonymous",
  /** column name */
  MfaEnabled = "mfa_enabled",
  /** column name */
  NewEmail = "new_email",
  /** column name */
  OtpSecret = "otp_secret",
  /** column name */
  PasswordHash = "password_hash",
  /** column name */
  Ticket = "ticket",
  /** column name */
  TicketExpiresAt = "ticket_expires_at",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** select "auth_accounts_aggregate_bool_exp_bool_and_arguments_columns" columns of table "auth.accounts" */
export enum Auth_Accounts_Select_Column_Auth_Accounts_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Active = "active",
  /** column name */
  IsAnonymous = "is_anonymous",
  /** column name */
  MfaEnabled = "mfa_enabled",
}

/** select "auth_accounts_aggregate_bool_exp_bool_or_arguments_columns" columns of table "auth.accounts" */
export enum Auth_Accounts_Select_Column_Auth_Accounts_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Active = "active",
  /** column name */
  IsAnonymous = "is_anonymous",
  /** column name */
  MfaEnabled = "mfa_enabled",
}

/** input type for updating data in table "auth.accounts" */
export type Auth_Accounts_Set_Input = {
  active?: InputMaybe<Scalars["Boolean"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  custom_register_data?: InputMaybe<Scalars["jsonb"]>;
  default_role?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["citext"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  is_anonymous?: InputMaybe<Scalars["Boolean"]>;
  mfa_enabled?: InputMaybe<Scalars["Boolean"]>;
  new_email?: InputMaybe<Scalars["citext"]>;
  otp_secret?: InputMaybe<Scalars["String"]>;
  password_hash?: InputMaybe<Scalars["String"]>;
  ticket?: InputMaybe<Scalars["uuid"]>;
  ticket_expires_at?: InputMaybe<Scalars["timestamptz"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "auth_accounts" */
export type Auth_Accounts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Auth_Accounts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Auth_Accounts_Stream_Cursor_Value_Input = {
  active?: InputMaybe<Scalars["Boolean"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  custom_register_data?: InputMaybe<Scalars["jsonb"]>;
  default_role?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["citext"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  is_anonymous?: InputMaybe<Scalars["Boolean"]>;
  mfa_enabled?: InputMaybe<Scalars["Boolean"]>;
  new_email?: InputMaybe<Scalars["citext"]>;
  otp_secret?: InputMaybe<Scalars["String"]>;
  password_hash?: InputMaybe<Scalars["String"]>;
  ticket?: InputMaybe<Scalars["uuid"]>;
  ticket_expires_at?: InputMaybe<Scalars["timestamptz"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "auth.accounts" */
export enum Auth_Accounts_Update_Column {
  /** column name */
  Active = "active",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  CustomRegisterData = "custom_register_data",
  /** column name */
  DefaultRole = "default_role",
  /** column name */
  Email = "email",
  /** column name */
  Id = "id",
  /** column name */
  IsAnonymous = "is_anonymous",
  /** column name */
  MfaEnabled = "mfa_enabled",
  /** column name */
  NewEmail = "new_email",
  /** column name */
  OtpSecret = "otp_secret",
  /** column name */
  PasswordHash = "password_hash",
  /** column name */
  Ticket = "ticket",
  /** column name */
  TicketExpiresAt = "ticket_expires_at",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

export type Auth_Accounts_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Auth_Accounts_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Auth_Accounts_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Auth_Accounts_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Auth_Accounts_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Auth_Accounts_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Auth_Accounts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Auth_Accounts_Bool_Exp;
};

/** columns and relationships of "auth.migrations" */
export type Auth_Migrations = {
  __typename?: "auth_migrations";
  executed_at?: Maybe<Scalars["timestamp"]>;
  hash: Scalars["String"];
  id: Scalars["Int"];
  name: Scalars["String"];
};

/** aggregated selection of "auth.migrations" */
export type Auth_Migrations_Aggregate = {
  __typename?: "auth_migrations_aggregate";
  aggregate?: Maybe<Auth_Migrations_Aggregate_Fields>;
  nodes: Auth_Migrations[];
};

/** aggregate fields of "auth.migrations" */
export type Auth_Migrations_Aggregate_Fields = {
  __typename?: "auth_migrations_aggregate_fields";
  avg?: Maybe<Auth_Migrations_Avg_Fields>;
  count: Scalars["Int"];
  max?: Maybe<Auth_Migrations_Max_Fields>;
  min?: Maybe<Auth_Migrations_Min_Fields>;
  stddev?: Maybe<Auth_Migrations_Stddev_Fields>;
  stddev_pop?: Maybe<Auth_Migrations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Auth_Migrations_Stddev_Samp_Fields>;
  sum?: Maybe<Auth_Migrations_Sum_Fields>;
  var_pop?: Maybe<Auth_Migrations_Var_Pop_Fields>;
  var_samp?: Maybe<Auth_Migrations_Var_Samp_Fields>;
  variance?: Maybe<Auth_Migrations_Variance_Fields>;
};

/** aggregate fields of "auth.migrations" */
export type Auth_Migrations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Auth_Migrations_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** aggregate avg on columns */
export type Auth_Migrations_Avg_Fields = {
  __typename?: "auth_migrations_avg_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** Boolean expression to filter rows from the table "auth.migrations". All fields are combined with a logical 'AND'. */
export type Auth_Migrations_Bool_Exp = {
  _and?: InputMaybe<Auth_Migrations_Bool_Exp[]>;
  _not?: InputMaybe<Auth_Migrations_Bool_Exp>;
  _or?: InputMaybe<Auth_Migrations_Bool_Exp[]>;
  executed_at?: InputMaybe<Timestamp_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.migrations" */
export enum Auth_Migrations_Constraint {
  /** unique or primary key constraint on columns "name" */
  MigrationsNameKey = "migrations_name_key",
  /** unique or primary key constraint on columns "id" */
  MigrationsPkey = "migrations_pkey",
}

/** input type for incrementing numeric columns in table "auth.migrations" */
export type Auth_Migrations_Inc_Input = {
  id?: InputMaybe<Scalars["Int"]>;
};

/** input type for inserting data into table "auth.migrations" */
export type Auth_Migrations_Insert_Input = {
  executed_at?: InputMaybe<Scalars["timestamp"]>;
  hash?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type Auth_Migrations_Max_Fields = {
  __typename?: "auth_migrations_max_fields";
  executed_at?: Maybe<Scalars["timestamp"]>;
  hash?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
};

/** aggregate min on columns */
export type Auth_Migrations_Min_Fields = {
  __typename?: "auth_migrations_min_fields";
  executed_at?: Maybe<Scalars["timestamp"]>;
  hash?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
};

/** response of any mutation on the table "auth.migrations" */
export type Auth_Migrations_Mutation_Response = {
  __typename?: "auth_migrations_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Auth_Migrations[];
};

/** on_conflict condition type for table "auth.migrations" */
export type Auth_Migrations_On_Conflict = {
  constraint: Auth_Migrations_Constraint;
  update_columns?: Auth_Migrations_Update_Column[];
  where?: InputMaybe<Auth_Migrations_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.migrations". */
export type Auth_Migrations_Order_By = {
  executed_at?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.migrations */
export type Auth_Migrations_Pk_Columns_Input = {
  id: Scalars["Int"];
};

/** select columns of table "auth.migrations" */
export enum Auth_Migrations_Select_Column {
  /** column name */
  ExecutedAt = "executed_at",
  /** column name */
  Hash = "hash",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
}

/** input type for updating data in table "auth.migrations" */
export type Auth_Migrations_Set_Input = {
  executed_at?: InputMaybe<Scalars["timestamp"]>;
  hash?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** aggregate stddev on columns */
export type Auth_Migrations_Stddev_Fields = {
  __typename?: "auth_migrations_stddev_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** aggregate stddev_pop on columns */
export type Auth_Migrations_Stddev_Pop_Fields = {
  __typename?: "auth_migrations_stddev_pop_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** aggregate stddev_samp on columns */
export type Auth_Migrations_Stddev_Samp_Fields = {
  __typename?: "auth_migrations_stddev_samp_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** Streaming cursor of the table "auth_migrations" */
export type Auth_Migrations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Auth_Migrations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Auth_Migrations_Stream_Cursor_Value_Input = {
  executed_at?: InputMaybe<Scalars["timestamp"]>;
  hash?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** aggregate sum on columns */
export type Auth_Migrations_Sum_Fields = {
  __typename?: "auth_migrations_sum_fields";
  id?: Maybe<Scalars["Int"]>;
};

/** update columns of table "auth.migrations" */
export enum Auth_Migrations_Update_Column {
  /** column name */
  ExecutedAt = "executed_at",
  /** column name */
  Hash = "hash",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
}

export type Auth_Migrations_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Auth_Migrations_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Auth_Migrations_Set_Input>;
  /** filter the rows which have to be updated */
  where: Auth_Migrations_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Auth_Migrations_Var_Pop_Fields = {
  __typename?: "auth_migrations_var_pop_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** aggregate var_samp on columns */
export type Auth_Migrations_Var_Samp_Fields = {
  __typename?: "auth_migrations_var_samp_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** aggregate variance on columns */
export type Auth_Migrations_Variance_Fields = {
  __typename?: "auth_migrations_variance_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** columns and relationships of "auth.providers" */
export type Auth_Providers = {
  __typename?: "auth_providers";
  /** An array relationship */
  account_providers: Auth_Account_Providers[];
  /** An aggregate relationship */
  account_providers_aggregate: Auth_Account_Providers_Aggregate;
  provider: Scalars["String"];
};

/** columns and relationships of "auth.providers" */
export type Auth_ProvidersAccount_ProvidersArgs = {
  distinct_on?: InputMaybe<Auth_Account_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
};

/** columns and relationships of "auth.providers" */
export type Auth_ProvidersAccount_Providers_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Account_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
};

/** aggregated selection of "auth.providers" */
export type Auth_Providers_Aggregate = {
  __typename?: "auth_providers_aggregate";
  aggregate?: Maybe<Auth_Providers_Aggregate_Fields>;
  nodes: Auth_Providers[];
};

/** aggregate fields of "auth.providers" */
export type Auth_Providers_Aggregate_Fields = {
  __typename?: "auth_providers_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Auth_Providers_Max_Fields>;
  min?: Maybe<Auth_Providers_Min_Fields>;
};

/** aggregate fields of "auth.providers" */
export type Auth_Providers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Auth_Providers_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "auth.providers". All fields are combined with a logical 'AND'. */
export type Auth_Providers_Bool_Exp = {
  _and?: InputMaybe<Auth_Providers_Bool_Exp[]>;
  _not?: InputMaybe<Auth_Providers_Bool_Exp>;
  _or?: InputMaybe<Auth_Providers_Bool_Exp[]>;
  account_providers?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
  account_providers_aggregate?: InputMaybe<Auth_Account_Providers_Aggregate_Bool_Exp>;
  provider?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.providers" */
export enum Auth_Providers_Constraint {
  /** unique or primary key constraint on columns "provider" */
  ProvidersPkey = "providers_pkey",
}

/** input type for inserting data into table "auth.providers" */
export type Auth_Providers_Insert_Input = {
  account_providers?: InputMaybe<Auth_Account_Providers_Arr_Rel_Insert_Input>;
  provider?: InputMaybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type Auth_Providers_Max_Fields = {
  __typename?: "auth_providers_max_fields";
  provider?: Maybe<Scalars["String"]>;
};

/** aggregate min on columns */
export type Auth_Providers_Min_Fields = {
  __typename?: "auth_providers_min_fields";
  provider?: Maybe<Scalars["String"]>;
};

/** response of any mutation on the table "auth.providers" */
export type Auth_Providers_Mutation_Response = {
  __typename?: "auth_providers_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Auth_Providers[];
};

/** input type for inserting object relation for remote table "auth.providers" */
export type Auth_Providers_Obj_Rel_Insert_Input = {
  data: Auth_Providers_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Auth_Providers_On_Conflict>;
};

/** on_conflict condition type for table "auth.providers" */
export type Auth_Providers_On_Conflict = {
  constraint: Auth_Providers_Constraint;
  update_columns?: Auth_Providers_Update_Column[];
  where?: InputMaybe<Auth_Providers_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.providers". */
export type Auth_Providers_Order_By = {
  account_providers_aggregate?: InputMaybe<Auth_Account_Providers_Aggregate_Order_By>;
  provider?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.providers */
export type Auth_Providers_Pk_Columns_Input = {
  provider: Scalars["String"];
};

/** select columns of table "auth.providers" */
export enum Auth_Providers_Select_Column {
  /** column name */
  Provider = "provider",
}

/** input type for updating data in table "auth.providers" */
export type Auth_Providers_Set_Input = {
  provider?: InputMaybe<Scalars["String"]>;
};

/** Streaming cursor of the table "auth_providers" */
export type Auth_Providers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Auth_Providers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Auth_Providers_Stream_Cursor_Value_Input = {
  provider?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "auth.providers" */
export enum Auth_Providers_Update_Column {
  /** column name */
  Provider = "provider",
}

export type Auth_Providers_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Auth_Providers_Set_Input>;
  /** filter the rows which have to be updated */
  where: Auth_Providers_Bool_Exp;
};

/** columns and relationships of "auth.refresh_tokens" */
export type Auth_Refresh_Tokens = {
  __typename?: "auth_refresh_tokens";
  /** An object relationship */
  account: Auth_Accounts;
  account_id: Scalars["uuid"];
  created_at: Scalars["timestamptz"];
  expires_at: Scalars["timestamptz"];
  refresh_token: Scalars["uuid"];
};

/** aggregated selection of "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Aggregate = {
  __typename?: "auth_refresh_tokens_aggregate";
  aggregate?: Maybe<Auth_Refresh_Tokens_Aggregate_Fields>;
  nodes: Auth_Refresh_Tokens[];
};

export type Auth_Refresh_Tokens_Aggregate_Bool_Exp = {
  count?: InputMaybe<Auth_Refresh_Tokens_Aggregate_Bool_Exp_Count>;
};

export type Auth_Refresh_Tokens_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Auth_Refresh_Tokens_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Aggregate_Fields = {
  __typename?: "auth_refresh_tokens_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Auth_Refresh_Tokens_Max_Fields>;
  min?: Maybe<Auth_Refresh_Tokens_Min_Fields>;
};

/** aggregate fields of "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Auth_Refresh_Tokens_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Auth_Refresh_Tokens_Max_Order_By>;
  min?: InputMaybe<Auth_Refresh_Tokens_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Arr_Rel_Insert_Input = {
  data: Auth_Refresh_Tokens_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Auth_Refresh_Tokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.refresh_tokens". All fields are combined with a logical 'AND'. */
export type Auth_Refresh_Tokens_Bool_Exp = {
  _and?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp[]>;
  _not?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp>;
  _or?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp[]>;
  account?: InputMaybe<Auth_Accounts_Bool_Exp>;
  account_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  expires_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  refresh_token?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.refresh_tokens" */
export enum Auth_Refresh_Tokens_Constraint {
  /** unique or primary key constraint on columns "refresh_token" */
  RefreshTokensPkey = "refresh_tokens_pkey",
}

/** input type for inserting data into table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Insert_Input = {
  account?: InputMaybe<Auth_Accounts_Obj_Rel_Insert_Input>;
  account_id?: InputMaybe<Scalars["uuid"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  expires_at?: InputMaybe<Scalars["timestamptz"]>;
  refresh_token?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Auth_Refresh_Tokens_Max_Fields = {
  __typename?: "auth_refresh_tokens_max_fields";
  account_id?: Maybe<Scalars["uuid"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  expires_at?: Maybe<Scalars["timestamptz"]>;
  refresh_token?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expires_at?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Auth_Refresh_Tokens_Min_Fields = {
  __typename?: "auth_refresh_tokens_min_fields";
  account_id?: Maybe<Scalars["uuid"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  expires_at?: Maybe<Scalars["timestamptz"]>;
  refresh_token?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expires_at?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Mutation_Response = {
  __typename?: "auth_refresh_tokens_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Auth_Refresh_Tokens[];
};

/** on_conflict condition type for table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_On_Conflict = {
  constraint: Auth_Refresh_Tokens_Constraint;
  update_columns?: Auth_Refresh_Tokens_Update_Column[];
  where?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.refresh_tokens". */
export type Auth_Refresh_Tokens_Order_By = {
  account?: InputMaybe<Auth_Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expires_at?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.refresh_tokens */
export type Auth_Refresh_Tokens_Pk_Columns_Input = {
  refresh_token: Scalars["uuid"];
};

/** select columns of table "auth.refresh_tokens" */
export enum Auth_Refresh_Tokens_Select_Column {
  /** column name */
  AccountId = "account_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  ExpiresAt = "expires_at",
  /** column name */
  RefreshToken = "refresh_token",
}

/** input type for updating data in table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Set_Input = {
  account_id?: InputMaybe<Scalars["uuid"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  expires_at?: InputMaybe<Scalars["timestamptz"]>;
  refresh_token?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "auth_refresh_tokens" */
export type Auth_Refresh_Tokens_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Auth_Refresh_Tokens_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Auth_Refresh_Tokens_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars["uuid"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  expires_at?: InputMaybe<Scalars["timestamptz"]>;
  refresh_token?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "auth.refresh_tokens" */
export enum Auth_Refresh_Tokens_Update_Column {
  /** column name */
  AccountId = "account_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  ExpiresAt = "expires_at",
  /** column name */
  RefreshToken = "refresh_token",
}

export type Auth_Refresh_Tokens_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Auth_Refresh_Tokens_Set_Input>;
  /** filter the rows which have to be updated */
  where: Auth_Refresh_Tokens_Bool_Exp;
};

/** columns and relationships of "auth.roles" */
export type Auth_Roles = {
  __typename?: "auth_roles";
  /** An array relationship */
  account_roles: Auth_Account_Roles[];
  /** An aggregate relationship */
  account_roles_aggregate: Auth_Account_Roles_Aggregate;
  /** An array relationship */
  accounts: Auth_Accounts[];
  /** An aggregate relationship */
  accounts_aggregate: Auth_Accounts_Aggregate;
  role: Scalars["String"];
};

/** columns and relationships of "auth.roles" */
export type Auth_RolesAccount_RolesArgs = {
  distinct_on?: InputMaybe<Auth_Account_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
};

/** columns and relationships of "auth.roles" */
export type Auth_RolesAccount_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Account_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
};

/** columns and relationships of "auth.roles" */
export type Auth_RolesAccountsArgs = {
  distinct_on?: InputMaybe<Auth_Accounts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Accounts_Order_By[]>;
  where?: InputMaybe<Auth_Accounts_Bool_Exp>;
};

/** columns and relationships of "auth.roles" */
export type Auth_RolesAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Accounts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Accounts_Order_By[]>;
  where?: InputMaybe<Auth_Accounts_Bool_Exp>;
};

/** aggregated selection of "auth.roles" */
export type Auth_Roles_Aggregate = {
  __typename?: "auth_roles_aggregate";
  aggregate?: Maybe<Auth_Roles_Aggregate_Fields>;
  nodes: Auth_Roles[];
};

/** aggregate fields of "auth.roles" */
export type Auth_Roles_Aggregate_Fields = {
  __typename?: "auth_roles_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Auth_Roles_Max_Fields>;
  min?: Maybe<Auth_Roles_Min_Fields>;
};

/** aggregate fields of "auth.roles" */
export type Auth_Roles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Auth_Roles_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "auth.roles". All fields are combined with a logical 'AND'. */
export type Auth_Roles_Bool_Exp = {
  _and?: InputMaybe<Auth_Roles_Bool_Exp[]>;
  _not?: InputMaybe<Auth_Roles_Bool_Exp>;
  _or?: InputMaybe<Auth_Roles_Bool_Exp[]>;
  account_roles?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
  account_roles_aggregate?: InputMaybe<Auth_Account_Roles_Aggregate_Bool_Exp>;
  accounts?: InputMaybe<Auth_Accounts_Bool_Exp>;
  accounts_aggregate?: InputMaybe<Auth_Accounts_Aggregate_Bool_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.roles" */
export enum Auth_Roles_Constraint {
  /** unique or primary key constraint on columns "role" */
  RolesPkey = "roles_pkey",
}

/** input type for inserting data into table "auth.roles" */
export type Auth_Roles_Insert_Input = {
  account_roles?: InputMaybe<Auth_Account_Roles_Arr_Rel_Insert_Input>;
  accounts?: InputMaybe<Auth_Accounts_Arr_Rel_Insert_Input>;
  role?: InputMaybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type Auth_Roles_Max_Fields = {
  __typename?: "auth_roles_max_fields";
  role?: Maybe<Scalars["String"]>;
};

/** aggregate min on columns */
export type Auth_Roles_Min_Fields = {
  __typename?: "auth_roles_min_fields";
  role?: Maybe<Scalars["String"]>;
};

/** response of any mutation on the table "auth.roles" */
export type Auth_Roles_Mutation_Response = {
  __typename?: "auth_roles_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Auth_Roles[];
};

/** input type for inserting object relation for remote table "auth.roles" */
export type Auth_Roles_Obj_Rel_Insert_Input = {
  data: Auth_Roles_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Auth_Roles_On_Conflict>;
};

/** on_conflict condition type for table "auth.roles" */
export type Auth_Roles_On_Conflict = {
  constraint: Auth_Roles_Constraint;
  update_columns?: Auth_Roles_Update_Column[];
  where?: InputMaybe<Auth_Roles_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.roles". */
export type Auth_Roles_Order_By = {
  account_roles_aggregate?: InputMaybe<Auth_Account_Roles_Aggregate_Order_By>;
  accounts_aggregate?: InputMaybe<Auth_Accounts_Aggregate_Order_By>;
  role?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.roles */
export type Auth_Roles_Pk_Columns_Input = {
  role: Scalars["String"];
};

/** select columns of table "auth.roles" */
export enum Auth_Roles_Select_Column {
  /** column name */
  Role = "role",
}

/** input type for updating data in table "auth.roles" */
export type Auth_Roles_Set_Input = {
  role?: InputMaybe<Scalars["String"]>;
};

/** Streaming cursor of the table "auth_roles" */
export type Auth_Roles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Auth_Roles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Auth_Roles_Stream_Cursor_Value_Input = {
  role?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "auth.roles" */
export enum Auth_Roles_Update_Column {
  /** column name */
  Role = "role",
}

export type Auth_Roles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Auth_Roles_Set_Input>;
  /** filter the rows which have to be updated */
  where: Auth_Roles_Bool_Exp;
};

/** columns and relationships of "branch_statuses" */
export type Branch_Statuses = {
  __typename?: "branch_statuses";
  status: Scalars["String"];
};

/** aggregated selection of "branch_statuses" */
export type Branch_Statuses_Aggregate = {
  __typename?: "branch_statuses_aggregate";
  aggregate?: Maybe<Branch_Statuses_Aggregate_Fields>;
  nodes: Branch_Statuses[];
};

/** aggregate fields of "branch_statuses" */
export type Branch_Statuses_Aggregate_Fields = {
  __typename?: "branch_statuses_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Branch_Statuses_Max_Fields>;
  min?: Maybe<Branch_Statuses_Min_Fields>;
};

/** aggregate fields of "branch_statuses" */
export type Branch_Statuses_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Branch_Statuses_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "branch_statuses". All fields are combined with a logical 'AND'. */
export type Branch_Statuses_Bool_Exp = {
  _and?: InputMaybe<Branch_Statuses_Bool_Exp[]>;
  _not?: InputMaybe<Branch_Statuses_Bool_Exp>;
  _or?: InputMaybe<Branch_Statuses_Bool_Exp[]>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "branch_statuses" */
export enum Branch_Statuses_Constraint {
  /** unique or primary key constraint on columns "status" */
  BranchStatusesPkey = "branch_statuses_pkey",
}

export enum Branch_Statuses_Enum {
  Active = "active",
  Archived = "archived",
  Created = "created",
}

/** Boolean expression to compare columns of type "branch_statuses_enum". All fields are combined with logical 'AND'. */
export type Branch_Statuses_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Branch_Statuses_Enum>;
  _in?: InputMaybe<Branch_Statuses_Enum[]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _neq?: InputMaybe<Branch_Statuses_Enum>;
  _nin?: InputMaybe<Branch_Statuses_Enum[]>;
};

/** input type for inserting data into table "branch_statuses" */
export type Branch_Statuses_Insert_Input = {
  status?: InputMaybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type Branch_Statuses_Max_Fields = {
  __typename?: "branch_statuses_max_fields";
  status?: Maybe<Scalars["String"]>;
};

/** aggregate min on columns */
export type Branch_Statuses_Min_Fields = {
  __typename?: "branch_statuses_min_fields";
  status?: Maybe<Scalars["String"]>;
};

/** response of any mutation on the table "branch_statuses" */
export type Branch_Statuses_Mutation_Response = {
  __typename?: "branch_statuses_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Branch_Statuses[];
};

/** input type for inserting object relation for remote table "branch_statuses" */
export type Branch_Statuses_Obj_Rel_Insert_Input = {
  data: Branch_Statuses_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Branch_Statuses_On_Conflict>;
};

/** on_conflict condition type for table "branch_statuses" */
export type Branch_Statuses_On_Conflict = {
  constraint: Branch_Statuses_Constraint;
  update_columns?: Branch_Statuses_Update_Column[];
  where?: InputMaybe<Branch_Statuses_Bool_Exp>;
};

/** Ordering options when selecting data from "branch_statuses". */
export type Branch_Statuses_Order_By = {
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: branch_statuses */
export type Branch_Statuses_Pk_Columns_Input = {
  status: Scalars["String"];
};

/** select columns of table "branch_statuses" */
export enum Branch_Statuses_Select_Column {
  /** column name */
  Status = "status",
}

/** input type for updating data in table "branch_statuses" */
export type Branch_Statuses_Set_Input = {
  status?: InputMaybe<Scalars["String"]>;
};

/** Streaming cursor of the table "branch_statuses" */
export type Branch_Statuses_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Branch_Statuses_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Branch_Statuses_Stream_Cursor_Value_Input = {
  status?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "branch_statuses" */
export enum Branch_Statuses_Update_Column {
  /** column name */
  Status = "status",
}

export type Branch_Statuses_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Branch_Statuses_Set_Input>;
  /** filter the rows which have to be updated */
  where: Branch_Statuses_Bool_Exp;
};

/** columns and relationships of "branches" */
export type Branches = {
  __typename?: "branches";
  /** An object relationship */
  branch_status: Branch_Statuses;
  created_at: Scalars["timestamptz"];
  /** An object relationship */
  datasource: Datasources;
  datasource_id: Scalars["uuid"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  status: Branch_Statuses_Enum;
  updated_at: Scalars["timestamptz"];
  /** An object relationship */
  user: Users;
  user_id: Scalars["uuid"];
  /** An array relationship */
  versions: Versions[];
  /** An aggregate relationship */
  versions_aggregate: Versions_Aggregate;
};

/** columns and relationships of "branches" */
export type BranchesVersionsArgs = {
  distinct_on?: InputMaybe<Versions_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Versions_Order_By[]>;
  where?: InputMaybe<Versions_Bool_Exp>;
};

/** columns and relationships of "branches" */
export type BranchesVersions_AggregateArgs = {
  distinct_on?: InputMaybe<Versions_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Versions_Order_By[]>;
  where?: InputMaybe<Versions_Bool_Exp>;
};

/** aggregated selection of "branches" */
export type Branches_Aggregate = {
  __typename?: "branches_aggregate";
  aggregate?: Maybe<Branches_Aggregate_Fields>;
  nodes: Branches[];
};

export type Branches_Aggregate_Bool_Exp = {
  count?: InputMaybe<Branches_Aggregate_Bool_Exp_Count>;
};

export type Branches_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Branches_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Branches_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "branches" */
export type Branches_Aggregate_Fields = {
  __typename?: "branches_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Branches_Max_Fields>;
  min?: Maybe<Branches_Min_Fields>;
};

/** aggregate fields of "branches" */
export type Branches_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Branches_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "branches" */
export type Branches_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Branches_Max_Order_By>;
  min?: InputMaybe<Branches_Min_Order_By>;
};

/** input type for inserting array relation for remote table "branches" */
export type Branches_Arr_Rel_Insert_Input = {
  data: Branches_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Branches_On_Conflict>;
};

/** Boolean expression to filter rows from the table "branches". All fields are combined with a logical 'AND'. */
export type Branches_Bool_Exp = {
  _and?: InputMaybe<Branches_Bool_Exp[]>;
  _not?: InputMaybe<Branches_Bool_Exp>;
  _or?: InputMaybe<Branches_Bool_Exp[]>;
  branch_status?: InputMaybe<Branch_Statuses_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  datasource?: InputMaybe<Datasources_Bool_Exp>;
  datasource_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<Branch_Statuses_Enum_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  versions?: InputMaybe<Versions_Bool_Exp>;
  versions_aggregate?: InputMaybe<Versions_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "branches" */
export enum Branches_Constraint {
  /** unique or primary key constraint on columns "id" */
  BranchesPkey = "branches_pkey",
}

/** input type for inserting data into table "branches" */
export type Branches_Insert_Input = {
  branch_status?: InputMaybe<Branch_Statuses_Obj_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource?: InputMaybe<Datasources_Obj_Rel_Insert_Input>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Branch_Statuses_Enum>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars["uuid"]>;
  versions?: InputMaybe<Versions_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Branches_Max_Fields = {
  __typename?: "branches_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  datasource_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "branches" */
export type Branches_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Branches_Min_Fields = {
  __typename?: "branches_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  datasource_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "branches" */
export type Branches_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "branches" */
export type Branches_Mutation_Response = {
  __typename?: "branches_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Branches[];
};

/** input type for inserting object relation for remote table "branches" */
export type Branches_Obj_Rel_Insert_Input = {
  data: Branches_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Branches_On_Conflict>;
};

/** on_conflict condition type for table "branches" */
export type Branches_On_Conflict = {
  constraint: Branches_Constraint;
  update_columns?: Branches_Update_Column[];
  where?: InputMaybe<Branches_Bool_Exp>;
};

/** Ordering options when selecting data from "branches". */
export type Branches_Order_By = {
  branch_status?: InputMaybe<Branch_Statuses_Order_By>;
  created_at?: InputMaybe<Order_By>;
  datasource?: InputMaybe<Datasources_Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  versions_aggregate?: InputMaybe<Versions_Aggregate_Order_By>;
};

/** primary key columns input for table: branches */
export type Branches_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "branches" */
export enum Branches_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DatasourceId = "datasource_id",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Status = "status",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "branches" */
export type Branches_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Branch_Statuses_Enum>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "branches" */
export type Branches_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Branches_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Branches_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Branch_Statuses_Enum>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "branches" */
export enum Branches_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DatasourceId = "datasource_id",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Status = "status",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

export type Branches_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Branches_Set_Input>;
  /** filter the rows which have to be updated */
  where: Branches_Bool_Exp;
};

/** Boolean expression to compare columns of type "citext". All fields are combined with logical 'AND'. */
export type Citext_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["citext"]>;
  _gt?: InputMaybe<Scalars["citext"]>;
  _gte?: InputMaybe<Scalars["citext"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["citext"]>;
  _in?: InputMaybe<Scalars["citext"][]>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["citext"]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["citext"]>;
  _lt?: InputMaybe<Scalars["citext"]>;
  _lte?: InputMaybe<Scalars["citext"]>;
  _neq?: InputMaybe<Scalars["citext"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["citext"]>;
  _nin?: InputMaybe<Scalars["citext"][]>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["citext"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["citext"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["citext"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["citext"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["citext"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["citext"]>;
};

/** fields of action: "create_events" */
export type Create_Events = {
  __typename?: "create_events";
  /** the time at which this action was created */
  created_at: Scalars["timestamptz"];
  /** errors related to the invocation */
  errors?: Maybe<Scalars["json"]>;
  /** the unique id of an action */
  id: Scalars["uuid"];
  /** the output fields of this action */
  output: Events_Create_Mutation_Response;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = "ASC",
  /** descending ordering of the cursor */
  Desc = "DESC",
}

/** columns and relationships of "dashboards" */
export type Dashboards = {
  __typename?: "dashboards";
  created_at: Scalars["timestamptz"];
  id: Scalars["uuid"];
  layout?: Maybe<Scalars["jsonb"]>;
  name: Scalars["String"];
  /** An array relationship */
  pinned_items: Pinned_Items[];
  /** An aggregate relationship */
  pinned_items_aggregate: Pinned_Items_Aggregate;
  /** An object relationship */
  team?: Maybe<Teams>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at: Scalars["timestamptz"];
  user_id: Scalars["uuid"];
};

/** columns and relationships of "dashboards" */
export type DashboardsLayoutArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "dashboards" */
export type DashboardsPinned_ItemsArgs = {
  distinct_on?: InputMaybe<Pinned_Items_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Pinned_Items_Order_By[]>;
  where?: InputMaybe<Pinned_Items_Bool_Exp>;
};

/** columns and relationships of "dashboards" */
export type DashboardsPinned_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Pinned_Items_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Pinned_Items_Order_By[]>;
  where?: InputMaybe<Pinned_Items_Bool_Exp>;
};

/** aggregated selection of "dashboards" */
export type Dashboards_Aggregate = {
  __typename?: "dashboards_aggregate";
  aggregate?: Maybe<Dashboards_Aggregate_Fields>;
  nodes: Dashboards[];
};

export type Dashboards_Aggregate_Bool_Exp = {
  count?: InputMaybe<Dashboards_Aggregate_Bool_Exp_Count>;
};

export type Dashboards_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Dashboards_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Dashboards_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "dashboards" */
export type Dashboards_Aggregate_Fields = {
  __typename?: "dashboards_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Dashboards_Max_Fields>;
  min?: Maybe<Dashboards_Min_Fields>;
};

/** aggregate fields of "dashboards" */
export type Dashboards_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Dashboards_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "dashboards" */
export type Dashboards_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dashboards_Max_Order_By>;
  min?: InputMaybe<Dashboards_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Dashboards_Append_Input = {
  layout?: InputMaybe<Scalars["jsonb"]>;
};

/** input type for inserting array relation for remote table "dashboards" */
export type Dashboards_Arr_Rel_Insert_Input = {
  data: Dashboards_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Dashboards_On_Conflict>;
};

/** Boolean expression to filter rows from the table "dashboards". All fields are combined with a logical 'AND'. */
export type Dashboards_Bool_Exp = {
  _and?: InputMaybe<Dashboards_Bool_Exp[]>;
  _not?: InputMaybe<Dashboards_Bool_Exp>;
  _or?: InputMaybe<Dashboards_Bool_Exp[]>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layout?: InputMaybe<Jsonb_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  pinned_items?: InputMaybe<Pinned_Items_Bool_Exp>;
  pinned_items_aggregate?: InputMaybe<Pinned_Items_Aggregate_Bool_Exp>;
  team?: InputMaybe<Teams_Bool_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "dashboards" */
export enum Dashboards_Constraint {
  /** unique or primary key constraint on columns "id" */
  DashboardsPkey = "dashboards_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Dashboards_Delete_At_Path_Input = {
  layout?: InputMaybe<Scalars["String"][]>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Dashboards_Delete_Elem_Input = {
  layout?: InputMaybe<Scalars["Int"]>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Dashboards_Delete_Key_Input = {
  layout?: InputMaybe<Scalars["String"]>;
};

/** input type for inserting data into table "dashboards" */
export type Dashboards_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  layout?: InputMaybe<Scalars["jsonb"]>;
  name?: InputMaybe<Scalars["String"]>;
  pinned_items?: InputMaybe<Pinned_Items_Arr_Rel_Insert_Input>;
  team?: InputMaybe<Teams_Obj_Rel_Insert_Input>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Dashboards_Max_Fields = {
  __typename?: "dashboards_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "dashboards" */
export type Dashboards_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dashboards_Min_Fields = {
  __typename?: "dashboards_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "dashboards" */
export type Dashboards_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dashboards" */
export type Dashboards_Mutation_Response = {
  __typename?: "dashboards_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Dashboards[];
};

/** input type for inserting object relation for remote table "dashboards" */
export type Dashboards_Obj_Rel_Insert_Input = {
  data: Dashboards_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Dashboards_On_Conflict>;
};

/** on_conflict condition type for table "dashboards" */
export type Dashboards_On_Conflict = {
  constraint: Dashboards_Constraint;
  update_columns?: Dashboards_Update_Column[];
  where?: InputMaybe<Dashboards_Bool_Exp>;
};

/** Ordering options when selecting data from "dashboards". */
export type Dashboards_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layout?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  pinned_items_aggregate?: InputMaybe<Pinned_Items_Aggregate_Order_By>;
  team?: InputMaybe<Teams_Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: dashboards */
export type Dashboards_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Dashboards_Prepend_Input = {
  layout?: InputMaybe<Scalars["jsonb"]>;
};

/** select columns of table "dashboards" */
export enum Dashboards_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Layout = "layout",
  /** column name */
  Name = "name",
  /** column name */
  TeamId = "team_id",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "dashboards" */
export type Dashboards_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  layout?: InputMaybe<Scalars["jsonb"]>;
  name?: InputMaybe<Scalars["String"]>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "dashboards" */
export type Dashboards_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dashboards_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dashboards_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  layout?: InputMaybe<Scalars["jsonb"]>;
  name?: InputMaybe<Scalars["String"]>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "dashboards" */
export enum Dashboards_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Layout = "layout",
  /** column name */
  Name = "name",
  /** column name */
  TeamId = "team_id",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

export type Dashboards_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Dashboards_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Dashboards_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Dashboards_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Dashboards_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Dashboards_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Dashboards_Set_Input>;
  /** filter the rows which have to be updated */
  where: Dashboards_Bool_Exp;
};

/** columns and relationships of "dataschemas" */
export type Dataschemas = {
  __typename?: "dataschemas";
  checksum?: Maybe<Scalars["String"]>;
  code: Scalars["String"];
  created_at: Scalars["timestamptz"];
  /** An object relationship */
  datasource: Datasources;
  datasource_id: Scalars["uuid"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  updated_at: Scalars["timestamptz"];
  /** An object relationship */
  user: Users;
  user_id: Scalars["uuid"];
  /** An object relationship */
  version?: Maybe<Versions>;
  version_id?: Maybe<Scalars["uuid"]>;
};

/** aggregated selection of "dataschemas" */
export type Dataschemas_Aggregate = {
  __typename?: "dataschemas_aggregate";
  aggregate?: Maybe<Dataschemas_Aggregate_Fields>;
  nodes: Dataschemas[];
};

export type Dataschemas_Aggregate_Bool_Exp = {
  count?: InputMaybe<Dataschemas_Aggregate_Bool_Exp_Count>;
};

export type Dataschemas_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Dataschemas_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Dataschemas_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "dataschemas" */
export type Dataschemas_Aggregate_Fields = {
  __typename?: "dataschemas_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Dataschemas_Max_Fields>;
  min?: Maybe<Dataschemas_Min_Fields>;
};

/** aggregate fields of "dataschemas" */
export type Dataschemas_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Dataschemas_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "dataschemas" */
export type Dataschemas_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dataschemas_Max_Order_By>;
  min?: InputMaybe<Dataschemas_Min_Order_By>;
};

/** input type for inserting array relation for remote table "dataschemas" */
export type Dataschemas_Arr_Rel_Insert_Input = {
  data: Dataschemas_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Dataschemas_On_Conflict>;
};

/** Boolean expression to filter rows from the table "dataschemas". All fields are combined with a logical 'AND'. */
export type Dataschemas_Bool_Exp = {
  _and?: InputMaybe<Dataschemas_Bool_Exp[]>;
  _not?: InputMaybe<Dataschemas_Bool_Exp>;
  _or?: InputMaybe<Dataschemas_Bool_Exp[]>;
  checksum?: InputMaybe<String_Comparison_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  datasource?: InputMaybe<Datasources_Bool_Exp>;
  datasource_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  version?: InputMaybe<Versions_Bool_Exp>;
  version_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "dataschemas" */
export enum Dataschemas_Constraint {
  /** unique or primary key constraint on columns "id" */
  DataschemasPkey = "dataschemas_pkey",
}

/** input type for inserting data into table "dataschemas" */
export type Dataschemas_Insert_Input = {
  checksum?: InputMaybe<Scalars["String"]>;
  code?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource?: InputMaybe<Datasources_Obj_Rel_Insert_Input>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars["uuid"]>;
  version?: InputMaybe<Versions_Obj_Rel_Insert_Input>;
  version_id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Dataschemas_Max_Fields = {
  __typename?: "dataschemas_max_fields";
  checksum?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  datasource_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
  version_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "dataschemas" */
export type Dataschemas_Max_Order_By = {
  checksum?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dataschemas_Min_Fields = {
  __typename?: "dataschemas_min_fields";
  checksum?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  datasource_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
  version_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "dataschemas" */
export type Dataschemas_Min_Order_By = {
  checksum?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dataschemas" */
export type Dataschemas_Mutation_Response = {
  __typename?: "dataschemas_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Dataschemas[];
};

/** on_conflict condition type for table "dataschemas" */
export type Dataschemas_On_Conflict = {
  constraint: Dataschemas_Constraint;
  update_columns?: Dataschemas_Update_Column[];
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

/** Ordering options when selecting data from "dataschemas". */
export type Dataschemas_Order_By = {
  checksum?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  datasource?: InputMaybe<Datasources_Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  version?: InputMaybe<Versions_Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: dataschemas */
export type Dataschemas_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "dataschemas" */
export enum Dataschemas_Select_Column {
  /** column name */
  Checksum = "checksum",
  /** column name */
  Code = "code",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DatasourceId = "datasource_id",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
  /** column name */
  VersionId = "version_id",
}

/** input type for updating data in table "dataschemas" */
export type Dataschemas_Set_Input = {
  checksum?: InputMaybe<Scalars["String"]>;
  code?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
  version_id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "dataschemas" */
export type Dataschemas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dataschemas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dataschemas_Stream_Cursor_Value_Input = {
  checksum?: InputMaybe<Scalars["String"]>;
  code?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
  version_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "dataschemas" */
export enum Dataschemas_Update_Column {
  /** column name */
  Checksum = "checksum",
  /** column name */
  Code = "code",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DatasourceId = "datasource_id",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
  /** column name */
  VersionId = "version_id",
}

export type Dataschemas_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Dataschemas_Set_Input>;
  /** filter the rows which have to be updated */
  where: Dataschemas_Bool_Exp;
};

/** columns and relationships of "datasources" */
export type Datasources = {
  __typename?: "datasources";
  /** An array relationship */
  branches: Branches[];
  /** An aggregate relationship */
  branches_aggregate: Branches_Aggregate;
  created_at: Scalars["timestamptz"];
  /** An array relationship */
  dataschemas: Dataschemas[];
  /** An aggregate relationship */
  dataschemas_aggregate: Dataschemas_Aggregate;
  db_params: Scalars["jsonb"];
  db_type: Scalars["String"];
  /** An array relationship */
  explorations: Explorations[];
  /** An aggregate relationship */
  explorations_aggregate: Explorations_Aggregate;
  id: Scalars["uuid"];
  name: Scalars["String"];
  /** An array relationship */
  sql_credentials: Sql_Credentials[];
  /** An aggregate relationship */
  sql_credentials_aggregate: Sql_Credentials_Aggregate;
  /** An object relationship */
  team?: Maybe<Teams>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at: Scalars["timestamptz"];
  /** An object relationship */
  user: Users;
  user_id: Scalars["uuid"];
};

/** columns and relationships of "datasources" */
export type DatasourcesBranchesArgs = {
  distinct_on?: InputMaybe<Branches_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branches_Order_By[]>;
  where?: InputMaybe<Branches_Bool_Exp>;
};

/** columns and relationships of "datasources" */
export type DatasourcesBranches_AggregateArgs = {
  distinct_on?: InputMaybe<Branches_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branches_Order_By[]>;
  where?: InputMaybe<Branches_Bool_Exp>;
};

/** columns and relationships of "datasources" */
export type DatasourcesDataschemasArgs = {
  distinct_on?: InputMaybe<Dataschemas_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dataschemas_Order_By[]>;
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

/** columns and relationships of "datasources" */
export type DatasourcesDataschemas_AggregateArgs = {
  distinct_on?: InputMaybe<Dataschemas_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dataschemas_Order_By[]>;
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

/** columns and relationships of "datasources" */
export type DatasourcesDb_ParamsArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "datasources" */
export type DatasourcesExplorationsArgs = {
  distinct_on?: InputMaybe<Explorations_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Explorations_Order_By[]>;
  where?: InputMaybe<Explorations_Bool_Exp>;
};

/** columns and relationships of "datasources" */
export type DatasourcesExplorations_AggregateArgs = {
  distinct_on?: InputMaybe<Explorations_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Explorations_Order_By[]>;
  where?: InputMaybe<Explorations_Bool_Exp>;
};

/** columns and relationships of "datasources" */
export type DatasourcesSql_CredentialsArgs = {
  distinct_on?: InputMaybe<Sql_Credentials_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Sql_Credentials_Order_By[]>;
  where?: InputMaybe<Sql_Credentials_Bool_Exp>;
};

/** columns and relationships of "datasources" */
export type DatasourcesSql_Credentials_AggregateArgs = {
  distinct_on?: InputMaybe<Sql_Credentials_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Sql_Credentials_Order_By[]>;
  where?: InputMaybe<Sql_Credentials_Bool_Exp>;
};

/** aggregated selection of "datasources" */
export type Datasources_Aggregate = {
  __typename?: "datasources_aggregate";
  aggregate?: Maybe<Datasources_Aggregate_Fields>;
  nodes: Datasources[];
};

export type Datasources_Aggregate_Bool_Exp = {
  count?: InputMaybe<Datasources_Aggregate_Bool_Exp_Count>;
};

export type Datasources_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Datasources_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Datasources_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "datasources" */
export type Datasources_Aggregate_Fields = {
  __typename?: "datasources_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Datasources_Max_Fields>;
  min?: Maybe<Datasources_Min_Fields>;
};

/** aggregate fields of "datasources" */
export type Datasources_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Datasources_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "datasources" */
export type Datasources_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Datasources_Max_Order_By>;
  min?: InputMaybe<Datasources_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Datasources_Append_Input = {
  db_params?: InputMaybe<Scalars["jsonb"]>;
};

/** input type for inserting array relation for remote table "datasources" */
export type Datasources_Arr_Rel_Insert_Input = {
  data: Datasources_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Datasources_On_Conflict>;
};

/** Boolean expression to filter rows from the table "datasources". All fields are combined with a logical 'AND'. */
export type Datasources_Bool_Exp = {
  _and?: InputMaybe<Datasources_Bool_Exp[]>;
  _not?: InputMaybe<Datasources_Bool_Exp>;
  _or?: InputMaybe<Datasources_Bool_Exp[]>;
  branches?: InputMaybe<Branches_Bool_Exp>;
  branches_aggregate?: InputMaybe<Branches_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  dataschemas?: InputMaybe<Dataschemas_Bool_Exp>;
  dataschemas_aggregate?: InputMaybe<Dataschemas_Aggregate_Bool_Exp>;
  db_params?: InputMaybe<Jsonb_Comparison_Exp>;
  db_type?: InputMaybe<String_Comparison_Exp>;
  explorations?: InputMaybe<Explorations_Bool_Exp>;
  explorations_aggregate?: InputMaybe<Explorations_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  sql_credentials?: InputMaybe<Sql_Credentials_Bool_Exp>;
  sql_credentials_aggregate?: InputMaybe<Sql_Credentials_Aggregate_Bool_Exp>;
  team?: InputMaybe<Teams_Bool_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "datasources" */
export enum Datasources_Constraint {
  /** unique or primary key constraint on columns "id" */
  DatasourcesPkey = "datasources_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Datasources_Delete_At_Path_Input = {
  db_params?: InputMaybe<Scalars["String"][]>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Datasources_Delete_Elem_Input = {
  db_params?: InputMaybe<Scalars["Int"]>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Datasources_Delete_Key_Input = {
  db_params?: InputMaybe<Scalars["String"]>;
};

/** input type for inserting data into table "datasources" */
export type Datasources_Insert_Input = {
  branches?: InputMaybe<Branches_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  dataschemas?: InputMaybe<Dataschemas_Arr_Rel_Insert_Input>;
  db_params?: InputMaybe<Scalars["jsonb"]>;
  db_type?: InputMaybe<Scalars["String"]>;
  explorations?: InputMaybe<Explorations_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  sql_credentials?: InputMaybe<Sql_Credentials_Arr_Rel_Insert_Input>;
  team?: InputMaybe<Teams_Obj_Rel_Insert_Input>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Datasources_Max_Fields = {
  __typename?: "datasources_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  db_type?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "datasources" */
export type Datasources_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  db_type?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Datasources_Min_Fields = {
  __typename?: "datasources_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  db_type?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "datasources" */
export type Datasources_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  db_type?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "datasources" */
export type Datasources_Mutation_Response = {
  __typename?: "datasources_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Datasources[];
};

/** input type for inserting object relation for remote table "datasources" */
export type Datasources_Obj_Rel_Insert_Input = {
  data: Datasources_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Datasources_On_Conflict>;
};

/** on_conflict condition type for table "datasources" */
export type Datasources_On_Conflict = {
  constraint: Datasources_Constraint;
  update_columns?: Datasources_Update_Column[];
  where?: InputMaybe<Datasources_Bool_Exp>;
};

/** Ordering options when selecting data from "datasources". */
export type Datasources_Order_By = {
  branches_aggregate?: InputMaybe<Branches_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  dataschemas_aggregate?: InputMaybe<Dataschemas_Aggregate_Order_By>;
  db_params?: InputMaybe<Order_By>;
  db_type?: InputMaybe<Order_By>;
  explorations_aggregate?: InputMaybe<Explorations_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sql_credentials_aggregate?: InputMaybe<Sql_Credentials_Aggregate_Order_By>;
  team?: InputMaybe<Teams_Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: datasources */
export type Datasources_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Datasources_Prepend_Input = {
  db_params?: InputMaybe<Scalars["jsonb"]>;
};

/** select columns of table "datasources" */
export enum Datasources_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DbParams = "db_params",
  /** column name */
  DbType = "db_type",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  TeamId = "team_id",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "datasources" */
export type Datasources_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  db_params?: InputMaybe<Scalars["jsonb"]>;
  db_type?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "datasources" */
export type Datasources_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Datasources_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Datasources_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  db_params?: InputMaybe<Scalars["jsonb"]>;
  db_type?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "datasources" */
export enum Datasources_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DbParams = "db_params",
  /** column name */
  DbType = "db_type",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  TeamId = "team_id",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

export type Datasources_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Datasources_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Datasources_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Datasources_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Datasources_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Datasources_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Datasources_Set_Input>;
  /** filter the rows which have to be updated */
  where: Datasources_Bool_Exp;
};

/** suitable for Events Analytics */
export type Events = {
  __typename?: "events";
  created_at: Scalars["timestamptz"];
  data: Scalars["jsonb"];
  device_context: Scalars["jsonb"];
  id: Scalars["uuid"];
  page_context: Scalars["jsonb"];
  updated_at: Scalars["timestamptz"];
  user: Scalars["jsonb"];
};

/** suitable for Events Analytics */
export type EventsDataArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** suitable for Events Analytics */
export type EventsDevice_ContextArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** suitable for Events Analytics */
export type EventsPage_ContextArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** suitable for Events Analytics */
export type EventsUserArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** aggregated selection of "events" */
export type Events_Aggregate = {
  __typename?: "events_aggregate";
  aggregate?: Maybe<Events_Aggregate_Fields>;
  nodes: Events[];
};

/** aggregate fields of "events" */
export type Events_Aggregate_Fields = {
  __typename?: "events_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Events_Max_Fields>;
  min?: Maybe<Events_Min_Fields>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Events_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Events_Append_Input = {
  data?: InputMaybe<Scalars["jsonb"]>;
  device_context?: InputMaybe<Scalars["jsonb"]>;
  page_context?: InputMaybe<Scalars["jsonb"]>;
  user?: InputMaybe<Scalars["jsonb"]>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Events_Bool_Exp[]>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Events_Bool_Exp[]>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  device_context?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  page_context?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** unique or primary key constraints on table "events" */
export enum Events_Constraint {
  /** unique or primary key constraint on columns "id" */
  EventsPkey = "events_pkey",
}

export type Events_Create_Input = {
  data: Scalars["json"];
  device_context?: InputMaybe<Scalars["json"]>;
  page_context?: InputMaybe<Scalars["json"]>;
  user: Scalars["json"];
};

export type Events_Create_Mutation_Response = {
  __typename?: "events_create_mutation_response";
  affected_rows?: Maybe<Scalars["Int"]>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Events_Delete_At_Path_Input = {
  data?: InputMaybe<Scalars["String"][]>;
  device_context?: InputMaybe<Scalars["String"][]>;
  page_context?: InputMaybe<Scalars["String"][]>;
  user?: InputMaybe<Scalars["String"][]>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Events_Delete_Elem_Input = {
  data?: InputMaybe<Scalars["Int"]>;
  device_context?: InputMaybe<Scalars["Int"]>;
  page_context?: InputMaybe<Scalars["Int"]>;
  user?: InputMaybe<Scalars["Int"]>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Events_Delete_Key_Input = {
  data?: InputMaybe<Scalars["String"]>;
  device_context?: InputMaybe<Scalars["String"]>;
  page_context?: InputMaybe<Scalars["String"]>;
  user?: InputMaybe<Scalars["String"]>;
};

/** input type for inserting data into table "events" */
export type Events_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  data?: InputMaybe<Scalars["jsonb"]>;
  device_context?: InputMaybe<Scalars["jsonb"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  page_context?: InputMaybe<Scalars["jsonb"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Scalars["jsonb"]>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: "events_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: "events_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** response of any mutation on the table "events" */
export type Events_Mutation_Response = {
  __typename?: "events_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Events[];
};

/** on_conflict condition type for table "events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns?: Events_Update_Column[];
  where?: InputMaybe<Events_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  created_at?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  device_context?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  page_context?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
};

/** primary key columns input for table: events */
export type Events_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Events_Prepend_Input = {
  data?: InputMaybe<Scalars["jsonb"]>;
  device_context?: InputMaybe<Scalars["jsonb"]>;
  page_context?: InputMaybe<Scalars["jsonb"]>;
  user?: InputMaybe<Scalars["jsonb"]>;
};

/** select columns of table "events" */
export enum Events_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Data = "data",
  /** column name */
  DeviceContext = "device_context",
  /** column name */
  Id = "id",
  /** column name */
  PageContext = "page_context",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  User = "user",
}

/** input type for updating data in table "events" */
export type Events_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  data?: InputMaybe<Scalars["jsonb"]>;
  device_context?: InputMaybe<Scalars["jsonb"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  page_context?: InputMaybe<Scalars["jsonb"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Scalars["jsonb"]>;
};

/** Streaming cursor of the table "events" */
export type Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Events_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  data?: InputMaybe<Scalars["jsonb"]>;
  device_context?: InputMaybe<Scalars["jsonb"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  page_context?: InputMaybe<Scalars["jsonb"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Scalars["jsonb"]>;
};

/** update columns of table "events" */
export enum Events_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Data = "data",
  /** column name */
  DeviceContext = "device_context",
  /** column name */
  Id = "id",
  /** column name */
  PageContext = "page_context",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  User = "user",
}

export type Events_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Events_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Events_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Events_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Events_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Events_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Events_Set_Input>;
  /** filter the rows which have to be updated */
  where: Events_Bool_Exp;
};

/** columns and relationships of "explorations" */
export type Explorations = {
  __typename?: "explorations";
  /** An array relationship */
  alerts: Alerts[];
  /** An aggregate relationship */
  alerts_aggregate: Alerts_Aggregate;
  created_at: Scalars["timestamptz"];
  /** An object relationship */
  datasource: Datasources;
  datasource_id: Scalars["uuid"];
  id: Scalars["uuid"];
  /** An array relationship */
  pinned_items: Pinned_Items[];
  /** An aggregate relationship */
  pinned_items_aggregate: Pinned_Items_Aggregate;
  playground_settings: Scalars["jsonb"];
  playground_state: Scalars["jsonb"];
  /** An array relationship */
  reports: Reports[];
  /** An aggregate relationship */
  reports_aggregate: Reports_Aggregate;
  updated_at: Scalars["timestamptz"];
  user_id: Scalars["uuid"];
};

/** columns and relationships of "explorations" */
export type ExplorationsAlertsArgs = {
  distinct_on?: InputMaybe<Alerts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Alerts_Order_By[]>;
  where?: InputMaybe<Alerts_Bool_Exp>;
};

/** columns and relationships of "explorations" */
export type ExplorationsAlerts_AggregateArgs = {
  distinct_on?: InputMaybe<Alerts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Alerts_Order_By[]>;
  where?: InputMaybe<Alerts_Bool_Exp>;
};

/** columns and relationships of "explorations" */
export type ExplorationsPinned_ItemsArgs = {
  distinct_on?: InputMaybe<Pinned_Items_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Pinned_Items_Order_By[]>;
  where?: InputMaybe<Pinned_Items_Bool_Exp>;
};

/** columns and relationships of "explorations" */
export type ExplorationsPinned_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Pinned_Items_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Pinned_Items_Order_By[]>;
  where?: InputMaybe<Pinned_Items_Bool_Exp>;
};

/** columns and relationships of "explorations" */
export type ExplorationsPlayground_SettingsArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "explorations" */
export type ExplorationsPlayground_StateArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "explorations" */
export type ExplorationsReportsArgs = {
  distinct_on?: InputMaybe<Reports_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Reports_Order_By[]>;
  where?: InputMaybe<Reports_Bool_Exp>;
};

/** columns and relationships of "explorations" */
export type ExplorationsReports_AggregateArgs = {
  distinct_on?: InputMaybe<Reports_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Reports_Order_By[]>;
  where?: InputMaybe<Reports_Bool_Exp>;
};

/** aggregated selection of "explorations" */
export type Explorations_Aggregate = {
  __typename?: "explorations_aggregate";
  aggregate?: Maybe<Explorations_Aggregate_Fields>;
  nodes: Explorations[];
};

export type Explorations_Aggregate_Bool_Exp = {
  count?: InputMaybe<Explorations_Aggregate_Bool_Exp_Count>;
};

export type Explorations_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Explorations_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Explorations_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "explorations" */
export type Explorations_Aggregate_Fields = {
  __typename?: "explorations_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Explorations_Max_Fields>;
  min?: Maybe<Explorations_Min_Fields>;
};

/** aggregate fields of "explorations" */
export type Explorations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Explorations_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "explorations" */
export type Explorations_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Explorations_Max_Order_By>;
  min?: InputMaybe<Explorations_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Explorations_Append_Input = {
  playground_settings?: InputMaybe<Scalars["jsonb"]>;
  playground_state?: InputMaybe<Scalars["jsonb"]>;
};

/** input type for inserting array relation for remote table "explorations" */
export type Explorations_Arr_Rel_Insert_Input = {
  data: Explorations_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Explorations_On_Conflict>;
};

/** Boolean expression to filter rows from the table "explorations". All fields are combined with a logical 'AND'. */
export type Explorations_Bool_Exp = {
  _and?: InputMaybe<Explorations_Bool_Exp[]>;
  _not?: InputMaybe<Explorations_Bool_Exp>;
  _or?: InputMaybe<Explorations_Bool_Exp[]>;
  alerts?: InputMaybe<Alerts_Bool_Exp>;
  alerts_aggregate?: InputMaybe<Alerts_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  datasource?: InputMaybe<Datasources_Bool_Exp>;
  datasource_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  pinned_items?: InputMaybe<Pinned_Items_Bool_Exp>;
  pinned_items_aggregate?: InputMaybe<Pinned_Items_Aggregate_Bool_Exp>;
  playground_settings?: InputMaybe<Jsonb_Comparison_Exp>;
  playground_state?: InputMaybe<Jsonb_Comparison_Exp>;
  reports?: InputMaybe<Reports_Bool_Exp>;
  reports_aggregate?: InputMaybe<Reports_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "explorations" */
export enum Explorations_Constraint {
  /** unique or primary key constraint on columns "id" */
  ExplorationsPkey = "explorations_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Explorations_Delete_At_Path_Input = {
  playground_settings?: InputMaybe<Scalars["String"][]>;
  playground_state?: InputMaybe<Scalars["String"][]>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Explorations_Delete_Elem_Input = {
  playground_settings?: InputMaybe<Scalars["Int"]>;
  playground_state?: InputMaybe<Scalars["Int"]>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Explorations_Delete_Key_Input = {
  playground_settings?: InputMaybe<Scalars["String"]>;
  playground_state?: InputMaybe<Scalars["String"]>;
};

/** input type for inserting data into table "explorations" */
export type Explorations_Insert_Input = {
  alerts?: InputMaybe<Alerts_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource?: InputMaybe<Datasources_Obj_Rel_Insert_Input>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  pinned_items?: InputMaybe<Pinned_Items_Arr_Rel_Insert_Input>;
  playground_settings?: InputMaybe<Scalars["jsonb"]>;
  playground_state?: InputMaybe<Scalars["jsonb"]>;
  reports?: InputMaybe<Reports_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Explorations_Max_Fields = {
  __typename?: "explorations_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  datasource_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "explorations" */
export type Explorations_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Explorations_Min_Fields = {
  __typename?: "explorations_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  datasource_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "explorations" */
export type Explorations_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "explorations" */
export type Explorations_Mutation_Response = {
  __typename?: "explorations_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Explorations[];
};

/** input type for inserting object relation for remote table "explorations" */
export type Explorations_Obj_Rel_Insert_Input = {
  data: Explorations_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Explorations_On_Conflict>;
};

/** on_conflict condition type for table "explorations" */
export type Explorations_On_Conflict = {
  constraint: Explorations_Constraint;
  update_columns?: Explorations_Update_Column[];
  where?: InputMaybe<Explorations_Bool_Exp>;
};

/** Ordering options when selecting data from "explorations". */
export type Explorations_Order_By = {
  alerts_aggregate?: InputMaybe<Alerts_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  datasource?: InputMaybe<Datasources_Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pinned_items_aggregate?: InputMaybe<Pinned_Items_Aggregate_Order_By>;
  playground_settings?: InputMaybe<Order_By>;
  playground_state?: InputMaybe<Order_By>;
  reports_aggregate?: InputMaybe<Reports_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: explorations */
export type Explorations_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Explorations_Prepend_Input = {
  playground_settings?: InputMaybe<Scalars["jsonb"]>;
  playground_state?: InputMaybe<Scalars["jsonb"]>;
};

/** select columns of table "explorations" */
export enum Explorations_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DatasourceId = "datasource_id",
  /** column name */
  Id = "id",
  /** column name */
  PlaygroundSettings = "playground_settings",
  /** column name */
  PlaygroundState = "playground_state",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "explorations" */
export type Explorations_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  playground_settings?: InputMaybe<Scalars["jsonb"]>;
  playground_state?: InputMaybe<Scalars["jsonb"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "explorations" */
export type Explorations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Explorations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Explorations_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  playground_settings?: InputMaybe<Scalars["jsonb"]>;
  playground_state?: InputMaybe<Scalars["jsonb"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "explorations" */
export enum Explorations_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DatasourceId = "datasource_id",
  /** column name */
  Id = "id",
  /** column name */
  PlaygroundSettings = "playground_settings",
  /** column name */
  PlaygroundState = "playground_state",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

export type Explorations_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Explorations_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Explorations_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Explorations_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Explorations_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Explorations_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Explorations_Set_Input>;
  /** filter the rows which have to be updated */
  where: Explorations_Bool_Exp;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars["jsonb"]>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars["jsonb"]>;
  _eq?: InputMaybe<Scalars["jsonb"]>;
  _gt?: InputMaybe<Scalars["jsonb"]>;
  _gte?: InputMaybe<Scalars["jsonb"]>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars["String"]>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Scalars["String"][]>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Scalars["String"][]>;
  _in?: InputMaybe<Scalars["jsonb"][]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["jsonb"]>;
  _lte?: InputMaybe<Scalars["jsonb"]>;
  _neq?: InputMaybe<Scalars["jsonb"]>;
  _nin?: InputMaybe<Scalars["jsonb"][]>;
};

/** columns and relationships of "member_roles" */
export type Member_Roles = {
  __typename?: "member_roles";
  id: Scalars["uuid"];
  /** An object relationship */
  member: Members;
  member_id: Scalars["uuid"];
  /** An object relationship */
  teamRoleByTeamRole: Team_Roles;
  team_role: Team_Roles_Enum;
};

/** aggregated selection of "member_roles" */
export type Member_Roles_Aggregate = {
  __typename?: "member_roles_aggregate";
  aggregate?: Maybe<Member_Roles_Aggregate_Fields>;
  nodes: Member_Roles[];
};

export type Member_Roles_Aggregate_Bool_Exp = {
  count?: InputMaybe<Member_Roles_Aggregate_Bool_Exp_Count>;
};

export type Member_Roles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Member_Roles_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Member_Roles_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "member_roles" */
export type Member_Roles_Aggregate_Fields = {
  __typename?: "member_roles_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Member_Roles_Max_Fields>;
  min?: Maybe<Member_Roles_Min_Fields>;
};

/** aggregate fields of "member_roles" */
export type Member_Roles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Member_Roles_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "member_roles" */
export type Member_Roles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Member_Roles_Max_Order_By>;
  min?: InputMaybe<Member_Roles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "member_roles" */
export type Member_Roles_Arr_Rel_Insert_Input = {
  data: Member_Roles_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Member_Roles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "member_roles". All fields are combined with a logical 'AND'. */
export type Member_Roles_Bool_Exp = {
  _and?: InputMaybe<Member_Roles_Bool_Exp[]>;
  _not?: InputMaybe<Member_Roles_Bool_Exp>;
  _or?: InputMaybe<Member_Roles_Bool_Exp[]>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Members_Bool_Exp>;
  member_id?: InputMaybe<Uuid_Comparison_Exp>;
  teamRoleByTeamRole?: InputMaybe<Team_Roles_Bool_Exp>;
  team_role?: InputMaybe<Team_Roles_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "member_roles" */
export enum Member_Roles_Constraint {
  /** unique or primary key constraint on columns "member_id", "team_role" */
  MemberRolesMemberIdTeamRoleKey = "member_roles_member_id_team_role_key",
  /** unique or primary key constraint on columns "id" */
  MemberRolesPkey = "member_roles_pkey",
}

/** input type for inserting data into table "member_roles" */
export type Member_Roles_Insert_Input = {
  id?: InputMaybe<Scalars["uuid"]>;
  member?: InputMaybe<Members_Obj_Rel_Insert_Input>;
  member_id?: InputMaybe<Scalars["uuid"]>;
  teamRoleByTeamRole?: InputMaybe<Team_Roles_Obj_Rel_Insert_Input>;
  team_role?: InputMaybe<Team_Roles_Enum>;
};

/** aggregate max on columns */
export type Member_Roles_Max_Fields = {
  __typename?: "member_roles_max_fields";
  id?: Maybe<Scalars["uuid"]>;
  member_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "member_roles" */
export type Member_Roles_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  member_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Member_Roles_Min_Fields = {
  __typename?: "member_roles_min_fields";
  id?: Maybe<Scalars["uuid"]>;
  member_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "member_roles" */
export type Member_Roles_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  member_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "member_roles" */
export type Member_Roles_Mutation_Response = {
  __typename?: "member_roles_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Member_Roles[];
};

/** on_conflict condition type for table "member_roles" */
export type Member_Roles_On_Conflict = {
  constraint: Member_Roles_Constraint;
  update_columns?: Member_Roles_Update_Column[];
  where?: InputMaybe<Member_Roles_Bool_Exp>;
};

/** Ordering options when selecting data from "member_roles". */
export type Member_Roles_Order_By = {
  id?: InputMaybe<Order_By>;
  member?: InputMaybe<Members_Order_By>;
  member_id?: InputMaybe<Order_By>;
  teamRoleByTeamRole?: InputMaybe<Team_Roles_Order_By>;
  team_role?: InputMaybe<Order_By>;
};

/** primary key columns input for table: member_roles */
export type Member_Roles_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "member_roles" */
export enum Member_Roles_Select_Column {
  /** column name */
  Id = "id",
  /** column name */
  MemberId = "member_id",
  /** column name */
  TeamRole = "team_role",
}

/** input type for updating data in table "member_roles" */
export type Member_Roles_Set_Input = {
  id?: InputMaybe<Scalars["uuid"]>;
  member_id?: InputMaybe<Scalars["uuid"]>;
  team_role?: InputMaybe<Team_Roles_Enum>;
};

/** Streaming cursor of the table "member_roles" */
export type Member_Roles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Member_Roles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Member_Roles_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars["uuid"]>;
  member_id?: InputMaybe<Scalars["uuid"]>;
  team_role?: InputMaybe<Team_Roles_Enum>;
};

/** update columns of table "member_roles" */
export enum Member_Roles_Update_Column {
  /** column name */
  Id = "id",
  /** column name */
  MemberId = "member_id",
  /** column name */
  TeamRole = "team_role",
}

export type Member_Roles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Member_Roles_Set_Input>;
  /** filter the rows which have to be updated */
  where: Member_Roles_Bool_Exp;
};

/** columns and relationships of "members" */
export type Members = {
  __typename?: "members";
  created_at: Scalars["timestamptz"];
  id: Scalars["uuid"];
  /** An array relationship */
  member_roles: Member_Roles[];
  /** An aggregate relationship */
  member_roles_aggregate: Member_Roles_Aggregate;
  /** An object relationship */
  team: Teams;
  team_id: Scalars["uuid"];
  updated_at: Scalars["timestamptz"];
  /** An object relationship */
  user: Users;
  user_id: Scalars["uuid"];
};

/** columns and relationships of "members" */
export type MembersMember_RolesArgs = {
  distinct_on?: InputMaybe<Member_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Member_Roles_Order_By[]>;
  where?: InputMaybe<Member_Roles_Bool_Exp>;
};

/** columns and relationships of "members" */
export type MembersMember_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Member_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Member_Roles_Order_By[]>;
  where?: InputMaybe<Member_Roles_Bool_Exp>;
};

/** aggregated selection of "members" */
export type Members_Aggregate = {
  __typename?: "members_aggregate";
  aggregate?: Maybe<Members_Aggregate_Fields>;
  nodes: Members[];
};

export type Members_Aggregate_Bool_Exp = {
  count?: InputMaybe<Members_Aggregate_Bool_Exp_Count>;
};

export type Members_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Members_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Members_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "members" */
export type Members_Aggregate_Fields = {
  __typename?: "members_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Members_Max_Fields>;
  min?: Maybe<Members_Min_Fields>;
};

/** aggregate fields of "members" */
export type Members_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Members_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "members" */
export type Members_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Members_Max_Order_By>;
  min?: InputMaybe<Members_Min_Order_By>;
};

/** input type for inserting array relation for remote table "members" */
export type Members_Arr_Rel_Insert_Input = {
  data: Members_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Members_On_Conflict>;
};

/** Boolean expression to filter rows from the table "members". All fields are combined with a logical 'AND'. */
export type Members_Bool_Exp = {
  _and?: InputMaybe<Members_Bool_Exp[]>;
  _not?: InputMaybe<Members_Bool_Exp>;
  _or?: InputMaybe<Members_Bool_Exp[]>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  member_roles?: InputMaybe<Member_Roles_Bool_Exp>;
  member_roles_aggregate?: InputMaybe<Member_Roles_Aggregate_Bool_Exp>;
  team?: InputMaybe<Teams_Bool_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "members" */
export enum Members_Constraint {
  /** unique or primary key constraint on columns "id" */
  MembersPkey = "members_pkey",
}

/** input type for inserting data into table "members" */
export type Members_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  member_roles?: InputMaybe<Member_Roles_Arr_Rel_Insert_Input>;
  team?: InputMaybe<Teams_Obj_Rel_Insert_Input>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Members_Max_Fields = {
  __typename?: "members_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "members" */
export type Members_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Members_Min_Fields = {
  __typename?: "members_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "members" */
export type Members_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "members" */
export type Members_Mutation_Response = {
  __typename?: "members_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Members[];
};

/** input type for inserting object relation for remote table "members" */
export type Members_Obj_Rel_Insert_Input = {
  data: Members_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Members_On_Conflict>;
};

/** on_conflict condition type for table "members" */
export type Members_On_Conflict = {
  constraint: Members_Constraint;
  update_columns?: Members_Update_Column[];
  where?: InputMaybe<Members_Bool_Exp>;
};

/** Ordering options when selecting data from "members". */
export type Members_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  member_roles_aggregate?: InputMaybe<Member_Roles_Aggregate_Order_By>;
  team?: InputMaybe<Teams_Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: members */
export type Members_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "members" */
export enum Members_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  TeamId = "team_id",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "members" */
export type Members_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "members" */
export type Members_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Members_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Members_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "members" */
export enum Members_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  TeamId = "team_id",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

export type Members_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Members_Set_Input>;
  /** filter the rows which have to be updated */
  where: Members_Bool_Exp;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root";
  check_connection?: Maybe<CheckConnectionOutput>;
  create_events: Scalars["uuid"];
  create_team?: Maybe<CreateTeamOutput>;
  /** delete data from the table: "alerts" */
  delete_alerts?: Maybe<Alerts_Mutation_Response>;
  /** delete single row from the table: "alerts" */
  delete_alerts_by_pk?: Maybe<Alerts>;
  /** delete data from the table: "auth.account_providers" */
  delete_auth_account_providers?: Maybe<Auth_Account_Providers_Mutation_Response>;
  /** delete single row from the table: "auth.account_providers" */
  delete_auth_account_providers_by_pk?: Maybe<Auth_Account_Providers>;
  /** delete data from the table: "auth.account_roles" */
  delete_auth_account_roles?: Maybe<Auth_Account_Roles_Mutation_Response>;
  /** delete single row from the table: "auth.account_roles" */
  delete_auth_account_roles_by_pk?: Maybe<Auth_Account_Roles>;
  /** delete data from the table: "auth.accounts" */
  delete_auth_accounts?: Maybe<Auth_Accounts_Mutation_Response>;
  /** delete single row from the table: "auth.accounts" */
  delete_auth_accounts_by_pk?: Maybe<Auth_Accounts>;
  /** delete data from the table: "auth.migrations" */
  delete_auth_migrations?: Maybe<Auth_Migrations_Mutation_Response>;
  /** delete single row from the table: "auth.migrations" */
  delete_auth_migrations_by_pk?: Maybe<Auth_Migrations>;
  /** delete data from the table: "auth.providers" */
  delete_auth_providers?: Maybe<Auth_Providers_Mutation_Response>;
  /** delete single row from the table: "auth.providers" */
  delete_auth_providers_by_pk?: Maybe<Auth_Providers>;
  /** delete data from the table: "auth.refresh_tokens" */
  delete_auth_refresh_tokens?: Maybe<Auth_Refresh_Tokens_Mutation_Response>;
  /** delete single row from the table: "auth.refresh_tokens" */
  delete_auth_refresh_tokens_by_pk?: Maybe<Auth_Refresh_Tokens>;
  /** delete data from the table: "auth.roles" */
  delete_auth_roles?: Maybe<Auth_Roles_Mutation_Response>;
  /** delete single row from the table: "auth.roles" */
  delete_auth_roles_by_pk?: Maybe<Auth_Roles>;
  /** delete data from the table: "branch_statuses" */
  delete_branch_statuses?: Maybe<Branch_Statuses_Mutation_Response>;
  /** delete single row from the table: "branch_statuses" */
  delete_branch_statuses_by_pk?: Maybe<Branch_Statuses>;
  /** delete data from the table: "branches" */
  delete_branches?: Maybe<Branches_Mutation_Response>;
  /** delete single row from the table: "branches" */
  delete_branches_by_pk?: Maybe<Branches>;
  /** delete data from the table: "dashboards" */
  delete_dashboards?: Maybe<Dashboards_Mutation_Response>;
  /** delete single row from the table: "dashboards" */
  delete_dashboards_by_pk?: Maybe<Dashboards>;
  /** delete data from the table: "dataschemas" */
  delete_dataschemas?: Maybe<Dataschemas_Mutation_Response>;
  /** delete single row from the table: "dataschemas" */
  delete_dataschemas_by_pk?: Maybe<Dataschemas>;
  /** delete data from the table: "datasources" */
  delete_datasources?: Maybe<Datasources_Mutation_Response>;
  /** delete single row from the table: "datasources" */
  delete_datasources_by_pk?: Maybe<Datasources>;
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>;
  /** delete single row from the table: "events" */
  delete_events_by_pk?: Maybe<Events>;
  /** delete data from the table: "explorations" */
  delete_explorations?: Maybe<Explorations_Mutation_Response>;
  /** delete single row from the table: "explorations" */
  delete_explorations_by_pk?: Maybe<Explorations>;
  /** delete data from the table: "member_roles" */
  delete_member_roles?: Maybe<Member_Roles_Mutation_Response>;
  /** delete single row from the table: "member_roles" */
  delete_member_roles_by_pk?: Maybe<Member_Roles>;
  /** delete data from the table: "members" */
  delete_members?: Maybe<Members_Mutation_Response>;
  /** delete single row from the table: "members" */
  delete_members_by_pk?: Maybe<Members>;
  /** delete data from the table: "pinned_items" */
  delete_pinned_items?: Maybe<Pinned_Items_Mutation_Response>;
  /** delete single row from the table: "pinned_items" */
  delete_pinned_items_by_pk?: Maybe<Pinned_Items>;
  /** delete data from the table: "reports" */
  delete_reports?: Maybe<Reports_Mutation_Response>;
  /** delete single row from the table: "reports" */
  delete_reports_by_pk?: Maybe<Reports>;
  /** delete data from the table: "sql_credentials" */
  delete_sql_credentials?: Maybe<Sql_Credentials_Mutation_Response>;
  /** delete single row from the table: "sql_credentials" */
  delete_sql_credentials_by_pk?: Maybe<Sql_Credentials>;
  /** delete data from the table: "team_roles" */
  delete_team_roles?: Maybe<Team_Roles_Mutation_Response>;
  /** delete single row from the table: "team_roles" */
  delete_team_roles_by_pk?: Maybe<Team_Roles>;
  /** delete data from the table: "teams" */
  delete_teams?: Maybe<Teams_Mutation_Response>;
  /** delete single row from the table: "teams" */
  delete_teams_by_pk?: Maybe<Teams>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "versions" */
  delete_versions?: Maybe<Versions_Mutation_Response>;
  /** delete single row from the table: "versions" */
  delete_versions_by_pk?: Maybe<Versions>;
  export_data_models?: Maybe<ExportDataModelsOutput>;
  gen_dataschemas?: Maybe<GenSourceSchemaOutput>;
  gen_sql?: Maybe<GenSqlOutput>;
  /** insert data into the table: "alerts" */
  insert_alerts?: Maybe<Alerts_Mutation_Response>;
  /** insert a single row into the table: "alerts" */
  insert_alerts_one?: Maybe<Alerts>;
  /** insert data into the table: "auth.account_providers" */
  insert_auth_account_providers?: Maybe<Auth_Account_Providers_Mutation_Response>;
  /** insert a single row into the table: "auth.account_providers" */
  insert_auth_account_providers_one?: Maybe<Auth_Account_Providers>;
  /** insert data into the table: "auth.account_roles" */
  insert_auth_account_roles?: Maybe<Auth_Account_Roles_Mutation_Response>;
  /** insert a single row into the table: "auth.account_roles" */
  insert_auth_account_roles_one?: Maybe<Auth_Account_Roles>;
  /** insert data into the table: "auth.accounts" */
  insert_auth_accounts?: Maybe<Auth_Accounts_Mutation_Response>;
  /** insert a single row into the table: "auth.accounts" */
  insert_auth_accounts_one?: Maybe<Auth_Accounts>;
  /** insert data into the table: "auth.migrations" */
  insert_auth_migrations?: Maybe<Auth_Migrations_Mutation_Response>;
  /** insert a single row into the table: "auth.migrations" */
  insert_auth_migrations_one?: Maybe<Auth_Migrations>;
  /** insert data into the table: "auth.providers" */
  insert_auth_providers?: Maybe<Auth_Providers_Mutation_Response>;
  /** insert a single row into the table: "auth.providers" */
  insert_auth_providers_one?: Maybe<Auth_Providers>;
  /** insert data into the table: "auth.refresh_tokens" */
  insert_auth_refresh_tokens?: Maybe<Auth_Refresh_Tokens_Mutation_Response>;
  /** insert a single row into the table: "auth.refresh_tokens" */
  insert_auth_refresh_tokens_one?: Maybe<Auth_Refresh_Tokens>;
  /** insert data into the table: "auth.roles" */
  insert_auth_roles?: Maybe<Auth_Roles_Mutation_Response>;
  /** insert a single row into the table: "auth.roles" */
  insert_auth_roles_one?: Maybe<Auth_Roles>;
  /** insert data into the table: "branch_statuses" */
  insert_branch_statuses?: Maybe<Branch_Statuses_Mutation_Response>;
  /** insert a single row into the table: "branch_statuses" */
  insert_branch_statuses_one?: Maybe<Branch_Statuses>;
  /** insert data into the table: "branches" */
  insert_branches?: Maybe<Branches_Mutation_Response>;
  /** insert a single row into the table: "branches" */
  insert_branches_one?: Maybe<Branches>;
  /** insert data into the table: "dashboards" */
  insert_dashboards?: Maybe<Dashboards_Mutation_Response>;
  /** insert a single row into the table: "dashboards" */
  insert_dashboards_one?: Maybe<Dashboards>;
  /** insert data into the table: "dataschemas" */
  insert_dataschemas?: Maybe<Dataschemas_Mutation_Response>;
  /** insert a single row into the table: "dataschemas" */
  insert_dataschemas_one?: Maybe<Dataschemas>;
  /** insert data into the table: "datasources" */
  insert_datasources?: Maybe<Datasources_Mutation_Response>;
  /** insert a single row into the table: "datasources" */
  insert_datasources_one?: Maybe<Datasources>;
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>;
  /** insert data into the table: "explorations" */
  insert_explorations?: Maybe<Explorations_Mutation_Response>;
  /** insert a single row into the table: "explorations" */
  insert_explorations_one?: Maybe<Explorations>;
  /** insert data into the table: "member_roles" */
  insert_member_roles?: Maybe<Member_Roles_Mutation_Response>;
  /** insert a single row into the table: "member_roles" */
  insert_member_roles_one?: Maybe<Member_Roles>;
  /** insert data into the table: "members" */
  insert_members?: Maybe<Members_Mutation_Response>;
  /** insert a single row into the table: "members" */
  insert_members_one?: Maybe<Members>;
  /** insert data into the table: "pinned_items" */
  insert_pinned_items?: Maybe<Pinned_Items_Mutation_Response>;
  /** insert a single row into the table: "pinned_items" */
  insert_pinned_items_one?: Maybe<Pinned_Items>;
  /** insert data into the table: "reports" */
  insert_reports?: Maybe<Reports_Mutation_Response>;
  /** insert a single row into the table: "reports" */
  insert_reports_one?: Maybe<Reports>;
  /** insert data into the table: "sql_credentials" */
  insert_sql_credentials?: Maybe<Sql_Credentials_Mutation_Response>;
  /** insert a single row into the table: "sql_credentials" */
  insert_sql_credentials_one?: Maybe<Sql_Credentials>;
  /** insert data into the table: "team_roles" */
  insert_team_roles?: Maybe<Team_Roles_Mutation_Response>;
  /** insert a single row into the table: "team_roles" */
  insert_team_roles_one?: Maybe<Team_Roles>;
  /** insert data into the table: "teams" */
  insert_teams?: Maybe<Teams_Mutation_Response>;
  /** insert a single row into the table: "teams" */
  insert_teams_one?: Maybe<Teams>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "versions" */
  insert_versions?: Maybe<Versions_Mutation_Response>;
  /** insert a single row into the table: "versions" */
  insert_versions_one?: Maybe<Versions>;
  invite_team_member?: Maybe<InviteTeamMemberOutput>;
  run_query?: Maybe<RunSourceQueryOutput>;
  /** update data of the table: "alerts" */
  update_alerts?: Maybe<Alerts_Mutation_Response>;
  /** update single row of the table: "alerts" */
  update_alerts_by_pk?: Maybe<Alerts>;
  /** update multiples rows of table: "alerts" */
  update_alerts_many?: Maybe<Maybe<Alerts_Mutation_Response>[]>;
  /** update data of the table: "auth.account_providers" */
  update_auth_account_providers?: Maybe<Auth_Account_Providers_Mutation_Response>;
  /** update single row of the table: "auth.account_providers" */
  update_auth_account_providers_by_pk?: Maybe<Auth_Account_Providers>;
  /** update multiples rows of table: "auth.account_providers" */
  update_auth_account_providers_many?: Maybe<
    Maybe<Auth_Account_Providers_Mutation_Response>[]
  >;
  /** update data of the table: "auth.account_roles" */
  update_auth_account_roles?: Maybe<Auth_Account_Roles_Mutation_Response>;
  /** update single row of the table: "auth.account_roles" */
  update_auth_account_roles_by_pk?: Maybe<Auth_Account_Roles>;
  /** update multiples rows of table: "auth.account_roles" */
  update_auth_account_roles_many?: Maybe<
    Maybe<Auth_Account_Roles_Mutation_Response>[]
  >;
  /** update data of the table: "auth.accounts" */
  update_auth_accounts?: Maybe<Auth_Accounts_Mutation_Response>;
  /** update single row of the table: "auth.accounts" */
  update_auth_accounts_by_pk?: Maybe<Auth_Accounts>;
  /** update multiples rows of table: "auth.accounts" */
  update_auth_accounts_many?: Maybe<Maybe<Auth_Accounts_Mutation_Response>[]>;
  /** update data of the table: "auth.migrations" */
  update_auth_migrations?: Maybe<Auth_Migrations_Mutation_Response>;
  /** update single row of the table: "auth.migrations" */
  update_auth_migrations_by_pk?: Maybe<Auth_Migrations>;
  /** update multiples rows of table: "auth.migrations" */
  update_auth_migrations_many?: Maybe<
    Maybe<Auth_Migrations_Mutation_Response>[]
  >;
  /** update data of the table: "auth.providers" */
  update_auth_providers?: Maybe<Auth_Providers_Mutation_Response>;
  /** update single row of the table: "auth.providers" */
  update_auth_providers_by_pk?: Maybe<Auth_Providers>;
  /** update multiples rows of table: "auth.providers" */
  update_auth_providers_many?: Maybe<Maybe<Auth_Providers_Mutation_Response>[]>;
  /** update data of the table: "auth.refresh_tokens" */
  update_auth_refresh_tokens?: Maybe<Auth_Refresh_Tokens_Mutation_Response>;
  /** update single row of the table: "auth.refresh_tokens" */
  update_auth_refresh_tokens_by_pk?: Maybe<Auth_Refresh_Tokens>;
  /** update multiples rows of table: "auth.refresh_tokens" */
  update_auth_refresh_tokens_many?: Maybe<
    Maybe<Auth_Refresh_Tokens_Mutation_Response>[]
  >;
  /** update data of the table: "auth.roles" */
  update_auth_roles?: Maybe<Auth_Roles_Mutation_Response>;
  /** update single row of the table: "auth.roles" */
  update_auth_roles_by_pk?: Maybe<Auth_Roles>;
  /** update multiples rows of table: "auth.roles" */
  update_auth_roles_many?: Maybe<Maybe<Auth_Roles_Mutation_Response>[]>;
  /** update data of the table: "branch_statuses" */
  update_branch_statuses?: Maybe<Branch_Statuses_Mutation_Response>;
  /** update single row of the table: "branch_statuses" */
  update_branch_statuses_by_pk?: Maybe<Branch_Statuses>;
  /** update multiples rows of table: "branch_statuses" */
  update_branch_statuses_many?: Maybe<
    Maybe<Branch_Statuses_Mutation_Response>[]
  >;
  /** update data of the table: "branches" */
  update_branches?: Maybe<Branches_Mutation_Response>;
  /** update single row of the table: "branches" */
  update_branches_by_pk?: Maybe<Branches>;
  /** update multiples rows of table: "branches" */
  update_branches_many?: Maybe<Maybe<Branches_Mutation_Response>[]>;
  /** update data of the table: "dashboards" */
  update_dashboards?: Maybe<Dashboards_Mutation_Response>;
  /** update single row of the table: "dashboards" */
  update_dashboards_by_pk?: Maybe<Dashboards>;
  /** update multiples rows of table: "dashboards" */
  update_dashboards_many?: Maybe<Maybe<Dashboards_Mutation_Response>[]>;
  /** update data of the table: "dataschemas" */
  update_dataschemas?: Maybe<Dataschemas_Mutation_Response>;
  /** update single row of the table: "dataschemas" */
  update_dataschemas_by_pk?: Maybe<Dataschemas>;
  /** update multiples rows of table: "dataschemas" */
  update_dataschemas_many?: Maybe<Maybe<Dataschemas_Mutation_Response>[]>;
  /** update data of the table: "datasources" */
  update_datasources?: Maybe<Datasources_Mutation_Response>;
  /** update single row of the table: "datasources" */
  update_datasources_by_pk?: Maybe<Datasources>;
  /** update multiples rows of table: "datasources" */
  update_datasources_many?: Maybe<Maybe<Datasources_Mutation_Response>[]>;
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>;
  /** update single row of the table: "events" */
  update_events_by_pk?: Maybe<Events>;
  /** update multiples rows of table: "events" */
  update_events_many?: Maybe<Maybe<Events_Mutation_Response>[]>;
  /** update data of the table: "explorations" */
  update_explorations?: Maybe<Explorations_Mutation_Response>;
  /** update single row of the table: "explorations" */
  update_explorations_by_pk?: Maybe<Explorations>;
  /** update multiples rows of table: "explorations" */
  update_explorations_many?: Maybe<Maybe<Explorations_Mutation_Response>[]>;
  /** update data of the table: "member_roles" */
  update_member_roles?: Maybe<Member_Roles_Mutation_Response>;
  /** update single row of the table: "member_roles" */
  update_member_roles_by_pk?: Maybe<Member_Roles>;
  /** update multiples rows of table: "member_roles" */
  update_member_roles_many?: Maybe<Maybe<Member_Roles_Mutation_Response>[]>;
  /** update data of the table: "members" */
  update_members?: Maybe<Members_Mutation_Response>;
  /** update single row of the table: "members" */
  update_members_by_pk?: Maybe<Members>;
  /** update multiples rows of table: "members" */
  update_members_many?: Maybe<Maybe<Members_Mutation_Response>[]>;
  /** update data of the table: "pinned_items" */
  update_pinned_items?: Maybe<Pinned_Items_Mutation_Response>;
  /** update single row of the table: "pinned_items" */
  update_pinned_items_by_pk?: Maybe<Pinned_Items>;
  /** update multiples rows of table: "pinned_items" */
  update_pinned_items_many?: Maybe<Maybe<Pinned_Items_Mutation_Response>[]>;
  /** update data of the table: "reports" */
  update_reports?: Maybe<Reports_Mutation_Response>;
  /** update single row of the table: "reports" */
  update_reports_by_pk?: Maybe<Reports>;
  /** update multiples rows of table: "reports" */
  update_reports_many?: Maybe<Maybe<Reports_Mutation_Response>[]>;
  /** update data of the table: "sql_credentials" */
  update_sql_credentials?: Maybe<Sql_Credentials_Mutation_Response>;
  /** update single row of the table: "sql_credentials" */
  update_sql_credentials_by_pk?: Maybe<Sql_Credentials>;
  /** update multiples rows of table: "sql_credentials" */
  update_sql_credentials_many?: Maybe<
    Maybe<Sql_Credentials_Mutation_Response>[]
  >;
  /** update data of the table: "team_roles" */
  update_team_roles?: Maybe<Team_Roles_Mutation_Response>;
  /** update single row of the table: "team_roles" */
  update_team_roles_by_pk?: Maybe<Team_Roles>;
  /** update multiples rows of table: "team_roles" */
  update_team_roles_many?: Maybe<Maybe<Team_Roles_Mutation_Response>[]>;
  /** update data of the table: "teams" */
  update_teams?: Maybe<Teams_Mutation_Response>;
  /** update single row of the table: "teams" */
  update_teams_by_pk?: Maybe<Teams>;
  /** update multiples rows of table: "teams" */
  update_teams_many?: Maybe<Maybe<Teams_Mutation_Response>[]>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Maybe<Users_Mutation_Response>[]>;
  /** update data of the table: "versions" */
  update_versions?: Maybe<Versions_Mutation_Response>;
  /** update single row of the table: "versions" */
  update_versions_by_pk?: Maybe<Versions>;
  /** update multiples rows of table: "versions" */
  update_versions_many?: Maybe<Maybe<Versions_Mutation_Response>[]>;
  validate_datasource?: Maybe<ValidateSourceOutput>;
};

/** mutation root */
export type Mutation_RootCheck_ConnectionArgs = {
  datasource_id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootCreate_EventsArgs = {
  objects: Events_Create_Input[];
};

/** mutation root */
export type Mutation_RootCreate_TeamArgs = {
  name: Scalars["String"];
};

/** mutation root */
export type Mutation_RootDelete_AlertsArgs = {
  where: Alerts_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Alerts_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_Auth_Account_ProvidersArgs = {
  where: Auth_Account_Providers_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Auth_Account_Providers_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_Auth_Account_RolesArgs = {
  where: Auth_Account_Roles_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Auth_Account_Roles_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_Auth_AccountsArgs = {
  where: Auth_Accounts_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Auth_Accounts_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_Auth_MigrationsArgs = {
  where: Auth_Migrations_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Auth_Migrations_By_PkArgs = {
  id: Scalars["Int"];
};

/** mutation root */
export type Mutation_RootDelete_Auth_ProvidersArgs = {
  where: Auth_Providers_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Auth_Providers_By_PkArgs = {
  provider: Scalars["String"];
};

/** mutation root */
export type Mutation_RootDelete_Auth_Refresh_TokensArgs = {
  where: Auth_Refresh_Tokens_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Auth_Refresh_Tokens_By_PkArgs = {
  refresh_token: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_Auth_RolesArgs = {
  where: Auth_Roles_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Auth_Roles_By_PkArgs = {
  role: Scalars["String"];
};

/** mutation root */
export type Mutation_RootDelete_Branch_StatusesArgs = {
  where: Branch_Statuses_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Branch_Statuses_By_PkArgs = {
  status: Scalars["String"];
};

/** mutation root */
export type Mutation_RootDelete_BranchesArgs = {
  where: Branches_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Branches_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_DashboardsArgs = {
  where: Dashboards_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Dashboards_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_DataschemasArgs = {
  where: Dataschemas_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Dataschemas_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_DatasourcesArgs = {
  where: Datasources_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Datasources_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_ExplorationsArgs = {
  where: Explorations_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Explorations_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_Member_RolesArgs = {
  where: Member_Roles_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Member_Roles_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_MembersArgs = {
  where: Members_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Members_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_Pinned_ItemsArgs = {
  where: Pinned_Items_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Pinned_Items_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_ReportsArgs = {
  where: Reports_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Reports_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_Sql_CredentialsArgs = {
  where: Sql_Credentials_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Sql_Credentials_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_Team_RolesArgs = {
  where: Team_Roles_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Team_Roles_By_PkArgs = {
  name: Scalars["String"];
};

/** mutation root */
export type Mutation_RootDelete_TeamsArgs = {
  where: Teams_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Teams_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_VersionsArgs = {
  where: Versions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Versions_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootExport_Data_ModelsArgs = {
  branch_id?: InputMaybe<Scalars["String"]>;
};

/** mutation root */
export type Mutation_RootGen_DataschemasArgs = {
  branch_id: Scalars["uuid"];
  datasource_id: Scalars["uuid"];
  overwrite?: InputMaybe<Scalars["Boolean"]>;
  tables: SourceTable[];
};

/** mutation root */
export type Mutation_RootGen_SqlArgs = {
  exploration_id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootInsert_AlertsArgs = {
  objects: Alerts_Insert_Input[];
  on_conflict?: InputMaybe<Alerts_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Alerts_OneArgs = {
  object: Alerts_Insert_Input;
  on_conflict?: InputMaybe<Alerts_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_Account_ProvidersArgs = {
  objects: Auth_Account_Providers_Insert_Input[];
  on_conflict?: InputMaybe<Auth_Account_Providers_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_Account_Providers_OneArgs = {
  object: Auth_Account_Providers_Insert_Input;
  on_conflict?: InputMaybe<Auth_Account_Providers_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_Account_RolesArgs = {
  objects: Auth_Account_Roles_Insert_Input[];
  on_conflict?: InputMaybe<Auth_Account_Roles_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_Account_Roles_OneArgs = {
  object: Auth_Account_Roles_Insert_Input;
  on_conflict?: InputMaybe<Auth_Account_Roles_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_AccountsArgs = {
  objects: Auth_Accounts_Insert_Input[];
  on_conflict?: InputMaybe<Auth_Accounts_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_Accounts_OneArgs = {
  object: Auth_Accounts_Insert_Input;
  on_conflict?: InputMaybe<Auth_Accounts_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_MigrationsArgs = {
  objects: Auth_Migrations_Insert_Input[];
  on_conflict?: InputMaybe<Auth_Migrations_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_Migrations_OneArgs = {
  object: Auth_Migrations_Insert_Input;
  on_conflict?: InputMaybe<Auth_Migrations_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_ProvidersArgs = {
  objects: Auth_Providers_Insert_Input[];
  on_conflict?: InputMaybe<Auth_Providers_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_Providers_OneArgs = {
  object: Auth_Providers_Insert_Input;
  on_conflict?: InputMaybe<Auth_Providers_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_Refresh_TokensArgs = {
  objects: Auth_Refresh_Tokens_Insert_Input[];
  on_conflict?: InputMaybe<Auth_Refresh_Tokens_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_Refresh_Tokens_OneArgs = {
  object: Auth_Refresh_Tokens_Insert_Input;
  on_conflict?: InputMaybe<Auth_Refresh_Tokens_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_RolesArgs = {
  objects: Auth_Roles_Insert_Input[];
  on_conflict?: InputMaybe<Auth_Roles_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Auth_Roles_OneArgs = {
  object: Auth_Roles_Insert_Input;
  on_conflict?: InputMaybe<Auth_Roles_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Branch_StatusesArgs = {
  objects: Branch_Statuses_Insert_Input[];
  on_conflict?: InputMaybe<Branch_Statuses_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Branch_Statuses_OneArgs = {
  object: Branch_Statuses_Insert_Input;
  on_conflict?: InputMaybe<Branch_Statuses_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_BranchesArgs = {
  objects: Branches_Insert_Input[];
  on_conflict?: InputMaybe<Branches_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Branches_OneArgs = {
  object: Branches_Insert_Input;
  on_conflict?: InputMaybe<Branches_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_DashboardsArgs = {
  objects: Dashboards_Insert_Input[];
  on_conflict?: InputMaybe<Dashboards_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Dashboards_OneArgs = {
  object: Dashboards_Insert_Input;
  on_conflict?: InputMaybe<Dashboards_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_DataschemasArgs = {
  objects: Dataschemas_Insert_Input[];
  on_conflict?: InputMaybe<Dataschemas_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Dataschemas_OneArgs = {
  object: Dataschemas_Insert_Input;
  on_conflict?: InputMaybe<Dataschemas_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_DatasourcesArgs = {
  objects: Datasources_Insert_Input[];
  on_conflict?: InputMaybe<Datasources_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Datasources_OneArgs = {
  object: Datasources_Insert_Input;
  on_conflict?: InputMaybe<Datasources_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Events_Insert_Input[];
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ExplorationsArgs = {
  objects: Explorations_Insert_Input[];
  on_conflict?: InputMaybe<Explorations_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Explorations_OneArgs = {
  object: Explorations_Insert_Input;
  on_conflict?: InputMaybe<Explorations_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Member_RolesArgs = {
  objects: Member_Roles_Insert_Input[];
  on_conflict?: InputMaybe<Member_Roles_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Member_Roles_OneArgs = {
  object: Member_Roles_Insert_Input;
  on_conflict?: InputMaybe<Member_Roles_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_MembersArgs = {
  objects: Members_Insert_Input[];
  on_conflict?: InputMaybe<Members_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Members_OneArgs = {
  object: Members_Insert_Input;
  on_conflict?: InputMaybe<Members_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Pinned_ItemsArgs = {
  objects: Pinned_Items_Insert_Input[];
  on_conflict?: InputMaybe<Pinned_Items_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Pinned_Items_OneArgs = {
  object: Pinned_Items_Insert_Input;
  on_conflict?: InputMaybe<Pinned_Items_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ReportsArgs = {
  objects: Reports_Insert_Input[];
  on_conflict?: InputMaybe<Reports_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Reports_OneArgs = {
  object: Reports_Insert_Input;
  on_conflict?: InputMaybe<Reports_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Sql_CredentialsArgs = {
  objects: Sql_Credentials_Insert_Input[];
  on_conflict?: InputMaybe<Sql_Credentials_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Sql_Credentials_OneArgs = {
  object: Sql_Credentials_Insert_Input;
  on_conflict?: InputMaybe<Sql_Credentials_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Team_RolesArgs = {
  objects: Team_Roles_Insert_Input[];
  on_conflict?: InputMaybe<Team_Roles_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Team_Roles_OneArgs = {
  object: Team_Roles_Insert_Input;
  on_conflict?: InputMaybe<Team_Roles_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_TeamsArgs = {
  objects: Teams_Insert_Input[];
  on_conflict?: InputMaybe<Teams_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Teams_OneArgs = {
  object: Teams_Insert_Input;
  on_conflict?: InputMaybe<Teams_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Users_Insert_Input[];
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_VersionsArgs = {
  objects: Versions_Insert_Input[];
  on_conflict?: InputMaybe<Versions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Versions_OneArgs = {
  object: Versions_Insert_Input;
  on_conflict?: InputMaybe<Versions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInvite_Team_MemberArgs = {
  email: Scalars["String"];
  teamId?: InputMaybe<Scalars["uuid"]>;
};

/** mutation root */
export type Mutation_RootRun_QueryArgs = {
  datasource_id: Scalars["uuid"];
  limit: Scalars["Int"];
  query: Scalars["String"];
};

/** mutation root */
export type Mutation_RootUpdate_AlertsArgs = {
  _append?: InputMaybe<Alerts_Append_Input>;
  _delete_at_path?: InputMaybe<Alerts_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Alerts_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Alerts_Delete_Key_Input>;
  _prepend?: InputMaybe<Alerts_Prepend_Input>;
  _set?: InputMaybe<Alerts_Set_Input>;
  where: Alerts_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Alerts_By_PkArgs = {
  _append?: InputMaybe<Alerts_Append_Input>;
  _delete_at_path?: InputMaybe<Alerts_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Alerts_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Alerts_Delete_Key_Input>;
  _prepend?: InputMaybe<Alerts_Prepend_Input>;
  _set?: InputMaybe<Alerts_Set_Input>;
  pk_columns: Alerts_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Alerts_ManyArgs = {
  updates: Alerts_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Account_ProvidersArgs = {
  _set?: InputMaybe<Auth_Account_Providers_Set_Input>;
  where: Auth_Account_Providers_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Account_Providers_By_PkArgs = {
  _set?: InputMaybe<Auth_Account_Providers_Set_Input>;
  pk_columns: Auth_Account_Providers_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Account_Providers_ManyArgs = {
  updates: Auth_Account_Providers_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Account_RolesArgs = {
  _set?: InputMaybe<Auth_Account_Roles_Set_Input>;
  where: Auth_Account_Roles_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Account_Roles_By_PkArgs = {
  _set?: InputMaybe<Auth_Account_Roles_Set_Input>;
  pk_columns: Auth_Account_Roles_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Account_Roles_ManyArgs = {
  updates: Auth_Account_Roles_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Auth_AccountsArgs = {
  _append?: InputMaybe<Auth_Accounts_Append_Input>;
  _delete_at_path?: InputMaybe<Auth_Accounts_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Auth_Accounts_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Auth_Accounts_Delete_Key_Input>;
  _prepend?: InputMaybe<Auth_Accounts_Prepend_Input>;
  _set?: InputMaybe<Auth_Accounts_Set_Input>;
  where: Auth_Accounts_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Accounts_By_PkArgs = {
  _append?: InputMaybe<Auth_Accounts_Append_Input>;
  _delete_at_path?: InputMaybe<Auth_Accounts_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Auth_Accounts_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Auth_Accounts_Delete_Key_Input>;
  _prepend?: InputMaybe<Auth_Accounts_Prepend_Input>;
  _set?: InputMaybe<Auth_Accounts_Set_Input>;
  pk_columns: Auth_Accounts_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Accounts_ManyArgs = {
  updates: Auth_Accounts_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Auth_MigrationsArgs = {
  _inc?: InputMaybe<Auth_Migrations_Inc_Input>;
  _set?: InputMaybe<Auth_Migrations_Set_Input>;
  where: Auth_Migrations_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Migrations_By_PkArgs = {
  _inc?: InputMaybe<Auth_Migrations_Inc_Input>;
  _set?: InputMaybe<Auth_Migrations_Set_Input>;
  pk_columns: Auth_Migrations_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Migrations_ManyArgs = {
  updates: Auth_Migrations_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Auth_ProvidersArgs = {
  _set?: InputMaybe<Auth_Providers_Set_Input>;
  where: Auth_Providers_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Providers_By_PkArgs = {
  _set?: InputMaybe<Auth_Providers_Set_Input>;
  pk_columns: Auth_Providers_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Providers_ManyArgs = {
  updates: Auth_Providers_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Refresh_TokensArgs = {
  _set?: InputMaybe<Auth_Refresh_Tokens_Set_Input>;
  where: Auth_Refresh_Tokens_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Refresh_Tokens_By_PkArgs = {
  _set?: InputMaybe<Auth_Refresh_Tokens_Set_Input>;
  pk_columns: Auth_Refresh_Tokens_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Refresh_Tokens_ManyArgs = {
  updates: Auth_Refresh_Tokens_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Auth_RolesArgs = {
  _set?: InputMaybe<Auth_Roles_Set_Input>;
  where: Auth_Roles_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Roles_By_PkArgs = {
  _set?: InputMaybe<Auth_Roles_Set_Input>;
  pk_columns: Auth_Roles_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Auth_Roles_ManyArgs = {
  updates: Auth_Roles_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Branch_StatusesArgs = {
  _set?: InputMaybe<Branch_Statuses_Set_Input>;
  where: Branch_Statuses_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Branch_Statuses_By_PkArgs = {
  _set?: InputMaybe<Branch_Statuses_Set_Input>;
  pk_columns: Branch_Statuses_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Branch_Statuses_ManyArgs = {
  updates: Branch_Statuses_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_BranchesArgs = {
  _set?: InputMaybe<Branches_Set_Input>;
  where: Branches_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Branches_By_PkArgs = {
  _set?: InputMaybe<Branches_Set_Input>;
  pk_columns: Branches_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Branches_ManyArgs = {
  updates: Branches_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_DashboardsArgs = {
  _append?: InputMaybe<Dashboards_Append_Input>;
  _delete_at_path?: InputMaybe<Dashboards_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Dashboards_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Dashboards_Delete_Key_Input>;
  _prepend?: InputMaybe<Dashboards_Prepend_Input>;
  _set?: InputMaybe<Dashboards_Set_Input>;
  where: Dashboards_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Dashboards_By_PkArgs = {
  _append?: InputMaybe<Dashboards_Append_Input>;
  _delete_at_path?: InputMaybe<Dashboards_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Dashboards_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Dashboards_Delete_Key_Input>;
  _prepend?: InputMaybe<Dashboards_Prepend_Input>;
  _set?: InputMaybe<Dashboards_Set_Input>;
  pk_columns: Dashboards_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Dashboards_ManyArgs = {
  updates: Dashboards_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_DataschemasArgs = {
  _set?: InputMaybe<Dataschemas_Set_Input>;
  where: Dataschemas_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Dataschemas_By_PkArgs = {
  _set?: InputMaybe<Dataschemas_Set_Input>;
  pk_columns: Dataschemas_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Dataschemas_ManyArgs = {
  updates: Dataschemas_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_DatasourcesArgs = {
  _append?: InputMaybe<Datasources_Append_Input>;
  _delete_at_path?: InputMaybe<Datasources_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Datasources_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Datasources_Delete_Key_Input>;
  _prepend?: InputMaybe<Datasources_Prepend_Input>;
  _set?: InputMaybe<Datasources_Set_Input>;
  where: Datasources_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Datasources_By_PkArgs = {
  _append?: InputMaybe<Datasources_Append_Input>;
  _delete_at_path?: InputMaybe<Datasources_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Datasources_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Datasources_Delete_Key_Input>;
  _prepend?: InputMaybe<Datasources_Prepend_Input>;
  _set?: InputMaybe<Datasources_Set_Input>;
  pk_columns: Datasources_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Datasources_ManyArgs = {
  updates: Datasources_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _append?: InputMaybe<Events_Append_Input>;
  _delete_at_path?: InputMaybe<Events_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Events_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Events_Delete_Key_Input>;
  _prepend?: InputMaybe<Events_Prepend_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Events_By_PkArgs = {
  _append?: InputMaybe<Events_Append_Input>;
  _delete_at_path?: InputMaybe<Events_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Events_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Events_Delete_Key_Input>;
  _prepend?: InputMaybe<Events_Prepend_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  pk_columns: Events_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Events_ManyArgs = {
  updates: Events_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_ExplorationsArgs = {
  _append?: InputMaybe<Explorations_Append_Input>;
  _delete_at_path?: InputMaybe<Explorations_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Explorations_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Explorations_Delete_Key_Input>;
  _prepend?: InputMaybe<Explorations_Prepend_Input>;
  _set?: InputMaybe<Explorations_Set_Input>;
  where: Explorations_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Explorations_By_PkArgs = {
  _append?: InputMaybe<Explorations_Append_Input>;
  _delete_at_path?: InputMaybe<Explorations_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Explorations_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Explorations_Delete_Key_Input>;
  _prepend?: InputMaybe<Explorations_Prepend_Input>;
  _set?: InputMaybe<Explorations_Set_Input>;
  pk_columns: Explorations_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Explorations_ManyArgs = {
  updates: Explorations_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Member_RolesArgs = {
  _set?: InputMaybe<Member_Roles_Set_Input>;
  where: Member_Roles_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Member_Roles_By_PkArgs = {
  _set?: InputMaybe<Member_Roles_Set_Input>;
  pk_columns: Member_Roles_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Member_Roles_ManyArgs = {
  updates: Member_Roles_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_MembersArgs = {
  _set?: InputMaybe<Members_Set_Input>;
  where: Members_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Members_By_PkArgs = {
  _set?: InputMaybe<Members_Set_Input>;
  pk_columns: Members_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Members_ManyArgs = {
  updates: Members_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Pinned_ItemsArgs = {
  _append?: InputMaybe<Pinned_Items_Append_Input>;
  _delete_at_path?: InputMaybe<Pinned_Items_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Pinned_Items_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Pinned_Items_Delete_Key_Input>;
  _prepend?: InputMaybe<Pinned_Items_Prepend_Input>;
  _set?: InputMaybe<Pinned_Items_Set_Input>;
  where: Pinned_Items_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Pinned_Items_By_PkArgs = {
  _append?: InputMaybe<Pinned_Items_Append_Input>;
  _delete_at_path?: InputMaybe<Pinned_Items_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Pinned_Items_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Pinned_Items_Delete_Key_Input>;
  _prepend?: InputMaybe<Pinned_Items_Prepend_Input>;
  _set?: InputMaybe<Pinned_Items_Set_Input>;
  pk_columns: Pinned_Items_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Pinned_Items_ManyArgs = {
  updates: Pinned_Items_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_ReportsArgs = {
  _append?: InputMaybe<Reports_Append_Input>;
  _delete_at_path?: InputMaybe<Reports_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Reports_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Reports_Delete_Key_Input>;
  _prepend?: InputMaybe<Reports_Prepend_Input>;
  _set?: InputMaybe<Reports_Set_Input>;
  where: Reports_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Reports_By_PkArgs = {
  _append?: InputMaybe<Reports_Append_Input>;
  _delete_at_path?: InputMaybe<Reports_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Reports_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Reports_Delete_Key_Input>;
  _prepend?: InputMaybe<Reports_Prepend_Input>;
  _set?: InputMaybe<Reports_Set_Input>;
  pk_columns: Reports_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Reports_ManyArgs = {
  updates: Reports_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Sql_CredentialsArgs = {
  _set?: InputMaybe<Sql_Credentials_Set_Input>;
  where: Sql_Credentials_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Sql_Credentials_By_PkArgs = {
  _set?: InputMaybe<Sql_Credentials_Set_Input>;
  pk_columns: Sql_Credentials_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Sql_Credentials_ManyArgs = {
  updates: Sql_Credentials_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_Team_RolesArgs = {
  _set?: InputMaybe<Team_Roles_Set_Input>;
  where: Team_Roles_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Team_Roles_By_PkArgs = {
  _set?: InputMaybe<Team_Roles_Set_Input>;
  pk_columns: Team_Roles_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Team_Roles_ManyArgs = {
  updates: Team_Roles_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_TeamsArgs = {
  _set?: InputMaybe<Teams_Set_Input>;
  where: Teams_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Teams_By_PkArgs = {
  _set?: InputMaybe<Teams_Set_Input>;
  pk_columns: Teams_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Teams_ManyArgs = {
  updates: Teams_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Users_Updates[];
};

/** mutation root */
export type Mutation_RootUpdate_VersionsArgs = {
  _set?: InputMaybe<Versions_Set_Input>;
  where: Versions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Versions_By_PkArgs = {
  _set?: InputMaybe<Versions_Set_Input>;
  pk_columns: Versions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Versions_ManyArgs = {
  updates: Versions_Updates[];
};

/** mutation root */
export type Mutation_RootValidate_DatasourceArgs = {
  id: Scalars["uuid"];
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = "asc",
  /** in ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in descending order, nulls first */
  Desc = "desc",
  /** in descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

/** columns and relationships of "pinned_items" */
export type Pinned_Items = {
  __typename?: "pinned_items";
  created_at: Scalars["timestamptz"];
  /** An object relationship */
  dashboard: Dashboards;
  dashboard_id: Scalars["uuid"];
  /** An object relationship */
  exploration: Explorations;
  exploration_id: Scalars["uuid"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  spec: Scalars["jsonb"];
  spec_config: Scalars["jsonb"];
  updated_at: Scalars["timestamptz"];
  user_id: Scalars["uuid"];
};

/** columns and relationships of "pinned_items" */
export type Pinned_ItemsSpecArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "pinned_items" */
export type Pinned_ItemsSpec_ConfigArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** aggregated selection of "pinned_items" */
export type Pinned_Items_Aggregate = {
  __typename?: "pinned_items_aggregate";
  aggregate?: Maybe<Pinned_Items_Aggregate_Fields>;
  nodes: Pinned_Items[];
};

export type Pinned_Items_Aggregate_Bool_Exp = {
  count?: InputMaybe<Pinned_Items_Aggregate_Bool_Exp_Count>;
};

export type Pinned_Items_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Pinned_Items_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Pinned_Items_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "pinned_items" */
export type Pinned_Items_Aggregate_Fields = {
  __typename?: "pinned_items_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Pinned_Items_Max_Fields>;
  min?: Maybe<Pinned_Items_Min_Fields>;
};

/** aggregate fields of "pinned_items" */
export type Pinned_Items_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Pinned_Items_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "pinned_items" */
export type Pinned_Items_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Pinned_Items_Max_Order_By>;
  min?: InputMaybe<Pinned_Items_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Pinned_Items_Append_Input = {
  spec?: InputMaybe<Scalars["jsonb"]>;
  spec_config?: InputMaybe<Scalars["jsonb"]>;
};

/** input type for inserting array relation for remote table "pinned_items" */
export type Pinned_Items_Arr_Rel_Insert_Input = {
  data: Pinned_Items_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Pinned_Items_On_Conflict>;
};

/** Boolean expression to filter rows from the table "pinned_items". All fields are combined with a logical 'AND'. */
export type Pinned_Items_Bool_Exp = {
  _and?: InputMaybe<Pinned_Items_Bool_Exp[]>;
  _not?: InputMaybe<Pinned_Items_Bool_Exp>;
  _or?: InputMaybe<Pinned_Items_Bool_Exp[]>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  dashboard?: InputMaybe<Dashboards_Bool_Exp>;
  dashboard_id?: InputMaybe<Uuid_Comparison_Exp>;
  exploration?: InputMaybe<Explorations_Bool_Exp>;
  exploration_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  spec?: InputMaybe<Jsonb_Comparison_Exp>;
  spec_config?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "pinned_items" */
export enum Pinned_Items_Constraint {
  /** unique or primary key constraint on columns "id" */
  PinnedItemsPkey = "pinned_items_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Pinned_Items_Delete_At_Path_Input = {
  spec?: InputMaybe<Scalars["String"][]>;
  spec_config?: InputMaybe<Scalars["String"][]>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Pinned_Items_Delete_Elem_Input = {
  spec?: InputMaybe<Scalars["Int"]>;
  spec_config?: InputMaybe<Scalars["Int"]>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Pinned_Items_Delete_Key_Input = {
  spec?: InputMaybe<Scalars["String"]>;
  spec_config?: InputMaybe<Scalars["String"]>;
};

/** input type for inserting data into table "pinned_items" */
export type Pinned_Items_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  dashboard?: InputMaybe<Dashboards_Obj_Rel_Insert_Input>;
  dashboard_id?: InputMaybe<Scalars["uuid"]>;
  exploration?: InputMaybe<Explorations_Obj_Rel_Insert_Input>;
  exploration_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  spec?: InputMaybe<Scalars["jsonb"]>;
  spec_config?: InputMaybe<Scalars["jsonb"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Pinned_Items_Max_Fields = {
  __typename?: "pinned_items_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  dashboard_id?: Maybe<Scalars["uuid"]>;
  exploration_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "pinned_items" */
export type Pinned_Items_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  dashboard_id?: InputMaybe<Order_By>;
  exploration_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Pinned_Items_Min_Fields = {
  __typename?: "pinned_items_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  dashboard_id?: Maybe<Scalars["uuid"]>;
  exploration_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "pinned_items" */
export type Pinned_Items_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  dashboard_id?: InputMaybe<Order_By>;
  exploration_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "pinned_items" */
export type Pinned_Items_Mutation_Response = {
  __typename?: "pinned_items_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Pinned_Items[];
};

/** on_conflict condition type for table "pinned_items" */
export type Pinned_Items_On_Conflict = {
  constraint: Pinned_Items_Constraint;
  update_columns?: Pinned_Items_Update_Column[];
  where?: InputMaybe<Pinned_Items_Bool_Exp>;
};

/** Ordering options when selecting data from "pinned_items". */
export type Pinned_Items_Order_By = {
  created_at?: InputMaybe<Order_By>;
  dashboard?: InputMaybe<Dashboards_Order_By>;
  dashboard_id?: InputMaybe<Order_By>;
  exploration?: InputMaybe<Explorations_Order_By>;
  exploration_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  spec?: InputMaybe<Order_By>;
  spec_config?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: pinned_items */
export type Pinned_Items_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Pinned_Items_Prepend_Input = {
  spec?: InputMaybe<Scalars["jsonb"]>;
  spec_config?: InputMaybe<Scalars["jsonb"]>;
};

/** select columns of table "pinned_items" */
export enum Pinned_Items_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DashboardId = "dashboard_id",
  /** column name */
  ExplorationId = "exploration_id",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Spec = "spec",
  /** column name */
  SpecConfig = "spec_config",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "pinned_items" */
export type Pinned_Items_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  dashboard_id?: InputMaybe<Scalars["uuid"]>;
  exploration_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  spec?: InputMaybe<Scalars["jsonb"]>;
  spec_config?: InputMaybe<Scalars["jsonb"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "pinned_items" */
export type Pinned_Items_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Pinned_Items_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Pinned_Items_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  dashboard_id?: InputMaybe<Scalars["uuid"]>;
  exploration_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  spec?: InputMaybe<Scalars["jsonb"]>;
  spec_config?: InputMaybe<Scalars["jsonb"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "pinned_items" */
export enum Pinned_Items_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DashboardId = "dashboard_id",
  /** column name */
  ExplorationId = "exploration_id",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Spec = "spec",
  /** column name */
  SpecConfig = "spec_config",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

export type Pinned_Items_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Pinned_Items_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Pinned_Items_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Pinned_Items_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Pinned_Items_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Pinned_Items_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Pinned_Items_Set_Input>;
  /** filter the rows which have to be updated */
  where: Pinned_Items_Bool_Exp;
};

export type Query_Root = {
  __typename?: "query_root";
  /** An array relationship */
  alerts: Alerts[];
  /** An aggregate relationship */
  alerts_aggregate: Alerts_Aggregate;
  /** fetch data from the table: "alerts" using primary key columns */
  alerts_by_pk?: Maybe<Alerts>;
  /** fetch data from the table: "auth.account_providers" */
  auth_account_providers: Auth_Account_Providers[];
  /** fetch aggregated fields from the table: "auth.account_providers" */
  auth_account_providers_aggregate: Auth_Account_Providers_Aggregate;
  /** fetch data from the table: "auth.account_providers" using primary key columns */
  auth_account_providers_by_pk?: Maybe<Auth_Account_Providers>;
  /** fetch data from the table: "auth.account_roles" */
  auth_account_roles: Auth_Account_Roles[];
  /** fetch aggregated fields from the table: "auth.account_roles" */
  auth_account_roles_aggregate: Auth_Account_Roles_Aggregate;
  /** fetch data from the table: "auth.account_roles" using primary key columns */
  auth_account_roles_by_pk?: Maybe<Auth_Account_Roles>;
  /** fetch data from the table: "auth.accounts" */
  auth_accounts: Auth_Accounts[];
  /** fetch aggregated fields from the table: "auth.accounts" */
  auth_accounts_aggregate: Auth_Accounts_Aggregate;
  /** fetch data from the table: "auth.accounts" using primary key columns */
  auth_accounts_by_pk?: Maybe<Auth_Accounts>;
  /** fetch data from the table: "auth.migrations" */
  auth_migrations: Auth_Migrations[];
  /** fetch aggregated fields from the table: "auth.migrations" */
  auth_migrations_aggregate: Auth_Migrations_Aggregate;
  /** fetch data from the table: "auth.migrations" using primary key columns */
  auth_migrations_by_pk?: Maybe<Auth_Migrations>;
  /** fetch data from the table: "auth.providers" */
  auth_providers: Auth_Providers[];
  /** fetch aggregated fields from the table: "auth.providers" */
  auth_providers_aggregate: Auth_Providers_Aggregate;
  /** fetch data from the table: "auth.providers" using primary key columns */
  auth_providers_by_pk?: Maybe<Auth_Providers>;
  /** fetch data from the table: "auth.refresh_tokens" */
  auth_refresh_tokens: Auth_Refresh_Tokens[];
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  auth_refresh_tokens_aggregate: Auth_Refresh_Tokens_Aggregate;
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  auth_refresh_tokens_by_pk?: Maybe<Auth_Refresh_Tokens>;
  /** fetch data from the table: "auth.roles" */
  auth_roles: Auth_Roles[];
  /** fetch aggregated fields from the table: "auth.roles" */
  auth_roles_aggregate: Auth_Roles_Aggregate;
  /** fetch data from the table: "auth.roles" using primary key columns */
  auth_roles_by_pk?: Maybe<Auth_Roles>;
  /** fetch data from the table: "branch_statuses" */
  branch_statuses: Branch_Statuses[];
  /** fetch aggregated fields from the table: "branch_statuses" */
  branch_statuses_aggregate: Branch_Statuses_Aggregate;
  /** fetch data from the table: "branch_statuses" using primary key columns */
  branch_statuses_by_pk?: Maybe<Branch_Statuses>;
  /** An array relationship */
  branches: Branches[];
  /** An aggregate relationship */
  branches_aggregate: Branches_Aggregate;
  /** fetch data from the table: "branches" using primary key columns */
  branches_by_pk?: Maybe<Branches>;
  create_events?: Maybe<Create_Events>;
  /** An array relationship */
  dashboards: Dashboards[];
  /** An aggregate relationship */
  dashboards_aggregate: Dashboards_Aggregate;
  /** fetch data from the table: "dashboards" using primary key columns */
  dashboards_by_pk?: Maybe<Dashboards>;
  /** An array relationship */
  dataschemas: Dataschemas[];
  /** An aggregate relationship */
  dataschemas_aggregate: Dataschemas_Aggregate;
  /** fetch data from the table: "dataschemas" using primary key columns */
  dataschemas_by_pk?: Maybe<Dataschemas>;
  /** An array relationship */
  datasources: Datasources[];
  /** An aggregate relationship */
  datasources_aggregate: Datasources_Aggregate;
  /** fetch data from the table: "datasources" using primary key columns */
  datasources_by_pk?: Maybe<Datasources>;
  /** fetch data from the table: "events" */
  events: Events[];
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** An array relationship */
  explorations: Explorations[];
  /** An aggregate relationship */
  explorations_aggregate: Explorations_Aggregate;
  /** fetch data from the table: "explorations" using primary key columns */
  explorations_by_pk?: Maybe<Explorations>;
  fetch_dataset?: Maybe<FetchDatasetOutput>;
  fetch_meta?: Maybe<SourceMetaOutput>;
  fetch_tables?: Maybe<SourceTablesOutput>;
  /** An array relationship */
  member_roles: Member_Roles[];
  /** An aggregate relationship */
  member_roles_aggregate: Member_Roles_Aggregate;
  /** fetch data from the table: "member_roles" using primary key columns */
  member_roles_by_pk?: Maybe<Member_Roles>;
  /** An array relationship */
  members: Members[];
  /** An aggregate relationship */
  members_aggregate: Members_Aggregate;
  /** fetch data from the table: "members" using primary key columns */
  members_by_pk?: Maybe<Members>;
  /** An array relationship */
  pinned_items: Pinned_Items[];
  /** An aggregate relationship */
  pinned_items_aggregate: Pinned_Items_Aggregate;
  /** fetch data from the table: "pinned_items" using primary key columns */
  pinned_items_by_pk?: Maybe<Pinned_Items>;
  /** An array relationship */
  reports: Reports[];
  /** An aggregate relationship */
  reports_aggregate: Reports_Aggregate;
  /** fetch data from the table: "reports" using primary key columns */
  reports_by_pk?: Maybe<Reports>;
  /** An array relationship */
  sql_credentials: Sql_Credentials[];
  /** An aggregate relationship */
  sql_credentials_aggregate: Sql_Credentials_Aggregate;
  /** fetch data from the table: "sql_credentials" using primary key columns */
  sql_credentials_by_pk?: Maybe<Sql_Credentials>;
  /** fetch data from the table: "team_roles" */
  team_roles: Team_Roles[];
  /** fetch aggregated fields from the table: "team_roles" */
  team_roles_aggregate: Team_Roles_Aggregate;
  /** fetch data from the table: "team_roles" using primary key columns */
  team_roles_by_pk?: Maybe<Team_Roles>;
  /** fetch data from the table: "teams" */
  teams: Teams[];
  /** fetch aggregated fields from the table: "teams" */
  teams_aggregate: Teams_Aggregate;
  /** fetch data from the table: "teams" using primary key columns */
  teams_by_pk?: Maybe<Teams>;
  /** fetch data from the table: "users" */
  users: Users[];
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** An array relationship */
  versions: Versions[];
  /** An aggregate relationship */
  versions_aggregate: Versions_Aggregate;
  /** fetch data from the table: "versions" using primary key columns */
  versions_by_pk?: Maybe<Versions>;
};

export type Query_RootAlertsArgs = {
  distinct_on?: InputMaybe<Alerts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Alerts_Order_By[]>;
  where?: InputMaybe<Alerts_Bool_Exp>;
};

export type Query_RootAlerts_AggregateArgs = {
  distinct_on?: InputMaybe<Alerts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Alerts_Order_By[]>;
  where?: InputMaybe<Alerts_Bool_Exp>;
};

export type Query_RootAlerts_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootAuth_Account_ProvidersArgs = {
  distinct_on?: InputMaybe<Auth_Account_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
};

export type Query_RootAuth_Account_Providers_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Account_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
};

export type Query_RootAuth_Account_Providers_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootAuth_Account_RolesArgs = {
  distinct_on?: InputMaybe<Auth_Account_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
};

export type Query_RootAuth_Account_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Account_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
};

export type Query_RootAuth_Account_Roles_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootAuth_AccountsArgs = {
  distinct_on?: InputMaybe<Auth_Accounts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Accounts_Order_By[]>;
  where?: InputMaybe<Auth_Accounts_Bool_Exp>;
};

export type Query_RootAuth_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Accounts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Accounts_Order_By[]>;
  where?: InputMaybe<Auth_Accounts_Bool_Exp>;
};

export type Query_RootAuth_Accounts_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootAuth_MigrationsArgs = {
  distinct_on?: InputMaybe<Auth_Migrations_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Migrations_Order_By[]>;
  where?: InputMaybe<Auth_Migrations_Bool_Exp>;
};

export type Query_RootAuth_Migrations_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Migrations_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Migrations_Order_By[]>;
  where?: InputMaybe<Auth_Migrations_Bool_Exp>;
};

export type Query_RootAuth_Migrations_By_PkArgs = {
  id: Scalars["Int"];
};

export type Query_RootAuth_ProvidersArgs = {
  distinct_on?: InputMaybe<Auth_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Providers_Bool_Exp>;
};

export type Query_RootAuth_Providers_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Providers_Bool_Exp>;
};

export type Query_RootAuth_Providers_By_PkArgs = {
  provider: Scalars["String"];
};

export type Query_RootAuth_Refresh_TokensArgs = {
  distinct_on?: InputMaybe<Auth_Refresh_Tokens_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Refresh_Tokens_Order_By[]>;
  where?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp>;
};

export type Query_RootAuth_Refresh_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Refresh_Tokens_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Refresh_Tokens_Order_By[]>;
  where?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp>;
};

export type Query_RootAuth_Refresh_Tokens_By_PkArgs = {
  refresh_token: Scalars["uuid"];
};

export type Query_RootAuth_RolesArgs = {
  distinct_on?: InputMaybe<Auth_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Roles_Bool_Exp>;
};

export type Query_RootAuth_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Roles_Bool_Exp>;
};

export type Query_RootAuth_Roles_By_PkArgs = {
  role: Scalars["String"];
};

export type Query_RootBranch_StatusesArgs = {
  distinct_on?: InputMaybe<Branch_Statuses_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branch_Statuses_Order_By[]>;
  where?: InputMaybe<Branch_Statuses_Bool_Exp>;
};

export type Query_RootBranch_Statuses_AggregateArgs = {
  distinct_on?: InputMaybe<Branch_Statuses_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branch_Statuses_Order_By[]>;
  where?: InputMaybe<Branch_Statuses_Bool_Exp>;
};

export type Query_RootBranch_Statuses_By_PkArgs = {
  status: Scalars["String"];
};

export type Query_RootBranchesArgs = {
  distinct_on?: InputMaybe<Branches_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branches_Order_By[]>;
  where?: InputMaybe<Branches_Bool_Exp>;
};

export type Query_RootBranches_AggregateArgs = {
  distinct_on?: InputMaybe<Branches_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branches_Order_By[]>;
  where?: InputMaybe<Branches_Bool_Exp>;
};

export type Query_RootBranches_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootCreate_EventsArgs = {
  id: Scalars["uuid"];
};

export type Query_RootDashboardsArgs = {
  distinct_on?: InputMaybe<Dashboards_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dashboards_Order_By[]>;
  where?: InputMaybe<Dashboards_Bool_Exp>;
};

export type Query_RootDashboards_AggregateArgs = {
  distinct_on?: InputMaybe<Dashboards_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dashboards_Order_By[]>;
  where?: InputMaybe<Dashboards_Bool_Exp>;
};

export type Query_RootDashboards_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootDataschemasArgs = {
  distinct_on?: InputMaybe<Dataschemas_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dataschemas_Order_By[]>;
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

export type Query_RootDataschemas_AggregateArgs = {
  distinct_on?: InputMaybe<Dataschemas_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dataschemas_Order_By[]>;
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

export type Query_RootDataschemas_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootDatasourcesArgs = {
  distinct_on?: InputMaybe<Datasources_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Datasources_Order_By[]>;
  where?: InputMaybe<Datasources_Bool_Exp>;
};

export type Query_RootDatasources_AggregateArgs = {
  distinct_on?: InputMaybe<Datasources_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Datasources_Order_By[]>;
  where?: InputMaybe<Datasources_Bool_Exp>;
};

export type Query_RootDatasources_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Events_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Events_Order_By[]>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Query_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Events_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Events_Order_By[]>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Query_RootEvents_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootExplorationsArgs = {
  distinct_on?: InputMaybe<Explorations_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Explorations_Order_By[]>;
  where?: InputMaybe<Explorations_Bool_Exp>;
};

export type Query_RootExplorations_AggregateArgs = {
  distinct_on?: InputMaybe<Explorations_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Explorations_Order_By[]>;
  where?: InputMaybe<Explorations_Bool_Exp>;
};

export type Query_RootExplorations_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootFetch_DatasetArgs = {
  exploration_id: Scalars["uuid"];
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type Query_RootFetch_MetaArgs = {
  datasource_id: Scalars["uuid"];
};

export type Query_RootFetch_TablesArgs = {
  datasource_id: Scalars["uuid"];
};

export type Query_RootMember_RolesArgs = {
  distinct_on?: InputMaybe<Member_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Member_Roles_Order_By[]>;
  where?: InputMaybe<Member_Roles_Bool_Exp>;
};

export type Query_RootMember_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Member_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Member_Roles_Order_By[]>;
  where?: InputMaybe<Member_Roles_Bool_Exp>;
};

export type Query_RootMember_Roles_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootMembersArgs = {
  distinct_on?: InputMaybe<Members_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Members_Order_By[]>;
  where?: InputMaybe<Members_Bool_Exp>;
};

export type Query_RootMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Members_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Members_Order_By[]>;
  where?: InputMaybe<Members_Bool_Exp>;
};

export type Query_RootMembers_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootPinned_ItemsArgs = {
  distinct_on?: InputMaybe<Pinned_Items_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Pinned_Items_Order_By[]>;
  where?: InputMaybe<Pinned_Items_Bool_Exp>;
};

export type Query_RootPinned_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Pinned_Items_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Pinned_Items_Order_By[]>;
  where?: InputMaybe<Pinned_Items_Bool_Exp>;
};

export type Query_RootPinned_Items_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootReportsArgs = {
  distinct_on?: InputMaybe<Reports_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Reports_Order_By[]>;
  where?: InputMaybe<Reports_Bool_Exp>;
};

export type Query_RootReports_AggregateArgs = {
  distinct_on?: InputMaybe<Reports_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Reports_Order_By[]>;
  where?: InputMaybe<Reports_Bool_Exp>;
};

export type Query_RootReports_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootSql_CredentialsArgs = {
  distinct_on?: InputMaybe<Sql_Credentials_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Sql_Credentials_Order_By[]>;
  where?: InputMaybe<Sql_Credentials_Bool_Exp>;
};

export type Query_RootSql_Credentials_AggregateArgs = {
  distinct_on?: InputMaybe<Sql_Credentials_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Sql_Credentials_Order_By[]>;
  where?: InputMaybe<Sql_Credentials_Bool_Exp>;
};

export type Query_RootSql_Credentials_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootTeam_RolesArgs = {
  distinct_on?: InputMaybe<Team_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Team_Roles_Order_By[]>;
  where?: InputMaybe<Team_Roles_Bool_Exp>;
};

export type Query_RootTeam_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Team_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Team_Roles_Order_By[]>;
  where?: InputMaybe<Team_Roles_Bool_Exp>;
};

export type Query_RootTeam_Roles_By_PkArgs = {
  name: Scalars["String"];
};

export type Query_RootTeamsArgs = {
  distinct_on?: InputMaybe<Teams_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Teams_Order_By[]>;
  where?: InputMaybe<Teams_Bool_Exp>;
};

export type Query_RootTeams_AggregateArgs = {
  distinct_on?: InputMaybe<Teams_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Teams_Order_By[]>;
  where?: InputMaybe<Teams_Bool_Exp>;
};

export type Query_RootTeams_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Users_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Users_Order_By[]>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Users_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Users_Order_By[]>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Query_RootUsers_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootVersionsArgs = {
  distinct_on?: InputMaybe<Versions_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Versions_Order_By[]>;
  where?: InputMaybe<Versions_Bool_Exp>;
};

export type Query_RootVersions_AggregateArgs = {
  distinct_on?: InputMaybe<Versions_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Versions_Order_By[]>;
  where?: InputMaybe<Versions_Bool_Exp>;
};

export type Query_RootVersions_By_PkArgs = {
  id: Scalars["uuid"];
};

/** columns and relationships of "reports" */
export type Reports = {
  __typename?: "reports";
  created_at: Scalars["timestamptz"];
  delivery_config: Scalars["jsonb"];
  delivery_type: Scalars["String"];
  /** An object relationship */
  exploration: Explorations;
  exploration_id: Scalars["uuid"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  schedule: Scalars["String"];
  /** An object relationship */
  team?: Maybe<Teams>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at: Scalars["timestamptz"];
  /** An object relationship */
  user: Users;
  user_id: Scalars["uuid"];
};

/** columns and relationships of "reports" */
export type ReportsDelivery_ConfigArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** aggregated selection of "reports" */
export type Reports_Aggregate = {
  __typename?: "reports_aggregate";
  aggregate?: Maybe<Reports_Aggregate_Fields>;
  nodes: Reports[];
};

export type Reports_Aggregate_Bool_Exp = {
  count?: InputMaybe<Reports_Aggregate_Bool_Exp_Count>;
};

export type Reports_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Reports_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Reports_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "reports" */
export type Reports_Aggregate_Fields = {
  __typename?: "reports_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Reports_Max_Fields>;
  min?: Maybe<Reports_Min_Fields>;
};

/** aggregate fields of "reports" */
export type Reports_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Reports_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "reports" */
export type Reports_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Reports_Max_Order_By>;
  min?: InputMaybe<Reports_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Reports_Append_Input = {
  delivery_config?: InputMaybe<Scalars["jsonb"]>;
};

/** input type for inserting array relation for remote table "reports" */
export type Reports_Arr_Rel_Insert_Input = {
  data: Reports_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Reports_On_Conflict>;
};

/** Boolean expression to filter rows from the table "reports". All fields are combined with a logical 'AND'. */
export type Reports_Bool_Exp = {
  _and?: InputMaybe<Reports_Bool_Exp[]>;
  _not?: InputMaybe<Reports_Bool_Exp>;
  _or?: InputMaybe<Reports_Bool_Exp[]>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  delivery_config?: InputMaybe<Jsonb_Comparison_Exp>;
  delivery_type?: InputMaybe<String_Comparison_Exp>;
  exploration?: InputMaybe<Explorations_Bool_Exp>;
  exploration_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  schedule?: InputMaybe<String_Comparison_Exp>;
  team?: InputMaybe<Teams_Bool_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "reports" */
export enum Reports_Constraint {
  /** unique or primary key constraint on columns "id" */
  ReportsPkey = "reports_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Reports_Delete_At_Path_Input = {
  delivery_config?: InputMaybe<Scalars["String"][]>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Reports_Delete_Elem_Input = {
  delivery_config?: InputMaybe<Scalars["Int"]>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Reports_Delete_Key_Input = {
  delivery_config?: InputMaybe<Scalars["String"]>;
};

/** input type for inserting data into table "reports" */
export type Reports_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  delivery_config?: InputMaybe<Scalars["jsonb"]>;
  delivery_type?: InputMaybe<Scalars["String"]>;
  exploration?: InputMaybe<Explorations_Obj_Rel_Insert_Input>;
  exploration_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  schedule?: InputMaybe<Scalars["String"]>;
  team?: InputMaybe<Teams_Obj_Rel_Insert_Input>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Reports_Max_Fields = {
  __typename?: "reports_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  delivery_type?: Maybe<Scalars["String"]>;
  exploration_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  schedule?: Maybe<Scalars["String"]>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "reports" */
export type Reports_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  delivery_type?: InputMaybe<Order_By>;
  exploration_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  schedule?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Reports_Min_Fields = {
  __typename?: "reports_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  delivery_type?: Maybe<Scalars["String"]>;
  exploration_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  schedule?: Maybe<Scalars["String"]>;
  team_id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "reports" */
export type Reports_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  delivery_type?: InputMaybe<Order_By>;
  exploration_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  schedule?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "reports" */
export type Reports_Mutation_Response = {
  __typename?: "reports_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Reports[];
};

/** on_conflict condition type for table "reports" */
export type Reports_On_Conflict = {
  constraint: Reports_Constraint;
  update_columns?: Reports_Update_Column[];
  where?: InputMaybe<Reports_Bool_Exp>;
};

/** Ordering options when selecting data from "reports". */
export type Reports_Order_By = {
  created_at?: InputMaybe<Order_By>;
  delivery_config?: InputMaybe<Order_By>;
  delivery_type?: InputMaybe<Order_By>;
  exploration?: InputMaybe<Explorations_Order_By>;
  exploration_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  schedule?: InputMaybe<Order_By>;
  team?: InputMaybe<Teams_Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: reports */
export type Reports_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Reports_Prepend_Input = {
  delivery_config?: InputMaybe<Scalars["jsonb"]>;
};

/** select columns of table "reports" */
export enum Reports_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DeliveryConfig = "delivery_config",
  /** column name */
  DeliveryType = "delivery_type",
  /** column name */
  ExplorationId = "exploration_id",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Schedule = "schedule",
  /** column name */
  TeamId = "team_id",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "reports" */
export type Reports_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  delivery_config?: InputMaybe<Scalars["jsonb"]>;
  delivery_type?: InputMaybe<Scalars["String"]>;
  exploration_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  schedule?: InputMaybe<Scalars["String"]>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "reports" */
export type Reports_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Reports_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Reports_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  delivery_config?: InputMaybe<Scalars["jsonb"]>;
  delivery_type?: InputMaybe<Scalars["String"]>;
  exploration_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  schedule?: InputMaybe<Scalars["String"]>;
  team_id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "reports" */
export enum Reports_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DeliveryConfig = "delivery_config",
  /** column name */
  DeliveryType = "delivery_type",
  /** column name */
  ExplorationId = "exploration_id",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Schedule = "schedule",
  /** column name */
  TeamId = "team_id",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

export type Reports_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Reports_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Reports_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Reports_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Reports_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Reports_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Reports_Set_Input>;
  /** filter the rows which have to be updated */
  where: Reports_Bool_Exp;
};

/** columns and relationships of "sql_credentials" */
export type Sql_Credentials = {
  __typename?: "sql_credentials";
  created_at: Scalars["timestamptz"];
  /** An object relationship */
  datasource: Datasources;
  datasource_id: Scalars["uuid"];
  id: Scalars["uuid"];
  password?: Maybe<Scalars["String"]>;
  updated_at: Scalars["timestamptz"];
  /** An object relationship */
  user: Users;
  user_id: Scalars["uuid"];
  username: Scalars["String"];
};

/** aggregated selection of "sql_credentials" */
export type Sql_Credentials_Aggregate = {
  __typename?: "sql_credentials_aggregate";
  aggregate?: Maybe<Sql_Credentials_Aggregate_Fields>;
  nodes: Sql_Credentials[];
};

export type Sql_Credentials_Aggregate_Bool_Exp = {
  count?: InputMaybe<Sql_Credentials_Aggregate_Bool_Exp_Count>;
};

export type Sql_Credentials_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Sql_Credentials_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Sql_Credentials_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "sql_credentials" */
export type Sql_Credentials_Aggregate_Fields = {
  __typename?: "sql_credentials_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Sql_Credentials_Max_Fields>;
  min?: Maybe<Sql_Credentials_Min_Fields>;
};

/** aggregate fields of "sql_credentials" */
export type Sql_Credentials_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Sql_Credentials_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "sql_credentials" */
export type Sql_Credentials_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Sql_Credentials_Max_Order_By>;
  min?: InputMaybe<Sql_Credentials_Min_Order_By>;
};

/** input type for inserting array relation for remote table "sql_credentials" */
export type Sql_Credentials_Arr_Rel_Insert_Input = {
  data: Sql_Credentials_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Sql_Credentials_On_Conflict>;
};

/** Boolean expression to filter rows from the table "sql_credentials". All fields are combined with a logical 'AND'. */
export type Sql_Credentials_Bool_Exp = {
  _and?: InputMaybe<Sql_Credentials_Bool_Exp[]>;
  _not?: InputMaybe<Sql_Credentials_Bool_Exp>;
  _or?: InputMaybe<Sql_Credentials_Bool_Exp[]>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  datasource?: InputMaybe<Datasources_Bool_Exp>;
  datasource_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "sql_credentials" */
export enum Sql_Credentials_Constraint {
  /** unique or primary key constraint on columns "datasource_id", "username", "user_id" */
  SqlCredentialsDatasourceIdUserIdUsernameKey = "sql_credentials_datasource_id_user_id_username_key",
  /** unique or primary key constraint on columns "id" */
  SqlCredentialsPkey = "sql_credentials_pkey",
}

/** input type for inserting data into table "sql_credentials" */
export type Sql_Credentials_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource?: InputMaybe<Datasources_Obj_Rel_Insert_Input>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  password?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars["uuid"]>;
  username?: InputMaybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type Sql_Credentials_Max_Fields = {
  __typename?: "sql_credentials_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  datasource_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  password?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
  username?: Maybe<Scalars["String"]>;
};

/** order by max() on columns of table "sql_credentials" */
export type Sql_Credentials_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Sql_Credentials_Min_Fields = {
  __typename?: "sql_credentials_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  datasource_id?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  password?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
  username?: Maybe<Scalars["String"]>;
};

/** order by min() on columns of table "sql_credentials" */
export type Sql_Credentials_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "sql_credentials" */
export type Sql_Credentials_Mutation_Response = {
  __typename?: "sql_credentials_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Sql_Credentials[];
};

/** on_conflict condition type for table "sql_credentials" */
export type Sql_Credentials_On_Conflict = {
  constraint: Sql_Credentials_Constraint;
  update_columns?: Sql_Credentials_Update_Column[];
  where?: InputMaybe<Sql_Credentials_Bool_Exp>;
};

/** Ordering options when selecting data from "sql_credentials". */
export type Sql_Credentials_Order_By = {
  created_at?: InputMaybe<Order_By>;
  datasource?: InputMaybe<Datasources_Order_By>;
  datasource_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: sql_credentials */
export type Sql_Credentials_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "sql_credentials" */
export enum Sql_Credentials_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DatasourceId = "datasource_id",
  /** column name */
  Id = "id",
  /** column name */
  Password = "password",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
  /** column name */
  Username = "username",
}

/** input type for updating data in table "sql_credentials" */
export type Sql_Credentials_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  password?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
  username?: InputMaybe<Scalars["String"]>;
};

/** Streaming cursor of the table "sql_credentials" */
export type Sql_Credentials_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Sql_Credentials_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Sql_Credentials_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  datasource_id?: InputMaybe<Scalars["uuid"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  password?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
  username?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "sql_credentials" */
export enum Sql_Credentials_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DatasourceId = "datasource_id",
  /** column name */
  Id = "id",
  /** column name */
  Password = "password",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
  /** column name */
  Username = "username",
}

export type Sql_Credentials_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Sql_Credentials_Set_Input>;
  /** filter the rows which have to be updated */
  where: Sql_Credentials_Bool_Exp;
};

export type Subscription_Root = {
  __typename?: "subscription_root";
  /** An array relationship */
  alerts: Alerts[];
  /** An aggregate relationship */
  alerts_aggregate: Alerts_Aggregate;
  /** fetch data from the table: "alerts" using primary key columns */
  alerts_by_pk?: Maybe<Alerts>;
  /** fetch data from the table in a streaming manner: "alerts" */
  alerts_stream: Alerts[];
  /** fetch data from the table: "auth.account_providers" */
  auth_account_providers: Auth_Account_Providers[];
  /** fetch aggregated fields from the table: "auth.account_providers" */
  auth_account_providers_aggregate: Auth_Account_Providers_Aggregate;
  /** fetch data from the table: "auth.account_providers" using primary key columns */
  auth_account_providers_by_pk?: Maybe<Auth_Account_Providers>;
  /** fetch data from the table in a streaming manner: "auth.account_providers" */
  auth_account_providers_stream: Auth_Account_Providers[];
  /** fetch data from the table: "auth.account_roles" */
  auth_account_roles: Auth_Account_Roles[];
  /** fetch aggregated fields from the table: "auth.account_roles" */
  auth_account_roles_aggregate: Auth_Account_Roles_Aggregate;
  /** fetch data from the table: "auth.account_roles" using primary key columns */
  auth_account_roles_by_pk?: Maybe<Auth_Account_Roles>;
  /** fetch data from the table in a streaming manner: "auth.account_roles" */
  auth_account_roles_stream: Auth_Account_Roles[];
  /** fetch data from the table: "auth.accounts" */
  auth_accounts: Auth_Accounts[];
  /** fetch aggregated fields from the table: "auth.accounts" */
  auth_accounts_aggregate: Auth_Accounts_Aggregate;
  /** fetch data from the table: "auth.accounts" using primary key columns */
  auth_accounts_by_pk?: Maybe<Auth_Accounts>;
  /** fetch data from the table in a streaming manner: "auth.accounts" */
  auth_accounts_stream: Auth_Accounts[];
  /** fetch data from the table: "auth.migrations" */
  auth_migrations: Auth_Migrations[];
  /** fetch aggregated fields from the table: "auth.migrations" */
  auth_migrations_aggregate: Auth_Migrations_Aggregate;
  /** fetch data from the table: "auth.migrations" using primary key columns */
  auth_migrations_by_pk?: Maybe<Auth_Migrations>;
  /** fetch data from the table in a streaming manner: "auth.migrations" */
  auth_migrations_stream: Auth_Migrations[];
  /** fetch data from the table: "auth.providers" */
  auth_providers: Auth_Providers[];
  /** fetch aggregated fields from the table: "auth.providers" */
  auth_providers_aggregate: Auth_Providers_Aggregate;
  /** fetch data from the table: "auth.providers" using primary key columns */
  auth_providers_by_pk?: Maybe<Auth_Providers>;
  /** fetch data from the table in a streaming manner: "auth.providers" */
  auth_providers_stream: Auth_Providers[];
  /** fetch data from the table: "auth.refresh_tokens" */
  auth_refresh_tokens: Auth_Refresh_Tokens[];
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  auth_refresh_tokens_aggregate: Auth_Refresh_Tokens_Aggregate;
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  auth_refresh_tokens_by_pk?: Maybe<Auth_Refresh_Tokens>;
  /** fetch data from the table in a streaming manner: "auth.refresh_tokens" */
  auth_refresh_tokens_stream: Auth_Refresh_Tokens[];
  /** fetch data from the table: "auth.roles" */
  auth_roles: Auth_Roles[];
  /** fetch aggregated fields from the table: "auth.roles" */
  auth_roles_aggregate: Auth_Roles_Aggregate;
  /** fetch data from the table: "auth.roles" using primary key columns */
  auth_roles_by_pk?: Maybe<Auth_Roles>;
  /** fetch data from the table in a streaming manner: "auth.roles" */
  auth_roles_stream: Auth_Roles[];
  /** fetch data from the table: "branch_statuses" */
  branch_statuses: Branch_Statuses[];
  /** fetch aggregated fields from the table: "branch_statuses" */
  branch_statuses_aggregate: Branch_Statuses_Aggregate;
  /** fetch data from the table: "branch_statuses" using primary key columns */
  branch_statuses_by_pk?: Maybe<Branch_Statuses>;
  /** fetch data from the table in a streaming manner: "branch_statuses" */
  branch_statuses_stream: Branch_Statuses[];
  /** An array relationship */
  branches: Branches[];
  /** An aggregate relationship */
  branches_aggregate: Branches_Aggregate;
  /** fetch data from the table: "branches" using primary key columns */
  branches_by_pk?: Maybe<Branches>;
  /** fetch data from the table in a streaming manner: "branches" */
  branches_stream: Branches[];
  create_events?: Maybe<Create_Events>;
  /** An array relationship */
  dashboards: Dashboards[];
  /** An aggregate relationship */
  dashboards_aggregate: Dashboards_Aggregate;
  /** fetch data from the table: "dashboards" using primary key columns */
  dashboards_by_pk?: Maybe<Dashboards>;
  /** fetch data from the table in a streaming manner: "dashboards" */
  dashboards_stream: Dashboards[];
  /** An array relationship */
  dataschemas: Dataschemas[];
  /** An aggregate relationship */
  dataschemas_aggregate: Dataschemas_Aggregate;
  /** fetch data from the table: "dataschemas" using primary key columns */
  dataschemas_by_pk?: Maybe<Dataschemas>;
  /** fetch data from the table in a streaming manner: "dataschemas" */
  dataschemas_stream: Dataschemas[];
  /** An array relationship */
  datasources: Datasources[];
  /** An aggregate relationship */
  datasources_aggregate: Datasources_Aggregate;
  /** fetch data from the table: "datasources" using primary key columns */
  datasources_by_pk?: Maybe<Datasources>;
  /** fetch data from the table in a streaming manner: "datasources" */
  datasources_stream: Datasources[];
  /** fetch data from the table: "events" */
  events: Events[];
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table in a streaming manner: "events" */
  events_stream: Events[];
  /** An array relationship */
  explorations: Explorations[];
  /** An aggregate relationship */
  explorations_aggregate: Explorations_Aggregate;
  /** fetch data from the table: "explorations" using primary key columns */
  explorations_by_pk?: Maybe<Explorations>;
  /** fetch data from the table in a streaming manner: "explorations" */
  explorations_stream: Explorations[];
  /** An array relationship */
  member_roles: Member_Roles[];
  /** An aggregate relationship */
  member_roles_aggregate: Member_Roles_Aggregate;
  /** fetch data from the table: "member_roles" using primary key columns */
  member_roles_by_pk?: Maybe<Member_Roles>;
  /** fetch data from the table in a streaming manner: "member_roles" */
  member_roles_stream: Member_Roles[];
  /** An array relationship */
  members: Members[];
  /** An aggregate relationship */
  members_aggregate: Members_Aggregate;
  /** fetch data from the table: "members" using primary key columns */
  members_by_pk?: Maybe<Members>;
  /** fetch data from the table in a streaming manner: "members" */
  members_stream: Members[];
  /** An array relationship */
  pinned_items: Pinned_Items[];
  /** An aggregate relationship */
  pinned_items_aggregate: Pinned_Items_Aggregate;
  /** fetch data from the table: "pinned_items" using primary key columns */
  pinned_items_by_pk?: Maybe<Pinned_Items>;
  /** fetch data from the table in a streaming manner: "pinned_items" */
  pinned_items_stream: Pinned_Items[];
  /** An array relationship */
  reports: Reports[];
  /** An aggregate relationship */
  reports_aggregate: Reports_Aggregate;
  /** fetch data from the table: "reports" using primary key columns */
  reports_by_pk?: Maybe<Reports>;
  /** fetch data from the table in a streaming manner: "reports" */
  reports_stream: Reports[];
  /** An array relationship */
  sql_credentials: Sql_Credentials[];
  /** An aggregate relationship */
  sql_credentials_aggregate: Sql_Credentials_Aggregate;
  /** fetch data from the table: "sql_credentials" using primary key columns */
  sql_credentials_by_pk?: Maybe<Sql_Credentials>;
  /** fetch data from the table in a streaming manner: "sql_credentials" */
  sql_credentials_stream: Sql_Credentials[];
  /** fetch data from the table: "team_roles" */
  team_roles: Team_Roles[];
  /** fetch aggregated fields from the table: "team_roles" */
  team_roles_aggregate: Team_Roles_Aggregate;
  /** fetch data from the table: "team_roles" using primary key columns */
  team_roles_by_pk?: Maybe<Team_Roles>;
  /** fetch data from the table in a streaming manner: "team_roles" */
  team_roles_stream: Team_Roles[];
  /** fetch data from the table: "teams" */
  teams: Teams[];
  /** fetch aggregated fields from the table: "teams" */
  teams_aggregate: Teams_Aggregate;
  /** fetch data from the table: "teams" using primary key columns */
  teams_by_pk?: Maybe<Teams>;
  /** fetch data from the table in a streaming manner: "teams" */
  teams_stream: Teams[];
  /** fetch data from the table: "users" */
  users: Users[];
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Users[];
  /** An array relationship */
  versions: Versions[];
  /** An aggregate relationship */
  versions_aggregate: Versions_Aggregate;
  /** fetch data from the table: "versions" using primary key columns */
  versions_by_pk?: Maybe<Versions>;
  /** fetch data from the table in a streaming manner: "versions" */
  versions_stream: Versions[];
};

export type Subscription_RootAlertsArgs = {
  distinct_on?: InputMaybe<Alerts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Alerts_Order_By[]>;
  where?: InputMaybe<Alerts_Bool_Exp>;
};

export type Subscription_RootAlerts_AggregateArgs = {
  distinct_on?: InputMaybe<Alerts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Alerts_Order_By[]>;
  where?: InputMaybe<Alerts_Bool_Exp>;
};

export type Subscription_RootAlerts_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootAlerts_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Alerts_Stream_Cursor_Input>[];
  where?: InputMaybe<Alerts_Bool_Exp>;
};

export type Subscription_RootAuth_Account_ProvidersArgs = {
  distinct_on?: InputMaybe<Auth_Account_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
};

export type Subscription_RootAuth_Account_Providers_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Account_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
};

export type Subscription_RootAuth_Account_Providers_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootAuth_Account_Providers_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Auth_Account_Providers_Stream_Cursor_Input>[];
  where?: InputMaybe<Auth_Account_Providers_Bool_Exp>;
};

export type Subscription_RootAuth_Account_RolesArgs = {
  distinct_on?: InputMaybe<Auth_Account_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
};

export type Subscription_RootAuth_Account_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Account_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Account_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
};

export type Subscription_RootAuth_Account_Roles_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootAuth_Account_Roles_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Auth_Account_Roles_Stream_Cursor_Input>[];
  where?: InputMaybe<Auth_Account_Roles_Bool_Exp>;
};

export type Subscription_RootAuth_AccountsArgs = {
  distinct_on?: InputMaybe<Auth_Accounts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Accounts_Order_By[]>;
  where?: InputMaybe<Auth_Accounts_Bool_Exp>;
};

export type Subscription_RootAuth_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Accounts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Accounts_Order_By[]>;
  where?: InputMaybe<Auth_Accounts_Bool_Exp>;
};

export type Subscription_RootAuth_Accounts_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootAuth_Accounts_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Auth_Accounts_Stream_Cursor_Input>[];
  where?: InputMaybe<Auth_Accounts_Bool_Exp>;
};

export type Subscription_RootAuth_MigrationsArgs = {
  distinct_on?: InputMaybe<Auth_Migrations_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Migrations_Order_By[]>;
  where?: InputMaybe<Auth_Migrations_Bool_Exp>;
};

export type Subscription_RootAuth_Migrations_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Migrations_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Migrations_Order_By[]>;
  where?: InputMaybe<Auth_Migrations_Bool_Exp>;
};

export type Subscription_RootAuth_Migrations_By_PkArgs = {
  id: Scalars["Int"];
};

export type Subscription_RootAuth_Migrations_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Auth_Migrations_Stream_Cursor_Input>[];
  where?: InputMaybe<Auth_Migrations_Bool_Exp>;
};

export type Subscription_RootAuth_ProvidersArgs = {
  distinct_on?: InputMaybe<Auth_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Providers_Bool_Exp>;
};

export type Subscription_RootAuth_Providers_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Providers_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Providers_Order_By[]>;
  where?: InputMaybe<Auth_Providers_Bool_Exp>;
};

export type Subscription_RootAuth_Providers_By_PkArgs = {
  provider: Scalars["String"];
};

export type Subscription_RootAuth_Providers_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Auth_Providers_Stream_Cursor_Input>[];
  where?: InputMaybe<Auth_Providers_Bool_Exp>;
};

export type Subscription_RootAuth_Refresh_TokensArgs = {
  distinct_on?: InputMaybe<Auth_Refresh_Tokens_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Refresh_Tokens_Order_By[]>;
  where?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp>;
};

export type Subscription_RootAuth_Refresh_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Refresh_Tokens_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Refresh_Tokens_Order_By[]>;
  where?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp>;
};

export type Subscription_RootAuth_Refresh_Tokens_By_PkArgs = {
  refresh_token: Scalars["uuid"];
};

export type Subscription_RootAuth_Refresh_Tokens_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Auth_Refresh_Tokens_Stream_Cursor_Input>[];
  where?: InputMaybe<Auth_Refresh_Tokens_Bool_Exp>;
};

export type Subscription_RootAuth_RolesArgs = {
  distinct_on?: InputMaybe<Auth_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Roles_Bool_Exp>;
};

export type Subscription_RootAuth_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Auth_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Auth_Roles_Order_By[]>;
  where?: InputMaybe<Auth_Roles_Bool_Exp>;
};

export type Subscription_RootAuth_Roles_By_PkArgs = {
  role: Scalars["String"];
};

export type Subscription_RootAuth_Roles_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Auth_Roles_Stream_Cursor_Input>[];
  where?: InputMaybe<Auth_Roles_Bool_Exp>;
};

export type Subscription_RootBranch_StatusesArgs = {
  distinct_on?: InputMaybe<Branch_Statuses_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branch_Statuses_Order_By[]>;
  where?: InputMaybe<Branch_Statuses_Bool_Exp>;
};

export type Subscription_RootBranch_Statuses_AggregateArgs = {
  distinct_on?: InputMaybe<Branch_Statuses_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branch_Statuses_Order_By[]>;
  where?: InputMaybe<Branch_Statuses_Bool_Exp>;
};

export type Subscription_RootBranch_Statuses_By_PkArgs = {
  status: Scalars["String"];
};

export type Subscription_RootBranch_Statuses_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Branch_Statuses_Stream_Cursor_Input>[];
  where?: InputMaybe<Branch_Statuses_Bool_Exp>;
};

export type Subscription_RootBranchesArgs = {
  distinct_on?: InputMaybe<Branches_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branches_Order_By[]>;
  where?: InputMaybe<Branches_Bool_Exp>;
};

export type Subscription_RootBranches_AggregateArgs = {
  distinct_on?: InputMaybe<Branches_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branches_Order_By[]>;
  where?: InputMaybe<Branches_Bool_Exp>;
};

export type Subscription_RootBranches_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootBranches_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Branches_Stream_Cursor_Input>[];
  where?: InputMaybe<Branches_Bool_Exp>;
};

export type Subscription_RootCreate_EventsArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootDashboardsArgs = {
  distinct_on?: InputMaybe<Dashboards_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dashboards_Order_By[]>;
  where?: InputMaybe<Dashboards_Bool_Exp>;
};

export type Subscription_RootDashboards_AggregateArgs = {
  distinct_on?: InputMaybe<Dashboards_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dashboards_Order_By[]>;
  where?: InputMaybe<Dashboards_Bool_Exp>;
};

export type Subscription_RootDashboards_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootDashboards_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Dashboards_Stream_Cursor_Input>[];
  where?: InputMaybe<Dashboards_Bool_Exp>;
};

export type Subscription_RootDataschemasArgs = {
  distinct_on?: InputMaybe<Dataschemas_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dataschemas_Order_By[]>;
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

export type Subscription_RootDataschemas_AggregateArgs = {
  distinct_on?: InputMaybe<Dataschemas_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dataschemas_Order_By[]>;
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

export type Subscription_RootDataschemas_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootDataschemas_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Dataschemas_Stream_Cursor_Input>[];
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

export type Subscription_RootDatasourcesArgs = {
  distinct_on?: InputMaybe<Datasources_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Datasources_Order_By[]>;
  where?: InputMaybe<Datasources_Bool_Exp>;
};

export type Subscription_RootDatasources_AggregateArgs = {
  distinct_on?: InputMaybe<Datasources_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Datasources_Order_By[]>;
  where?: InputMaybe<Datasources_Bool_Exp>;
};

export type Subscription_RootDatasources_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootDatasources_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Datasources_Stream_Cursor_Input>[];
  where?: InputMaybe<Datasources_Bool_Exp>;
};

export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Events_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Events_Order_By[]>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Events_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Events_Order_By[]>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootEvents_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootEvents_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Events_Stream_Cursor_Input>[];
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootExplorationsArgs = {
  distinct_on?: InputMaybe<Explorations_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Explorations_Order_By[]>;
  where?: InputMaybe<Explorations_Bool_Exp>;
};

export type Subscription_RootExplorations_AggregateArgs = {
  distinct_on?: InputMaybe<Explorations_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Explorations_Order_By[]>;
  where?: InputMaybe<Explorations_Bool_Exp>;
};

export type Subscription_RootExplorations_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootExplorations_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Explorations_Stream_Cursor_Input>[];
  where?: InputMaybe<Explorations_Bool_Exp>;
};

export type Subscription_RootMember_RolesArgs = {
  distinct_on?: InputMaybe<Member_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Member_Roles_Order_By[]>;
  where?: InputMaybe<Member_Roles_Bool_Exp>;
};

export type Subscription_RootMember_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Member_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Member_Roles_Order_By[]>;
  where?: InputMaybe<Member_Roles_Bool_Exp>;
};

export type Subscription_RootMember_Roles_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootMember_Roles_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Member_Roles_Stream_Cursor_Input>[];
  where?: InputMaybe<Member_Roles_Bool_Exp>;
};

export type Subscription_RootMembersArgs = {
  distinct_on?: InputMaybe<Members_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Members_Order_By[]>;
  where?: InputMaybe<Members_Bool_Exp>;
};

export type Subscription_RootMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Members_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Members_Order_By[]>;
  where?: InputMaybe<Members_Bool_Exp>;
};

export type Subscription_RootMembers_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootMembers_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Members_Stream_Cursor_Input>[];
  where?: InputMaybe<Members_Bool_Exp>;
};

export type Subscription_RootPinned_ItemsArgs = {
  distinct_on?: InputMaybe<Pinned_Items_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Pinned_Items_Order_By[]>;
  where?: InputMaybe<Pinned_Items_Bool_Exp>;
};

export type Subscription_RootPinned_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Pinned_Items_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Pinned_Items_Order_By[]>;
  where?: InputMaybe<Pinned_Items_Bool_Exp>;
};

export type Subscription_RootPinned_Items_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootPinned_Items_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Pinned_Items_Stream_Cursor_Input>[];
  where?: InputMaybe<Pinned_Items_Bool_Exp>;
};

export type Subscription_RootReportsArgs = {
  distinct_on?: InputMaybe<Reports_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Reports_Order_By[]>;
  where?: InputMaybe<Reports_Bool_Exp>;
};

export type Subscription_RootReports_AggregateArgs = {
  distinct_on?: InputMaybe<Reports_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Reports_Order_By[]>;
  where?: InputMaybe<Reports_Bool_Exp>;
};

export type Subscription_RootReports_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootReports_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Reports_Stream_Cursor_Input>[];
  where?: InputMaybe<Reports_Bool_Exp>;
};

export type Subscription_RootSql_CredentialsArgs = {
  distinct_on?: InputMaybe<Sql_Credentials_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Sql_Credentials_Order_By[]>;
  where?: InputMaybe<Sql_Credentials_Bool_Exp>;
};

export type Subscription_RootSql_Credentials_AggregateArgs = {
  distinct_on?: InputMaybe<Sql_Credentials_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Sql_Credentials_Order_By[]>;
  where?: InputMaybe<Sql_Credentials_Bool_Exp>;
};

export type Subscription_RootSql_Credentials_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootSql_Credentials_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Sql_Credentials_Stream_Cursor_Input>[];
  where?: InputMaybe<Sql_Credentials_Bool_Exp>;
};

export type Subscription_RootTeam_RolesArgs = {
  distinct_on?: InputMaybe<Team_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Team_Roles_Order_By[]>;
  where?: InputMaybe<Team_Roles_Bool_Exp>;
};

export type Subscription_RootTeam_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Team_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Team_Roles_Order_By[]>;
  where?: InputMaybe<Team_Roles_Bool_Exp>;
};

export type Subscription_RootTeam_Roles_By_PkArgs = {
  name: Scalars["String"];
};

export type Subscription_RootTeam_Roles_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Team_Roles_Stream_Cursor_Input>[];
  where?: InputMaybe<Team_Roles_Bool_Exp>;
};

export type Subscription_RootTeamsArgs = {
  distinct_on?: InputMaybe<Teams_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Teams_Order_By[]>;
  where?: InputMaybe<Teams_Bool_Exp>;
};

export type Subscription_RootTeams_AggregateArgs = {
  distinct_on?: InputMaybe<Teams_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Teams_Order_By[]>;
  where?: InputMaybe<Teams_Bool_Exp>;
};

export type Subscription_RootTeams_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootTeams_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Teams_Stream_Cursor_Input>[];
  where?: InputMaybe<Teams_Bool_Exp>;
};

export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Users_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Users_Order_By[]>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Users_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Users_Order_By[]>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Users_Stream_Cursor_Input>[];
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Subscription_RootVersionsArgs = {
  distinct_on?: InputMaybe<Versions_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Versions_Order_By[]>;
  where?: InputMaybe<Versions_Bool_Exp>;
};

export type Subscription_RootVersions_AggregateArgs = {
  distinct_on?: InputMaybe<Versions_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Versions_Order_By[]>;
  where?: InputMaybe<Versions_Bool_Exp>;
};

export type Subscription_RootVersions_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootVersions_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: InputMaybe<Versions_Stream_Cursor_Input>[];
  where?: InputMaybe<Versions_Bool_Exp>;
};

/** columns and relationships of "team_roles" */
export type Team_Roles = {
  __typename?: "team_roles";
  /** An array relationship */
  member_roles: Member_Roles[];
  /** An aggregate relationship */
  member_roles_aggregate: Member_Roles_Aggregate;
  name: Scalars["String"];
};

/** columns and relationships of "team_roles" */
export type Team_RolesMember_RolesArgs = {
  distinct_on?: InputMaybe<Member_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Member_Roles_Order_By[]>;
  where?: InputMaybe<Member_Roles_Bool_Exp>;
};

/** columns and relationships of "team_roles" */
export type Team_RolesMember_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Member_Roles_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Member_Roles_Order_By[]>;
  where?: InputMaybe<Member_Roles_Bool_Exp>;
};

/** aggregated selection of "team_roles" */
export type Team_Roles_Aggregate = {
  __typename?: "team_roles_aggregate";
  aggregate?: Maybe<Team_Roles_Aggregate_Fields>;
  nodes: Team_Roles[];
};

/** aggregate fields of "team_roles" */
export type Team_Roles_Aggregate_Fields = {
  __typename?: "team_roles_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Team_Roles_Max_Fields>;
  min?: Maybe<Team_Roles_Min_Fields>;
};

/** aggregate fields of "team_roles" */
export type Team_Roles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Team_Roles_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "team_roles". All fields are combined with a logical 'AND'. */
export type Team_Roles_Bool_Exp = {
  _and?: InputMaybe<Team_Roles_Bool_Exp[]>;
  _not?: InputMaybe<Team_Roles_Bool_Exp>;
  _or?: InputMaybe<Team_Roles_Bool_Exp[]>;
  member_roles?: InputMaybe<Member_Roles_Bool_Exp>;
  member_roles_aggregate?: InputMaybe<Member_Roles_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "team_roles" */
export enum Team_Roles_Constraint {
  /** unique or primary key constraint on columns "name" */
  TeamRolesPkey = "team_roles_pkey",
}

export enum Team_Roles_Enum {
  Member = "member",
  Owner = "owner",
}

/** Boolean expression to compare columns of type "team_roles_enum". All fields are combined with logical 'AND'. */
export type Team_Roles_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Team_Roles_Enum>;
  _in?: InputMaybe<Team_Roles_Enum[]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _neq?: InputMaybe<Team_Roles_Enum>;
  _nin?: InputMaybe<Team_Roles_Enum[]>;
};

/** input type for inserting data into table "team_roles" */
export type Team_Roles_Insert_Input = {
  member_roles?: InputMaybe<Member_Roles_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type Team_Roles_Max_Fields = {
  __typename?: "team_roles_max_fields";
  name?: Maybe<Scalars["String"]>;
};

/** aggregate min on columns */
export type Team_Roles_Min_Fields = {
  __typename?: "team_roles_min_fields";
  name?: Maybe<Scalars["String"]>;
};

/** response of any mutation on the table "team_roles" */
export type Team_Roles_Mutation_Response = {
  __typename?: "team_roles_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Team_Roles[];
};

/** input type for inserting object relation for remote table "team_roles" */
export type Team_Roles_Obj_Rel_Insert_Input = {
  data: Team_Roles_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Team_Roles_On_Conflict>;
};

/** on_conflict condition type for table "team_roles" */
export type Team_Roles_On_Conflict = {
  constraint: Team_Roles_Constraint;
  update_columns?: Team_Roles_Update_Column[];
  where?: InputMaybe<Team_Roles_Bool_Exp>;
};

/** Ordering options when selecting data from "team_roles". */
export type Team_Roles_Order_By = {
  member_roles_aggregate?: InputMaybe<Member_Roles_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: team_roles */
export type Team_Roles_Pk_Columns_Input = {
  name: Scalars["String"];
};

/** select columns of table "team_roles" */
export enum Team_Roles_Select_Column {
  /** column name */
  Name = "name",
}

/** input type for updating data in table "team_roles" */
export type Team_Roles_Set_Input = {
  name?: InputMaybe<Scalars["String"]>;
};

/** Streaming cursor of the table "team_roles" */
export type Team_Roles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Team_Roles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Team_Roles_Stream_Cursor_Value_Input = {
  name?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "team_roles" */
export enum Team_Roles_Update_Column {
  /** column name */
  Name = "name",
}

export type Team_Roles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Team_Roles_Set_Input>;
  /** filter the rows which have to be updated */
  where: Team_Roles_Bool_Exp;
};

/** columns and relationships of "teams" */
export type Teams = {
  __typename?: "teams";
  /** An array relationship */
  alerts: Alerts[];
  /** An aggregate relationship */
  alerts_aggregate: Alerts_Aggregate;
  created_at: Scalars["timestamptz"];
  /** An array relationship */
  dashboards: Dashboards[];
  /** An aggregate relationship */
  dashboards_aggregate: Dashboards_Aggregate;
  /** An array relationship */
  datasources: Datasources[];
  /** An aggregate relationship */
  datasources_aggregate: Datasources_Aggregate;
  id: Scalars["uuid"];
  /** An array relationship */
  members: Members[];
  /** An aggregate relationship */
  members_aggregate: Members_Aggregate;
  name: Scalars["String"];
  /** An array relationship */
  reports: Reports[];
  /** An aggregate relationship */
  reports_aggregate: Reports_Aggregate;
  updated_at: Scalars["timestamptz"];
};

/** columns and relationships of "teams" */
export type TeamsAlertsArgs = {
  distinct_on?: InputMaybe<Alerts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Alerts_Order_By[]>;
  where?: InputMaybe<Alerts_Bool_Exp>;
};

/** columns and relationships of "teams" */
export type TeamsAlerts_AggregateArgs = {
  distinct_on?: InputMaybe<Alerts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Alerts_Order_By[]>;
  where?: InputMaybe<Alerts_Bool_Exp>;
};

/** columns and relationships of "teams" */
export type TeamsDashboardsArgs = {
  distinct_on?: InputMaybe<Dashboards_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dashboards_Order_By[]>;
  where?: InputMaybe<Dashboards_Bool_Exp>;
};

/** columns and relationships of "teams" */
export type TeamsDashboards_AggregateArgs = {
  distinct_on?: InputMaybe<Dashboards_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dashboards_Order_By[]>;
  where?: InputMaybe<Dashboards_Bool_Exp>;
};

/** columns and relationships of "teams" */
export type TeamsDatasourcesArgs = {
  distinct_on?: InputMaybe<Datasources_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Datasources_Order_By[]>;
  where?: InputMaybe<Datasources_Bool_Exp>;
};

/** columns and relationships of "teams" */
export type TeamsDatasources_AggregateArgs = {
  distinct_on?: InputMaybe<Datasources_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Datasources_Order_By[]>;
  where?: InputMaybe<Datasources_Bool_Exp>;
};

/** columns and relationships of "teams" */
export type TeamsMembersArgs = {
  distinct_on?: InputMaybe<Members_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Members_Order_By[]>;
  where?: InputMaybe<Members_Bool_Exp>;
};

/** columns and relationships of "teams" */
export type TeamsMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Members_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Members_Order_By[]>;
  where?: InputMaybe<Members_Bool_Exp>;
};

/** columns and relationships of "teams" */
export type TeamsReportsArgs = {
  distinct_on?: InputMaybe<Reports_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Reports_Order_By[]>;
  where?: InputMaybe<Reports_Bool_Exp>;
};

/** columns and relationships of "teams" */
export type TeamsReports_AggregateArgs = {
  distinct_on?: InputMaybe<Reports_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Reports_Order_By[]>;
  where?: InputMaybe<Reports_Bool_Exp>;
};

/** aggregated selection of "teams" */
export type Teams_Aggregate = {
  __typename?: "teams_aggregate";
  aggregate?: Maybe<Teams_Aggregate_Fields>;
  nodes: Teams[];
};

/** aggregate fields of "teams" */
export type Teams_Aggregate_Fields = {
  __typename?: "teams_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Teams_Max_Fields>;
  min?: Maybe<Teams_Min_Fields>;
};

/** aggregate fields of "teams" */
export type Teams_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Teams_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "teams". All fields are combined with a logical 'AND'. */
export type Teams_Bool_Exp = {
  _and?: InputMaybe<Teams_Bool_Exp[]>;
  _not?: InputMaybe<Teams_Bool_Exp>;
  _or?: InputMaybe<Teams_Bool_Exp[]>;
  alerts?: InputMaybe<Alerts_Bool_Exp>;
  alerts_aggregate?: InputMaybe<Alerts_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  dashboards?: InputMaybe<Dashboards_Bool_Exp>;
  dashboards_aggregate?: InputMaybe<Dashboards_Aggregate_Bool_Exp>;
  datasources?: InputMaybe<Datasources_Bool_Exp>;
  datasources_aggregate?: InputMaybe<Datasources_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  members?: InputMaybe<Members_Bool_Exp>;
  members_aggregate?: InputMaybe<Members_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  reports?: InputMaybe<Reports_Bool_Exp>;
  reports_aggregate?: InputMaybe<Reports_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "teams" */
export enum Teams_Constraint {
  /** unique or primary key constraint on columns "id" */
  TeamsPkey = "teams_pkey",
}

/** input type for inserting data into table "teams" */
export type Teams_Insert_Input = {
  alerts?: InputMaybe<Alerts_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  dashboards?: InputMaybe<Dashboards_Arr_Rel_Insert_Input>;
  datasources?: InputMaybe<Datasources_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars["uuid"]>;
  members?: InputMaybe<Members_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars["String"]>;
  reports?: InputMaybe<Reports_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** aggregate max on columns */
export type Teams_Max_Fields = {
  __typename?: "teams_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** aggregate min on columns */
export type Teams_Min_Fields = {
  __typename?: "teams_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** response of any mutation on the table "teams" */
export type Teams_Mutation_Response = {
  __typename?: "teams_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Teams[];
};

/** input type for inserting object relation for remote table "teams" */
export type Teams_Obj_Rel_Insert_Input = {
  data: Teams_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Teams_On_Conflict>;
};

/** on_conflict condition type for table "teams" */
export type Teams_On_Conflict = {
  constraint: Teams_Constraint;
  update_columns?: Teams_Update_Column[];
  where?: InputMaybe<Teams_Bool_Exp>;
};

/** Ordering options when selecting data from "teams". */
export type Teams_Order_By = {
  alerts_aggregate?: InputMaybe<Alerts_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  dashboards_aggregate?: InputMaybe<Dashboards_Aggregate_Order_By>;
  datasources_aggregate?: InputMaybe<Datasources_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  members_aggregate?: InputMaybe<Members_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  reports_aggregate?: InputMaybe<Reports_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: teams */
export type Teams_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "teams" */
export enum Teams_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "teams" */
export type Teams_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** Streaming cursor of the table "teams" */
export type Teams_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Teams_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Teams_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** update columns of table "teams" */
export enum Teams_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  UpdatedAt = "updated_at",
}

export type Teams_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Teams_Set_Input>;
  /** filter the rows which have to be updated */
  where: Teams_Bool_Exp;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["timestamp"]>;
  _gt?: InputMaybe<Scalars["timestamp"]>;
  _gte?: InputMaybe<Scalars["timestamp"]>;
  _in?: InputMaybe<Scalars["timestamp"][]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["timestamp"]>;
  _lte?: InputMaybe<Scalars["timestamp"]>;
  _neq?: InputMaybe<Scalars["timestamp"]>;
  _nin?: InputMaybe<Scalars["timestamp"][]>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["timestamptz"]>;
  _gt?: InputMaybe<Scalars["timestamptz"]>;
  _gte?: InputMaybe<Scalars["timestamptz"]>;
  _in?: InputMaybe<Scalars["timestamptz"][]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["timestamptz"]>;
  _lte?: InputMaybe<Scalars["timestamptz"]>;
  _neq?: InputMaybe<Scalars["timestamptz"]>;
  _nin?: InputMaybe<Scalars["timestamptz"][]>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: "users";
  /** An object relationship */
  account?: Maybe<Auth_Accounts>;
  /** An array relationship */
  alerts: Alerts[];
  /** An aggregate relationship */
  alerts_aggregate: Alerts_Aggregate;
  avatar_url?: Maybe<Scalars["String"]>;
  /** An array relationship */
  branches: Branches[];
  /** An aggregate relationship */
  branches_aggregate: Branches_Aggregate;
  created_at: Scalars["timestamptz"];
  /** An array relationship */
  dataschemas: Dataschemas[];
  /** An aggregate relationship */
  dataschemas_aggregate: Dataschemas_Aggregate;
  /** An array relationship */
  datasources: Datasources[];
  /** An aggregate relationship */
  datasources_aggregate: Datasources_Aggregate;
  display_name?: Maybe<Scalars["String"]>;
  id: Scalars["uuid"];
  /** An array relationship */
  members: Members[];
  /** An aggregate relationship */
  members_aggregate: Members_Aggregate;
  /** An array relationship */
  reports: Reports[];
  /** An aggregate relationship */
  reports_aggregate: Reports_Aggregate;
  updated_at: Scalars["timestamptz"];
  /** An array relationship */
  versions: Versions[];
  /** An aggregate relationship */
  versions_aggregate: Versions_Aggregate;
};

/** columns and relationships of "users" */
export type UsersAlertsArgs = {
  distinct_on?: InputMaybe<Alerts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Alerts_Order_By[]>;
  where?: InputMaybe<Alerts_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersAlerts_AggregateArgs = {
  distinct_on?: InputMaybe<Alerts_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Alerts_Order_By[]>;
  where?: InputMaybe<Alerts_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersBranchesArgs = {
  distinct_on?: InputMaybe<Branches_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branches_Order_By[]>;
  where?: InputMaybe<Branches_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersBranches_AggregateArgs = {
  distinct_on?: InputMaybe<Branches_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Branches_Order_By[]>;
  where?: InputMaybe<Branches_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersDataschemasArgs = {
  distinct_on?: InputMaybe<Dataschemas_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dataschemas_Order_By[]>;
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersDataschemas_AggregateArgs = {
  distinct_on?: InputMaybe<Dataschemas_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dataschemas_Order_By[]>;
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersDatasourcesArgs = {
  distinct_on?: InputMaybe<Datasources_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Datasources_Order_By[]>;
  where?: InputMaybe<Datasources_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersDatasources_AggregateArgs = {
  distinct_on?: InputMaybe<Datasources_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Datasources_Order_By[]>;
  where?: InputMaybe<Datasources_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersMembersArgs = {
  distinct_on?: InputMaybe<Members_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Members_Order_By[]>;
  where?: InputMaybe<Members_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Members_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Members_Order_By[]>;
  where?: InputMaybe<Members_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersReportsArgs = {
  distinct_on?: InputMaybe<Reports_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Reports_Order_By[]>;
  where?: InputMaybe<Reports_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersReports_AggregateArgs = {
  distinct_on?: InputMaybe<Reports_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Reports_Order_By[]>;
  where?: InputMaybe<Reports_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersVersionsArgs = {
  distinct_on?: InputMaybe<Versions_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Versions_Order_By[]>;
  where?: InputMaybe<Versions_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersVersions_AggregateArgs = {
  distinct_on?: InputMaybe<Versions_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Versions_Order_By[]>;
  where?: InputMaybe<Versions_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: "users_aggregate";
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Users[];
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: "users_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Users_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Users_Bool_Exp[]>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Users_Bool_Exp[]>;
  account?: InputMaybe<Auth_Accounts_Bool_Exp>;
  alerts?: InputMaybe<Alerts_Bool_Exp>;
  alerts_aggregate?: InputMaybe<Alerts_Aggregate_Bool_Exp>;
  avatar_url?: InputMaybe<String_Comparison_Exp>;
  branches?: InputMaybe<Branches_Bool_Exp>;
  branches_aggregate?: InputMaybe<Branches_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  dataschemas?: InputMaybe<Dataschemas_Bool_Exp>;
  dataschemas_aggregate?: InputMaybe<Dataschemas_Aggregate_Bool_Exp>;
  datasources?: InputMaybe<Datasources_Bool_Exp>;
  datasources_aggregate?: InputMaybe<Datasources_Aggregate_Bool_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  members?: InputMaybe<Members_Bool_Exp>;
  members_aggregate?: InputMaybe<Members_Aggregate_Bool_Exp>;
  reports?: InputMaybe<Reports_Bool_Exp>;
  reports_aggregate?: InputMaybe<Reports_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  versions?: InputMaybe<Versions_Bool_Exp>;
  versions_aggregate?: InputMaybe<Versions_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  UsersPkey = "users_pkey",
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  account?: InputMaybe<Auth_Accounts_Obj_Rel_Insert_Input>;
  alerts?: InputMaybe<Alerts_Arr_Rel_Insert_Input>;
  avatar_url?: InputMaybe<Scalars["String"]>;
  branches?: InputMaybe<Branches_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  dataschemas?: InputMaybe<Dataschemas_Arr_Rel_Insert_Input>;
  datasources?: InputMaybe<Datasources_Arr_Rel_Insert_Input>;
  display_name?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  members?: InputMaybe<Members_Arr_Rel_Insert_Input>;
  reports?: InputMaybe<Reports_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  versions?: InputMaybe<Versions_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: "users_max_fields";
  avatar_url?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  display_name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: "users_min_fields";
  avatar_url?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  display_name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: "users_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Users[];
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Users_Update_Column[];
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  account?: InputMaybe<Auth_Accounts_Order_By>;
  alerts_aggregate?: InputMaybe<Alerts_Aggregate_Order_By>;
  avatar_url?: InputMaybe<Order_By>;
  branches_aggregate?: InputMaybe<Branches_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  dataschemas_aggregate?: InputMaybe<Dataschemas_Aggregate_Order_By>;
  datasources_aggregate?: InputMaybe<Datasources_Aggregate_Order_By>;
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  members_aggregate?: InputMaybe<Members_Aggregate_Order_By>;
  reports_aggregate?: InputMaybe<Reports_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  versions_aggregate?: InputMaybe<Versions_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  AvatarUrl = "avatar_url",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DisplayName = "display_name",
  /** column name */
  Id = "id",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  avatar_url?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  display_name?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  avatar_url?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  display_name?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  AvatarUrl = "avatar_url",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DisplayName = "display_name",
  /** column name */
  Id = "id",
  /** column name */
  UpdatedAt = "updated_at",
}

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["uuid"]>;
  _gt?: InputMaybe<Scalars["uuid"]>;
  _gte?: InputMaybe<Scalars["uuid"]>;
  _in?: InputMaybe<Scalars["uuid"][]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["uuid"]>;
  _lte?: InputMaybe<Scalars["uuid"]>;
  _neq?: InputMaybe<Scalars["uuid"]>;
  _nin?: InputMaybe<Scalars["uuid"][]>;
};

/** columns and relationships of "versions" */
export type Versions = {
  __typename?: "versions";
  /** An object relationship */
  branch: Branches;
  branch_id: Scalars["uuid"];
  checksum: Scalars["String"];
  created_at: Scalars["timestamptz"];
  /** An array relationship */
  dataschemas: Dataschemas[];
  /** An aggregate relationship */
  dataschemas_aggregate: Dataschemas_Aggregate;
  id: Scalars["uuid"];
  markdown_doc?: Maybe<Scalars["String"]>;
  updated_at: Scalars["timestamptz"];
  /** An object relationship */
  user: Users;
  user_id: Scalars["uuid"];
};

/** columns and relationships of "versions" */
export type VersionsDataschemasArgs = {
  distinct_on?: InputMaybe<Dataschemas_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dataschemas_Order_By[]>;
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

/** columns and relationships of "versions" */
export type VersionsDataschemas_AggregateArgs = {
  distinct_on?: InputMaybe<Dataschemas_Select_Column[]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Dataschemas_Order_By[]>;
  where?: InputMaybe<Dataschemas_Bool_Exp>;
};

/** aggregated selection of "versions" */
export type Versions_Aggregate = {
  __typename?: "versions_aggregate";
  aggregate?: Maybe<Versions_Aggregate_Fields>;
  nodes: Versions[];
};

export type Versions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Versions_Aggregate_Bool_Exp_Count>;
};

export type Versions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Versions_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Versions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "versions" */
export type Versions_Aggregate_Fields = {
  __typename?: "versions_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Versions_Max_Fields>;
  min?: Maybe<Versions_Min_Fields>;
};

/** aggregate fields of "versions" */
export type Versions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Versions_Select_Column[]>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "versions" */
export type Versions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Versions_Max_Order_By>;
  min?: InputMaybe<Versions_Min_Order_By>;
};

/** input type for inserting array relation for remote table "versions" */
export type Versions_Arr_Rel_Insert_Input = {
  data: Versions_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Versions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "versions". All fields are combined with a logical 'AND'. */
export type Versions_Bool_Exp = {
  _and?: InputMaybe<Versions_Bool_Exp[]>;
  _not?: InputMaybe<Versions_Bool_Exp>;
  _or?: InputMaybe<Versions_Bool_Exp[]>;
  branch?: InputMaybe<Branches_Bool_Exp>;
  branch_id?: InputMaybe<Uuid_Comparison_Exp>;
  checksum?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  dataschemas?: InputMaybe<Dataschemas_Bool_Exp>;
  dataschemas_aggregate?: InputMaybe<Dataschemas_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  markdown_doc?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "versions" */
export enum Versions_Constraint {
  /** unique or primary key constraint on columns "id" */
  VersionsPkey = "versions_pkey",
}

/** input type for inserting data into table "versions" */
export type Versions_Insert_Input = {
  branch?: InputMaybe<Branches_Obj_Rel_Insert_Input>;
  branch_id?: InputMaybe<Scalars["uuid"]>;
  checksum?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  dataschemas?: InputMaybe<Dataschemas_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars["uuid"]>;
  markdown_doc?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Versions_Max_Fields = {
  __typename?: "versions_max_fields";
  branch_id?: Maybe<Scalars["uuid"]>;
  checksum?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  markdown_doc?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "versions" */
export type Versions_Max_Order_By = {
  branch_id?: InputMaybe<Order_By>;
  checksum?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  markdown_doc?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Versions_Min_Fields = {
  __typename?: "versions_min_fields";
  branch_id?: Maybe<Scalars["uuid"]>;
  checksum?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  markdown_doc?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "versions" */
export type Versions_Min_Order_By = {
  branch_id?: InputMaybe<Order_By>;
  checksum?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  markdown_doc?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "versions" */
export type Versions_Mutation_Response = {
  __typename?: "versions_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Versions[];
};

/** input type for inserting object relation for remote table "versions" */
export type Versions_Obj_Rel_Insert_Input = {
  data: Versions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Versions_On_Conflict>;
};

/** on_conflict condition type for table "versions" */
export type Versions_On_Conflict = {
  constraint: Versions_Constraint;
  update_columns?: Versions_Update_Column[];
  where?: InputMaybe<Versions_Bool_Exp>;
};

/** Ordering options when selecting data from "versions". */
export type Versions_Order_By = {
  branch?: InputMaybe<Branches_Order_By>;
  branch_id?: InputMaybe<Order_By>;
  checksum?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dataschemas_aggregate?: InputMaybe<Dataschemas_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  markdown_doc?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: versions */
export type Versions_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "versions" */
export enum Versions_Select_Column {
  /** column name */
  BranchId = "branch_id",
  /** column name */
  Checksum = "checksum",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  MarkdownDoc = "markdown_doc",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "versions" */
export type Versions_Set_Input = {
  branch_id?: InputMaybe<Scalars["uuid"]>;
  checksum?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  markdown_doc?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "versions" */
export type Versions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Versions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Versions_Stream_Cursor_Value_Input = {
  branch_id?: InputMaybe<Scalars["uuid"]>;
  checksum?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  markdown_doc?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "versions" */
export enum Versions_Update_Column {
  /** column name */
  BranchId = "branch_id",
  /** column name */
  Checksum = "checksum",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  MarkdownDoc = "markdown_doc",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

export type Versions_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Versions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Versions_Bool_Exp;
};

export type GetUsersQueryVariables = Exact<Record<string, never>>;

export type GetUsersQuery = {
  __typename?: "query_root";
  users: { __typename?: "users"; id: any }[];
};

export const GetUsersDocument = gql`
  query GetUsers {
    users {
      id
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
export const namedOperations = {
  Query: {
    GetUsers: "GetUsers",
  },
};
