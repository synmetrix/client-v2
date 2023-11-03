import { Col, Collapse, Empty, Form, Row, Spin, Typography } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useResponsive } from "ahooks";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import type {
  DataSource,
  DataSourceInfo,
  DynamicForm,
  Schema,
} from "@/types/dataSource";
import SearchInput from "@/components/SearchInput";
import TableSelection from "@/components/TableSelection";
import Button from "@/components/Button";

import TableIcon from "@/assets/table.svg";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface DataModelGenerationProps {
  dataSource: DataSource | DataSourceInfo;
  schema: Schema | undefined;
  isOnboarding: boolean;
  onSubmit: (data: DynamicForm) => void;
  onGoBack?: () => void;
  onSkip?: () => void;
  initialValue?: DynamicForm;
  loading?: boolean;
}

const options = [
  { label: "YAML", value: "yaml", disabled: false },
  { label: "JS", value: "js", disabled: false },
];

const DataModelGeneration: FC<DataModelGenerationProps> = ({
  dataSource,
  schema,
  onSubmit,
  onGoBack,
  onSkip,
  isOnboarding = false,
  initialValue = {
    type: "js",
  },
  loading,
}) => {
  const { t } = useTranslation(["dataModelGeneration", "common"]);

  const { control, handleSubmit, watch } = useForm<DynamicForm>({
    values: initialValue,
  });

  const windowSize = useResponsive();

  const [searchValue, setSearchValue] = useState<string>("");

  const getCount = (val: DynamicForm, key: string) => {
    if (val[key]) {
      return Object.keys(val[key]).filter((k) => val?.[key]?.[k] === true)
        .length;
    } else {
      return 0;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.dataSource}>
          {"icon" in dataSource && (
            <div className={styles.iconWrapper}>{dataSource.icon}</div>
          )}
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
        <Spin spinning={loading}>
          <Form id="data-model-generation">
            {schema ? (
              <Collapse
                className={styles.collapse}
                expandIcon={() => <TableIcon />}
              >
                {Object.keys(schema)
                  .filter(
                    (s) =>
                      s.includes(searchValue) ||
                      Object.keys(schema[s]).some((tb) =>
                        tb.includes(searchValue)
                      )
                  )
                  .map((s) => {
                    const count = getCount(watch(), s);

                    return (
                      <Panel
                        className={styles.collapse}
                        header={
                          <span className={styles.collapseHeader}>
                            {s} {count > 0 && <span>({count})</span>}
                          </span>
                        }
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
                    );
                  })}
              </Collapse>
            ) : (
              <Empty />
            )}

            <div className={styles.markupSelection}>
              <Title level={5}>{t("choose_markup")}</Title>

              <Input
                control={control}
                name="type"
                defaultValue={initialValue.type || "yaml"}
                fieldType="radio"
                optionType="button"
                options={options}
              />
            </div>

            <Row align="middle" justify={"space-between"}>
              <Col xs={24} md={18}>
                {isOnboarding && (
                  <Button
                    className={cn(styles.back, {
                      [styles.fullwidth]: !windowSize.md,
                    })}
                    size="large"
                    color="primary"
                    onClick={onGoBack}
                  >
                    {t("common:words.back")}
                  </Button>
                )}
                <Button
                  className={cn(styles.submit, {
                    [styles.fullwidth]: !windowSize.md,
                  })}
                  type="primary"
                  size="large"
                  htmlType="submit"
                  form="data-model-generation"
                  onClick={handleSubmit(onSubmit)}
                >
                  {t("common:words.generate")}
                </Button>
              </Col>

              {isOnboarding && (
                <Col
                  xs={24}
                  md={6}
                  className={cn(styles.skip, {
                    [styles.center]: !windowSize.md,
                  })}
                >
                  <Button
                    className={cn(styles.link, {
                      [styles.fullwidth]: !windowSize.md,
                    })}
                    type="link"
                    onClick={onSkip}
                  >
                    {t("common:words.skip")}
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default DataModelGeneration;
