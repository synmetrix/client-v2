import { Col, Form, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import Button from "@/components/Button";
import type { Team_Roles_Enum } from "@/graphql/generated";
import { ChangeableRoles } from "@/types/team";
import validate from "@/utils/helpers/validations";
import type { Option } from "@/types/access";

import styles from "./index.module.less";

import type { FC } from "react";

export interface Invite {
  email: string;
  role: Team_Roles_Enum;
  magicLink: boolean;
}

interface MembersFormProps {
  onSubmit: (data: Invite) => void;
  initialValue?: Invite;
  inviteRoles: Option[];
}

const { Title } = Typography;

const MembersForm: FC<MembersFormProps> = ({
  onSubmit,
  initialValue,
  inviteRoles,
}) => {
  const { t } = useTranslation(["settings", "common"]);
  const { control, handleSubmit } = useForm<Invite>({
    values: initialValue,
  });

  return (
    <Form layout="vertical">
      <Title level={4} style={{ marginTop: 0 }}>
        {t("members.members.title")}
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Input
            label={t("members.members.invite_team_member")}
            name="email"
            control={control}
            rules={{
              required: true,
              validate: (v: string) =>
                validate.email(v) || t("common:form.errors.email"),
            }}
          />
        </Col>

        <Col span={24} md={12}>
          <Input
            label={t("members.members.select_role")}
            name="role"
            control={control}
            fieldType="select"
            defaultValue={ChangeableRoles.member}
            options={inviteRoles}
          />
        </Col>

        <Col span={24} md={12}>
          <Input
            label={t("members.members.magic_link_checkbox")}
            placeholder={t("members.members.magicLink")}
            name="magicLink"
            control={control}
            fieldType="checkbox"
            defaultValue={false}
          />
        </Col>
      </Row>

      <Button
        className={styles.submit}
        size="large"
        type="primary"
        onClick={handleSubmit(onSubmit)}
      >
        {t("members.members.invite")}
      </Button>
    </Form>
  );
};

export default MembersForm;
