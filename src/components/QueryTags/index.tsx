import { Space } from "antd";

import NestedTag from "@/components/NestedTag";
import { QUERY_COLORS } from "@/utils/constants/colors";

import ArrowIcon from "@/assets/arrow.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface QueryTagsProps {
  content?: string[];
  type: keyof typeof QUERY_COLORS;
}

const QueryTags: FC<QueryTagsProps> = ({ content, type }) => {
  const detectIcon = (title: string) => {
    switch (title) {
      case "asc":
        return <ArrowIcon />;
      case "desc":
        return <ArrowIcon className={styles.arrowDown} />;
      default:
        return title;
    }
  };

  return (
    <Space size={10}>
      {content?.map((tag) => {
        const tagSplited = tag.split(".");
        return (
          <NestedTag
            key={JSON.stringify(tag)}
            tag={{ title: tagSplited[0], color: QUERY_COLORS[type][0] }}
            nested={tagSplited.slice(1).map((t, idx) => ({
              title: detectIcon(t),
              color: QUERY_COLORS[type][1],
              key: idx,
            }))}
          />
        );
      })}
    </Space>
  );
};

export default QueryTags;
