import { Col, Form, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { createRoleOptions } from "@/utils/helpers/createRoleOptions";
import { Roles } from "@/types/team";
import type { Member } from "@/types/team";

import styles from "./index.module.less";

import type { FC } from "react";

interface MembersFormProps {
  onSubmit: (data: Member) => void;
  initialValue?: Member;
}

const { Title } = Typography;

const MembersForm: FC<MembersFormProps> = ({ onSubmit, initialValue }) => {
  const { t } = useTranslation(["settings", "common"]);
  const { control, handleSubmit } = useForm<Member>({
    defaultValues: initialValue,
  });

  return (
    <Form layout="vertical">
      <Title level={4}>{t("members.members.title")}</Title>
      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Input
            label={t("members.members.invite_team_member")}
            name="email"
            control={control}
          />
        </Col>

        <Col span={24} md={12}>
          <Input
            label={t("members.members.select_role")}
            name="role"
            control={control}
            fieldType="select"
            options={createRoleOptions(Roles)}
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
