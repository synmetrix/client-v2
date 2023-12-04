import { useEffect } from "react";
import { useDeepCompareEffect } from "ahooks";

import {
  useCurrentUserQuery,
  useSubCurrentUserSubscription,
  useCreateTeamMutation,
  useTeamDataQuery,
  useSubTeamDataSubscription,
} from "@/graphql/generated";
import AuthTokensStore from "@/stores/AuthTokensStore";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type {
  SubCurrentUserSubscription,
  SubTeamDataSubscription,
  CurrentUserQuery,
  Datasources,
  TeamDataQuery,
  Members as MembersType,
} from "@/graphql/generated";
import type { User, UserData } from "@/types/user";
import type { DataSourceInfo } from "@/types/dataSource";
import { dbTiles } from "@/mocks/dataSources";
import { Roles } from "@/types/team";
import type { AccessList, Member, Team, TeamRole } from "@/types/team";
import type { Alert, RawAlert } from "@/types/alert";
import type { Report, RawReport } from "@/types/report";

const DEFAULT_TEAM_NAME = "Default team";

const prepareMembersData = (rawMembers: MembersType[]) => {
  const members = rawMembers?.map((m) => {
    return {
      id: m.id,
      user_id: m.user_id,
      email: m?.user?.account?.email,
      avatarUrl: m.user.avatar_url,
      displayName: m.user.display_name,
      accessList: m.member_roles?.[0]?.access_list as unknown as AccessList,
      role: {
        id: m.member_roles?.[0]?.id,
        name: m.member_roles?.[0]?.team_role as unknown,
      } as TeamRole,
      createdAt: m.member_roles?.[0]?.created_at || m.created_at,
      updatedAt: m.member_roles?.[0]?.updated_at || m.updated_at,
    } as Member;
  });

  return members;
};

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
      const members = prepareMembersData(m?.team?.members as MembersType[]);
      const creatorEmail = members.find(
        (member) => member.role.name === Roles.owner
      )?.email;

      const newTeam = {
        ...m.team,
        creatorEmail,
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

  return {
    id: rawUserData?.id,
    email: rawUserData?.account?.email,
    displayName: rawUserData?.display_name,
    avatarUrl: rawUserData?.avatar_url,
    teams: teams.sort((a, b) => a.createdAt <= b.createdAt),
  };
};

const prepareTeamData = (
  rawData: TeamDataQuery | SubTeamDataSubscription
): UserData => {
  const rawUserData = rawData.teams_by_pk || null;

  const dataSources = prepareDataSourceData(
    rawUserData?.datasources as Datasources[]
  );

  const alerts = prepareAlertData(rawUserData?.alerts as RawAlert[]);
  const reports = prepareReportData(rawUserData?.reports as RawReport[]);

  return {
    dataSources,
    alerts,
    reports,
  };
};

export default () => {
  const {
    currentUser,
    currentTeamId,
    setCurrentTeamId,
    setLoading,
    setUserData,
    setTeamData,
  } = CurrentUserStore();
  const { JWTpayload, accessToken } = AuthTokensStore();
  const userId = JWTpayload?.["x-hasura-user-id"];

  const [, execCreateTeamMutation] = useCreateTeamMutation();
  const [currentUserData, execQueryCurrentUser] = useCurrentUserQuery({
    variables: { id: userId },
    pause: true,
  });

  const [subscriptionData, execSubscription] = useSubCurrentUserSubscription({
    variables: { id: userId },
    pause: true,
  });

  const [teamData, execTeamData] = useTeamDataQuery({
    variables: { team_id: currentTeamId },
  });

  const [subTeamData, execSubTeamData] = useSubTeamDataSubscription({
    variables: { team_id: currentTeamId },
    pause: true,
  });

  useDeepCompareEffect(() => {
    if (accessToken && userId && currentTeamId) {
      execQueryCurrentUser();
      execSubscription();
      execTeamData();
      execSubTeamData();
    }

    if (!accessToken) {
      window.location.href = "/auth/signin";
    }
  }, [accessToken, userId, currentTeamId]);

  useEffect(() => {
    if (teamData.data) {
      const newTeamData = prepareTeamData(teamData.data);
      setTeamData(newTeamData);
      setLoading(false);
    }
  }, [setTeamData, setLoading, teamData.data]);

  useEffect(() => {
    if (subTeamData?.data) {
      const newTeamData = prepareTeamData(subTeamData.data);
      setTeamData(newTeamData);
      setLoading(false);
    }
  }, [setLoading, setTeamData, subTeamData?.data]);

  useEffect(() => {
    if (currentUserData.data) {
      const newUserData = prepareUserData(currentUserData.data);
      setUserData(newUserData);
      setLoading(false);
    }
  }, [currentUserData, setLoading, setUserData]);

  useEffect(() => {
    if (subscriptionData?.data) {
      const newUserData = prepareUserData(subscriptionData?.data);
      setUserData(newUserData);
      setLoading(false);
    }
  }, [setLoading, setUserData, subscriptionData?.data]);

  const createTeam = useCallback(async () => {
    await execCreateTeamMutation({
      name: DEFAULT_TEAM_NAME,
    });

    execQueryCurrentUser();
  }, [execCreateTeamMutation, execQueryCurrentUser]);

  useEffect(() => {
    if (currentUser?.id && !currentUser?.teams?.length) {
      createTeam();
    }
  }, [currentUser?.id, currentUser?.teams?.length, createTeam]);

  useEffect(() => {
    if (
      currentUser.teams.length &&
      !currentUser.teams.find((t) => t.id === currentTeamId)
    ) {
      setCurrentTeamId(currentUser.teams?.[0]?.id);
    }
  }, [currentTeamId, currentUser.teams, setCurrentTeamId]);

  return {
    currentUser,
    queries: {
      currentUserData,
      execQueryCurrentUser,
    },
  };
};
