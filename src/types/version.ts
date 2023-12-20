import type { CurrentVersionQuery } from "@/graphql/generated";

export type Version = CurrentVersionQuery["versions"][number];
