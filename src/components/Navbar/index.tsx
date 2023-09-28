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

import type { MenuItemProps } from "antd";
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

interface ClickMenuItem {
  href: string;
}

interface ClickItem {
  props: ClickMenuItem;
}

const Navbar: FC<NavbarProps> = ({
  direction,
  teams,
  userMenu,
  username,
  userAvatar,
}) => {
  const [_, setLocation] = useLocation();
  const { currentTeam, setCurrentTeamId } = CurrentUserStore();
  const [teamsOpen, setTeamsOpen] = useState<boolean>(false);
  const [accountOpen, setAccountOpen] = useState<boolean>(false);
  const { t } = useTranslation(["common"]);

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

  return (
    <Space
      size={20}
      direction={direction}
      align="start"
      style={{ maxHeight: "60px" }}
    >
      <Button className={styles.docs} href="/">
        <Space size={10} align="start">
          <span className={styles.docsIcon}>
            <DocsIcon />
          </span>
          {t("common:words.docs")}
        </Space>
      </Button>

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
    </Space>
  );
};

export default Navbar;
