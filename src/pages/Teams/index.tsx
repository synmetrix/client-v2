import { Space, Spin } from "antd";
import { useTranslation } from "react-i18next";

import TeamsTable from "@/components/TeamsTable";
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
import type { Team, TeamSettingsForm } from "@/types/team";

import styles from "./index.module.less";

interface TeamsProps {
  teams: Team[];
  currentTeam: Team | null;
  onCreateOrEditTeam: (data: TeamSettingsForm) => void;
  onRemoveTeam: (id: string) => void;
  loading: boolean;
}

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

  return (
    <>
      <Spin spinning={loading}>
        <Space className={styles.wrapper} direction="vertical" size={13}>
          <PageHeader
            title={t("manage_teams")}
            action={t("create_team")}
            onClick={onCreate}
          />
          <TeamsTable
            teams={teams}
            currentTeam={currentTeam}
            onEdit={onEdit}
            onRemove={onRemoveTeam}
          />
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
  const { currentUser, currentTeam } = CurrentUserStore();
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
    execDeleteMutation({ id });
  };

  const loading = useMemo(
    () =>
      createMutation.fetching ||
      updateMutation.fetching ||
      deleteMutation.fetching,
    [createMutation.fetching, deleteMutation.fetching, updateMutation.fetching]
  );

  return (
    <Teams
      teams={currentUser.teams}
      currentTeam={currentTeam}
      onCreateOrEditTeam={onCreateOrEditTeam}
      onRemoveTeam={onRemoveTeam}
      loading={loading}
    />
  );
};

export default TeamsWrapper;
