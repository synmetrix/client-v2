import { Form, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import type { QueryFilterForm } from "@/types/queryFilter";
import type { DataSourceInfo } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

interface QueryFilterProps {
  dataSources: DataSourceInfo[];
  defaultValues?: Partial<QueryFilterForm>;
  values?: QueryFilterForm;
  onChange: (data: QueryFilterForm) => void;
}

const QueryFilter: FC<QueryFilterProps> = ({
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
  const { control, watch } = useForm<QueryFilterForm>({
    defaultValues,
    values,
  });

  useEffect(() => {
    const subscription = watch((value) => onChange(value as QueryFilterForm));
    return () => subscription.unsubscribe();
  }, [onChange, watch]);

  return (
    <Form layout="vertical">
      <Space size={10}>
        <Input
          className={styles.input}
          control={control}
          name="dataSourceId"
          placeholder={t("query.filter.select")}
          label={t("query.filter.data_source")}
          fieldType="select"
          options={dataSources.map((d) => ({
            value: d.id || "",
            label: d.name,
          }))}
        />

        <Input
          className={styles.input}
          control={control}
          name="from"
          fieldType="date"
          label={t("query.filter.from")}
        />
        <Input
          className={styles.input}
          control={control}
          name="to"
          fieldType="date"
          label={t("query.filter.to")}
        />

        <Input
          className={styles.input}
          control={control}
          name="sort"
          label={t("query.filter.sort")}
          fieldType="select"
          defaultValue={"asc"}
          options={[
            { value: "asc", label: "Asc" },
            { value: "desc", label: "Desc" },
          ]}
        />
      </Space>
    </Form>
  );
};

export default QueryFilter;
