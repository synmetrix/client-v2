import { Space, Spin } from "antd";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import QueryLogsTable from "@/components/QueryLogsTable";
import AppLayout from "@/layouts/AppLayout";
import useLogs from "@/hooks/useLogs";
import useTableState from "@/hooks/useTableState";
import useAppSettings from "@/hooks/useAppSettings";
import useLocation from "@/hooks/useLocation";
import type { Request_Logs } from "@/graphql/generated";
import QueryFilters from "@/components/QueryFilters";
import type { QueryFiltersForm } from "@/types/queryFilter";
import type { DataSourceInfo } from "@/types/dataSource";
import CurrentUserStore from "@/stores/CurrentUserStore";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

import type { TablePaginationConfig } from "antd";

interface QueryLogsProps {
  logs: Request_Logs[];
  logsCount: number;
  pageSize: number;
  currentPage: number;
  fetching: boolean;
  dataSources: DataSourceInfo[];
  onClickRow: (recordId: string) => void;
  filter: QueryFiltersForm;
  onFilterUpdate: (filters: QueryFiltersForm) => void;
  onPageChange: ({ current }: TablePaginationConfig) => void;
}

export const QueryLogs: React.FC<QueryLogsProps> = ({
  logs = [],
  logsCount = 0,
  currentPage,
  pageSize = 1,
  fetching = false,
  dataSources,
  filter,
  onFilterUpdate = () => {},
  onPageChange = () => {},
  onClickRow = () => {},
}) => {
  const { t } = useTranslation(["logs", "pages", "common"]);

  return (
    <AppLayout divider title={t("pages:logs.query")}>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={t("query.title")}
          action={
            <Space size={10} align="start">
              <span className={styles.actionIcon}>
                <DocsIcon />
              </span>
              {t("query.action")}
            </Space>
          }
          actionProps={{
            className: styles.action,
          }}
        />
        <div className={styles.body}>
          <Space size={27} className={styles.space} direction="vertical">
            <QueryFilters
              values={filter}
              dataSources={dataSources}
              onChange={onFilterUpdate}
            />
            <Spin spinning={fetching}>
              <QueryLogsTable
                logs={logs}
                onClickRow={onClickRow}
                pagination={{
                  pageSize,
                  current: currentPage,
                  total: logsCount,
                  onChange: (current) => onPageChange({ current }),
                  showSizeChanger: false,
                }}
              />
            </Spin>
          </Space>
        </div>
      </Space>
    </AppLayout>
  );
};

const QueryLogsWrapper = () => {
  const { teamData, currentTeam } = CurrentUserStore();
  const { withAuthPrefix } = useAppSettings();
  const [location, setLocation] = useLocation();
  const basePath = withAuthPrefix("/logs/query");

  const {
    dataSourceId = null,
    from = null,
    to = null,
    sort = null,
  } = location.query as unknown as QueryFiltersForm;
  const filter: QueryFiltersForm = { dataSourceId, from, to, sort };

  const dataSources = useMemo(
    () => teamData?.dataSources || [],
    [teamData]
  ) as DataSourceInfo[];

  const {
    tableState: { pageSize, currentPage, paginationVars },
    onPageChange,
  } = useTableState({ customPageSize: 10 });

  const {
    allLogs,
    totalCount,
    queries: { allData },
  } = useLogs({
    pagination: paginationVars,
    params: {
      teamId: currentTeam?.id,
      ...filter,
    },
  });

  const onClickRow = (recordId: string) =>
    setLocation(`${basePath}/${recordId}`);

  const onFilterUpdate = (filters: QueryFiltersForm) => {
    setLocation(
      `${basePath}?${new URLSearchParams(
        Object.entries(filters).filter((f) => f[1])
      )}`
    );
  };

  return (
    <QueryLogs
      logs={allLogs as Request_Logs[]}
      logsCount={totalCount}
      currentPage={currentPage}
      pageSize={pageSize}
      fetching={allData.fetching}
      dataSources={dataSources}
      filter={filter}
      onFilterUpdate={onFilterUpdate}
      onPageChange={onPageChange}
      onClickRow={onClickRow}
    />
  );
};

export default QueryLogsWrapper;
