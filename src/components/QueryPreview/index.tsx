import { Collapse, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";

import Button from "@/components/Button";
import QueryTags from "@/components/QueryTags";
import type { QueryState } from "@/types/queryState";

import styles from "./index.module.less";

import type { FC } from "react";

const { Panel } = Collapse;

const QueryPreview: FC<QueryState & { withButton?: boolean }> = ({
  measures,
  dimensions,
  segments,
  timeDimensions,
  order,
  withButton = true,
}) => {
  const { t } = useTranslation(["alerts", "common"]);
  const windowSize = useResponsive();
  const isMobile = windowSize.md === false;

  const [activePanel, setActivePanel] = useState<string>();

  const isShown = (val?: any) => (Array.isArray(val) ? val.length > 0 : !!val);

  const getCount = (arr: any[]) => {
    return arr.reduce((res, a) => (a?.length ? res + a.length : res), 0);
  };

  const isCollapsible =
    getCount([measures, dimensions, order, timeDimensions, segments]) >= 2;

  const wrapTags = activePanel === "1";

  return (
    <Collapse
      expandIcon={({ isActive }) =>
        withButton &&
        isCollapsible && (
          <Button className={styles.collapseBtn} size="small">
            {isActive ? <MinusOutlined /> : <PlusOutlined />}
          </Button>
        )
      }
      bordered={false}
      className={cn(styles.collapse, !isCollapsible && styles.collapseDisabled)}
      activeKey={activePanel}
      onChange={(keys) => setActivePanel(keys[0])}
    >
      <Panel
        className={cn(styles.panel)}
        collapsible={!isCollapsible ? "disabled" : undefined}
        header={
          <div
            className={cn(
              !activePanel &&
                !isMobile &&
                !isCollapsible &&
                styles.headerWrapperDots
            )}
          >
            <Space className={styles.header} size={10} align="center">
              <QueryTags content={measures} type="measure" />
              {!activePanel && (
                <>
                  {(isShown(dimensions) || isShown(timeDimensions)) && (
                    <>
                      <span className={styles.tagLabel}>
                        {t("common:words.by")}
                      </span>
                      <QueryTags content={dimensions} type="dimension" />
                      <QueryTags
                        content={timeDimensions}
                        type="timeDimension"
                      />
                    </>
                  )}
                  {isShown(segments) && (
                    <>
                      <span className={styles.tagLabel}>
                        {t("common:words.in")}
                      </span>
                      <QueryTags content={segments} type="segment" />
                    </>
                  )}
                  {isShown(order) && (
                    <>
                      <span className={styles.tagLabel}>
                        {t("common:words.ordered_by")}
                      </span>
                      <QueryTags content={order} type="order" />
                    </>
                  )}
                </>
              )}
            </Space>
          </div>
        }
        key={"1"}
      >
        <Space className={styles.collapseInner} direction="vertical" size={10}>
          {(isShown(dimensions) || isShown(timeDimensions)) && (
            <Space size={9} wrap>
              <span className={styles.tagLabel}>{t("common:words.by")}</span>
              <QueryTags
                content={dimensions}
                type="dimension"
                wrap={wrapTags}
              />
              <QueryTags
                content={timeDimensions}
                type="timeDimension"
                wrap={wrapTags}
              />
            </Space>
          )}
          {isShown(segments) && (
            <Space size={9} wrap>
              <span className={styles.tagLabel}>{t("common:words.in")}</span>
              <QueryTags content={segments} type="segment" wrap={wrapTags} />
            </Space>
          )}

          {isShown(order) && (
            <Space size={9} wrap>
              <span className={styles.tagLabel}>
                {t("common:words.ordered_by")}
              </span>
              <QueryTags content={order} type="order" wrap={wrapTags} />
            </Space>
          )}
        </Space>
      </Panel>
    </Collapse>
  );
};

export default QueryPreview;
