import { Collapse, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import cn from "classnames";
import { useResponsive } from "ahooks";

import Button from "@/components/Button";
import QueryTags from "@/components/QueryTags";
import type { QueryPreview as QueryPreviewProps } from "@/types/queryPreview";

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
              <QueryTags content={measures} type="measure" />
              {!activePanel && (
                <>
                  <span className={styles.tagLabel}>BY</span>
                  <QueryTags content={dimensions} type="dimension" />
                  <QueryTags content={timeDimensions} type="timeDimension" />
                  <span className={styles.tagLabel}>IN</span>
                  <QueryTags content={segments} type="segment" />
                  <span className={styles.tagLabel}>ORDERED BY</span>
                  <QueryTags
                    content={order?.map((o) => `${o.name}.${o.order}`)}
                    type="order"
                  />
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
              <QueryTags content={dimensions} type="dimension" />
              <QueryTags content={timeDimensions} type="timeDimension" />
            </Space>
          )}
          {segments && (
            <Space size={9}>
              <span className={styles.tagLabel}>IN</span>
              <QueryTags content={segments} type="segment" />
            </Space>
          )}

          {order && (
            <Space size={9}>
              <span className={styles.tagLabel}>ORDERED BY</span>
              <QueryTags
                content={order?.map((o) => `${o.name}.${o.order}`)}
                type="order"
              />
            </Space>
          )}
        </Space>
      </Panel>
    </Collapse>
  );
};

export default QueryPreview;
