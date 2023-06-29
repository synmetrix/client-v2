import { Checkbox, Col, Collapse, Form, Radio, Row, Typography } from "antd";

import TableIcon from "@/assets/table.svg";

import SearchInput from "../SearchInput";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface DataModelGenerationProps {
  dataSource: {
    icon: ReactNode;
    name: string;
  };
}

const items = [
  {
    key: "1",
    label: "default",
    children: (
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <div className={styles.field}>
            <Checkbox>trips {"→"} Trips.js</Checkbox>
          </div>
        </Col>
        <Col span={24}>
          <div className={styles.field}>
            <Checkbox>trips {"→"} Trips.js</Checkbox>
          </div>
        </Col>
      </Row>
    ),
  },
  {
    key: "2",
    label: "default",
    children: (
      <Row>
        <Col span={24}>
          <Form.Item className={styles.field}>
            <Checkbox>trips {"→"} Trips.js</Checkbox>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item className={styles.field}>
            <Checkbox>trips {"→"} Trips.js</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    ),
  },
];

const options = [
  { label: "JS", value: "js" },
  { label: "YML", value: "yml", disabled: true },
];

const DataModelGeneration: FC<DataModelGenerationProps> = ({ dataSource }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.dataSource}>
          <div className={styles.iconWrapper}>{dataSource.icon}</div>
          <Title className={styles.title} level={3}>
            {dataSource.name}
          </Title>
        </div>
        <Text>Simple generate new Data Model Files for your tables</Text>
        <Title level={5}>Select Table</Title>
        <SearchInput
          placeholder="Placeholder"
          value={searchValue}
          onChange={setSearchValue}
        />
        <Form>
          <Collapse
            className={styles.collapse}
            expandIcon={() => <TableIcon />}
          >
            {items.map((i) => (
              <Panel header={i.label} key={i.key}>
                {i.children}
              </Panel>
            ))}
          </Collapse>

          <Title level={5}>Select choose markup</Title>

          <Radio.Group size="large" optionType="button">
            {options.map((o) => (
              <Radio
                className={styles.radio}
                key={o.value}
                value={o.value}
                disabled={o.disabled}
              >
                {o.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form>
      </div>
    </div>
  );
};

export default DataModelGeneration;
