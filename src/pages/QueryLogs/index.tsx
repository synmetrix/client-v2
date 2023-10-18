import { Space } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import QueryLogsTable from "@/components/QueryLogsTable";
import type { QueryLog } from "@/types/logs";
import AppLayout from "@/layouts/AppLayout";
import useLogs from "@/hooks/useLogs";
import useTableState from "@/hooks/useTableState";
import BouncingDotsLoader from "@/components/BouncingDotsLoader";
import type { Order_By, Request_Logs } from "@/graphql/generated";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface QueryLogsProps {
  logs: QueryLog[];
}

interface LogsFilter {
  from: moment.Moment | null;
  to: moment.Moment | null;
  sort: Order_By | null;
}

const defaultFilterState: LogsFilter = {
  from: moment().subtract(1, "days"),
  to: null,
  sort: null,
};

const QueryLogs: React.FC<QueryLogsProps> = () => {
  const { t } = useTranslation(["logs", "pages"]);

  const [filter, setFilter] = useState(defaultFilterState);

  const {
    tableState: { pageSize, currentPage, paginationVars },
    onPageChange,
  } = useTableState({});

  const {
    allLogs,
    totalCount,
    queries: { allData },
  } = useLogs({
    pagination: paginationVars,
    params: {
      ...filter,
    },
  });

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
          <BouncingDotsLoader loading={allData?.fetching}>
            <QueryLogsTable
              logs={allLogs as unknown as Request_Logs[]}
              pagination={{
                pageSize,
                current: currentPage,
                total: totalCount,
                onChange: (current) => onPageChange({ current }),
              }}
            />
          </BouncingDotsLoader>
        </div>
      </Space>
    </AppLayout>
  );
};

export default QueryLogs;
