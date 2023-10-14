import moment from "moment";
import { Space } from "antd";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import LogsTable from "@/components/LogsTable";
import StatusCard from "@/components/StatusCard";
import type { Log } from "@/types/logs";
import AppLayout from "@/layouts/AppLayout";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface AlertLogsProps {
  logs: Log[];
}

const defaultFilterState = {
  from: moment().subtract(1, "days"),
  to: null,
  sort: null,
};

const AlertsLogs: React.FC<AlertLogsProps> = ({ logs }) => {
  const { t } = useTranslation(["logs", "common"]);

  return (
    <AppLayout divider title={t("pages:logs.alerts")}>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={t("alerts.title")}
          action={
            <Space size={10} align="start">
              <span className={styles.actionIcon}>
                <DocsIcon />
              </span>
              {t("alerts.action")}
            </Space>
          }
          actionProps={{
            className: styles.action,
          }}
        />

        <Space className={styles.body} size={13} direction="vertical">
          <Space size={10}>
            <StatusCard
              status="success"
              count={logs.reduce(
                (count, l) => (l.status === "success" ? count + 1 : count),
                0
              )}
            />

            <StatusCard
              status="error"
              count={logs.reduce(
                (count, l) => (l.status === "error" ? count + 1 : count),
                0
              )}
            />
          </Space>

          <LogsTable logs={logs} />
        </Space>
      </Space>
    </AppLayout>
  );
};

export default AlertsLogs;
