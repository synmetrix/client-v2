import type { Order_By } from "@/graphql/generated";

export interface QueryFilterForm {
  from: string | null;
  to: string | null;
  sort: Order_By | null;
  dataSourceId: string | null;
}
