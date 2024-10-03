import { Form, Row, Col, Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import Button from "@/components/Button";
import type { CredentialsFormType } from "@/types/credential";
import type { DataSourceInfo } from "@/types/dataSource";
import type { Member } from "@/types/team";
import { Access_Types_Enum } from "@/graphql/generated";
import CurrentUserStore from "@/stores/CurrentUserStore";

interface CredentialsFormProps {
  initialValue?: CredentialsFormType;
  members?: Member[];
  dataSources?: DataSourceInfo[];
  onSubmit?: (data: CredentialsFormType) => void;
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  initialValue,
  members,
  dataSources,
  onSubmit = () => {},
}) => {
  const { currentUser } = CurrentUserStore();
  const { t } = useTranslation(["common", "credentialsForm"]);
  const { control, handleSubmit, watch } = useForm<CredentialsFormType>({
    values: initialValue,
  });

  const accessType = watch("accessType");
  const isSpecificUsers = accessType === Access_Types_Enum.SpecificUsers;

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Input
            rules={{ required: true }}
            label={t("common:form.labels.data_source")}
            control={control}
            name="dataSourceId"
            fieldType="select"
            placeholder={t("common:form.placeholders.choose_data_source")}
            options={(dataSources || []).map((ds) => ({
              label: ds.name,
              value: ds.id as string,
            }))}
            defaultValue={initialValue?.dataSourceId}
            disabled={!!initialValue?.id}
          />
        </Col>

        <Col span={24} md={12}>
          <Input
            rules={{ required: true }}
            label={t("common:form.labels.name")}
            control={control}
            name="name"
            fieldType="text"
            placeholder={t("common:form.placeholders.name")}
            defaultValue={
              initialValue?.name || (currentUser?.displayName as string)
            }
            disabled={true}
          />
        </Col>

        <Col span={24} md={12}>
          <Input
            rules={{ required: true }}
            label={t("common:form.labels.username")}
            control={control}
            name="username"
            placeholder={t("common:form.placeholders.login")}
            defaultValue={initialValue?.username}
          />
        </Col>

        <Col span={24} md={12}>
          <Input
            rules={{ required: false }}
            label={t("common:form.labels.password")}
            control={control}
            name="password"
            fieldType="password"
            placeholder={t("common:form.placeholders.password")}
            defaultValue={initialValue?.password}
          />
        </Col>

        <Col span={24} md={12}>
          <Input
            rules={{ required: true }}
            label={t("common:form.labels.access_type")}
            control={control}
            name="accessType"
            fieldType="select"
            placeholder={t("common:form.placeholders.choose_access_type")}
            options={Object.values(Access_Types_Enum).map((type) => ({
              label: t(`common:words.${type}`),
              value: type,
            }))}
            defaultValue={Access_Types_Enum.Private}
          />
        </Col>

        {isSpecificUsers && (
          <Col span={24} md={12}>
            <Input
              rules={{ required: true }}
              label={t("common:form.labels.team_members")}
              control={control}
              name="members"
              mode="multiple"
              fieldType="select"
              placeholder={t("common:form.placeholders.choose_team_members")}
              options={members?.map((member) => ({
                label: member.displayName,
                value: member.id,
              }))}
              defaultValue={initialValue?.members}
            />
          </Col>
        )}
      </Row>

      <Alert
        style={{ marginBottom: 16 }}
        message={
          Access_Types_Enum.Shared === accessType
            ? t("credentialsForm:shared_access_type_description")
            : Access_Types_Enum.SpecificUsers === accessType
            ? t("credentialsForm:specific_users_access_type_description")
            : Access_Types_Enum.Private === accessType
            ? t("credentialsForm:private_access_type_description")
            : ""
        }
        type="info"
      />

      <Button type="primary" htmlType="submit">
        {initialValue?.id ? t("common:words.apply") : t("common:words.create")}
      </Button>
    </Form>
  );
};

export default CredentialsForm;
