import { Card, Space } from "antd";
import cn from "classnames";

import DataSourceTag from "@/components/DataSourceTag";
import AccessType from "@/components/AccessType";
import type { DataSourceAccess } from "@/types/access";

import styles from "./index.module.less";

import type { FC } from "react";

interface AccessCardProps extends DataSourceAccess {
  active?: boolean;
  onClick?: (access: DataSourceAccess) => void;
}

const AccessCard: FC<AccessCardProps> = ({
  id,
  url,
  access,
  dataSource,
  onClick,
  active,
}) => {
  return (
    <Card
      className={cn(styles.card, { [styles.active]: active })}
      bodyStyle={{ padding: 0 }}
      hoverable
      onClick={() => onClick?.({ id, url, access, dataSource })}
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
