import { Avatar as AntAvatar } from "antd";
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
      <AntAvatar className={styles.avatar}>
        <UserOutlined />
      </AntAvatar>
    );

  const name = username?.split(" ");

  return (
    <AntAvatar src={img} className={styles.avatar}>
      <div>
        {name?.[0]?.[0]}
        {name?.[1]?.[0]}
      </div>
    </AntAvatar>
  );
};

export default Avatar;
