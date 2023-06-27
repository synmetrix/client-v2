import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import FormTile from "../FormTile";
import SearchInput from "../SearchInput";

import { dbTiles } from "./data";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const DataSourceForm: FC = () => {
  const { t } = useTranslation(["dataSourceForm"]);

  const [activeTile, setActiveTile] = useState<string>();
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
      <div className={styles.tiles}>
        {dbTiles
          .filter((db) =>
            db.title.toLowerCase().includes(keyword.toLowerCase())
          )
          .map(({ title, Icon }) => (
            <FormTile
              key={title}
              title={title}
              icon={<Icon />}
              active={activeTile === title}
              onClick={setActiveTile}
            />
          ))}
      </div>
    </div>
  );
};

export default DataSourceForm;
