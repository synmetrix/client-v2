import { useResponsive } from "ahooks";
import { useTranslation } from "react-i18next";
import { Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import cn from "classnames";

import Avatar from "@/components/Avatar";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type { Team } from "@/types/team";
import useLocation from "@/hooks/useLocation";

import TeamIcon from "@/assets/team.svg";
import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface MenuItem {
  label: string;
  href: string;
}

interface NavbarProps {
  userMenu: MenuItem[];
  username?: string | null;
  userAvatar?: string | null;
  direction?: "horizontal" | "vertical";
  teams?: Team[];
}

const Navbar: FC<NavbarProps> = ({
  direction,
  teams,
  userMenu,
  username,
  userAvatar,
}) => {
  const [, setLocation] = useLocation();
  const { currentTeam, setCurrentTeamId } = CurrentUserStore();
  const [teamsOpen, setTeamsOpen] = useState<boolean>(false);
  const [accountOpen, setAccountOpen] = useState<boolean>(false);
  const { t } = useTranslation(["common"]);
  const responsive = useResponsive();

  const onSelectTeam = (id: string) => {
    setCurrentTeamId(id);
    setTeamsOpen(false);
  };

  const onClick = ({ item }) => {
    const {
      props: { href },
    } = item;
    setLocation(href);
  };

  const docs = (
    <Button className={styles.docs} href="/">
      <Space size={10} align="start">
        <span className={styles.docsIcon}>
          <DocsIcon />
        </span>
        {t("common:words.docs")}
      </Space>
    </Button>
  );

  const account = (
    <Dropdown
      onOpenChange={setAccountOpen}
      menu={{ items: userMenu.map((u, i) => ({ ...u, key: i })), onClick }}
    >
      <Space className={styles.dropdownHeader} align="center">
        <Avatar username={username} img={userAvatar} />
        <span className={cn(styles.icon, { [styles.rotate]: accountOpen })}>
          <DownOutlined />
        </span>
      </Space>
    </Dropdown>
  );

  return (
    <Space
      size={20}
      direction={direction}
      align="start"
      style={{ maxHeight: "60px" }}
    >
      {!responsive.lg ? (
        <Space size={30}>
          {docs}
          {account}
        </Space>
      ) : (
        docs
      )}

      {!!teams?.length && (
        <Dropdown
          onOpenChange={setTeamsOpen}
          menu={{
            items: teams.map((tm, i) => ({
              key: i,
              label: tm.name,
              onClick: () => onSelectTeam(tm.id),
            })),
          }}
        >
          <Button>
            <Space align="start">
              <TeamIcon />
              <span className={styles.team}>
                {currentTeam ? currentTeam.name : t("common:words.team")}
              </span>
              <span className={cn(styles.icon, { [styles.rotate]: teamsOpen })}>
                <DownOutlined />
              </span>
            </Space>
          </Button>
        </Dropdown>
      )}

      {responsive.lg && account}
    </Space>
  );
};

export default Navbar;
