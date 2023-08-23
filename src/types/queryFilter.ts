import type { Sort } from "./sort";

export interface QueryFilterForm {
  dataSource: string;
  date: {
    from: string;
    to: string;
  };
  sort: Sort;
}
