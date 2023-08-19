import { Space } from "antd";
import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import TeamsTable from "@/components/TeamsTable";
import Modal from "@/components/Modal";
import TeamSettings from "@/components/TeamSettings";
import PageHeader from "@/components/PageHeader";
import type { Team, TeamSettingsForm } from "@/types/team";

import styles from "./index.module.less";

interface TeamsProps {
  teams: Team[];
  currentTeam: string;
}

const Teams: React.FC<TeamsProps> = ({ teams, currentTeam }) => {
  const { t } = useTranslation(["teams", "pages"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamSettingsForm>();

  const onEdit = (team: Team) => {
    setSelectedTeam(team);
    setIsOpen(true);
  };

  const onRemove = (team: Team) => console.log(team);
  const onSubmit = (data: TeamSettingsForm) => console.log(data);

  const onClose = () => {
    setSelectedTeam({ name: "" });
    setIsOpen(false);
  };

  const onCreate = () => {
    setIsOpen(true);
  };

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:teams") }}
    >
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
          onRemove={onRemove}
        />
      </Space>

      <Modal open={isOpen} closable onClose={onClose}>
        <TeamSettings initialValue={selectedTeam} onSubmit={onSubmit} />
      </Modal>
    </BasicLayout>
  );
};

export default Teams;
