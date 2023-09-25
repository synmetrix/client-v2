import { Space } from "antd";
import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import PageHeader from "@/components/PageHeader";
import AlertsTable from "@/components/AlertsTable";
import Modal from "@/components/Modal";
import AlertForm from "@/components/AlertForm";
import AlertTypeSelection from "@/components/AlertTypeSelection";
import { alertTypes } from "@/mocks/alertTypes";
import type { Alert, AlertFormType, AlertType } from "@/types/alert";
import type { QueryPreview } from "@/types/queryPreview";
import AppLayout from "@/layouts/AppLayout";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface AlertsProps {
  alerts: Alert[];
  query: QueryPreview;
}

const Alerts: React.FC<AlertsProps> = ({ alerts, query }) => {
  const { t } = useTranslation(["alerts", "pages"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<AlertType | undefined>();
  const [selectedAlert, setSelectedAlert] = useState<
    AlertFormType | undefined
  >();

  const onEdit = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsOpen(true);
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
          <AlertsTable alerts={alerts} onEdit={onEdit} onRemove={console.log} />
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
            query={query}
            onTest={console.log}
            type={selectedAlert?.type}
            onSubmit={console.log}
            initialValue={selectedAlert}
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
