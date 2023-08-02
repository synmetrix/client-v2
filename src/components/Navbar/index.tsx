import { useTranslation } from "react-i18next";
import { Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import cn from "classnames";

import Avatar from "@/components/Avatar";
import type { Team } from "@/types/user";

import TeamIcon from "@/assets/team.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface MenuItem {
  label: string;
  href: string;
}

interface NavbarProps {
  userMenu: MenuItem[];
  username: string;
  userAvatar?: string;
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
  const [teamsOpen, setTeamsOpen] = useState<boolean>(false);
  const [accountOpen, setAccountOpen] = useState<boolean>(false);
  const { t } = useTranslation(["common"]);

  return (
    <Space size={20} direction={direction} align="start">
      <Button className={styles.docs} href="/">
        {t("common:words.docs")}
      </Button>

      {teams && (
        <Dropdown
          onOpenChange={setTeamsOpen}
          menu={{ items: teams.map((tm, i) => ({ ...tm, key: i })) }}
        >
          <Button>
            <Space align="start">
              <TeamIcon />
              <span className={styles.team}> {t("common:words.team")}</span>
              <span className={cn(styles.icon, { [styles.rotate]: teamsOpen })}>
                <DownOutlined />
              </span>
            </Space>
          </Button>
        </Dropdown>
      )}

      <Dropdown
        onOpenChange={setAccountOpen}
        menu={{ items: userMenu.map((u, i) => ({ ...u, key: i })) }}
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
