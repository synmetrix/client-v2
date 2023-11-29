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
  CurrentUserQuery,
  Datasources,
  Maybe,
  Members as MembersType,
} from "@/graphql/generated";
import type { User, UserData } from "@/types/user";
import type { DataSourceInfo } from "@/types/dataSource";
import { dbTiles } from "@/mocks/dataSources";
import type { AccessList, Member, Team, TeamRole } from "@/types/team";
import type { Alert, RawAlert } from "@/types/alert";
import type { Report, RawReport } from "@/types/report";

const DEFAULT_TEAM_NAME = "Default team";

const prepareMembersData = (rawMembers: MembersType[]) => {
  const members = rawMembers?.map((m) => {
    return {
      id: m.user.id,
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
      const members = prepareMembersData(m?.team?.members);

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

  return {
    id: rawUserData?.id,
    email: rawUserData?.account?.email,
    displayName: rawUserData?.display_name,
    avatarUrl: rawUserData?.avatar_url,
    teams,
  };
};

const prepareTeamData = (rawData): UserData => {
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

type Params = {
  userId?: string;
  teamId?: Maybe<string>;
};

const getListVariables = (params: Params) => {
  const res = {
    id: params?.userId,
  };

  if (params?.teamId) {
    // res = set("datasourceWhere.team_id._eq", params.teamId, res);
    // res = set("alertWhere.team_id._eq", params.teamId, res);
    // res = set("reportWhere.team_id._eq", params.teamId, res);
  }

  return res;
};

export default () => {
  const { currentUser, currentTeamId, setLoading, setUserData, setTeamData } =
    CurrentUserStore();
  const { JWTpayload, accessToken } = AuthTokensStore();
  const userId = JWTpayload?.["x-hasura-user-id"];

  const [teamMutation, execCreateTeamMutation] = useCreateTeamMutation();
  const [currentUserData, execQueryCurrentUser] = useCurrentUserQuery({
    variables: getListVariables({ userId, teamId: currentTeamId }),
    pause: true,
  });

  const [subscriptionData, execSubscription] = useSubCurrentUserSubscription({
    variables: getListVariables({ userId, teamId: currentTeamId }),
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
      const newTeamData = prepareTeamData(subTeamData?.data);
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
    const res = await execCreateTeamMutation({
      name: DEFAULT_TEAM_NAME,
    });

    execQueryCurrentUser();

    // if (currentUser?.dataSources?.length) {
    //   console.log(currentUser?.dataSources);
    // }
  }, [execCreateTeamMutation, execQueryCurrentUser]);

  useEffect(() => {
    if (currentUser?.id && !currentUser?.teams?.length) {
      createTeam();
    }
  }, [currentUser?.id, currentUser?.teams?.length, createTeam]);

  return {
    currentUser,
    queries: {
      currentUserData,
      execQueryCurrentUser,
    },
  };
};
