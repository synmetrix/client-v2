import { useEffect } from "react";

import {
  useCurrentUserLazyQuery,
  useSubCurrentUserSubscription,
} from "@/graphql/generated";
import AuthTokensStore from "@/stores/AuthTokensStore";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type {
  SubCurrentUserSubscription,
  CurrentUserQuery,
} from "@/graphql/generated";
import type { User } from "@/types/user";
import type { DataSourceInfo } from "@/types/dataSource";
import { dbTiles } from "@/mocks/dataSources";

const prepareUserData = (
  rawData: SubCurrentUserSubscription | CurrentUserQuery
): User => {
  const rawUserData = rawData.users_by_pk || null;
  const teams = (rawUserData?.members || []).map((m) => m.team);
  const dataSources = (rawUserData?.datasources || []).map((d) => {
    const dataSource = {
      id: d?.id,
      name: d.name,
      db_params: d.db_params,
      createdAt: d.created_at,
      updatedAt: d.updated_at,
      type: dbTiles?.find((tile) => tile.value === d.db_type.toLowerCase()),
    };

    return dataSource as DataSourceInfo;
  });

  return {
    id: rawUserData?.id,
    displayName: rawUserData?.display_name,
    avatarUrl: rawUserData?.avatar_url,
    teams,
    dataSources,
  };
};

export default () => {
  const { currentUser, setUserData } = CurrentUserStore.getState();
  const { accessToken, JWTpayload } = AuthTokensStore.getState();

  const userId = JWTpayload?.["x-hasura-user-id"];

  const [execQueryCurrentUser, currentUserData] = useCurrentUserLazyQuery({
    variables: { id: userId },
  });

  const { data: subscriptionData } = useSubCurrentUserSubscription({
    variables: { id: userId },
  });

  useEffect(() => {
    const userData = currentUserData?.data;

    if (userData) {
      const newUserData = prepareUserData(userData);
      setUserData(newUserData);
    }
  }, [currentUserData?.data, setUserData]);

  useEffect(() => {
    if (accessToken) {
      execQueryCurrentUser();
    }
  }, [accessToken, execQueryCurrentUser]);

  useEffect(() => {
    if (subscriptionData?.users_by_pk) {
      const newUserData = prepareUserData(subscriptionData);
      setUserData(newUserData);
    }
  }, [setUserData, subscriptionData]);

  return {
    currentUser,
    queries: {
      currentUserData,
      execQueryCurrentUser,
    },
  };
};
