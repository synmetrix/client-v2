import { Col, Form, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

import Select from "@/components/Select";
import type { AccessList, Member } from "@/types/team";
import { Roles, ChangeableRoles } from "@/types/team";
import { createRoleOptions } from "@/utils/helpers/createRoleOptions";

import styles from "./index.module.less";

import type { FC } from "react";

interface MemberEditorProps {
  member: Member | null;
  accessLists: AccessList[];
  onRoleChange: (id: string, newRole: ChangeableRoles) => void;
  onAccessListChange: (id: string, accessListId: string | null) => void;
  currentRole?: Roles;
}

const { Title } = Typography;

const MemberEditor: FC<MemberEditorProps> = ({
  member,
  onRoleChange,
  accessLists,
  onAccessListChange,
  currentRole,
}) => {
  const { t } = useTranslation(["settings", "common"]);

  if (member === null) {
    return null;
  }

  const hasRoleChangePermission =
    currentRole === Roles.owner ||
    (currentRole === Roles.admin && member.role.name === Roles.member);

  const hasAccessChangePermission =
    member.role.name !== ("member" as unknown as Roles);

  return (
    <Form layout="vertical">
      <Title level={4} className={styles.title}>
        {t("members.members.title")}
      </Title>
      <Row gutter={[16, 16]}>
        {hasRoleChangePermission && (
          <Col span={24} md={hasAccessChangePermission ? 12 : 24}>
            <Form.Item label={t("common:words.role")} className={styles.label}>
              <Select
                onChange={(value) =>
                  onRoleChange(
                    member.role.id,
                    value as unknown as ChangeableRoles
                  )
                }
                disabled={!hasRoleChangePermission}
                bordered={false}
                value={member.role.name}
                options={createRoleOptions(ChangeableRoles)}
              />
            </Form.Item>
          </Col>
        )}
        {hasAccessChangePermission && (
          <Col span={24} md={hasRoleChangePermission ? 12 : 24}>
            <Form.Item
              label={t("common:words.access_list")}
              className={styles.member}
            >
              <Select
                onChange={(accessListId) => {
                  onAccessListChange(member.role.id, accessListId);
                }}
                bordered={false}
                disabled={!accessLists?.length}
                value={
                  member.accessList?.id ||
                  `* ${t("common:words.full_access").toUpperCase()} *`
                }
                options={[
                  {
                    value: null,
                    label: t("common:words.full_access").toUpperCase(),
                  },
                  ...(accessLists || []).map((al) => ({
                    value: al.id,
                    label: al.name,
                  })),
                ]}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default MemberEditor;
