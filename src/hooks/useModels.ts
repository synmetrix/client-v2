import { set } from "unchanged";
import { useTrackedEffect } from "ahooks";

import {
  Order_By,
  useDeleteSchemaMutation,
  useExportDataMutation,
  useCreateBranchMutation,
  useCreateVersionMutation,
  useSetDefaultBranchMutation,
  useAllDataSchemasQuery,
  useAllSchemasSubscription,
} from "@/graphql/generated";
import type {
  Maybe,
  AllSchemasSubscription,
  AllDataSchemasQueryVariables,
} from "@/graphql/generated";
import CurrentUserStore from "@/stores/CurrentUserStore";

import type { SubscriptionHandler } from "urql";

type Pagination = Omit<AllDataSchemasQueryVariables, "where" | "order_by">;
type Params = {
  dataSourceId?: string;
  teamId?: Maybe<string>;
  statuses?: string[];
};

interface Props {
  pauseQueryAll?: boolean;
  pagination?: Pagination;
  params?: Params;
  disableSubscription?: boolean;
}

const getListVariables = (
  pagination: Pagination,
  params: Params = {}
): AllDataSchemasQueryVariables => {
  let res: AllDataSchemasQueryVariables = {
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

  if (params?.dataSourceId) {
    res = set("where.datasource_id._eq", params.dataSourceId, res);
  }

  if (params?.teamId) {
    res = set("where.datasource.team_id._eq", params.teamId, res);
  }

  if (params?.statuses) {
    res = set("where.status._in", params.statuses, res);
  }

  return res;
};

const handleSubscription: SubscriptionHandler<
  AllSchemasSubscription,
  AllSchemasSubscription
> = (_, response) => response;

export default (props: Props = {}) => {
  const {
    pauseQueryAll,
    pagination = {},
    params = {},
    disableSubscription = true,
  } = props;

  const { currentTeam } = CurrentUserStore();

  const reqParams = {
    ...params,
    teamId: currentTeam?.id,
    statuses: ["active", "created"],
  };

  const [deleteMutation, execDeleteMutation] = useDeleteSchemaMutation();
  const [exportMutation, execExportMutation] = useExportDataMutation();
  const [createBranchMutation, execCreateBranchMutation] =
    useCreateBranchMutation();
  const [createVersionMutation, execCreateVersionMutation] =
    useCreateVersionMutation();
  const [setDefaultMutation, execSetDefaultMutation] =
    useSetDefaultBranchMutation();

  const [allData, execAllData] = useAllDataSchemasQuery({
    variables: getListVariables(pagination, reqParams),
    requestPolicy: "cache-and-network",
  });

  const [subscription, execSubscription] = useAllSchemasSubscription(
    {
      variables: getListVariables(pagination),
      pause: disableSubscription,
    },
    handleSubscription
  );

  useEffect(() => {
    if (!pauseQueryAll) {
      execAllData();
    }
  }, [pauseQueryAll, execAllData]);

  const all = useMemo(() => allData.data?.branches || [], [allData.data]);

  useTrackedEffect(
    (changes, prevDeps, currDeps) => {
      const prevTeam = prevDeps?.[0];
      const currTeam = currDeps?.[0];
      const currPause = currDeps?.[1];

      if (!currPause && prevTeam && currTeam && prevTeam !== currTeam) {
        execAllData();
      }
    },
    [currentTeam?.id, pauseQueryAll, execAllData]
  );

  return {
    all,
    queries: {
      allData,
      execAllData,
    },
    mutations: {
      deleteMutation,
      execDeleteMutation,
      exportMutation,
      execExportMutation,
      createBranchMutation,
      execCreateBranchMutation,
      createVersionMutation,
      execCreateVersionMutation,
      setDefaultMutation,
      execSetDefaultMutation,
    },
    subscription,
    execSubscription,
  };
};
