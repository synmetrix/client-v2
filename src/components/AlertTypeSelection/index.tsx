import { Col, Row, Space, Typography } from "antd";

import FormTile from "@/components/FormTile";
import StepFormHeader from "@/components/StepFormHeader";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

interface Tile {
  name: string;
  icon: ReactNode;
  value: string;
}

interface AlertTypeSelectionProps {
  options: Tile[];
  onSubmit: (value: Tile) => void;
  initialValue?: Tile;
}

const { Title } = Typography;

const AlertTypeSelection: FC<AlertTypeSelectionProps> = ({
  options,
  initialValue,
  onSubmit,
}) => {
  const [activeTile, setActiveTile] = useState<Tile | undefined>(initialValue);

  const onChange = (value: Tile) => {
    setActiveTile(value);
    if (value) onSubmit(value);
  };

  return (
    <Space className={styles.wrapper} direction="vertical" size={24}>
      <Title className={styles.title} level={3}>
        New Alert
      </Title>
      <Row>
        <div className={styles.header}>
          <StepFormHeader
            numbers={false}
            steps={["Alerts", "New"]}
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
