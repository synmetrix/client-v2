import { Card, Space } from "antd";
import cn from "classnames";

import DataSourceTag from "@/components/DataSourceTag";
import AccessType from "@/components/AccessType";
import type { AccessType as Access } from "@/types/access";
import type { DataSource } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

interface AccessCardProps {
  url: string;
  access: Access;
  dataSource: DataSource;
  active?: boolean;
}

const AccessCard: FC<AccessCardProps> = ({
  url,
  access,
  dataSource,
  active,
}) => {
  return (
    <Card
      className={cn(styles.card, { [styles.active]: active })}
      bodyStyle={{ padding: 0 }}
      hoverable
    >
      <Space direction="vertical" size={14}>
        <span className={styles.url}>{url}</span>

        <Space size={29}>
          <AccessType access={access} />
          <DataSourceTag dataSource={dataSource} />
        </Space>
      </Space>
    </Card>
  );
};

export default AccessCard;
