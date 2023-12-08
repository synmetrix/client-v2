import { Avatar as BasicAvatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import cn from "classnames";

import styles from "./index.module.less";

import type { FC } from "react";

interface AvatarProps {
  className?: string;
  username?: string | null;
  img?: string | null;
  width?: number;
  height?: number;
  color?: string;
}

const Avatar: FC<AvatarProps> = ({
  username,
  img,
  width,
  height,
  color,
  className,
}) => {
  if (!username && !img)
    return (
      <BasicAvatar
        style={{ width, height, background: color }}
        className={cn(styles.avatar, className)}
      >
        <UserOutlined />
      </BasicAvatar>
    );

  const name = username?.split(" ");

  return (
    <BasicAvatar
      style={{
        minWidth: width,
        width,
        minHeight: height,
        height,
        background: color,
      }}
      src={img}
      className={cn(styles.avatar, className)}
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
