import { Empty, Tabs, Typography } from "antd";
import { useTranslation } from "react-i18next";

import QueryPreview from "@/components/QueryPreview";
import Copy from "@/components/Copy";
import EventsTable from "@/components/EventsTable";
import type { Maybe, Request_Event_Logs } from "@/graphql/generated";
import type { QueryPreview as QueryPreviewType } from "@/types/queryPreview";

import styles from "./index.module.less";

import type { FC } from "react";

interface QueryDetailsProps {
  SQLString?: Maybe<string>;
  events: Request_Event_Logs[];
  query?: Maybe<QueryPreviewType>;
}

const { Title } = Typography;

const QueryDetails: FC<QueryDetailsProps> = ({ query, SQLString, events }) => {
  const { t } = useTranslation(["logs"]);

  const tabs = [
    {
      label: <span className={styles.btn}>{t("query.details.query_key")}</span>,
      key: "1",
      children: query ? (
        <>
          <Title level={5}>{t("query.details.query_key")}</Title>
          <QueryPreview
            key="queryKey"
            measures={query?.measures}
            dimensions={query?.dimensions}
            segments={query?.segments}
            timeDimensions={query?.timeDimensions}
            orders={query?.orders}
            withButton={false}
          />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ),
    },
    {
      label: <span className={styles.btn}>{t("query.details.sql")}</span>,
      key: "2",
      children: SQLString ? (
        <>
          <Title level={5}>{t("query.details.sql")}</Title>
          <Copy key="sql" value={SQLString} />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ),
    },
    {
      label: <span className={styles.btn}>{t("query.details.query")}</span>,
      key: "3",
      children: query ? (
        <>
          <Title level={5}>{t("query.details.query")}</Title>
          <Copy key="query" value={JSON.stringify(query, null, 2)} />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ),
    },
    {
      label: <span className={styles.btn}>{t("query.table.events")}</span>,
      key: "4",
      children: events ? (
        <>
          <Title level={5}>{t("query.table.events")}</Title>
          <EventsTable events={events} />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={tabs} />;
};

export default QueryDetails;
