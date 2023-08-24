import { Space } from "antd";
import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import PageHeader from "@/components/PageHeader";
import RequestInfo from "@/components/RequestInfo";
import QueryDetails from "@/components/QueryDetails";
import type { Request } from "@/types/request";
import type { QueryPreview } from "@/types/queryPreview";
import type { Event } from "@/types/event";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface QueryDetailedProps {
  request: Request;
  query: QueryPreview;
  SQLString: string;
  events: Event[];
}

const QueryDetailed: React.FC<QueryDetailedProps> = ({
  request,
  query,
  SQLString,
  events,
}) => {
  const { t } = useTranslation(["logs", "pages", "common"]);
  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:logs.query") }}
    >
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
          <RequestInfo {...request} />
          <QueryDetails query={query} SQLString={SQLString} events={events} />
        </Space>
      </Space>
    </BasicLayout>
  );
};

export default QueryDetailed;
