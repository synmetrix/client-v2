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
import CurrentUserStore, { LAST_TEAM_ID_KEY } from "@/stores/CurrentUserStore";
import type {
  SubCurrentUserSubscription,
  SubTeamDataSubscription,
  CurrentUserQuery,
  Datasources,
  TeamDataQuery,
  Members as MembersType,
} from "@/graphql/generated";
import type { User, TeamData } from "@/types/user";
import type { DataSourceInfo } from "@/types/dataSource";
import { dbTiles } from "@/mocks/dataSources";
import { Roles } from "@/types/team";
import type { AccessList, Member, Team, TeamRole } from "@/types/team";
import type { Alert, RawAlert } from "@/types/alert";
import type { Report, RawReport } from "@/types/report";
import type { DataSourceCredentials } from "@/components/CredentialsTable";
import formatTime from "@/utils/helpers/formatTime";

const DEFAULT_TEAM_NAME = "Default team";

const prepareMembersData = (rawMembers: MembersType[]) => {
  const members = rawMembers?.map((m) => {
    return {
      id: m?.id,
      user_id: m?.user_id,
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
        dbParams: d.db_params_computed,
        createdAt: d.created_at,
        updatedAt: d.updated_at,
        type: dbTiles.find((tile) => tile.value === d.db_type.toLowerCase()),
        branches: d.branches,
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
    teams: teams.sort(
      (a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt)
    ),
  };
};

const prepareCredentialsData = (
  data: Datasources[]
): DataSourceCredentials[] => {
  if (!data?.length) return [];

  return data.reduce((acc, cur) => {
    const dataSourceData = prepareDataSourceData([cur])?.[0];
    const newCredentials = (cur?.sql_credentials || []).map((c) => ({
      id: c.id,
      login: c.username,
      createdAt: formatTime(c.created_at),
      member: {
        userId: c?.user?.id,
        displayName: c.user?.display_name,
      },
      dataSourceData,
    })) as DataSourceCredentials[];

    return [...acc, ...newCredentials] as DataSourceCredentials[];
  }, [] as DataSourceCredentials[]);
};

const prepareTeamData = (
  rawData: TeamDataQuery | SubTeamDataSubscription
): TeamData => {
  const rawTeamData = rawData.teams_by_pk || null;

  const dataSources = prepareDataSourceData(
    rawTeamData?.datasources as Datasources[]
  );

  const alerts = prepareAlertData(rawTeamData?.alerts as RawAlert[]);
  const reports = prepareReportData(rawTeamData?.reports as RawReport[]);
  const members = prepareMembersData(rawTeamData?.members as MembersType[]);
  const sqlCredentials = prepareCredentialsData(
    rawTeamData?.datasources as Datasources[]
  );

  return {
    dataSources: dataSources.sort(
      (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    ),
    alerts,
    reports,
    members: members.sort(
      (a, b) => Date.parse(b.updatedAt!) - Date.parse(a.updatedAt!)
    ),
    sqlCredentials: sqlCredentials.sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    ),
  };
};

export default () => {
  const {
    currentUser,
    currentTeam,
    setCurrentTeam,
    setLoading,
    setUserData,
    setTeamData,
  } = CurrentUserStore();
  const { JWTpayload, accessToken } = AuthTokensStore();
  const userId = JWTpayload?.["x-hasura-user-id"];
  const lastTeamId = localStorage.getItem(LAST_TEAM_ID_KEY);

  const [, execCreateTeamMutation] = useCreateTeamMutation();
  const [currentUserData, execQueryCurrentUser] = useCurrentUserQuery({
    variables: { id: userId },
    pause: true,
  });

  const [subCurrentUserData, execSubscription] = useSubCurrentUserSubscription({
    variables: { id: userId },
    pause: true,
  });

  const [teamData, execTeamData] = useTeamDataQuery({
    variables: { team_id: currentTeam?.id },
    pause: true,
  });

  const [subTeamData, execSubTeamData] = useSubTeamDataSubscription({
    variables: { team_id: currentTeam?.id },
    pause: true,
  });

  useDeepCompareEffect(() => {
    if (accessToken && userId) {
      execQueryCurrentUser();
      execSubscription();

      if (currentTeam?.id) {
        execTeamData();
        execSubTeamData();
      }
    }

    if (!accessToken) {
      window.location.href = "/auth/signin";
    }
  }, [accessToken, userId, currentTeam?.id]);

  useEffect(() => {
    if (teamData.data) {
      const newTeamData = prepareTeamData(teamData.data);
      setTeamData(newTeamData);
      setLoading(false);
    }
  }, [setTeamData, setLoading, teamData.data]);

  useEffect(() => {
    if (subTeamData?.data) {
      execTeamData();
    }
  }, [execTeamData, setLoading, subTeamData?.data]);

  useEffect(() => {
    if (currentUserData.data) {
      const newUserData = prepareUserData(currentUserData.data);
      setUserData(newUserData);
      setLoading(false);
    }
  }, [currentUserData, setLoading, setUserData]);

  useEffect(() => {
    if (subCurrentUserData?.data) {
      execQueryCurrentUser();
    }
  }, [execQueryCurrentUser, setLoading, subCurrentUserData?.data]);

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
    if (currentUser?.teams?.length) {
      if (!lastTeamId) {
        setCurrentTeam(currentUser.teams[0].id);
      } else {
        setCurrentTeam(lastTeamId);
      }
    }
  }, [currentTeam, currentUser.teams, lastTeamId, setCurrentTeam]);

  return {
    currentUser,
    queries: {
      currentUserData,
      execQueryCurrentUser,
    },
  };
};
