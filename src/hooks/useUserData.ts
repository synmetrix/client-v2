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
} from "@/graphql/generated";
import type { User } from "@/types/user";
import type { Member, TeamRole } from "@/types/team";
import type { DataSourceInfo } from "@/types/dataSource";
import { dbTiles } from "@/mocks/dataSources";

const prepareUserData = (
  rawData: SubCurrentUserSubscription | CurrentUserQuery
): User => {
  const rawUserData = rawData.users_by_pk || null;

  const teams =
    rawUserData?.members?.reduce((acc, m) => {
      const memberTeamId = m.team.id;

      const memberData = {
        id: m.user.id,
        email: m?.user?.account?.email,
        avatarUrl: m.user.avatar_url,
        displayName: m.user.display_name,
        role: {
          id: m.member_roles?.[0]?.id,
          name: m.member_roles?.[0]?.team_role as unknown,
        } as TeamRole,
      } as Member;

      const teamIndex = acc.findIndex((t) => t.id === memberTeamId);
      if (teamIndex !== -1) {
        const teamMembers = acc[teamIndex].members;
        teamMembers.push(memberData);
      } else {
        const newTeam = {
          ...m.team,
          updatedAt: m.team.updated_at,
          createdAt: m.team.created_at,
          members: [memberData],
        };
        delete newTeam.created_at;
        delete newTeam.updated_at;

        acc.push(newTeam);
      }

      return acc;
    }, []) || [];

  const dataSources = (rawUserData?.datasources || []).map((d) => {
    const dataSource = {
      id: d?.id,
      name: d.name,
      dbParams: d.db_params,
      createdAt: d.created_at,
      updatedAt: d.updated_at,
      type: dbTiles?.find((tile) => tile.value === d.db_type.toLowerCase()),
    };

    return dataSource as DataSourceInfo;
  });

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
