import type { AllDataSchemasQuery } from "@/graphql/generated";

export type Version =
  AllDataSchemasQuery["branches"][number]["versions"][number];
