import { Form, Row, Col, Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import Button from "@/components/Button";
import type { CredentialsFormType } from "@/types/credential";
import type { DataSourceInfo } from "@/types/dataSource";
import { Roles, type Member } from "@/types/team";
import { Access_Types_Enum } from "@/graphql/generated";
import CurrentUserStore from "@/stores/CurrentUserStore";

interface CredentialsFormProps {
  initialValue?: CredentialsFormType;
  allMembers?: Member[];
  dataSources?: DataSourceInfo[];
  onSubmit?: (data: CredentialsFormType) => void;
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  initialValue,
  allMembers,
  dataSources,
  onSubmit = () => {},
}) => {
  const { currentUser, currentTeam } = CurrentUserStore();
  const { t } = useTranslation(["common", "settings"]);
  const { control, handleSubmit, watch } = useForm<CredentialsFormType>({
    values: initialValue,
  });

  const accessType = watch("accessType") || Access_Types_Enum.SpecificUsers;
  const isSpecificUsers = accessType === Access_Types_Enum.SpecificUsers;

  const accessTypeMessage = {
    [Access_Types_Enum.Shared]: t(
      "settings:credentials.shared_access_type_description"
    ),
    [Access_Types_Enum.SpecificUsers]: t(
      "settings:credentials.specific_users_access_type_description"
    ),
  };

  const isMember = currentTeam?.role === Roles.member;
  const isOwner = currentUser?.id === initialValue?.userId;
  const canEdit = !initialValue || (isMember && isOwner) || !isMember;

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
            options={dataSources?.map((ds) => ({
              label: ds.name,
              value: ds.id || "",
            }))}
            defaultValue={
              initialValue?.dataSourceId || dataSources?.[0]?.id || undefined
            }
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
            disabled={!canEdit}
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
            disabled={!canEdit}
          />
        </Col>

        {isOwner && !isMember && (
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
              defaultValue={Access_Types_Enum.SpecificUsers}
            />
          </Col>
        )}

        {!isMember && isSpecificUsers && (
          <Col span={24} md={12}>
            <Input
              rules={{ required: true }}
              label={t("common:form.labels.team_members")}
              control={control}
              name="members"
              mode="multiple"
              fieldType="select"
              placeholder={t("common:form.placeholders.choose_team_members")}
              options={allMembers?.map((member) => ({
                label: member.displayName,
                value: member.id,
              }))}
              defaultValue={initialValue?.members}
            />
          </Col>
        )}
      </Row>

      {!isMember && (
        <Alert
          style={{ marginBottom: 16 }}
          message={
            accessTypeMessage[accessType as keyof typeof accessTypeMessage]
          }
          type="info"
        />
      )}

      <Button type="primary" htmlType="submit" disabled={!canEdit}>
        {initialValue?.id ? t("common:words.apply") : t("common:words.create")}
      </Button>
    </Form>
  );
};

export default CredentialsForm;
