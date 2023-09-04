import { Avatar as BasicAvatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import styles from "./index.module.less";

import type { FC } from "react";

interface AvatarProps {
  username?: string | null;
  img?: string | null;
  width?: number;
  height?: number;
  color?: string;
}

const Avatar: FC<AvatarProps> = ({ username, img, width, height, color }) => {
  if (!username && !img)
    return (
      <BasicAvatar
        style={{ width, height, background: color }}
        className={styles.avatar}
      >
        <UserOutlined />
      </BasicAvatar>
    );

  const name = username?.split(" ");

  return (
    <BasicAvatar
      style={{ width, height, background: color }}
      src={img}
      className={styles.avatar}
    >
      <div>
        {name?.[0]?.[0]}
        {name?.[1]?.[0]}
      </div>
    </BasicAvatar>
  );
};

export default Avatar;

export const AvatarGroup = BasicAvatar.Group;
