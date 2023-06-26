import { Typography } from "antd";

import FormTile from "../FormTile";
import SearchInput from "../SearchInput";

import { dbTiles } from "./data";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

const DataSourceForm: FC = () => {
  const [activeTile, setActiveTile] = useState<string>();
  const [keyword, setKeyword] = useState<string>("");

  return (
    <div className={styles.wrapper}>
      <Title level={3}>New Data Source</Title>
      <Text>Spin up your deployment to start configuring your</Text>
      <Title level={5}>Select Data Source</Title>
      <SearchInput
        value={keyword}
        onChange={setKeyword}
        placeholder="Placeholder"
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
