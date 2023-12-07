import { useEffect, useMemo } from "react";
import { set } from "unchanged";
import { useTrackedEffect } from "ahooks";

import equals from "@/utils/helpers/equals";
import {
  useAllLogsQuery,
  useCurrentLogQuery,
  useSubAllLogsSubscription,
} from "@/graphql/generated";
import type {
  AllLogsQueryVariables,
  Request_Logs,
  SubAllLogsSubscription,
} from "@/graphql/generated";
import type { QueryFiltersForm } from "@/types/queryFilter";

import type { SubscriptionHandler } from "urql";

type Pagination = Omit<AllLogsQueryVariables, "where" | "order_by">;

const getListVariables = (
  pagination: Pagination,
  params: any = {}
): AllLogsQueryVariables => {
  let res = {};

  if (pagination) {
    res = {
      ...res,
      ...pagination,
    };
  }

  if (params?.from) {
    res = set("where.created_at._gte", params.from, res);
  }

  if (params?.to) {
    res = set("where.created_at._lte", params.to, res);
  }

  if (params?.dataSourceId) {
    res = set("where.datasource_id._eq", params.dataSourceId, res);
  }

  if (params?.sort) {
    res = set("order_by.duration", params.sort, res);
  }

  if (params?.teamId) {
    res = set("where.datasource.team_id._eq", params.teamId, res);
  }

  if (pagination && !params.sort) {
    res = set("order_by.created_at", "desc", res);
  }

  return res;
};

const handleSubscription: SubscriptionHandler<
  SubAllLogsSubscription,
  SubAllLogsSubscription
> = (_, response) => response;

interface Props {
  pauseQueryAll?: boolean;
  rowId?: string | null;
  params?: Partial<QueryFiltersForm>;
  pagination?: Partial<Pagination>;
}

export default ({
  pauseQueryAll = false,
  rowId = null,
  pagination = {},
  params = {},
}: Props) => {
  const [subscription, execSubscription] = useSubAllLogsSubscription(
    {
      variables: getListVariables(pagination, params),
      pause: pauseQueryAll,
    },
    handleSubscription
  );

  const [currentData, execQueryCurrent] = useCurrentLogQuery({
    variables: { id: rowId },
    pause: true,
    requestPolicy: "cache-and-network",
  });

  const [allData, execQueryAll] = useAllLogsQuery({
    variables: getListVariables(pagination, params),
    pause: pauseQueryAll,
    requestPolicy: "cache-and-network",
  });

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
    () => (currentData.data?.request_logs_by_pk || {}) as Partial<Request_Logs>,
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
