import type { DataSource } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

interface DataSourceCardProps {
  dataSource: DataSource;
}

const DataSourceTag: FC<DataSourceCardProps> = ({ dataSource }) => {
  return (
    <span className={styles.db}>
      <span className={styles.icon}>{dataSource.icon}</span>
      {dataSource.name}
    </span>
  );
};

export default DataSourceTag;
