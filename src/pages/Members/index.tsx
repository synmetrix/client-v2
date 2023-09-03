import { Space, message } from "antd";
import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import PageHeader from "@/components/PageHeader";
import MembersTable from "@/components/MembersTable";
import Modal from "@/components/Modal";
import MembersForm from "@/components/MembersForm";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useCheckResponse from "@/hooks/useCheckResponse";
import type { Member } from "@/types/team";
import {
  useMembersQuery,
  useDeleteMemberMutation,
  useInviteMemberMutation,
  useUpdateMemberRoleMutation,
} from "@/graphql/generated";
import type { Team_Roles_Enum } from "@/graphql/generated";
import type { Invite } from "@/components/MembersForm";

import styles from "./index.module.less";

interface MembersProps {
  members: Member[];
  onDeleteMember?: (id: string) => void;
  onInviteMember?: (data: Invite) => void;
  onRoleChange?: (id: string, newRole: Team_Roles_Enum) => void;
}

export const Members: React.FC<MembersProps> = ({
  members,
  onDeleteMember = () => {},
  onInviteMember = () => {},
  onRoleChange = () => {},
}) => {
  const { t } = useTranslation(["settings", "pages"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = (data: Invite) => {
    setIsOpen(false);
    onInviteMember(data);
  };
  const onRemove = (member: Member) => onDeleteMember(member.id);

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:settings.members") }}
    >
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={t("settings:members.title")}
          action={t("settings:members.action")}
          onClick={() => setIsOpen(true)}
        />
        <MembersTable
          members={members}
          onRemove={onRemove}
          onRoleChange={onRoleChange}
        />
      </Space>

      <Modal open={isOpen} closable onClose={() => setIsOpen(false)}>
        <MembersForm onSubmit={onSubmit} />
      </Modal>
    </BasicLayout>
  );
};

const MembersWrapper = () => {
  const { t } = useTranslation(["teams", "pages"]);
  const { currentUser, currentTeamId } = CurrentUserStore();
  const [deleteMutation, execDeleteMutation] = useDeleteMemberMutation();
  const [inviteMutation, execInviteMutation] = useInviteMemberMutation();
  const [updateRoleMutation, execUpdateRoleMutation] =
    useUpdateMemberRoleMutation();
  const [allMembersData, execAllMembersQuery] = useMembersQuery({
    variables: {
      where: {
        team_id: currentTeamId,
      },
    },
  });

  useCheckResponse(
    deleteMutation,
    (res) => {
      if (res.delete_members_roles_by_pk?.id) {
        message.success(t("member_deleted"));
      } else {
        message.warning(t("no_permissions"));
      }
    },
    {
      successMessage: "",
    }
  );

  useCheckResponse(inviteMutation, () => {}, {
    successMessage: t("member_invited"),
  });

  useCheckResponse(
    updateRoleMutation,
    (res) => {
      if (res.update_member_roles_by_pk?.id) {
        message.success(t("role_updated"));
      } else {
        message.warning(t("no_permissions"));
      }
    },
    {
      successMessage: "",
    }
  );

  const onDeleteMember = (id: string) => {
    execDeleteMutation({ id });
  };

  const onRoleChange = (id: string, newRole: Team_Roles_Enum) => {
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
      teamId: currentTeamId,
    });
  };

  const members = useMemo(
    () =>
      currentUser.teams.find((tm) => tm.id === currentTeamId)?.members || [],
    [currentTeamId, currentUser.teams]
  );

  return (
    <Members
      members={members}
      onDeleteMember={onDeleteMember}
      onInviteMember={onInviteMember}
      onRoleChange={onRoleChange}
    />
  );
};

export default MembersWrapper;
