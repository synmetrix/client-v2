import { Space } from "antd";
import { useTranslation } from "react-i18next";

import AppLayout from "@/layouts/AppLayout";
import PageHeader from "@/components/PageHeader";
import QueryLogsTable from "@/components/QueryLogsTable";
import QueryFilter from "@/components/QueryFilter";
import type { QueryLog } from "@/types/logs";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface QueryLogsProps {
  logs: QueryLog[];
  dataSources: string[];
}

const QueryLogs: React.FC<QueryLogsProps> = ({ logs, dataSources }) => {
  const { t } = useTranslation(["logs", "pages"]);
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
        <Space className={styles.body} direction="vertical" size={17}>
          <QueryFilter dataSources={dataSources} onChange={console.log} />
          <QueryLogsTable logs={logs} />
        </Space>
      </Space>
    </AppLayout>
  );
};

export default QueryLogs;
