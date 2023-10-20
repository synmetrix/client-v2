import { useEffect } from "react";
import { useSetState } from "ahooks";

import type { TablePaginationConfig } from "antd";

const defaultPageSize = 10;

interface Props {
  customPageSize?: number;
}

interface State {
  allTags: any[];
  loading: boolean;
  selectedTags: any[];
  paginationVars: {
    limit: number;
    offset: number;
  };
  pageSize: number;
  currentPage: number;
}

export default ({ customPageSize }: Props) => {
  const pageSize = customPageSize || defaultPageSize;

  const [tableState, updateTableState] = useSetState<State>({
    allTags: [],
    loading: false,
    selectedTags: [],
    currentPage: 1,
    paginationVars: {
      limit: pageSize,
      offset: 0,
    },
    pageSize,
  });

  useEffect(() => {
    updateTableState({
      paginationVars: {
        limit: pageSize,
        offset: pageSize * (tableState.currentPage - 1),
      },
    });
  }, [pageSize, tableState.currentPage, updateTableState]);

  const onPageChange = ({ current }: TablePaginationConfig) => {
    updateTableState({ currentPage: current || 1 });
  };

  return {
    tableState,
    onPageChange,
    updateTableState,
  };
};
