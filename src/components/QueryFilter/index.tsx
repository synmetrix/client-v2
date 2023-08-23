import { Form, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import type { QueryFilterForm } from "@/types/queryFilter";
import type { DeepPartial } from "@/types/deepPartial";

import styles from "./index.module.less";

import type { FC } from "react";

interface QueryFilterProps {
  dataSources: string[];
  onChange: (data: DeepPartial<QueryFilterForm>) => void;
}

const QueryFilter: FC<QueryFilterProps> = ({ dataSources, onChange }) => {
  const { t } = useTranslation(["logs"]);
  const { control, watch } = useForm<QueryFilterForm>();

  useEffect(() => {
    const subscription = watch((value) => onChange(value));
    return () => subscription.unsubscribe();
  }, [onChange, watch]);

  return (
    <Form layout="vertical">
      <Space size={10}>
        <Input
          className={styles.input}
          control={control}
          name="dataSource"
          placeholder={t("query.filter.select")}
          label={t("query.filter.data_source")}
          fieldType="select"
          options={dataSources.map((d) => ({
            value: d,
            label: d,
          }))}
        />

        <Input
          className={styles.input}
          control={control}
          name="date.from"
          fieldType="date"
          label={t("query.filter.from")}
        />
        <Input
          className={styles.input}
          control={control}
          name="date.to"
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
