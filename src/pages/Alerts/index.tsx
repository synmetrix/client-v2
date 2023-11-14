import { Space } from "antd";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import AlertsTable from "@/components/AlertsTable";
import AlertModal from "@/components/AlertModal";
import type { Alert, AlertFormType } from "@/types/alert";
import type { QueryState } from "@/types/queryState";
import AppLayout from "@/layouts/AppLayout";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useAlerts from "@/hooks/useAlerts";
import useCheckResponse from "@/hooks/useCheckResponse";
import { SAMPLE_EXPLORATION } from "@/mocks/exploration";
import { DOCS_CREATE_ALERT_LINK } from "@/utils/constants/links";

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
  const [selectedAlert, setSelectedAlert] = useState<
    AlertFormType | undefined
  >();

  const {
    updateAlert,
    onSendTest,
    mutations: {
      updateMutationData,
      deleteMutationData,
      execDeleteMutation,
      sendTestMutationData,
    },
  } = useAlerts({
    alert: selectedAlert,
  });

  const { currentUser } = CurrentUserStore();

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

  const onEdit = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsOpen(true);
  };

  const onDelete = (alert: Alert) => {
    execDeleteMutation({ id: alert.id });
  };

  const onClose = () => {
    setSelectedAlert(undefined);
    setIsOpen(false);
  };

  useCheckResponse(updateMutationData, () => onClose(), {
    successMessage: t("alert_updated"),
  });

  useCheckResponse(deleteMutationData, () => {}, {
    successMessage: t("alert_deleted"),
  });

  useCheckResponse(sendTestMutationData, () => {}, {
    successMessage: t("test_alert_sent"),
  });

  const onSubmit = (values: AlertFormType) => {
    const doesAlertExist = Boolean(selectedAlert?.id);

    if (doesAlertExist) {
      updateAlert(values);
      return;
    }
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
          target="_blank"
          href={DOCS_CREATE_ALERT_LINK}
        />
        <div className={styles.body}>
          <AlertsTable alerts={alerts} onEdit={onEdit} onRemove={onDelete} />
        </div>
      </Space>

      <AlertModal
        alert={selectedAlert}
        query={query}
        isOpen={isOpen}
        loading={sendTestMutationData.fetching}
        onClose={onClose}
        onSendTest={onSendTest}
        onSubmit={onSubmit}
      />
    </AppLayout>
  );
};

export default Alerts;
