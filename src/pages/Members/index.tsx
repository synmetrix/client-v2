import { Space, message } from "antd";
import { useTranslation } from "react-i18next";

import type { Invite } from "@/components/MembersForm";
import MembersForm from "@/components/MembersForm";
import MembersTable from "@/components/MembersTable";
import Modal from "@/components/Modal";
import PageHeader from "@/components/PageHeader";
import SettingsMenu from "@/components/SettingsMenu";
import type {
  AllAccessListsQuery,
  Members as MembersType,
  Team_Roles_Enum,
} from "@/graphql/generated";
import {
  useAllAccessListsQuery,
  useDeleteMemberMutation,
  useInviteMemberMutation,
  useMembersQuery,
  useUpdateMemberRoleMutation,
} from "@/graphql/generated";
import useCheckResponse from "@/hooks/useCheckResponse";
import SidebarLayout from "@/layouts/SidebarLayout";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type {
  AccessList,
  ChangeableRoles,
  Member,
  Roles,
  TeamRole,
} from "@/types/team";

import styles from "./index.module.less";

interface MembersProps {
  members: Member[];
  accessLists: AccessList[];
  currentRole?: Roles;
  onDeleteMember?: (id: string) => void;
  onInviteMember?: (data: Invite) => void;
  onRoleChange?: (id: string, newRole: ChangeableRoles) => void;
  onAccessListChange?: (id: string) => void;
}

export const Members: React.FC<MembersProps> = ({
  members,
  accessLists,
  currentRole,
  onDeleteMember = () => {},
  onInviteMember = () => {},
  onRoleChange = () => {},
  onAccessListChange = () => {},
}) => {
  const { t } = useTranslation(["settings", "pages"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = (data: Invite) => {
    setIsOpen(false);
    onInviteMember(data);
  };
  const onRemove = (member: Member) => onDeleteMember(member.id);

  return (
    <SidebarLayout title={t("pages:settings.members")} items={<SettingsMenu />}>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={t("settings:members.title")}
          action={t("settings:members.action")}
          onClick={() => setIsOpen(true)}
        />
        <MembersTable
          members={members}
          accessLists={accessLists}
          currentRole={currentRole}
          onRemove={onRemove}
          onAccessListChange={onAccessListChange}
          onRoleChange={onRoleChange}
        />
      </Space>

      <Modal open={isOpen} closable onClose={() => setIsOpen(false)}>
        <MembersForm onSubmit={onSubmit} />
      </Modal>
    </SidebarLayout>
  );
};

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
    } as Member;
  });

  return members;
};

const prepareAccessData = (accessResult: AllAccessListsQuery): AccessList[] => {
  if (!accessResult?.access_lists?.length) return [];

  return (accessResult.access_lists || []).map((al) => ({
    id: al.id,
    name: al.name,
    teamId: al.team_id,
    config: al.config,
    createdAt: al.created_at,
    updatedAt: al.updated_at,
  })) as AccessList[];
};

const MembersWrapper = () => {
  const { t } = useTranslation(["settings", "pages"]);
  const { currentTeam } = CurrentUserStore();
  const [deleteMutation, execDeleteMutation] = useDeleteMemberMutation();
  const [inviteMutation, execInviteMutation] = useInviteMemberMutation();
  const [updateRoleMutation, execUpdateRoleMutation] =
    useUpdateMemberRoleMutation();

  const [allMembersData, execAllMembersQuery] = useMembersQuery({
    variables: {
      where: {
        team_id: {
          _eq: currentTeam?.id,
        },
      },
    },
    pause: true,
  });

  const [allAccessLists, execAllAccessLists] = useAllAccessListsQuery({
    variables: {
      where: {
        team_id: {
          _eq: currentTeam?.id,
        },
      },
    },
  });

  useCheckResponse(
    deleteMutation,
    (res) => {
      if (res.delete_members_roles_by_pk?.id) {
        message.success(t("settings:members:member_deleted"));
        execAllMembersQuery();
      } else {
        message.warning(t("settings:members:no_permissions"));
      }
    },
    {
      successMessage: "",
    }
  );

  useCheckResponse(inviteMutation, () => {}, {
    successMessage: t("settings:members:member_invited"),
  });

  useCheckResponse(
    updateRoleMutation,
    (res) => {
      if (res.update_member_roles_by_pk?.id) {
        message.success(t("settings:members:role_updated"));
        execAllMembersQuery();
      } else {
        message.warning(t("settings:members:no_permissions"));
      }
    },
    {
      successMessage: "",
    }
  );

  const onDeleteMember = (id: string) => {
    execDeleteMutation({ id });
  };

  const onRoleChange = (id: string, newRole: ChangeableRoles) => {
    execUpdateRoleMutation({
      pk_columns: { id },
      _set: {
        team_role: newRole.toLowerCase() as Team_Roles_Enum,
      },
    });
  };

  const onInviteMember = (data: Invite) => {
    execInviteMutation({
      ...data,
      role: data.role.toLowerCase(),
      teamId: currentTeam?.id,
    });
  };

  useEffect(() => {
    if (currentTeam?.id) {
      execAllMembersQuery();
      execAllAccessLists();
    }
  }, [currentTeam?.id, execAllMembersQuery, execAllAccessLists]);

  const members = useMemo(() => {
    let rawMembers = [] as MembersType[];
    if (allMembersData.data) {
      rawMembers = allMembersData.data.members as MembersType[];
    }

    return prepareMembersData(rawMembers);
  }, [allMembersData.data]);

  const accessLists = useMemo(
    () => prepareAccessData(allAccessLists as unknown as AllAccessListsQuery),
    [allAccessLists]
  );

  return (
    <Members
      members={members}
      accessLists={accessLists}
      currentRole={currentTeam?.role}
      onDeleteMember={onDeleteMember}
      onInviteMember={onInviteMember}
      onRoleChange={onRoleChange}
    />
  );
};

export default MembersWrapper;
