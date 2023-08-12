import { Space } from "antd";
import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import PageHeader from "@/components/PageHeader";
import MembersTable from "@/components/MembersTable";
import Modal from "@/components/Modal";
import MembersForm from "@/components/MembersForm";
import type { Member } from "@/types/team";

import styles from "./index.module.less";

interface MembersProps {
  members: Member[];
}

const Members: React.FC<MembersProps> = ({ members }) => {
  const { t } = useTranslation(["settings", "pages"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = (member: Member) => console.log(member);
  const onRemove = (member: Member) => console.log("remove", member);
  const onRoleChange = (member: Member) => console.log("role change", member);

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

export default Members;
