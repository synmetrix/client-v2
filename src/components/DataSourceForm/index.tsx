import DataSourceSelection from "../DataSourceSelection";

import { dbTiles } from "./data";

import type { DataSourceOption } from "../DataSourceSelection";
import type { FC } from "react";

const DataSourceForm: FC = () => {
  const [activeTile, setActiveTile] = useState<DataSourceOption>();

  return (
    <DataSourceSelection
      onChange={setActiveTile}
      value={activeTile}
      options={dbTiles}
    />
  );
};

export default DataSourceForm;
