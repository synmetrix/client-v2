import { Space } from "antd";

import NestedTag from "@/components/NestedTag";
import { QUERY_COLORS } from "@/utils/constants/colors";
import type { QueryState } from "@/types/queryState";

import ArrowIcon from "@/assets/arrow.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface QueryTagsProps {
  content?: QueryState[keyof QueryState];
  type: keyof typeof QUERY_COLORS;
  wrap?: boolean;
  direction?: "vertical" | "horizontal";
}

const QueryTags: FC<QueryTagsProps> = ({
  content,
  type,
  wrap = false,
  direction = "horizontal",
}) => {
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

  if (!content) return null;

  return (
    <Space size={10} wrap={wrap} direction={direction}>
      {Array.isArray(content)
        ? content?.map((tag) => {
            let tagSplited: string[] = [];

            // it needs to be refactored according to actual queryState structure and type of QueryTagsProps
            if (typeof tag === "string") {
              tagSplited = tag?.split(".");
            } else if (type === "order") {
              tagSplited = [tag.id, tag.desc ? "asc" : "desc"];
            } else {
              tagSplited = `${tag?.dimension || ""}.${
                tag?.granularity || ""
              }`.split(".");
            }

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
          })
        : Object.entries(content).map(([key, value]) => {
            const tagSplited: string[] = `${key}.${value}`.split(".");

            return (
              <NestedTag
                key={JSON.stringify(key)}
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
