import { Button, Checkbox, Collapse, Form, Radio, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useResponsive } from "ahooks";
import { Controller, useForm } from "react-hook-form";

import type { DataSource, DynamicForm, Schema } from "@/types/dataSource";

import TableIcon from "@/assets/table.svg";

import SearchInput from "../SearchInput";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface DataModelGenerationProps {
  dataSource: DataSource;
  schema: Schema;
  onSubmit: (data: DynamicForm) => void;
  onGoBack: () => void;
  onSkip: () => void;
  initialValue?: DynamicForm;
}

const options = [
  { label: "JS", value: "js", disabled: false },
  { label: "YML", value: "yml", disabled: false },
];

const DataModelGeneration: FC<DataModelGenerationProps> = ({
  dataSource,
  schema,
  onSubmit,
  onGoBack,
  onSkip,
  initialValue = {
    type: "js",
  },
}) => {
  const { t } = useTranslation(["dataModelGeneration", "common"]);

  const { control, handleSubmit, watch } = useForm<DynamicForm>({
    defaultValues: initialValue,
  });

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
        <Form id="data-model-generation">
          <Collapse
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
                    <Controller
                      name={`${s}->${tb}`}
                      control={control}
                      defaultValue={initialValue[`${s}->${tb}`] ?? "off"}
                      render={({ field: { onChange, value } }) => (
                        <Form.Item
                          className={cn(styles.field)}
                          name={`${s}->${tb}`}
                        >
                          <div>
                            <Checkbox
                              checked={value === "on"}
                              onChange={() =>
                                onChange(value === "on" ? "off" : "on")
                              }
                            >
                              <span
                                className={cn(styles.table, {
                                  [styles.column]: !windowSize.md,
                                })}
                              >
                                <span>{tb}</span>
                                <span className={styles.separator}>→</span>
                                <span>
                                  {tb}.{watch("type")}
                                </span>
                              </span>
                            </Checkbox>
                            <span
                              className={cn(styles.columns, {
                                [styles.block]: !windowSize.md,
                              })}
                            >
                              ({schema[s][tb].length}){" "}
                              {t("common:words.columns")}
                            </span>
                          </div>
                        </Form.Item>
                      )}
                    />
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>

          <Title level={5}>{t("choose_markup")}</Title>

          <Controller
            control={control}
            name={"type"}
            defaultValue={initialValue.type}
            render={({ field: { onChange, value } }) => (
              <Form.Item>
                <Radio.Group
                  className={styles.formatSelection}
                  size="large"
                  optionType="button"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
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
              </Form.Item>
            )}
          />

          <Row>
            <Button
              className={cn(styles.back, { [styles.sm]: !windowSize.sm })}
              size="large"
              color="primary"
              onClick={onGoBack}
            >
              {t("common:words.back")}
            </Button>
            <Button
              className={cn(styles.submit, { [styles.sm]: !windowSize.sm })}
              type="primary"
              size="large"
              htmlType="submit"
              form="data-model-generation"
              onClick={handleSubmit(onSubmit)}
            >
              {t("common:words.generate")}
            </Button>

            <Button
              className={cn(styles.link, styles.skip)}
              type="link"
              onClick={onSkip}
            >
              {t("common:words.skip")}
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default DataModelGeneration;
