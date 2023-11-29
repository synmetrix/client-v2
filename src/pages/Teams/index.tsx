import { Col, Dropdown, Row, Space, Spin, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { SettingOutlined } from "@ant-design/icons";

import Modal from "@/components/Modal";
import TeamSettings from "@/components/TeamSettings";
import PageHeader from "@/components/PageHeader";
import CurrentUserStore from "@/stores/CurrentUserStore";
import {
  useCreateTeamMutation,
  useEditTeamMutation,
  useDeleteTeamMutation,
} from "@/graphql/generated";
import useCheckResponse from "@/hooks/useCheckResponse";
import Avatar, { AvatarGroup } from "@/components/Avatar";
import type { Member, Team, TeamSettingsForm } from "@/types/team";
import { Roles } from "@/types/team";
import Card from "@/components/Card";
import ConfirmModal from "@/components/ConfirmModal";
import formatTime from "@/utils/helpers/formatTime";

import styles from "./index.module.less";

interface TeamsProps {
  teams: Team[];
  currentTeam: Team | null;
  onCreateOrEditTeam: (data: TeamSettingsForm) => void;
  onRemoveTeam: (id: string) => void;
  loading: boolean;
}

const AVATAR_COLORS = ["#000000", "#470D69", "#A31BCB"];

export const Teams: React.FC<TeamsProps> = ({
  teams,
  currentTeam,
  onCreateOrEditTeam = () => {},
  onRemoveTeam = () => {},
  loading = false,
}) => {
  const { t } = useTranslation(["teams", "pages"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamSettingsForm>();

  const onEdit = (team: Team) => {
    setSelectedTeam(team);
    setIsOpen(true);
  };

  const onClose = () => {
    setSelectedTeam({ name: "" });
    setIsOpen(false);
  };

  const onSubmit = (data: TeamSettingsForm) => {
    onCreateOrEditTeam(data);
    onClose();
  };

  const onCreate = () => {
    setIsOpen(true);
  };

  const isMember = currentTeam?.role === Roles.member;

  const renderCard = (team: Team) => {
    return (
      <Card
        title={
          <>
            {team.name}
            {team.id === currentTeam?.id && (
              <Tag className={styles.tag} color="#EDE7F0">
                {t("common:words.current")}
              </Tag>
            )}
          </>
        }
        titleTooltip={team.name}
        onTitleClick={() => !isMember && onEdit(team)}
        extra={
          !isMember && (
            <Dropdown
              className={styles.btn}
              trigger={["click"]}
              menu={{
                items: [
                  {
                    key: "edit",
                    label: t("common:words.edit"),
                    onClick: () => onEdit(team),
                  },
                  {
                    key: "delete",
                    label: (
                      <ConfirmModal
                        title={t("common:words.delete_alert")}
                        onConfirm={() => onRemoveTeam(team.id)}
                      >
                        {t("common:words.delete")}
                      </ConfirmModal>
                    ),
                  },
                ],
              }}
            >
              <SettingOutlined key="setting" />
            </Dropdown>
          )
        }
      >
        <dl>
          {team.members && (
            <>
              <dt>
                <span>
                  {team.members.length} {t("common:words.members")}
                </span>
              </dt>
              <dd>
                <Space size={10} align="center">
                  <AvatarGroup>
                    {team.members
                      .slice(0, 3)
                      .map((member: Member, idx: number) => (
                        <Avatar
                          key={member.id}
                          color={AVATAR_COLORS[idx]}
                          img={member?.avatarUrl}
                          username={member?.displayName}
                          width={32}
                          height={32}
                        />
                      ))}
                  </AvatarGroup>
                </Space>
              </dd>
            </>
          )}
          {team.createdAt && (
            <>
              <dt>{t("common:words.created_at")}</dt>
              <dd title={formatTime(team.createdAt)}>
                {formatTime(team.createdAt)}
              </dd>
            </>
          )}

          {team.updatedAt && (
            <>
              <dt>{t("common:words.updated_at")}</dt>
              <dd title={formatTime(team.updatedAt)}>
                {formatTime(team.updatedAt)}
              </dd>
            </>
          )}
        </dl>
      </Card>
    );
  };

  return (
    <>
      <Spin spinning={loading}>
        <Space className={styles.wrapper} direction="vertical" size={13}>
          <PageHeader
            title={t("manage_teams")}
            action={t("create_team")}
            onClick={onCreate}
          />
          <div className={styles.body}>
            <Row justify={"start"} gutter={[32, 32]}>
              {teams?.map((tm) => (
                <Col xs={24} sm={12} xl={8} key={tm.id}>
                  {renderCard(tm)}
                </Col>
              ))}
            </Row>
          </div>
        </Space>
      </Spin>

      <Modal open={isOpen} closable onClose={onClose}>
        <TeamSettings initialValue={selectedTeam} onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

const TeamsWrapper: React.FC = () => {
  const { t } = useTranslation(["teams", "pages"]);
  const { currentUser, currentTeam, loading, setLoading } = CurrentUserStore();
  const [createMutation, execCreateMutation] = useCreateTeamMutation();
  const [updateMutation, execUpdateMutation] = useEditTeamMutation();
  const [deleteMutation, execDeleteMutation] = useDeleteTeamMutation();

  useCheckResponse(createMutation, () => {}, {
    successMessage: t("team_created"),
  });

  useCheckResponse(updateMutation, () => {}, {
    successMessage: t("team_updated"),
  });

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: t("team_deleted"),
  });

  const onCreateOrEditTeam = (data: TeamSettingsForm) => {
    setLoading(true);
    if (data.id) {
      execUpdateMutation({
        pk_columns: { id: data.id },
        _set: {
          name: data.name,
        },
      });
    } else {
      execCreateMutation({
        name: data.name,
      });
    }
  };

  const onRemoveTeam = (id: string) => {
    setLoading(true);
    execDeleteMutation({ id });
  };

  const isLoading = useMemo(
    () =>
      loading ||
      createMutation.fetching ||
      updateMutation.fetching ||
      deleteMutation.fetching,
    [
      loading,
      createMutation.fetching,
      deleteMutation.fetching,
      updateMutation.fetching,
    ]
  );

  return (
    <Teams
      teams={currentUser.teams}
      currentTeam={currentTeam}
      onCreateOrEditTeam={onCreateOrEditTeam}
      onRemoveTeam={onRemoveTeam}
      loading={isLoading}
    />
  );
};

export default TeamsWrapper;
