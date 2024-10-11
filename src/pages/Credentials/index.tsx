import { useCallback } from "react";
import { Spin, Space, Row, Col, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "@vitjs/runtime";

import useLocation from "@/hooks/useLocation";
import CredentialsForm from "@/components/CredentialsForm";
import CredentialCard from "@/components/CredentialCard";
import { CREDENTIALS } from "@/utils/constants/paths";
import {
  Access_Types_Enum,
  useDeleteCredentialMutation,
  useInsertCredentialMutation,
  useUpdateCredentialsMutation,
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
  const isMember = currentTeam?.role === "member";

  const [deleteMutation, execDeleteMutation] = useDeleteCredentialMutation();
  const [createMutation, execCreateMutation] = useInsertCredentialMutation();
  const [updateMutation, execUpdateMutation] = useUpdateCredentialsMutation();

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

  useCheckResponse(
    createMutation,
    (_, error) => {
      if (error) {
        if (
          error.message.includes(
            "member_credentials_datasource_id_member_id_key"
          )
        ) {
          if (isMember) {
            message.error(t("settings:credentials.member_has_access"));
          } else {
            message.error(t("settings:credentials.member_already_used"));
          }
        } else {
          message.error(error.message);
        }
      } else {
        message.success(t("settings:credentials.created"));
        onClose();
      }
    },
    {
      showMessage: false,
    }
  );

  useCheckResponse(
    updateMutation,
    (_, error) => {
      if (error) {
        if (
          error.message.includes(
            "member_credentials_datasource_id_member_id_key"
          )
        ) {
          message.error(t("settings:credentials.member_already_used"));
        } else {
          message.error(error.message);
        }
      } else {
        message.success(t("settings:credentials.updated"));
        onClose();
      }
    },
    {
      showMessage: false,
    }
  );

  useCheckResponse(deleteMutation, () => onClose(), {
    successMessage: t("settings:credentials.deleted"),
  });

  const onSubmit = async (data: CredentialsFormType) => {
    const payload = {
      access_type: data.accessType,
      username: data.username,
      password: data.password,
      datasource_id: data.dataSourceId,
    };

    let member_credentials = [];
    if (!isMember) {
      if (data.accessType === Access_Types_Enum.Shared) {
        member_credentials = (teamData?.members || []).map((m) => ({
          member_id: m.id,
          credential_id: data.id,
          datasource_id: data.dataSourceId,
        }));
      } else {
        payload.access_type = Access_Types_Enum.SpecificUsers;
        member_credentials = (data.members || []).map((m) => ({
          member_id: m,
          credential_id: data.id,
          datasource_id: data.dataSourceId,
        }));
      }
    } else {
      member_credentials = [
        {
          member_id: currentTeam?.memberId,
          credential_id: data.id,
          datasource_id: data.dataSourceId,
        },
      ];
    }

    if (isNew) {
      await execCreateMutation({
        object: {
          ...payload,
          user_id: currentUser?.id,
          member_credentials: {
            data: member_credentials,
          },
        },
      });
    } else {
      await execUpdateMutation({
        id: editId,
        object: {
          ...payload,
        },
        members: member_credentials,
      });
    }
  };

  const initialValue = useMemo(() => {
    if (!isNew && editId && teamData?.credentials?.length) {
      const curCredential = teamData.credentials.find((c) => c.id === editId);

      if (curCredential) {
        return {
          ...curCredential,
          userId: curCredential.user.id,
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
