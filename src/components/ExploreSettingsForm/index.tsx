import { Row, Col, Form, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

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
    <Space direction="horizontal" size={0}>
      <Form id="explore-settings-form" layout="horizontal">
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={12}>
            <Input
              className={s.input}
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
          </Col>
          <Col xs={24} sm={12}>
            <Input
              className={s.input}
              rules={{ required: true }}
              name="offset"
              fieldType="number"
              size="middle"
              min={0}
              control={control}
              addonBefore={t("data_section.offset")}
            />
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default ExploreSettingsForm;
