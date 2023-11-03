import { Space } from "antd";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import AlertsTable from "@/components/AlertsTable";
import Modal from "@/components/Modal";
import AlertForm from "@/components/AlertForm";
import AlertTypeSelection from "@/components/AlertTypeSelection";
import { alertTypes } from "@/mocks/alertTypes";
import type { Alert, AlertFormType, AlertType } from "@/types/alert";
import type { QueryState } from "@/types/queryState";
import AppLayout from "@/layouts/AppLayout";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type {
  Alerts_Set_Input,
  Alerts_Pk_Columns_Input,
  SendTestAlertMutationVariables,
} from "@/graphql/generated";
import {
  useDeleteAlertMutation,
  useCreateAlertMutation,
  useUpdateAlertMutation,
  useSendTestAlertMutation,
} from "@/graphql/generated";
import useCheckResponse from "@/hooks/useCheckResponse";
import { SAMPLE_EXPLORATION } from "@/mocks/exploration";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface AlertsProps {
  alerts: Alert[];
  query: QueryState;
}

const Alerts: React.FC<AlertsProps> = ({
  alerts: initialAlerts,
  query: initialQuery,
}) => {
  const { t } = useTranslation(["alerts", "pages"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<AlertType | undefined>();
  const [selectedAlert, setSelectedAlert] = useState<
    AlertFormType | undefined
  >();

  const { currentUser, currentTeamId } = CurrentUserStore();

  const alerts = useMemo(
    () => (initialAlerts?.length ? initialAlerts : currentUser.alerts || []),
    [initialAlerts, currentUser]
  ) as Alert[];

  const query = useMemo(() => {
    if (selectedAlert) {
      return selectedAlert?.exploration?.playground_state;
    }

    return initialQuery || SAMPLE_EXPLORATION.playground_state;
  }, [selectedAlert, initialQuery]);

  const [createMutationData, execInsertMutation] = useCreateAlertMutation();
  const [updateMutationData, execUpdateMutation] = useUpdateAlertMutation();
  const [deleteMutationData, execDeleteMutation] = useDeleteAlertMutation();
  const [sendTestMutationData, execSendTestMutation] =
    useSendTestAlertMutation();

  const onEdit = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsOpen(true);
  };

  const onDelete = (alert: Alert) => {
    execDeleteMutation({ id: alert.id });
  };

  const onCreate = () => {
    setSelectedAlert(undefined);
    setIsOpen(true);
  };

  const onClose = () => {
    setSelectedAlert(undefined);
    setSelectedType(undefined);
    setIsOpen(false);
  };

  const onSendTest = (values: AlertFormType) => {
    const { deliveryConfig, exploration, type, name } = values;

    const mutationPayload: SendTestAlertMutationVariables = {
      explorationId: exploration.id,
      deliveryType: type,
      deliveryConfig,
      name,
    };

    execSendTestMutation(mutationPayload);
  };

  useCheckResponse(createMutationData, () => onClose(), {
    successMessage: t("alert_created"),
  });

  useCheckResponse(updateMutationData, () => onClose(), {
    successMessage: t("alert_updated"),
  });

  useCheckResponse(deleteMutationData, () => {}, {
    successMessage: t("alert_deleted"),
  });

  useCheckResponse(sendTestMutationData, () => {}, {
    successMessage: t("test_alert_sent"),
  });

  const createAlert = useCallback(
    (values: AlertFormType) => {
      const newAlertWithExplorationPayload = {
        name: values.name,
        schedule: values.schedule,
        trigger_config: values.triggerConfig,
        delivery_type: values.type,
        delivery_config: values.deliveryConfig,
        exploration_id: SAMPLE_EXPLORATION.id,
        team_id: currentTeamId,
      };

      execInsertMutation({ object: newAlertWithExplorationPayload });
    },
    [execInsertMutation, currentTeamId]
  );

  const updateAlert = useCallback(
    (values: AlertFormType) => {
      const updateAlerPayload = {
        name: values.name,
        schedule: values.schedule,
        trigger_config: values.triggerConfig,
        delivery_type: values.type,
        delivery_config: values.deliveryConfig,
      };

      const payload = {
        pk_columns: { id: selectedAlert?.id } as Alerts_Pk_Columns_Input,
        _set: updateAlerPayload as Alerts_Set_Input,
      };

      execUpdateMutation(payload);
    },
    [execUpdateMutation, selectedAlert]
  );

  const onSubmit = (values: AlertFormType) => {
    const doesAlertExist = Boolean(selectedAlert?.id);

    if (doesAlertExist) {
      updateAlert(values);
      return;
    }

    createAlert(values);
  };

  return (
    <AppLayout divider title={t("pages:alerts")}>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={t("list_and_manage_your_alerts")}
          action={
            <Space size={10} align="start">
              <span className={styles.actionIcon}>
                <DocsIcon />
              </span>
              {t("how_to_create_alert")}
            </Space>
          }
          actionProps={{
            className: styles.action,
          }}
          onClick={onCreate}
        />
        <div className={styles.body}>
          <AlertsTable alerts={alerts} onEdit={onEdit} onRemove={onDelete} />
        </div>
      </Space>

      <Modal
        open={isOpen}
        closable
        onClose={onClose}
        className={styles.modal}
        width={"100%"}
      >
        {selectedAlert || selectedType ? (
          <AlertForm
            query={query || initialQuery}
            onTest={onSendTest}
            type={selectedAlert?.type}
            onSubmit={onSubmit}
            initialValue={selectedAlert}
            isSendTestLoading={sendTestMutationData.fetching}
          />
        ) : (
          <AlertTypeSelection
            type="alert"
            options={alertTypes}
            onSubmit={(v) => setSelectedType(v.value)}
          />
        )}
      </Modal>
    </AppLayout>
  );
};

export default Alerts;
