import { Space } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import QueryLogsTable from "@/components/QueryLogsTable";
import type { QueryLog } from "@/types/logs";
import SidebarLayout from "@/layouts/SidebarLayout";
import useLogs from "@/hooks/useLogs";
import useTableState from "@/hooks/useTableState";
import useAppSettings from "@/hooks/useAppSettings";
import BouncingDotsLoader from "@/components/BouncingDotsLoader";
import useLocation from "@/hooks/useLocation";
import type { Request_Logs } from "@/graphql/generated";
import QueryFilter from "@/components/QueryFilter";
import useUserData from "@/hooks/useUserData";
import type { QueryFilterForm } from "@/types/queryFilter";
import SidebarHeader from "@/components/SidebarHeader";
import SidebarMenu from "@/components/SidebarMenu";
import { logsMenuItems } from "@/mocks/sidebarMenu";

import LogsIcon from "@/assets/logs-active.svg";
import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface QueryLogsProps {
  logs: QueryLog[];
}

const defaultFilterState: QueryFilterForm = {
  from: moment().subtract(1, "days").toISOString(),
  to: null,
  sort: null,
  dataSourceId: null,
};

const QueryLogs: React.FC<QueryLogsProps> = () => {
  const { t } = useTranslation(["logs", "pages", "common"]);
  const [filter, setFilter] = useState(defaultFilterState);

  const { withAuthPrefix } = useAppSettings();
  const [, setLocation] = useLocation();
  const basePath = withAuthPrefix("/logs/requests");

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

  const {
    currentUser: { dataSources },
  } = useUserData();

  const onClickRow = (recordId: string) =>
    setLocation(`${basePath}/${recordId}`);

  return (
    <SidebarLayout
      divider
      title={t("pages:logs.query")}
      subTitle={
        <SidebarHeader icon={<LogsIcon />} title={t("common:words.logs")} />
      }
      items={<SidebarMenu items={logsMenuItems} />}
    >
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
            <Space size={27} direction="vertical">
              <QueryFilter
                defaultValues={defaultFilterState}
                values={filter}
                dataSources={dataSources}
                onChange={setFilter}
              />
              <QueryLogsTable
                logs={allLogs as unknown as Request_Logs[]}
                onClickRow={onClickRow}
                pagination={{
                  pageSize,
                  current: currentPage,
                  total: totalCount,
                  onChange: (current) => onPageChange({ current }),
                }}
              />
            </Space>
          </BouncingDotsLoader>
        </div>
      </Space>
    </SidebarLayout>
  );
};

export default QueryLogs;
