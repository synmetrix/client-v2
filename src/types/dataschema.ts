import type { AllDataSchemasQuery } from "@/graphql/generated";

export type Dataschema =
  AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"][number];
