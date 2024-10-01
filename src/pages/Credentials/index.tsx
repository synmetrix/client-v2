import { useCallback } from "react";
import { message, Spin, Space, Row, Col, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "@vitjs/runtime";

import useLocation from "@/hooks/useLocation";
import CredentialsForm from "@/components/CredentialsForm";
import CredentialCard from "@/components/CredentialCard";
import { CREDENTIALS } from "@/utils/constants/paths";
import type { CredentialsQuery } from "@/graphql/generated";
import {
  useDeleteCredentialMutation,
  useCredentialsQuery,
  useInsertCredentialMutation,
  useUpdateCredentialMutation,
} from "@/graphql/generated";
import useCheckResponse from "@/hooks/useCheckResponse";
import PageHeader from "@/components/PageHeader";
import Modal from "@/components/Modal";
import type { Credentials, CredentialsFormType } from "@/types/credential";
import type { DataSourceInfo } from "@/types/dataSource";
import CurrentUserStore from "@/stores/CurrentUserStore";
import NoCredentials from "@/components/NoCredentials";

import styles from "./index.module.less";

const { Title } = Typography;

interface CredentialsProps {
  initialValue?: CredentialsFormType;
  credentials: Credentials[];
  dataSources?: DataSourceInfo[];
  loading?: boolean;
  isOpen?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onCreate?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  onSubmit?: (data: CredentialsFormType) => void;
}

const CredentialsPage: React.FC<CredentialsProps> = ({
  initialValue,
  dataSources,
  isOpen,
  credentials,
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
        {credentials.length === 0 && <NoCredentials onCreate={onCreate} />}

        {credentials.length > 0 && (
          <Space className={styles.wrapper} direction="vertical" size={13}>
            <PageHeader
              title={t("settings:credentials.title")}
              action={t("settings:credentials.action")}
              onClick={onCreate}
            />
            <div className={styles.body}>
              <Row justify={"start"} gutter={[32, 32]}>
                {credentials.map((c) => (
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
          dataSources={dataSources}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
};

const prepareCredentialData = (
  credentialResult: CredentialsQuery
): Credentials[] => {
  if (!credentialResult?.credentials?.length) return [];

  return (credentialResult.credentials || []).map((c) => ({
    id: c.id,
    username: c.username,
    createdAt: c.created_at,
    updatedAt: c.updated_at,
    user: c.user,
    dataSource: c.datasource,
  })) as Credentials[];
};

const CredentialsPageWrapper = () => {
  const { t } = useTranslation(["settings", "common"]);
  const [, setLocation] = useLocation();
  const { currentUser, teamData } = CurrentUserStore();
  const { editId } = useParams();
  const isNew = editId === "new";

  const [credentialsQuery, execCredentialsQuery] = useCredentialsQuery();
  const [deleteMutation, execDeleteMutation] = useDeleteCredentialMutation();
  const [createMutation, execCreateMutation] = useInsertCredentialMutation();
  const [updateMutation, execUpdateMutation] = useUpdateCredentialMutation();

  useCheckResponse(createMutation, () => {
    execCredentialsQuery();
    message.success(t("settings:credentials.created"));
  });

  useCheckResponse(updateMutation, () => {
    execCredentialsQuery();
    message.success(t("settings:credentials.updated"));
  });

  useCheckResponse(deleteMutation, () => {
    execCredentialsQuery();
    message.success(t("settings:credentials.deleted"));
  });

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

  const onSubmit = useCallback(
    (data: CredentialsFormType) => {
      if (isNew) {
        execCreateMutation({
          object: {
            user_id: currentUser?.id,
            datasource_id: data.dataSourceId,
            username: data.username,
            password: data.password,
          },
        });
      } else {
        execUpdateMutation({
          pk_columns: { id: editId },
          _set: {
            username: data.username,
            password: data.password,
          },
        });
      }
    },
    [execCreateMutation, execUpdateMutation, isNew, editId, currentUser]
  );

  const credentials = useMemo(
    () =>
      prepareCredentialData(
        credentialsQuery?.data as unknown as CredentialsQuery
      ),
    [credentialsQuery]
  );

  const initialValue = useMemo(() => {
    if (!isNew && editId && credentials.length) {
      const curCredential = credentials.find((c) => c.id === editId);

      if (curCredential) {
        return {
          id: curCredential.id,
          username: curCredential.username,
          password: curCredential.password,
          dataSourceId: curCredential.dataSource.id,
        };
      }

      onClose();
    }
  }, [credentials, isNew, editId, onClose]);

  return (
    <CredentialsPage
      dataSources={teamData?.dataSources}
      credentials={credentials}
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
