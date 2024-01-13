import { Form, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import Input from "@/components/Input";
import type { Dataschema } from "@/types/dataschema";

import type { FC } from "react";

const fileTypes = ["yml", "js"];

interface DataSchemaFormValues extends Partial<Dataschema> {
  type: (typeof fileTypes)[number];
}

interface DataSchemaFormProps {
  defaultValues?: Partial<Dataschema>;
  onSubmit: (values: Partial<Dataschema>) => void;
}

const DataSchemaForm: FC<DataSchemaFormProps> = ({
  defaultValues = {
    name: "",
    type: fileTypes[0],
  } as DataSchemaFormValues,
  onSubmit,
}) => {
  const { t } = useTranslation(["common"]);

  const { control, handleSubmit, reset } = useForm<DataSchemaFormValues>({
    defaultValues: {
      name: defaultValues.name?.slice(0, defaultValues.name?.lastIndexOf(".")),
    },
  });

  const onFormSubmit = (data: DataSchemaFormValues) => {
    const name = `${data.name}.${data.type}`;
    onSubmit({ name } as Partial<Dataschema>);
    reset();
  };

  return (
    <Space direction="vertical" size={0}>
      <Form id="dataschema-form" layout="vertical">
        <Input
          rules={{ required: true }}
          name="name"
          control={control}
          label={t("common:words.filename")}
          addonAfter={
            <Input
              name="type"
              fieldType="select"
              control={control}
              defaultValue={defaultValues.name?.slice(
                defaultValues.name?.lastIndexOf(".") + 1
              )}
              options={fileTypes.map((type) => ({
                label: `.${type}`,
                value: type,
              }))}
            />
          }
        />
      </Form>

      <Button
        type="primary"
        htmlType="submit"
        form="dataschema-form"
        onClick={handleSubmit(onFormSubmit)}
      >
        {t("common:words.save")}
      </Button>
    </Space>
  );
};

export default DataSchemaForm;
