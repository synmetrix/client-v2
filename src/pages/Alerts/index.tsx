import { Space, message } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "@vitjs/runtime";

import PageHeader from "@/components/PageHeader";
import AlertsTable from "@/components/AlertsTable";
import AlertModal from "@/components/AlertModal";
import type { Alert, AlertFormType } from "@/types/alert";
import type { QueryState } from "@/types/queryState";
import AppLayout from "@/layouts/AppLayout";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useLocation from "@/hooks/useLocation";
import useAppSettings from "@/hooks/useAppSettings";
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
  const { withAuthPrefix } = useAppSettings();
  const [, setLocation] = useLocation();
  const basePath = withAuthPrefix("/alerts");
  const { currentUser } = CurrentUserStore();
  const { alertId } = useParams();

  const alerts = useMemo(
    () => (initialAlerts?.length ? initialAlerts : currentUser.alerts || []),
    [initialAlerts, currentUser]
  ) as Alert[];

  const curAlert = useMemo(
    () => alerts.find((a) => a.id === alertId),
    [alertId, alerts]
  );

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
    alertId,
  });

  const query = useMemo(() => {
    if (curAlert) {
      return curAlert?.exploration?.playground_state;
    }

    return initialQuery || SAMPLE_EXPLORATION.playground_state;
  }, [curAlert, initialQuery]);

  const onEdit = (alert: Alert) => {
    setLocation(`${basePath}/${alert.id}`);
  };

  const onDelete = (alert: Alert) => {
    execDeleteMutation({ id: alert.id });
  };

  const onClose = () => {
    setLocation(basePath);
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
    const doesAlertExist = Boolean(curAlert?.id);

    if (doesAlertExist) {
      updateAlert(values);
      return;
    }
  };

  useEffect(() => {
    if (alerts?.length && alertId && !curAlert) {
      message.error(t("not_found.wrong_id"));
      setLocation(basePath);
    }
  }, [alertId, alerts?.length, basePath, curAlert, setLocation, t]);

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
        alert={curAlert}
        query={query}
        isOpen={!!curAlert}
        loading={sendTestMutationData.fetching}
        onClose={onClose}
        onSendTest={onSendTest}
        onSubmit={onSubmit}
      />
    </AppLayout>
  );
};

export default Alerts;
