import { Tabs, Typography } from "antd";
import { useTranslation } from "react-i18next";

import QueryPreview from "@/components/QueryPreview";
import Copy from "@/components/Copy";
import EventsTable from "@/components/EventsTable";
import type { QueryPreview as QueryType } from "@/types/queryPreview";
import type { Maybe, Request_Event_Logs } from "@/graphql/generated";

import styles from "./index.module.less";

import type { FC } from "react";

interface QueryDetailsProps {
  query: string;
  SQLString?: Maybe<string>;
  events: Request_Event_Logs[];
}

const { Title } = Typography;

const QueryDetails: FC<QueryDetailsProps> = ({ query, SQLString, events }) => {
  const { t } = useTranslation(["logs"]);

  const tabs = [
    {
      label: <span className={styles.btn}>{t("query.details.query_key")}</span>,
      key: "1",
      children: (
        <>
          <Title level={5}>{t("query.details.query_key")}</Title>
          <QueryPreview
            key="queryKey"
            {...JSON.parse(query)}
            withButton={false}
          />
        </>
      ),
    },
    {
      label: <span className={styles.btn}>{t("query.details.sql")}</span>,
      key: "2",
      children: (
        <>
          <Title level={5}>{t("query.details.sql")}</Title>
          <Copy key="sql" value={SQLString || ""} />
        </>
      ),
    },
    {
      label: <span className={styles.btn}>{t("query.details.query")}</span>,
      key: "3",
      children: (
        <>
          <Title level={5}>{t("query.details.query")}</Title>
          <Copy
            key="query"
            value={JSON.stringify(JSON.parse(query), null, 2)}
          />
        </>
      ),
    },
    {
      label: <span className={styles.btn}>{t("query.table.events")}</span>,
      key: "4",
      children: (
        <>
          <Title level={5}>{t("query.table.events")}</Title>
          <EventsTable events={events} />
        </>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={tabs} />;
};

export default QueryDetails;
