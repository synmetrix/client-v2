import { Suspense } from "react";
import { Form, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";

import Input from "@/components/Input";
import AccessSelection from "@/components/AccessSelection";
import AccessController from "@/components/AccessController";
import Button from "@/components/Button";
import type {
  DataAccessOption,
  DataResource,
  DataSourceAccess,
} from "@/types/access";

import styles from "./index.module.less";

import type { FC } from "react";

interface RoleFormType {
  name: string;
  resource: DataSourceAccess;
  access: Record<string, DataAccessOption>;
}

interface RoleFormProps {
  resources: DataResource[];
  dataSourceAccess: DataSourceAccess[];
}

const RoleForm: FC<RoleFormProps> = ({ resources, dataSourceAccess }) => {
  const { t } = useTranslation(["settings", "common"]);

  const { control, handleSubmit, watch } = useForm<RoleFormType>();

  const resource = watch("resource");
  const resourceData = resources.find((r) => r.id === resource?.id);

  return (
    <Form layout="vertical">
      <Space className={styles.space} direction="vertical" size={16}>
        <Input
          control={control}
          name="name"
          label={t("roles_and_access.form.labels.1")}
          rules={{ required: true }}
        />

        <Form.Item
          className={styles.label}
          label={t("roles_and_access.form.labels.2")}
        >
          <Controller
            control={control}
            name="resource"
            render={({ field: { onChange, value } }) => (
              <AccessSelection
                items={dataSourceAccess}
                onSelect={onChange}
                active={value?.id}
              />
            )}
          />
        </Form.Item>

        {resourceData && (
          <Suspense>
            <AccessController
              control={control}
              name="access"
              resource={resourceData}
            />
          </Suspense>
        )}

        <Button
          className={styles.submit}
          type="primary"
          size="large"
          onClick={handleSubmit(console.log)}
        >
          {t("common:words.create")}
        </Button>
      </Space>
    </Form>
  );
};

export default RoleForm;
