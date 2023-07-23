import { useTranslation } from "react-i18next";
import { Col, Row, Space, Typography } from "antd";
import cn from "classnames";

import AccessType from "@/components/AccessType";
import type { AccessType as Access } from "@/types/access";

import styles from "./index.module.less";

import type { FC } from "react";

interface DataModel {
  title: string;
  access: Access;
}

interface DataModelSelectionProps {
  resource: string;
  dataModels: DataModel[];
  defaultActive?: string;
  onChange?: (activeTitle: string) => void;
}

const { Text } = Typography;

const DataModelSelection: FC<DataModelSelectionProps> = ({
  resource,
  dataModels,
  defaultActive = "",
  onChange,
}) => {
  const { t } = useTranslation(["settings", "common"]);

  const [active, setActive] = useState<string>(defaultActive);

  const onClick = (title: string) => {
    setActive(title);
    onChange?.(title);
  };

  return (
    <Space className={styles.wrapper} direction="vertical" size={16}>
      <Space direction="vertical" size={16}>
        <Text className={styles.title}>{t("common:words.data_models")}</Text>
        <Text className={styles.resource}>{resource}</Text>
      </Space>

      <Space className={styles.dataModels} direction="vertical" size={8}>
        {dataModels.map((d) => (
          <Row
            className={cn(styles.dataModel, {
              [styles.active]: active === d.title,
            })}
            key={d.title}
            justify="space-between"
            onClick={() => onClick(d.title)}
          >
            <Col span={12}>{d.title}</Col>
            <Col span={12} className={styles.accessType}>
              <AccessType access={d.access} />
            </Col>
          </Row>
        ))}
      </Space>
    </Space>
  );
};

export default DataModelSelection;
