import DataSourceSelection from "@/components/DataSourceSelection";
import type { DataSourceOption } from "@/components/DataSourceSelection";

import { dbTiles } from "./data";

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
