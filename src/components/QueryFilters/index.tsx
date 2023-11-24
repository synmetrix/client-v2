import { Col, Form, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import type { QueryFiltersForm } from "@/types/queryFilter";
import type { DataSourceInfo } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

interface QueryFiltersProps {
  dataSources?: DataSourceInfo[];
  defaultValues?: Partial<QueryFiltersForm>;
  values?: QueryFiltersForm;
  onChange: (data: QueryFiltersForm) => void;
}

const QueryFilters: FC<QueryFiltersProps> = ({
  dataSources,
  onChange,
  defaultValues = {
    dataSourceId: null,
    from: null,
    to: null,
    sort: null,
  },
  values,
}) => {
  const { t } = useTranslation(["logs"]);
  const { control, watch } = useForm<QueryFiltersForm>({
    defaultValues,
    values,
  });

  useEffect(() => {
    const subscription = watch((value) => onChange(value as QueryFiltersForm));
    return () => subscription.unsubscribe();
  }, [onChange, watch]);

  return (
    <Form layout="vertical">
      <Row gutter={[10, 0]}>
        <Col xs={24} md={12} lg={6} xl={4}>
          <Input
            className={styles.input}
            control={control}
            name="dataSourceId"
            placeholder={t("query.filter.select")}
            label={t("query.filter.data_source")}
            fieldType="select"
            allowClear
            options={dataSources?.map((d) => ({
              value: d.id || "",
              label: d.name,
            }))}
          />
        </Col>

        <Col xs={24} md={12} lg={6} xl={4}>
          <Input
            className={styles.input}
            control={control}
            name="from"
            fieldType="date"
            label={t("query.filter.from")}
            showTime
          />
        </Col>

        <Col xs={24} md={12} lg={6} xl={4}>
          <Input
            className={styles.input}
            control={control}
            name="to"
            fieldType="date"
            label={t("query.filter.to")}
            showTime
          />
        </Col>

        <Col xs={24} md={12} lg={6} xl={4}>
          <Input
            className={styles.input}
            control={control}
            name="sort"
            label={t("query.filter.sort")}
            fieldType="select"
            defaultValue={"asc"}
            allowClear
            options={[
              { value: "asc", label: "Asc" },
              { value: "desc", label: "Desc" },
            ]}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default QueryFilters;
