import React, { useMemo, useEffect } from "react";
import { set, getOr } from "unchanged";
import cx from "classnames";
import { message } from "antd";
import { useTable, useSortBy, UseSortByOptions } from "react-table";
import copy from "copy-to-clipboard";
import {
  Column,
  Table,
  SortDirection,
  defaultTableCellRenderer,
} from "react-virtualized";

import type { OrderByFn } from "react-table";
import type { ScrollEventData, TableCellProps } from "react-virtualized";
import type { FC, Requireable } from "react";

const COL_WIDTH = 200;

// set with unique ids inside https://stackoverflow.com/a/49821454
class SortBySet extends Set {
  reverseUniq(byKey: string) {
    const presentKeys: string[] = [];

    [...this.values()].reverse().forEach((value) => {
      if (presentKeys.includes(value[byKey])) {
        this.delete(value);
      } else {
        presentKeys.push(value[byKey]);
      }
    });
  }
}

export const cellRenderer = (args: TableCellProps, membersIndex: any) => {
  const { cellData, dataKey } = args;

  const format = membersIndex?.[dataKey]?.format;
  const meta = membersIndex?.[dataKey]?.meta;

  if (
    format?.toString().toLowerCase() === "link" ||
    format?.type?.toString()?.toLowerCase() === "link"
  ) {
    const label = typeof format === "object" ? format?.label : null;

    return (
      <a href={cellData?.toString()} target="_blank" rel="noopener noreferrer">
        {label?.toString() || cellData?.toString()}
      </a>
    );
  }

  if (
    format?.toString().toLowerCase() === "currency" ||
    format?.type?.toString()?.toLowerCase() === "currency"
  ) {
    const symbol = typeof meta === "object" ? meta?.currencySymbol : null;

    return (
      <>
        <span>{!!cellData?.toString() && (symbol || "$")}</span>
        <span>{cellData?.toString()}</span>
      </>
    );
  }

  if (format?.toString().toLowerCase() === "imageUrl") {
    return (
      <a href={cellData?.toString()} target="_blank" rel="noopener noreferrer">
        <img src={cellData.toString()} alt={cellData.toString()} />
      </a>
    );
  }

  if (format?.toString().toLowerCase() === "percent") {
    return (
      <>
        <span>{cellData?.toString()}</span>
        <span>{!!cellData?.toString() && "%"}</span>
      </>
    );
  }

  if (format?.toString().toLowerCase() === "id") {
    return <i>{cellData?.toString()}</i>;
  }

  return defaultTableCellRenderer(args);
};

interface VirtualTableProps {
  messages?: {
    type: string;
    text: string;
  }[];
  sortDisabled?: boolean;
  scrollToIndex?: number;
  cellRenderer?: typeof defaultTableCellRenderer;
  onScroll?: Requireable<(params: ScrollEventData) => void>;
  tableId?: string | null;
  className?: string;
  settings?: {
    hideIndexColumn: boolean;
  };
  footer?: (rows: object) => void;
  emptyDesc?: string;
  headerHeight?: number;
  rowHeight?: number;
  width?: number;
  height?: number;
  columns?: object[];
  data?: object[];
  sortBy?: {
    id: string;
    desc: boolean;
  }[];
  onSortUpdate?: (nextSortBy: SortBySet[]) => void;
  orderByFn?: OrderByFn<object>;
}

const VirtualTable: FC<VirtualTableProps> = ({
  sortBy = [],
  columns: userColumns,
  data = [],
  width = 300,
  height = 300,
  headerHeight = 30,
  rowHeight = 30,
  emptyDesc = "No Data",
  onSortUpdate = () => {},
  messages = [],
  sortDisabled = false,
  scrollToIndex = 0,
  tableId = null,
  cellRenderer: defaultCellRenderer = defaultTableCellRenderer,
  settings: { hideIndexColumn } = {
    hideIndexColumn: false,
  },
  className,
  onScroll,
  footer,
  orderByFn,
}) => {
  const defaultColumns = useMemo(
    () =>
      Object.keys(getOr({}, 0, data)).map((colId) => ({
        Header: colId,
        accessor: (row: any) => row[colId],
        id: colId,
      })),
    [data]
  );

  const columns: any = userColumns || defaultColumns;

  // Use the state and functions returned from useTable to build your UI
  const {
    rows,
    flatHeaders,
    // @ts-ignore
    setState,
  } = useTable(
    {
      columns,
      data,
      debug: false,
      // change orderByFn if you need sort from useSortBy
      orderByFn,
      initialState: {
        // @ts-ignore
        sortBy,
      },
    },
    useSortBy
  );

  useEffect(() => {
    setState((prev?: NonNullable<unchanged.Unchangeable | undefined>) =>
      set("sortBy", sortBy, prev)
    );
  }, [sortBy, setState]);

  return <>VirtualTable</>;
};

export default VirtualTable;
