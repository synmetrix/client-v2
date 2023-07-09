import { Collapse, Form, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useResponsive } from "ahooks";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import type { DataSource, DynamicForm, Schema } from "@/types/dataSource";
import SearchInput from "@/components/SearchInput";
import TableSelection from "@/components/TableSelection";
import Button from "@/components/Button";

import TableIcon from "@/assets/table.svg";

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
            {Object.keys(schema)
              .filter(
                (s) =>
                  s.includes(searchValue) ||
                  Object.keys(schema[s]).some((tb) => tb.includes(searchValue))
              )
              .map((s) => (
                <Panel
                  className={styles.collapse}
                  header={<span className={styles.collapseHeader}>{s}</span>}
                  key={s}
                >
                  <TableSelection
                    control={control}
                    type={watch("type")}
                    schema={schema}
                    path={s}
                    initialValue={initialValue}
                  />
                </Panel>
              ))}
          </Collapse>

          <Title level={5}>{t("choose_markup")}</Title>

          <Input
            control={control}
            name="type"
            defaultValue={initialValue.type}
            fieldType="radio"
            optionType="button"
            options={options}
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
