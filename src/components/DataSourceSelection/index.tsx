import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

import SearchInput from "@/components/SearchInput";
import FormTile from "@/components/FormTile";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

const { Title, Text } = Typography;

export interface DataSourceOption {
  title: string;
  value: string;
  icon: ReactNode;
}

interface DataSourceSelectionProps {
  options: DataSourceOption[];
  value?: DataSourceOption;
  onChange: (option: DataSourceOption) => void;
}

const DataSourceSelection: FC<DataSourceSelectionProps> = ({
  options,
  onChange,
  value,
}) => {
  const { t } = useTranslation(["dataSourceSelecton"]);

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
      <Row gutter={[16, 16]}>
        {options
          .filter((db) =>
            db.title.toLowerCase().includes(keyword.toLowerCase())
          )
          .map((tile) => (
            <Col key={tile.title} span={4}>
              <FormTile
                title={tile.title}
                icon={tile.icon}
                active={value?.value === tile.value}
                onClick={() => onChange(tile)}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default DataSourceSelection;
