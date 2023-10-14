import { useEffect, useMemo } from "react";
import { set } from "unchanged";
import { useTrackedEffect } from "ahooks";
import { useSubscription } from "urql";

import equals from "@/utils/helpers/equals";
import useQuery from "@/hooks/useQuery";
import type {
  Request_Event_Logs_Order_By,
  Request_Logs,
} from "@/graphql/generated";

import type { SubscriptionHandler } from "urql";

const defaultFields = `
  id
  created_at
  updated_at
  request_id
  start_time
  end_time
  duration
  path
  user {
    display_name
  }
  datasource {
    name  
  }
`;

const currentLogQuery = `
  query ($id: uuid!) {
    request_logs_by_pk (id: $id) {
      ${defaultFields}
      request_event_logs(order_by: {timestamp: desc}) {
        id
        duration
        event
        path
        query
        query_key
        query_sql
        query_key_md5
        queue_prefix
        time_in_queue
        timestamp
        error
      }
    }
  }
`;

const allLogsQuery = `
  query ($offset: Int, $limit: Int, $where: request_logs_bool_exp, $order_by: [request_logs_order_by!]) {
    request_logs (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      ${defaultFields}
      request_event_logs(order_by: {timestamp: desc}) {
        path
        error
      }
      request_event_logs_aggregate {
        aggregate {
          count
        }
      }
    }
    request_logs_aggregate (where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const allLogsSubscription = `
  subscription ($offset: Int, $limit: Int, $where: request_logs_bool_exp, $order_by: [request_logs_order_by!]) {
    request_logs (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
    }
  }
`;

interface Params {
  from: any | null;
  to: any | null;
  sort: Request_Event_Logs_Order_By | null;
}

const getListVariables = (
  pagination: object,
  params: Params = {} as Params
) => {
  let res = {};

  if (pagination) {
    res = {
      ...res,
      ...pagination,
    };
  }

  if (params?.from) {
    res = set("where.created_at._gte", params.from.toISOString(), res);
  }

  if (params?.to) {
    res = set("where.created_at._lte", params.to.toISOString(), res);
  }

  if (params?.sort) {
    res = set("order_by.duration", params.sort, res);
  }

  if (pagination && !params.sort) {
    res = set("order_by.created_at", "desc", res);
  }

  return res;
};

const handleSubscription: SubscriptionHandler<any, Request_Logs> = (
  _: any,
  response
) => response;

interface Props {
  params?: Params;
  pagination?: object;
  rowId?: string | null;
  pauseQueryAll?: boolean;
}

const role = "user";
export default ({
  pauseQueryAll = false,
  rowId = null,
  pagination = { offset: 0, limit: 10 },
  params = {} as Params,
}: Props) => {
  const [subscription, execSubscription] = useSubscription(
    {
      query: allLogsSubscription,
      variables: getListVariables(pagination, params),
      pause: pauseQueryAll,
    },
    handleSubscription
  );

  const [currentData, execQueryCurrent] = useQuery<
    { id: string | null },
    Request_Logs
  >(
    {
      query: currentLogQuery,
      variables: { id: rowId },
      pause: true,
    },
    {
      requestPolicy: "cache-and-network",
      role,
    }
  );

  const [allData, execQueryAll] = useQuery(
    {
      query: allLogsQuery,
      variables: getListVariables(pagination, params),
      pause: pauseQueryAll,
    },
    {
      requestPolicy: "cache-and-network",
      role,
    }
  );

  useTrackedEffect(
    (changes, previousDeps, currentDeps) => {
      const prevData = previousDeps?.[0];
      const currData = currentDeps?.[0];

      let dataDiff = false;
      if (!prevData || !currData) {
        dataDiff = false;
      } else {
        dataDiff = !equals(prevData, currData);
      }

      if (dataDiff) {
        execQueryAll({ requestPolicy: "network-only" });
      }
    },
    [subscription.data, execQueryAll]
  );

  useEffect(() => {
    if (rowId) {
      execQueryCurrent();
    }
  }, [rowId, execQueryCurrent]);

  const allLogs = useMemo(
    () => allData.data?.request_logs || [],
    [allData.data]
  );
  const totalCount = useMemo(
    () => allData.data?.request_logs_aggregate?.aggregate?.count || 0,
    [allData.data]
  );
  const current = useMemo(
    () => currentData.data?.request_logs_by_pk || {},
    [currentData]
  );

  return {
    allLogs,
    current,
    totalCount,
    queries: {
      allData,
      execQueryAll,
      currentData,
      execQueryCurrent,
    },
    subscriptions: {
      subscription,
      execSubscription,
    },
  };
};