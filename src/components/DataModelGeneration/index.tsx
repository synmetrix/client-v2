import { Button, Checkbox, Collapse, Form, Radio, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useResponsive } from "ahooks";

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
  schema: Schema;
}

interface Column {
  attributes: [];
  name: string;
  type: string;
}

type Table = Record<string, Column[]>;

type Schema = Record<string, Table>;

const options = [
  { label: "JS", value: "js", disabled: false },
  { label: "YML", value: "yml", disabled: false },
];

const DataModelGeneration: FC<DataModelGenerationProps> = ({
  dataSource,
  schema,
}) => {
  const { t } = useTranslation(["dataModelGeneration"]);

  const windowSize = useResponsive();

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
        <Text>{t("text")}</Text>
        <Title level={5}>{t("title")}</Title>
        <SearchInput
          placeholder="Placeholder"
          value={searchValue}
          onChange={setSearchValue}
        />
        <Form>
          <Collapse
            style={{ color: "red" }}
            className={styles.collapse}
            expandIcon={() => <TableIcon />}
          >
            {Object.keys(schema).map((s) => (
              <Panel
                className={styles.collapse}
                header={<span className={styles.collapseHeader}>{s}</span>}
                key={s}
              >
                {Object.keys(schema[s]).map((tb) => (
                  <div key={tb}>
                    <Form.Item className={cn(styles.field)}>
                      <div>
                        <Checkbox>
                          <span
                            className={cn(styles.table, {
                              [styles.column]: !windowSize.md,
                            })}
                          >
                            <span>{tb}</span>
                            <span className={styles.separator}>→</span>
                            <span>{tb}.js</span>
                          </span>
                        </Checkbox>
                        <span
                          className={cn(styles.columns, {
                            [styles.block]: !windowSize.md,
                          })}
                        >
                          ({schema[s][tb].length}) columns
                        </span>
                      </div>
                    </Form.Item>
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>

          <Title level={5}>{t("choose_markup")}</Title>

          <Radio.Group
            className={styles.formatSelection}
            size="large"
            optionType="button"
          >
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

          <Row>
            <Button
              className={cn(styles.back, { [styles.sm]: !windowSize.sm })}
              size="large"
              color="primary"
            >
              Back
            </Button>
            <Button
              className={cn(styles.submit, { [styles.sm]: !windowSize.sm })}
              form="setup-form"
              type="primary"
              size="large"
              htmlType="submit"
            >
              Generate
            </Button>

            <Button className={cn(styles.link, styles.skip)} type="link">
              Skip
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default DataModelGeneration;
