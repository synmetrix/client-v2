import { Avatar as BasicAvatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import styles from "./index.module.less";

import type { FC } from "react";

interface AvatarProps {
  username?: string;
  img?: string;
}

const Avatar: FC<AvatarProps> = ({ username, img }) => {
  if (!username && !img)
    return (
      <BasicAvatar className={styles.avatar}>
        <UserOutlined />
      </BasicAvatar>
    );

  const name = username?.split(" ");

  return (
    <BasicAvatar src={img} className={styles.avatar}>
      <div>
        {name?.[0]?.[0]}
        {name?.[1]?.[0]}
      </div>
    </BasicAvatar>
  );
};

export default Avatar;
