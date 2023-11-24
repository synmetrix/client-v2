import { Col, Row, Select, Space, message } from "antd";
import { useTranslation } from "react-i18next";

import type { Invite } from "@/components/MembersForm";
import MembersForm from "@/components/MembersForm";
import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import Modal from "@/components/Modal";
import PageHeader from "@/components/PageHeader";
import ConfirmModal from "@/components/ConfirmModal";
import Button from "@/components/Button";
import formatTime from "@/utils/helpers/formatTime";
import { createRoleOptions } from "@/utils/helpers/createRoleOptions";
import { capitalize } from "@/utils/helpers/capitalize";
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
import CurrentUserStore from "@/stores/CurrentUserStore";
import type { AccessList, Member, TeamRole } from "@/types/team";
import { ChangeableRoles, Roles } from "@/types/team";

import TrashIcon from "@/assets/trash.svg";

import styles from "./index.module.less";

interface MembersProps {
  members: Member[];
  accessLists: AccessList[];
  currentRole?: Roles;
  onDeleteMember?: (id: string) => void;
  onInviteMember?: (data: Invite) => void;
  onRoleChange?: (id: string, newRole: ChangeableRoles) => void;
  onAccessListChange?: (id: string, accessListId: string | null) => void;
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

  const renderCard = (member: Member) => {
    const hasRoleChangePermission =
      member?.role.name !== Roles.owner &&
      (currentRole === Roles.owner ||
        (currentRole === Roles.admin && member?.role.name === Roles.member));

    const hasDeletePermission = hasRoleChangePermission;

    return (
      <Card
        title={
          <Space size={10}>
            <Avatar username={member.displayName} img={member.avatarUrl} />
            <span>{member.displayName}</span>
          </Space>
        }
        titleTooltip={member.displayName}
        extra={
          hasDeletePermission && (
            <ConfirmModal
              title={t("common:words.delete_member")}
              onConfirm={() => onRemove(member)}
            >
              <Button
                className={styles.removeBtn}
                type="ghost"
                icon={<TrashIcon />}
              />
            </ConfirmModal>
          )
        }
      >
        <dl>
          {member.email && (
            <>
              <dt>{t("common:words.email")}</dt>
              <dd title={member.email}>{member.email}</dd>
            </>
          )}

          {member.role && (
            <>
              <dt>{t("common:words.role")}</dt>
              <dd
                title={capitalize(member.role.name)}
                className={styles.roleName}
              >
                {hasRoleChangePermission ? (
                  <Select
                    onChange={(val) =>
                      onRoleChange(
                        member.role.id,
                        val as unknown as ChangeableRoles
                      )
                    }
                    disabled={!hasRoleChangePermission}
                    bordered={false}
                    value={member.role.name}
                    options={createRoleOptions(ChangeableRoles)}
                  />
                ) : (
                  capitalize(member.role.name)
                )}
              </dd>
              <dt>{t("common:words.access_list")}</dt>
              <dd
                title={capitalize(member.role.name)}
                className={styles.roleName}
              >
                {hasRoleChangePermission ? (
                  <Select
                    onChange={(accessListId) => {
                      onAccessListChange(member.role.id, accessListId);
                    }}
                    bordered={false}
                    disabled={!accessLists?.length}
                    value={
                      member.accessList?.id ||
                      capitalize(t("common:words.full_access").toUpperCase())
                    }
                    options={[
                      {
                        value: null,
                        label: capitalize(
                          t("common:words.full_access").toUpperCase()
                        ),
                      },
                      ...(accessLists || []).map((al) => ({
                        value: al.id,
                        label: al.name,
                      })),
                    ]}
                  />
                ) : (
                  capitalize(member.role.name)
                )}
              </dd>
            </>
          )}

          {member.updatedAt && (
            <>
              <dt>{t("common:words.updated_at")}</dt>
              <dd title={formatTime(member.updatedAt)}>
                {formatTime(member.updatedAt)}
              </dd>
            </>
          )}

          {member.createdAt && (
            <>
              <dt>{t("common:words.created_at")}</dt>
              <dd title={formatTime(member.createdAt)}>
                {formatTime(member.createdAt)}
              </dd>
            </>
          )}
        </dl>
      </Card>
    );
  };

  const isMember = currentRole === Roles.member;

  return (
    <>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={t("settings:members.title")}
          action={!isMember && t("settings:members.action")}
          onClick={() => setIsOpen(true)}
        />

        <div className={styles.body}>
          <Row justify={"start"} gutter={[32, 32]}>
            {members.map((m) => (
              <Col xs={24} sm={12} xl={8} key={m.id}>
                {renderCard(m)}
              </Col>
            ))}
          </Row>
        </div>
      </Space>

      <Modal open={isOpen} closable onClose={() => setIsOpen(false)}>
        <MembersForm onSubmit={onSubmit} />
      </Modal>
    </>
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
      createdAt: m.created_at,
      updatedAt: m.member_roles?.[0]?.updated_at || m.updated_at,
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

  const onAccessListChange = (id: string, accessListId: string | null) => {
    execUpdateRoleMutation({
      pk_columns: { id },
      _set: {
        access_list_id: accessListId,
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
    () =>
      prepareAccessData(allAccessLists?.data as unknown as AllAccessListsQuery),
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
      onAccessListChange={onAccessListChange}
    />
  );
};

export default MembersWrapper;
