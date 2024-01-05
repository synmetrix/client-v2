import { Form, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import cn from "classnames";

import Input from "@/components/Input";

import s from "./index.module.less";

import type { FC } from "react";

const MAX_ROWS_LIMIT = 10000;

export interface DataSchemaFormValues {
  limit: number;
  offset: number;
}

interface ExploreSettingsFormProps {
  defaultValues?: DataSchemaFormValues;
  onChange: (value: Partial<DataSchemaFormValues>) => void;
}

const ExploreSettingsForm: FC<ExploreSettingsFormProps> = ({
  defaultValues = {
    limit: 1000,
    offset: 0,
  } as DataSchemaFormValues,
  onChange,
}) => {
  const { t } = useTranslation(["explore", "common"]);

  const { control, watch } = useForm<DataSchemaFormValues>({
    defaultValues,
  });

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      onChange(value);
    });
    return () => unsubscribe();
  }, [onChange, watch]);

  return (
    <Form id="explore-settings-form" layout="vertical">
      <Space>
        <Input
          className={cn(s.input, s.limit)}
          rules={{ required: true }}
          name="limit"
          fieldType="number"
          size="middle"
          min={1}
          addonAfter={null}
          max={MAX_ROWS_LIMIT}
          control={control}
          addonBefore={t("data_section.row_limit")}
        />
        <Input
          className={cn(s.input, s.offset)}
          rules={{ required: true }}
          name="offset"
          fieldType="number"
          size="middle"
          min={0}
          control={control}
          addonBefore={t("data_section.offset")}
        />
      </Space>
    </Form>
  );
};

export default ExploreSettingsForm;
