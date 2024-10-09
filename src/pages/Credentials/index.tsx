import { useCallback } from "react";
import { Spin, Space, Row, Col, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "@vitjs/runtime";

import useLocation from "@/hooks/useLocation";
import CredentialsForm from "@/components/CredentialsForm";
import CredentialCard from "@/components/CredentialCard";
import { CREDENTIALS } from "@/utils/constants/paths";
import {
  useDeleteCredentialMutation,
  useInsertCredentialMutation,
  useUpdateCredentialMutation,
  useDeleteMemberCredentialsMutation,
  useInsertMembersCredentialsMutation,
} from "@/graphql/generated";
import useCheckResponse from "@/hooks/useCheckResponse";
import PageHeader from "@/components/PageHeader";
import Modal from "@/components/Modal";
import type { CredentialsFormType, CredentialsInfo } from "@/types/credential";
import type { DataSourceInfo } from "@/types/dataSource";
import type { Member } from "@/types/team";
import CurrentUserStore from "@/stores/CurrentUserStore";
import NoCredentials from "@/components/NoCredentials";

import styles from "./index.module.less";

const { Title } = Typography;

interface CredentialsProps {
  allMembers?: Member[];
  initialValue?: CredentialsFormType;
  dataSources?: DataSourceInfo[];
  credentials?: CredentialsInfo[];
  loading?: boolean;
  isOpen?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onCreate?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  onSubmit?: (data: CredentialsFormType) => void;
}

export const CredentialsPage: React.FC<CredentialsProps> = ({
  initialValue,
  allMembers,
  dataSources,
  credentials,
  isOpen,
  loading,
  onDelete = () => {},
  onEdit = () => {},
  onCreate = () => {},
  onClose = () => {},
  onSubmit = () => {},
}) => {
  const { t } = useTranslation(["settings", "common"]);

  return (
    <>
      <Spin spinning={loading}>
        {!credentials?.length && <NoCredentials onCreate={onCreate} />}

        {!!credentials?.length && (
          <Space className={styles.wrapper} direction="vertical" size={13}>
            <PageHeader
              title={t("settings:credentials.title")}
              action={t("settings:credentials.action")}
              onClick={onCreate}
            />
            <div className={styles.body}>
              <Row justify={"start"} gutter={[32, 32]}>
                {credentials?.map((c) => (
                  <Col xs={24} sm={12} xl={8} key={c.id}>
                    <CredentialCard
                      key={c.id}
                      credential={c}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Space>
        )}
      </Spin>

      <Modal open={!!isOpen} closable onClose={onClose}>
        <div className={styles.modalHeader}>
          <Title className={styles.title} level={3}>
            {t("settings:credentials.title")}
          </Title>
        </div>
        <CredentialsForm
          initialValue={initialValue}
          allMembers={allMembers}
          dataSources={dataSources}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
};

const CredentialsPageWrapper = () => {
  const { t } = useTranslation(["settings", "common"]);
  const [, setLocation] = useLocation();
  const { currentUser, teamData, currentTeam } = CurrentUserStore();
  const { editId } = useParams();
  const isNew = editId === "new";

  const [deleteMutation, execDeleteMutation] = useDeleteCredentialMutation();
  const [createMutation, execCreateMutation] = useInsertCredentialMutation();
  const [updateMutation, execUpdateMutation] = useUpdateCredentialMutation();
  const [deleteMemberCredentials, execDeleteMemberCredentials] =
    useDeleteMemberCredentialsMutation();
  const [insertMembersCredentials, execInsertMembersCredentials] =
    useInsertMembersCredentialsMutation();

  const onDelete = useCallback(
    (id: string) => {
      execDeleteMutation({ id });
    },
    [execDeleteMutation]
  );

  const onEdit = useCallback(
    (id: string) => {
      setLocation(`${CREDENTIALS}/${id}`);
    },
    [setLocation]
  );

  const onCreate = useCallback(() => {
    setLocation(`${CREDENTIALS}/new`);
  }, [setLocation]);

  const onClose = useCallback(() => {
    setLocation(CREDENTIALS);
  }, [setLocation]);

  useCheckResponse(createMutation, () => onClose(), {
    successMessage: t("settings:credentials.created"),
  });

  useCheckResponse(updateMutation, () => onClose(), {
    successMessage: t("settings:credentials.updated"),
  });

  useCheckResponse(deleteMutation, () => onClose(), {
    successMessage: t("settings:credentials.deleted"),
  });

  useCheckResponse(deleteMemberCredentials, () => {}, {
    showMessage: false,
  });

  useCheckResponse(insertMembersCredentials, () => {}, {
    showMessage: false,
  });

  const onSubmit = async (data: CredentialsFormType) => {
    const payload = {
      access_type: data.accessType,
      username: data.username,
      password: data.password,
    };

    let member_credentials = [];
    if (currentTeam?.role === "admin") {
      member_credentials = (data.members || []).map((m) => ({
        member_id: m,
        credential_id: data.id,
      }));
    } else {
      member_credentials = [
        {
          member_id: currentUser?.id,
          credential_id: data.id,
        },
      ];
    }

    if (isNew) {
      await execCreateMutation({
        object: {
          ...payload,
          user_id: currentUser?.id,
          datasource_id: data.dataSourceId,
          members_credentials: {
            data: member_credentials,
          },
        },
      });
    } else {
      await execDeleteMemberCredentials({ id: editId });

      const membersCredentials = await execInsertMembersCredentials({
        objects: (data.members || []).map((m) => ({
          member_id: m,
          credential_id: editId,
        })),
      });

      if (membersCredentials.data?.insert_members_credentials?.affected_rows) {
        await execUpdateMutation({
          pk_columns: { id: editId },
          _set: payload,
        });
      }
    }
  };

  const initialValue = useMemo(() => {
    if (!isNew && editId && teamData?.credentials?.length) {
      const curCredential = teamData.credentials.find((c) => c.id === editId);

      if (curCredential) {
        return {
          ...curCredential,
          dataSourceId: curCredential.dataSource.id,
        } as unknown as CredentialsFormType;
      }

      onClose();
    }
  }, [teamData?.credentials, isNew, editId, onClose]);

  return (
    <CredentialsPage
      allMembers={teamData?.members}
      dataSources={teamData?.dataSources}
      credentials={teamData?.credentials}
      initialValue={initialValue}
      loading={false}
      isOpen={isNew || !!editId}
      onClose={onClose}
      onDelete={onDelete}
      onEdit={onEdit}
      onCreate={onCreate}
      onSubmit={onSubmit}
    />
  );
};

export default CredentialsPageWrapper;
