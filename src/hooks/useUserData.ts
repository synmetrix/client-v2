import { useEffect } from "react";
import { useDeepCompareEffect } from "ahooks";

import {
  useCurrentUserQuery,
  useSubCurrentUserSubscription,
} from "@/graphql/generated";
import AuthTokensStore from "@/stores/AuthTokensStore";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type {
  SubCurrentUserSubscription,
  CurrentUserQuery,
  Datasources,
} from "@/graphql/generated";
import type { User } from "@/types/user";
import type { DataSourceInfo } from "@/types/dataSource";
import { dbTiles } from "@/mocks/dataSources";
import type { Team } from "@/types/team";

export const prepareDataSourceData = (data: Datasources[] | undefined) => {
  if (!data?.length) return [];

  return data.map(
    (d) =>
      ({
        id: d?.id,
        name: d.name,
        dbParams: d.db_params,
        createdAt: d.created_at,
        updatedAt: d.updated_at,
        type: dbTiles.find((tile) => tile.value === d.db_type.toLowerCase()),
        branch: d.branches?.[0],
      } as DataSourceInfo)
  );
};

const prepareUserData = (
  rawData: SubCurrentUserSubscription | CurrentUserQuery
): User => {
  const rawUserData = rawData.users_by_pk || null;

  const teams =
    rawUserData?.members?.reduce((acc: Team[], m) => {
      const members = (m?.team?.members || []).map((member) => ({
        id: member.user.id,
        email: member?.user?.account?.email,
        avatarUrl: member.user.avatar_url,
        displayName: member.user.display_name,
        role: {
          id: member.member_roles?.[0]?.id,
          name: member.member_roles?.[0]?.team_role,
        },
      }));

      const newTeam = {
        ...m.team,
        role: m?.member_roles?.[0]?.team_role,
        updatedAt: m.team.updated_at,
        createdAt: m.team.created_at,
        members,
      };
      delete newTeam.created_at;
      delete newTeam.updated_at;

      acc.push(newTeam as unknown as Team);

      return acc;
    }, []) || [];

  const dataSources = prepareDataSourceData(
    rawUserData?.datasources as Datasources[]
  );

  return {
    id: rawUserData?.id,
    email: rawUserData?.account?.email,
    displayName: rawUserData?.display_name,
    avatarUrl: rawUserData?.avatar_url,
    teams,
    dataSources,
  };
};

export default () => {
  const { currentUser, setUserData } = CurrentUserStore();
  const { JWTpayload, accessToken } = AuthTokensStore();

  const userId = JWTpayload?.["x-hasura-user-id"];

  const [currentUserData, execQueryCurrentUser] = useCurrentUserQuery({
    variables: { id: userId },
    pause: true,
  });

  const [subscriptionData, useSubscription] = useSubCurrentUserSubscription({
    variables: { id: userId },
    pause: true,
  });

  useEffect(() => {
    if (currentUserData.data) {
      const newUserData = prepareUserData(currentUserData.data);
      setUserData(newUserData);
    }
  }, [currentUserData, setUserData]);

  useDeepCompareEffect(() => {
    if (accessToken && userId) {
      execQueryCurrentUser();
      useSubscription();
    }
  }, [accessToken, userId]);

  useEffect(() => {
    if (subscriptionData?.data) {
      const newUserData = prepareUserData(subscriptionData?.data);
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
