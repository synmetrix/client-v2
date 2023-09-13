import React, { useMemo, useEffect } from "react";
import {
  MoreOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { set, getOr } from "unchanged";
import cn from "classnames";
import { MenuProps, message } from "antd";
import { useTable, useSortBy, UseSortByOptions } from "react-table";
import copy from "copy-to-clipboard";
import {
  Column,
  Table,
  SortDirection,
  defaultTableCellRenderer,
} from "react-virtualized";

import PopoverButton from "@/components/PopoverButton";

import styles from "./index.module.less";

import type { OrderByFn } from "react-table";
import type {
  ScrollEventData,
  TableCellDataGetter,
  TableCellProps,
  TableHeaderRenderer,
} from "react-virtualized";
import type { FC, Requireable, MouseEvent } from "react";

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

  const tableWidth = flatHeaders.length * COL_WIDTH;

  useEffect(() => {
    setState((prev?: NonNullable<unchanged.Unchangeable | undefined>) =>
      set("sortBy", sortBy, prev)
    );
  }, [sortBy, setState]);

  const headerRenderer: TableHeaderRenderer = ({ label, columnData }) => {
    const { sortDirection, onSortChange, columnId, granularity } = columnData;
    let humanLabel = label;

    if (granularity) {
      humanLabel = `${label} (by ${granularity})`;
    }

    const children = [
      <span
        className={"headerColumn"}
        key="label"
        title={typeof humanLabel === "string" ? humanLabel : undefined}
      >
        {humanLabel}
      </span>,
    ];

    let icon = <MoreOutlined />;
    if (sortDirection) {
      icon =
        sortDirection === SortDirection.DESC ? (
          <SortDescendingOutlined />
        ) : (
          <SortAscendingOutlined />
        );
    }

    const onClickSort = (sortDir: string | null) => {
      onSortChange(sortDir, columnId);
      return false;
    };

    const routes: MenuProps["items"] = [
      {
        key: "1",
        onClick: () => onClickSort(SortDirection.ASC),
        title: "Sort ASC",
      },
      {
        key: "2",
        onClick: () => onClickSort(SortDirection.DESC),
        title: "Sort DESC",
      },
      {
        key: "3",
        onClick: () => onClickSort(null),
        title: "Don't sort",
      },
    ];

    if (sortDisabled) {
      return children;
    }

    children.push(
      <PopoverButton
        key="dropdown"
        popoverType="dropdown"
        icon={icon}
        trigger={["click"]}
        menu={{ items: routes }}
      />
    );

    return children;
  };

  const cellDataGetter: TableCellDataGetter = ({ rowData, dataKey }) => {
    let val = rowData?.original?.[dataKey];

    if (typeof val === "object") {
      try {
        val = JSON.stringify(val);
      } catch (err) {
        console.error(`Can't stringify "${dataKey}" value: ${val}`);
        console.error(err);
      }
    }

    return val;
  };

  const onSortChange = (direction: string, columnId: string) => {
    setState((prev?: NonNullable<unchanged.Unchangeable | undefined>) => {
      const sortBySet = new SortBySet(prev?.sortBy);

      if (direction) {
        sortBySet.add({
          id: columnId,
          desc: direction === SortDirection.DESC,
        });

        sortBySet.reverseUniq("id");
      } else {
        sortBySet.forEach((value) => {
          if (value.id === columnId) {
            sortBySet.delete(value);
          }
        });
      }

      const nextSortBy = [...sortBySet];
      onSortUpdate(nextSortBy);

      return set("sortBy", nextSortBy, prev);
    });
  };

  const noRowsRenderer = () => {
    return (
      <div className={styles.noRows} style={{ height: rowHeight }}>
        No rows
      </div>
    );
  };

  return <>VirtualTable</>;
};

export default VirtualTable;
