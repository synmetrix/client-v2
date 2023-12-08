import { useEffect, useMemo } from "react";
import { set } from "unchanged";
import { useTrackedEffect } from "ahooks";

import type {
  AllDataSourcesSubscription,
  DatasourcesQueryVariables,
  Maybe,
} from "@/graphql/generated";
import {
  useDatasourcesQuery,
  Order_By,
  useCreateDataSourceMutation,
  useDeleteDataSourceMutation,
  useCheckConnectionMutation,
  useGenDataSchemasMutation,
  useRunSourceSqlQueryMutation,
  useValidateDataSourceMutation,
  useUpdateDataSourceMutation,
  useFetchMetaQuery,
  useAllDataSourcesSubscription,
  useCurrentDataSourceQuery,
  useFetchTablesQuery,
} from "@/graphql/generated";
import CurrentUserStore from "@/stores/CurrentUserStore";

import type { SubscriptionHandler } from "urql";

type Pagination = Omit<any, "where" | "order_by">;
type Params = {
  editId?: string;
  teamId?: Maybe<string>;
};

const getListVariables = (
  pagination: Pagination,
  params: Params = {}
): DatasourcesQueryVariables => {
  let res: DatasourcesQueryVariables = {
    order_by: {
      created_at: Order_By.Desc,
    },
  };

  if (pagination) {
    res = {
      ...res,
      ...pagination,
    };
  }

  if (params?.teamId) {
    res = set("where.team_id._eq", params.teamId, res);
  }

  return res;
};

const handleSubscription: SubscriptionHandler<
  AllDataSourcesSubscription,
  AllDataSourcesSubscription
> = (_, response) => response;

interface Props {
  pauseQueryAll: boolean;
  pagination?: Pagination;
  params?: Params;
  disableSubscription?: boolean;
}

export default ({
  pauseQueryAll,
  pagination = {},
  params = {},
  disableSubscription = true,
}: Props) => {
  const { editId } = params;
  const { currentTeam } = CurrentUserStore();

  const reqParams = {
    ...params,
    teamId: currentTeam?.id,
  };

  const [createMutation, execCreateMutation] = useCreateDataSourceMutation();
  const [updateMutation, execUpdateMutation] = useUpdateDataSourceMutation();
  const [deleteMutation, execDeleteMutation] = useDeleteDataSourceMutation();
  const [checkMutation, execCheckMutation] = useCheckConnectionMutation();
  const [genSchemaMutation, execGenSchemaMutation] =
    useGenDataSchemasMutation();
  const [runQueryMutation, execRunQueryMutation] =
    useRunSourceSqlQueryMutation();
  const [validateMutation, execValidateMutation] =
    useValidateDataSourceMutation();

  const [allData, doQueryAll] = useDatasourcesQuery({
    pause: true,
    variables: getListVariables(pagination, reqParams),
    requestPolicy: "cache-and-network",
  });

  const [metaData, execQueryMeta] = useFetchMetaQuery({
    pause: true,
    variables: {
      datasource_id: editId,
    },
    requestPolicy: "cache-and-network",
  });

  const [subscription, execSubscription] = useAllDataSourcesSubscription(
    {
      variables: getListVariables(pagination),
      pause: disableSubscription,
    },
    handleSubscription
  );

  useEffect(() => {
    if (!pauseQueryAll) {
      doQueryAll();
    }
  }, [pauseQueryAll, doQueryAll]);

  useTrackedEffect(
    (changes, prevDeps, currDeps) => {
      const prevTeam = prevDeps?.[0];
      const currTeam = currDeps?.[0];
      const currPause = currDeps?.[1];

      if (!currPause && prevTeam && currTeam && prevTeam !== currTeam) {
        doQueryAll();
      }
    },
    [currentTeam?.id, pauseQueryAll, doQueryAll]
  );

  const all = useMemo(() => allData.data?.datasources || [], [allData.data]);
  const totalCount = useMemo(
    () => allData.data?.datasources_aggregate?.aggregate?.count,
    [allData.data]
  );

  const [currentData, execQueryCurrent] = useCurrentDataSourceQuery({
    variables: {
      id: editId,
    },
    pause: true,
    requestPolicy: "cache-and-network",
  });

  const current = useMemo(
    () => currentData.data?.datasources_by_pk || {},
    [currentData.data]
  );
  const currentMeta = useMemo(
    () => metaData.data?.fetch_meta?.cubes || [],
    [metaData.data]
  );

  useEffect(() => {
    if (editId) {
      execQueryCurrent();
    }
  }, [editId, execQueryCurrent]);

  const [tablesData, execQueryTables] = useFetchTablesQuery({
    variables: { id: editId },
    pause: true,
    requestPolicy: "cache-and-network",
  });

  return {
    all,
    totalCount,
    current,
    currentMeta,
    queries: {
      allData,
      execQueryAll: doQueryAll,
      currentData,
      execQueryCurrent,
      tablesData,
      execQueryTables,
      metaData,
      execQueryMeta,
    },
    mutations: {
      createMutation,
      execCreateMutation,
      deleteMutation,
      execDeleteMutation,
      updateMutation,
      execUpdateMutation,
      checkMutation,
      execCheckMutation,

      runQueryMutation,
      execRunQueryMutation,
      validateMutation,
      execValidateMutation,
      genSchemaMutation,
      execGenSchemaMutation,
    },
    subscription,
    execSubscription,
  };
};
