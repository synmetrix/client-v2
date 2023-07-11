import { useTranslation } from "react-i18next";
import { Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import cn from "classnames";

import Avatar from "@/components/Avatar";

import TeamIcon from "@/assets/team.svg";

import styles from "./index.module.less";

import type { MenuProps } from "antd";
import type { FC } from "react";

const mock: MenuProps["items"] = [
  {
    label: "1st menu item",
    key: "1",
  },
  {
    label: "2nd menu item",
    key: "2",
  },
];

interface NavbarProps {
  direction?: "horizontal" | "vertical";
}

const Navbar: FC<NavbarProps> = ({ direction }) => {
  const [teamsOpen, setTeamsOpen] = useState<boolean>(false);
  const [accountOpen, setAccountOpen] = useState<boolean>(false);
  const { t } = useTranslation(["common"]);

  return (
    <Space size={20} direction={direction}>
      <Button className={styles.docs} href="/">
        {t("common:words.docs")}
      </Button>

      <Dropdown onOpenChange={setTeamsOpen} menu={{ items: mock }}>
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

      <Dropdown onOpenChange={setAccountOpen} menu={{ items: mock }}>
        <Space className={styles.dropdownHeader} align="center">
          <Avatar username="user name" />
          <span className={cn(styles.icon, { [styles.rotate]: accountOpen })}>
            <DownOutlined />
          </span>
        </Space>
      </Dropdown>
    </Space>
  );
};

export default Navbar;
