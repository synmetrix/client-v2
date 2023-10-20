import { useMemo } from "react";
import {
  MoreOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { getOr } from "unchanged";
import cn from "classnames";
import { Alert, Empty, Tooltip, message } from "antd";
import { useTable, useSortBy } from "react-table";
import copy from "copy-to-clipboard";
import {
  Column,
  Table,
  SortDirection,
  defaultTableCellRenderer,
} from "react-virtualized";
import "react-virtualized/styles.css";

import BouncingDotsLoader from "@/components/BouncingDotsLoader";
import PopoverButton from "@/components/PopoverButton";
import type { ErrorMessage } from "@/types/errorMessage";
import type { SortBy } from "@/types/sort";
import type { LoadingProgress } from "@/types/loading";
import type { QuerySettings } from "@/types/querySettings";

import styles from "./index.module.less";

import type { OrderByFn } from "react-table";
import type {
  ScrollEventData,
  TableCellDataGetter,
  TableCellProps,
  TableCellRenderer,
  TableHeaderRenderer,
} from "react-virtualized";
import type { FC, ReactNode } from "react";
import type { MenuProps } from "antd";

const COL_WIDTH = 200;

// set with unique ids inside https://stackoverflow.com/a/49821454
export class SortBySet extends Set {
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
  sortBy?: SortBy[];
  messages?: ErrorMessage[];
  onSortUpdate?: (nextSortBy: SortBySet[]) => void;
  data?: object[];
  columns?: object[];
  width?: number;
  height?: number;
  headerHeight?: number;
  rowHeight?: number;
  loading: boolean;
  loadingProgress: LoadingProgress;
  emptyDesc?: ReactNode;
  orderByFn?: OrderByFn<object>;
  footer?: (rows: object[]) => void;
  sortDisabled?: boolean;
  scrollToIndex?: number;
  cellRenderer?: TableCellRenderer;
  onScroll?: (params: { rowHeight: number } & ScrollEventData) => void;
  tableId?: string;
  className?: string;
  settings?: QuerySettings;
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
  tableId,
  cellRenderer: defaultCellRenderer = defaultTableCellRenderer,
  settings: { hideIndexColumn } = {
    hideIndexColumn: false,
  },
  className,
  onScroll,
  footer,
  orderByFn,
  loading,
}) => {
  const defaultColumns = useMemo(
    () =>
      Object.keys(getOr({}, 0, data)).map((colId) => {
        const col: any = {
          Header: colId,
          accessor: (row: any) => row[colId],
          id: colId,
        };

        if (orderByFn) col.sortType = orderByFn;
        return col;
      }),
    [data, orderByFn]
  );

  const columns: any = userColumns || defaultColumns;

  const {
    rows,
    flatHeaders,
    state,
    //@ts-ignore
    setSortBy,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const tableWidth = flatHeaders.length * COL_WIDTH;

  const headerRenderer: TableHeaderRenderer = ({ label, columnData }) => {
    const { sortDirection, onSortChange, columnId, granularity } = columnData;
    let humanLabel = label;

    if (granularity) {
      humanLabel = `${label} (by ${granularity})`;
    }

    const children = [
      <Tooltip
        key="label"
        title={typeof humanLabel === "string" ? humanLabel : null}
      >
        <span className={"headerColumn"}>{humanLabel}</span>
      </Tooltip>,
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
    };

    const routes: MenuProps["items"] = [
      {
        key: "1",
        onClick: () => onClickSort(SortDirection.ASC),
        label: "Sort ASC",
      },
      {
        key: "2",
        onClick: () => onClickSort(SortDirection.DESC),
        label: "Sort DESC",
      },
      {
        key: "3",
        onClick: () => onClickSort(null),
        label: "Don't sort",
      },
    ];

    if (sortDisabled) {
      return children;
    }

    children.push(
      <PopoverButton
        key="dropdown"
        popoverType="dropdown"
        buttonProps={{
          type: "link",
          className: styles.dropdownBtn,
        }}
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
    //@ts-ignore
    const sortBySet = new SortBySet(state.sortBy);

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

    return setSortBy(nextSortBy);
  };

  const noRowsRenderer = () => {
    return (
      <div className={styles.noRows} style={{ height: rowHeight }}>
        No rows
      </div>
    );
  };

  const internalCellRenderer: TableCellRenderer = (args) => {
    const { cellData } = args;

    const onDoubleClick = () => {
      const copied = copy(cellData);

      if (copied) {
        message.success("Column value copied to the clipboard");
      }
    };

    return (
      <Tooltip title={cellData?.toString()}>
        <span onDoubleClick={onDoubleClick}>{defaultCellRenderer(args)}</span>
      </Tooltip>
    );
  };

  if (loading) return <BouncingDotsLoader loading />;

  if (!columns.length && !rows.length)
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyDesc} />
    );

  return (
    <>
      {messages.map((msg) => (
        <Alert
          className={styles.alert}
          key={msg.text}
          type={msg.type}
          message={msg.text}
        />
      ))}
      <div
        className={cn(className)}
        style={{
          width: `min(100%, ${width})`,
          height: height + 50,
          overflow: "auto",
        }}
      >
        <Table
          id={tableId}
          className={cn(styles.table, tableId && styles.minWidth)}
          width={tableWidth}
          height={height}
          headerHeight={headerHeight}
          rowHeight={rowHeight}
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
          noRowsRenderer={noRowsRenderer}
          overscanRowCount={3}
          onScroll={(values) => onScroll?.({ ...values, rowHeight })}
          scrollToAlignment="start"
          scrollToIndex={scrollToIndex}
        >
          {!hideIndexColumn && (
            <Column
              className={styles.indexColumn}
              label="Index"
              cellDataGetter={({ rowData }) => rowData.index + 1}
              dataKey="index"
              width={60}
            />
          )}
          {flatHeaders.map((col) => {
            const [cube, field, granularity] = col.id.split(".");
            const columnMemberId = `${cube}.${field}`;

            const value = col.render("Header");

            const colSortConfig = sortBy.find(
              (sortItem) => sortItem.id === col.id
            );

            const sortDirection =
              !!colSortConfig &&
              ((colSortConfig.desc && SortDirection.DESC) || SortDirection.ASC);

            return (
              <Column
                key={col.id}
                label={value}
                dataKey={col.id}
                width={COL_WIDTH}
                headerRenderer={headerRenderer}
                cellDataGetter={cellDataGetter}
                cellRenderer={internalCellRenderer}
                columnData={{
                  memberId: columnMemberId,
                  columnId: col.id,
                  onSortChange,
                  sortDirection,
                  granularity,
                }}
              />
            );
          })}
        </Table>
      </div>
      {footer?.(rows)}
    </>
  );
};

export default VirtualTable;
