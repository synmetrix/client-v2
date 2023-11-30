import { Col, Row, Select, Space, Spin, message } from "antd";
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
  loading?: boolean;
  onDeleteMember?: (id: string) => void;
  onInviteMember?: (data: Invite) => void;
  onRoleChange?: (id: string, newRole: ChangeableRoles) => void;
  onAccessListChange?: (id: string, accessListId: string | null) => void;
}

export const Members: React.FC<MembersProps> = ({
  members,
  accessLists,
  currentRole,
  loading = false,
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
      (currentRole === Roles.owner || currentRole === Roles.admin) &&
      member?.role.name === Roles.member;
    const hasDeletePermission =
      currentRole === Roles.owner && member?.role.name !== Roles.owner;

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
                  member?.accessList?.name || capitalize(member.role.name)
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

  const hasInvitePermissions = currentRole !== Roles.member;

  return (
    <>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={t("settings:members.title")}
          action={hasInvitePermissions && t("settings:members.action")}
          onClick={() => setIsOpen(true)}
        />

        <Spin spinning={loading}>
          <div className={styles.body}>
            <Row justify={"start"} gutter={[32, 32]}>
              {members.map((m) => (
                <Col xs={24} sm={12} xl={8} key={m.id}>
                  {renderCard(m)}
                </Col>
              ))}
            </Row>
          </div>
        </Spin>
      </Space>

      <Modal open={isOpen} closable onClose={() => setIsOpen(false)}>
        <MembersForm onSubmit={onSubmit} />
      </Modal>
    </>
  );
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
  const { currentTeam, loading, setLoading } = CurrentUserStore();
  const [deleteMutation, execDeleteMutation] = useDeleteMemberMutation();
  const [inviteMutation, execInviteMutation] = useInviteMemberMutation();
  const [updateRoleMutation, execUpdateRoleMutation] =
    useUpdateMemberRoleMutation();

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
      } else {
        message.warning(t("settings:members:no_permissions"));
      }
    },
    {
      successMessage: "",
    }
  );

  const onDeleteMember = (id: string) => {
    setLoading(true);
    execDeleteMutation({ id });
  };

  const onRoleChange = (id: string, newRole: ChangeableRoles) => {
    setLoading(true);
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
      execAllAccessLists();
    }
  }, [currentTeam?.id, execAllAccessLists]);

  const members = useMemo(
    () => currentTeam?.members || [],
    [currentTeam?.members]
  );
  const accessLists = useMemo(
    () =>
      prepareAccessData(allAccessLists?.data as unknown as AllAccessListsQuery),
    [allAccessLists]
  );

  return (
    <Members
      members={members}
      loading={loading}
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
