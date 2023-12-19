import { Suspense } from "react";
import { Form, Space, Spin, Empty } from "antd";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";

import Input from "@/components/Input";
import AccessSelection from "@/components/AccessSelection";
import AccessController from "@/components/AccessController";
import Button from "@/components/Button";
import NoDataSource from "@/components/NoDataSource";
import useLocation from "@/hooks/useLocation";
import { useFetchMetaQuery } from "@/graphql/generated";
import type {
  DataResource,
  DataSourceAccess,
  Option,
  RoleForm as RoleFormType,
} from "@/types/access";
import type { Cube } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

interface RoleFormProps {
  resources?: DataResource[];
  dataSourceAccess: DataSourceAccess[];
  initialValues?: RoleFormType;
  onSubmit: (data: RoleFormType) => void;
}

const cubesToNames = (cubes: Cube[]): Option[] =>
  cubes.map((c: any) => ({ label: c.shortTitle, value: c.name }));

export const prepareResourceData = (
  data: Cube[],
  resource: DataSourceAccess | undefined
) => {
  return {
    id: resource?.id,
    title: resource?.name,
    dataModels: (data || []).map((c: any) => ({
      title: c.name,
      measures: cubesToNames(c.measures || []),
      dimensions: cubesToNames(c.dimensions || []),
      segments: cubesToNames(c.segments || []),
    })),
  };
};

const RoleForm: FC<RoleFormProps> = ({
  resources,
  dataSourceAccess,
  initialValues,
  onSubmit,
}) => {
  const { t } = useTranslation(["settings", "common"]);
  const [, setLocation] = useLocation();

  const { control, handleSubmit, setValue, watch } = useForm<RoleFormType>({
    values: initialValues,
  });

  const resource = watch("resource");
  const [metaData, execMetaQuery] = useFetchMetaQuery({
    variables: {
      datasource_id: resource?.id,
    },
    pause: true,
  });
  const resourceData = useMemo(() => {
    if (resources?.length) {
      return resources.find((r) => r.id === resource?.id);
    }

    return prepareResourceData(metaData.data?.fetch_meta?.cubes, resource);
  }, [metaData.data?.fetch_meta, resource, resources]);

  const accessWatch = watch("access");

  useEffect(() => {
    if (!resources?.length && resource?.id) {
      execMetaQuery();
    }
  }, [execMetaQuery, resources?.length, resource?.id]);

  useEffect(() => {
    if (dataSourceAccess?.length) {
      setValue("resource", dataSourceAccess[0]);
    }
  }, [dataSourceAccess, setValue]);

  const emptyScreen = useMemo(() => {
    if (!dataSourceAccess?.length) {
      return (
        <NoDataSource onConnect={() => setLocation("/settings/sources/new")} />
      );
    }

    return (
      <div>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t("roles_and_access.models_not_found")}
        >
          <Button
            type="primary"
            className={styles.btn}
            onClick={() => setLocation("/models")}
          >
            {t("common:words.generate")}
          </Button>
        </Empty>
      </div>
    );
  }, [dataSourceAccess?.length, setLocation, t]);

  return (
    <Spin spinning={metaData.fetching}>
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
                  permissions={accessWatch}
                  onSelect={onChange}
                  active={value?.id}
                />
              )}
            />
          </Form.Item>

          {!!resourceData?.dataModels?.length && (
            <>
              <Suspense>
                <AccessController
                  control={control}
                  name="access"
                  resource={resourceData as DataResource}
                />
              </Suspense>
            </>
          )}

          {!dataSourceAccess?.length ? (
            emptyScreen
          ) : (
            <Button
              className={styles.submit}
              type="primary"
              size="large"
              onClick={handleSubmit(onSubmit)}
              disabled={!resourceData?.dataModels?.length}
            >
              {initialValues
                ? t("common:words.save")
                : t("common:words.create")}
            </Button>
          )}
        </Space>
      </Form>
    </Spin>
  );
};

export default RoleForm;
