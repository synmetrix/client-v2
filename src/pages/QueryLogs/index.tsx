import { Space } from "antd";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import QueryLogsTable from "@/components/QueryLogsTable";
import type { QueryLog } from "@/types/logs";
import AppLayout from "@/layouts/AppLayout";
import useLogs from "@/hooks/useLogs";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface QueryLogsProps {
  logs: QueryLog[];
}

const QueryLogs: React.FC<QueryLogsProps> = () => {
  const { t } = useTranslation(["logs", "pages"]);

  const res = useLogs({ pagination: { limit: 10 } });
  console.log(JSON.stringify(res.allLogs));

  return null;

  // return (
  //   <AppLayout divider title={t("pages:logs.query")}>
  //     <Space className={styles.wrapper} direction="vertical" size={13}>
  //       <PageHeader
  //         title={t("query.title")}
  //         action={
  //           <Space size={10} align="start">
  //             <span className={styles.actionIcon}>
  //               <DocsIcon />
  //             </span>
  //             {t("query.action")}
  //           </Space>
  //         }
  //         actionProps={{
  //           className: styles.action,
  //         }}
  //       />
  //       <div className={styles.body}>
  //         <QueryLogsTable logs={logs} />
  //       </div>
  //     </Space>
  //   </AppLayout>
  // );
};

export default QueryLogs;
