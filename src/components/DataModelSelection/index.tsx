import { useTranslation } from "react-i18next";
import { Col, Row, Space, Typography } from "antd";
import cn from "classnames";

import AccessType from "@/components/AccessType";
import type { DataModelOption } from "@/types/access";

import styles from "./index.module.less";

import type { FC } from "react";

const { Paragraph } = Typography;

interface DataModelSelectionProps {
  title: string;
  dataModels: DataModelOption[];
  active?: string;
  onChange?: (activeTitle: string) => void;
}

const { Text } = Typography;

const DataModelSelection: FC<DataModelSelectionProps> = ({
  title,
  dataModels,
  active = "",
  onChange,
}) => {
  const { t } = useTranslation(["settings", "common"]);

  const onClick = (activeTitle: string) => {
    onChange?.(activeTitle);
  };

  return (
    <Space className={styles.wrapper} direction="vertical" size={16}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Text className={styles.title}>{t("common:words.data_models")}</Text>
        <Paragraph ellipsis className={styles.resource}>
          {title}
        </Paragraph>
      </Space>

      <Space className={styles.dataModels} direction="vertical" size={8}>
        {(dataModels || []).map((d) => (
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
