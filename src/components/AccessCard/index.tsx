import { Card, Space } from "antd";
import cn from "classnames";

import DataSourceTag from "@/components/DataSourceTag";
import { AccessTypeWrapper } from "@/components/AccessType";
import type { DataAccessFormOption, DataSourceAccess } from "@/types/access";

import styles from "./index.module.less";

import type { FC } from "react";

interface AccessCardProps extends DataSourceAccess {
  active?: boolean;
  permissions?: DataAccessFormOption;
  onClick?: (access: DataSourceAccess) => void;
}

const AccessCard: FC<AccessCardProps> = ({
  id,
  name,
  access,
  permissions,
  dataSource,
  onClick,
  active,
}) => {
  return (
    <Card
      className={cn(styles.card, { [styles.active]: active })}
      bodyStyle={{ padding: 0 }}
      hoverable
      onClick={() => onClick?.({ id, name, access, dataSource })}
    >
      <Space direction="vertical" size={14}>
        <span className={styles.url}>{name}</span>

        <Space size={29}>
          <AccessTypeWrapper
            access={access}
            dataSourceId={id}
            permissions={permissions}
          />
          <DataSourceTag dataSource={dataSource} />
        </Space>
      </Space>
    </Card>
  );
};

export default AccessCard;
