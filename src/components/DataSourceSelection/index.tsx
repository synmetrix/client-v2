import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useResponsive } from "ahooks";

import SearchInput from "@/components/SearchInput";
import FormTile from "@/components/FormTile";
import Button from "@/components/Button";
import type { DataSource } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

interface DataSourceSelectionProps {
  options: DataSource[];
  initialValue?: DataSource;
  onSubmit: (option: DataSource) => void;
}

const DataSourceSelection: FC<DataSourceSelectionProps> = ({
  options,
  onSubmit,
  initialValue,
}) => {
  const { t } = useTranslation(["dataSourceSelecton", "common"]);
  const windowSize = useResponsive();

  const [activeTile, setActiveTile] = useState<DataSource | undefined>(
    initialValue
  );
  const [keyword, setKeyword] = useState<string>("");

  return (
    <div className={styles.wrapper}>
      <Title level={3}>{t("title")}</Title>
      <Text>{t("text")}</Text>
      <Title level={5}>{t("subtitle")}</Title>
      <SearchInput
        value={keyword}
        onChange={setKeyword}
        placeholder={t("search_placeholder")}
      />
      <Row className={styles.tiles} gutter={[16, 16]} justify={"center"}>
        {options
          .filter((db) => db.name.toLowerCase().includes(keyword.toLowerCase()))
          .map((tile) => (
            <Col className={styles.tile} key={tile.name} span={4}>
              <FormTile
                title={tile.name}
                icon={tile.icon}
                active={activeTile?.value === tile.value}
                onClick={() => setActiveTile(tile)}
              />
            </Col>
          ))}
      </Row>

      <Row align="middle" justify="space-between">
        <Col xs={24} md={18}>
          <Button
            className={cn(styles.submit, {
              [styles.fullwidth]: !windowSize.md,
            })}
            type="primary"
            size="large"
            htmlType="submit"
            onClick={() => activeTile && onSubmit(activeTile)}
          >
            {t("common:words.next")}
          </Button>
        </Col>

        <Col
          xs={24}
          md={6}
          className={cn(styles.skip, { [styles.center]: !windowSize.md })}
        >
          <Button
            className={cn(styles.link, {
              [styles.fullwidth]: !windowSize.md,
            })}
            type="link"
          >
            {t("common:words.skip")}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DataSourceSelection;
