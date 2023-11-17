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
import type { Alert, RawAlert } from "@/types/alert";
import type { Report, RawReport } from "@/types/report";

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
      } as unknown as DataSourceInfo)
  );
};

const prepareAlertData = (data: RawAlert[] | undefined) => {
  if (!data?.length) return [];

  return data.map(
    (d) =>
      ({
        id: d.id,
        name: d.name,
        type: d.delivery_type,
        schedule: d.schedule,
        creator: {
          displayName: d.user.display_name,
          avatarUrl: d.user.avatar_url,
          email: d.user.account?.email,
        },
        exploration: d.exploration,
        updatedAt: d.updated_at,
        createdAt: d.created_at,
        triggerConfig: d.trigger_config,
        deliveryConfig: d.delivery_config,
      } as Alert)
  );
};

const prepareReportData = (data: RawReport[] | undefined) => {
  if (!data?.length) return [];

  return data.map(
    (d) =>
      ({
        id: d.id,
        name: d.name,
        type: d.delivery_type,
        schedule: d.schedule,
        creator: {
          displayName: d.user.display_name,
          avatarUrl: d.user.avatar_url,
          email: d.user.account?.email,
        },
        exploration: d.exploration,
        updatedAt: d.updated_at,
        createdAt: d.created_at,
        deliveryConfig: d.delivery_config,
      } as Report)
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

  const alerts = prepareAlertData(rawUserData?.alerts as RawAlert[]);
  const reports = prepareReportData(rawUserData?.reports as RawReport[]);

  return {
    id: rawUserData?.id,
    email: rawUserData?.account?.email,
    displayName: rawUserData?.display_name,
    avatarUrl: rawUserData?.avatar_url,
    teams,
    dataSources,
    alerts,
    reports,
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

    if (!accessToken) {
      window.location.href = "/auth/signin";
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
