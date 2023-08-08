import { Tag } from "antd";
import cn from "classnames";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

interface TagType {
  title: ReactNode;
  color: string;
  key?: string;
}

interface NestedTagProps {
  tag: TagType;
  nested: TagType[];
}

const NestedTag: FC<NestedTagProps> = ({ tag, nested }) => {
  return (
    <Tag className={styles.tag} color={tag.color}>
      {tag.title}
      {nested.map((t) => (
        <Tag
          className={cn(styles.tag, styles.inner)}
          key={t.key}
          color={t.color}
        >
          {t.title}
        </Tag>
      ))}
    </Tag>
  );
};

export default NestedTag;
