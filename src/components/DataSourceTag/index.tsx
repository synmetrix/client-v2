import type { DataSource } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

interface DataSourceCardProps {
  dataSource: DataSource;
}

const DataSourceTag: FC<DataSourceCardProps> = ({ dataSource }) => {
  return (
    <div className={styles.db}>
      <div className={styles.icon}>{dataSource.icon}</div>
      {dataSource.name}
    </div>
  );
};

export default DataSourceTag;
