import { Col, Row, Space } from "antd";
import { useTranslation } from "react-i18next";

import FormTile from "@/components/FormTile";
import StepFormHeader from "@/components/StepFormHeader";
import type { Tile } from "@/types/formTile";

import styles from "./index.module.less";

import type { FC } from "react";

interface AlertTypeSelectionProps {
  type?: "alert" | "report";
  options: Tile[];
  onSubmit: (value: Tile) => void;
  initialValue?: Tile;
}

const AlertTypeSelection: FC<AlertTypeSelectionProps> = ({
  type = "alert",
  options,
  initialValue,
  onSubmit,
}) => {
  const { t } = useTranslation(["common"]);

  const [activeTile, setActiveTile] = useState<Tile | undefined>(initialValue);

  const onChange = (value: Tile) => {
    setActiveTile(value);
    if (value) onSubmit(value);
  };

  return (
    <Space className={styles.wrapper} direction="vertical" size={24}>
      <Row>
        <div className={styles.header}>
          <StepFormHeader
            numbers={false}
            steps={[
              type === "alert" ? t("words.alerts") : t("words.reports"),
              t("words.new"),
            ]}
            currentStep={0}
          />
        </div>
      </Row>
      <Row className={styles.tiles} gutter={[16, 16]}>
        {options.map((tile) => (
          <Col className={styles.tile} key={tile.name} span={4}>
            <FormTile
              title={tile.name}
              icon={tile.icon}
              active={activeTile?.value === tile.value}
              onClick={() => onChange(tile)}
            />
          </Col>
        ))}
      </Row>
    </Space>
  );
};

export default AlertTypeSelection;
