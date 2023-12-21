import { Alert, Empty, Space } from "antd";
import { useParams } from "@vitjs/runtime";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import RequestInfo from "@/components/RequestInfo";
import QueryDetails from "@/components/QueryDetails";
import PageLoading from "@/components/PageLoading";
import AppLayout from "@/layouts/AppLayout";
import type { QueryState } from "@/types/queryState";
import {
  useCurrentLogQuery,
  type Maybe,
  type Request_Event_Logs,
  type Request_Logs,
} from "@/graphql/generated";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface QueryDetailedProps {
  request: Partial<Request_Logs>;
  query: Maybe<QueryState>;
  SQLString?: Maybe<string>;
  events: Request_Event_Logs[];
  queryKey?: Maybe<string>;
  fetching?: boolean;
  error?: Maybe<string>;
}

export const QueryDetailed: React.FC<QueryDetailedProps> = ({
  error,
  request,
  fetching,
  query,
  SQLString,
  queryKey,
  events,
}) => {
  const { t } = useTranslation(["logs", "pages", "common"]);

  if (!request?.request_id) {
    return (
      <PageLoading spinning={fetching}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </PageLoading>
    );
  }

  return (
    <AppLayout divider title={t("pages:logs.query")}>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={`${t("query.request")}: ${request.id}`}
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

        <Space className={styles.body} size={13} direction="vertical">
          {error && <Alert message={error} type="error" />}
          <RequestInfo request={request} queryKey={queryKey} />
          <QueryDetails query={query} SQLString={SQLString} events={events} />
        </Space>
      </Space>
    </AppLayout>
  );
};

const QueryDetailedWrapper = () => {
  const { id } = useParams();

  const [currentData, execQueryCurrent] = useCurrentLogQuery({
    variables: { id },
    pause: true,
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (id) {
      execQueryCurrent();
    }
  }, [id, execQueryCurrent]);

  const current = useMemo(
    () => (currentData.data?.request_logs_by_pk || {}) as Partial<Request_Logs>,
    [currentData]
  );

  const { events, querySql, queryKeyMd5, error } = useMemo(() => {
    let eventLogs = current?.request_event_logs || [];
    eventLogs = eventLogs.map((e, i) => {
      const curTimestamp: string = eventLogs?.[i]?.timestamp;
      const prevTimestamp: string =
        eventLogs?.[i + 1]?.timestamp || curTimestamp;

      const duration = Date.parse(curTimestamp) - Date.parse(prevTimestamp);

      return {
        ...e,
        duration,
      };
    });

    let key = current?.request_event_logs?.find((e) => e.query_key)?.query_key;

    if (key) {
      try {
        key = JSON.parse(key);
      } catch (err) {
        console.error(err);
      }
    }

    return {
      events: eventLogs,
      error: eventLogs?.find((e) => e?.error)?.error,
      querySql: eventLogs?.find((e) => e?.query_sql)?.query_sql,
      queryKey: key,
      queryKeyMd5: current?.request_event_logs?.find((e) => e.query_key_md5)
        ?.query_key_md5,
    };
  }, [current.request_event_logs]);

  const query: string = events?.find((e) => e?.query)?.query;

  return (
    <QueryDetailed
      request={current}
      SQLString={querySql}
      events={events}
      queryKey={queryKeyMd5}
      query={query && JSON.parse(query)}
      fetching={currentData.fetching}
      error={error}
    />
  );
};

export default QueryDetailedWrapper;
