import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useResponsive, useSize } from "ahooks";

import SearchInput from "@/components/SearchInput";
import FormTile from "@/components/FormTile";
import Button from "@/components/Button";
import type { DataSource } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const TILE_WIDTH = 103;
const TILE_GAP = 8 * 2;

interface DataSourceSelectionProps {
  options: DataSource[];
  initialValue?: DataSource;
  onSkip?: () => void;
  onSubmit?: (option: DataSource) => void;
}

const DataSourceSelection: FC<DataSourceSelectionProps> = ({
  options,
  initialValue,
  onSkip,
  onSubmit,
}) => {
  const { t } = useTranslation(["dataSourceSelecton", "common"]);
  const windowSize = useResponsive();
  const tilesContainer = useRef(null);

  const tilesContainerSize = useSize(tilesContainer.current);
  const [keyword, setKeyword] = useState<string>("");

  const rowWidth = useMemo(() => {
    if (tilesContainerSize?.width) {
      const tileSize = TILE_WIDTH + TILE_GAP;
      const tiles = Math.floor((tilesContainerSize?.width + 2) / tileSize);
      return tiles * tileSize;
    }
  }, [tilesContainerSize?.width]);

  return (
    <div className={styles.wrapper}>
      <Title level={3} style={{ marginTop: 0 }}>
        {t("title")}
      </Title>
      <Text>{t("text")}</Text>
      <Title level={5}>{t("subtitle")}</Title>
      <SearchInput
        value={keyword}
        onChange={setKeyword}
        placeholder={t("search_placeholder")}
      />
      <div className={styles.tilesWrapper} ref={tilesContainer}>
        <Row
          className={styles.tiles}
          style={{ width: rowWidth }}
          gutter={[TILE_GAP, TILE_GAP]}
          justify={"start"}
        >
          {options
            .filter((db) =>
              db.name?.toLowerCase().includes(keyword.toLowerCase())
            )
            .map((tile) => (
              <Col className={styles.tile} key={tile.name}>
                <FormTile
                  title={tile.name || ""}
                  icon={tile.icon}
                  active={initialValue?.value === tile.value}
                  onClick={() => onSubmit?.(tile)}
                />
              </Col>
            ))}
        </Row>
      </div>

      <Row align="middle" justify="space-between">
        <Col xs={24} md={18}>
          <Button
            className={cn(styles.submit, {
              [styles.fullwidth]: !windowSize.md,
            })}
            type="primary"
            size="large"
            htmlType="submit"
            onClick={() => initialValue && onSubmit?.(initialValue)}
          >
            {t("common:words.next")}
          </Button>
        </Col>

        {!!onSkip && (
          <Col
            xs={24}
            md={6}
            className={cn(styles.skip, {
              [styles.center]: !windowSize.md,
            })}
          >
            <Button
              className={cn(styles.link, {
                [styles.fullwidth]: !windowSize.md,
              })}
              type="link"
              onClick={onSkip}
            >
              {t("common:words.skip")}
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default DataSourceSelection;
