import { Collapse, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import cn from "classnames";
import { useResponsive } from "ahooks";

import Button from "@/components/Button";
import NestedTag from "@/components/NestedTag";
import { QUERY_COLORS } from "@/utils/constants/colors";
import type { QueryPreview as QueryPreviewProps } from "@/types/queryPreview";

import ArrowIcon from "@/assets/arrow.svg";

import styles from "./index.module.less";

import type { FC } from "react";

const { Panel } = Collapse;

const QueryPreview: FC<QueryPreviewProps> = ({
  measures,
  dimensions,
  segments,
  timeDimensions,
  order,
}) => {
  const windowSize = useResponsive();
  const isMobile = windowSize.md === false;

  const [activePanel, setActivePanel] = useState<string>();

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

  const renderTags = (colors: string[], content?: string[]) => {
    if (!content) return null;

    return content.map((tag) => {
      const tagSplited = tag.split(".");
      return (
        <NestedTag
          key={JSON.stringify(tag)}
          tag={{ title: tagSplited[0], color: colors[0] }}
          nested={tagSplited.slice(1).map((t, idx) => ({
            title: detectIcon(t),
            color: colors[1],
            key: idx,
          }))}
        />
      );
    });
  };

  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <Button className={styles.collapseBtn} size="small">
          {isActive ? <MinusOutlined /> : <PlusOutlined />}
        </Button>
      )}
      bordered={false}
      className={styles.collapse}
      activeKey={activePanel}
      onChange={(keys) => setActivePanel(keys[0])}
    >
      <Panel
        className={styles.panel}
        header={
          <div
            className={cn(
              !activePanel && !isMobile && styles.headerWrapperDots
            )}
          >
            <Space className={styles.header} size={10} align="center">
              {renderTags(QUERY_COLORS.measure, measures)}
              {!activePanel && (
                <>
                  <span className={styles.tagLabel}>BY</span>
                  {renderTags(QUERY_COLORS.dimension, dimensions)}
                  {renderTags(QUERY_COLORS.timeDimension, timeDimensions)}
                  <span className={styles.tagLabel}>IN</span>
                  {renderTags(QUERY_COLORS.segment, segments)}
                  <span className={styles.tagLabel}>ORDERED BY</span>
                  {renderTags(
                    QUERY_COLORS.order,
                    order?.map((o) => `${o.name}.${o.order}`)
                  )}
                </>
              )}
            </Space>
          </div>
        }
        key={"1"}
      >
        <Space className={styles.collapseInner} direction="vertical" size={10}>
          {(dimensions || timeDimensions) && (
            <Space size={9}>
              <span className={styles.tagLabel}>BY</span>
              {renderTags(QUERY_COLORS.dimension, dimensions)}
              {renderTags(QUERY_COLORS.timeDimension, timeDimensions)}
            </Space>
          )}
          {segments && (
            <Space size={9}>
              <span className={styles.tagLabel}>IN</span>
              {renderTags(QUERY_COLORS.segment, segments)}
            </Space>
          )}

          {order && (
            <Space size={9}>
              <span className={styles.tagLabel}>ORDERED BY</span>
              {renderTags(
                QUERY_COLORS.order,
                order?.map((o) => `${o.name}.${o.order}`)
              )}
            </Space>
          )}
        </Space>
      </Panel>
    </Collapse>
  );
};

export default QueryPreview;
