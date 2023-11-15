import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import Modal from "@/components/Modal";
import AlertForm from "@/components/AlertForm";
import InfoBlock from "@/components/InfoBlock";
import AlertTypeSelection from "@/components/AlertTypeSelection";
import { alertTypes } from "@/mocks/alertTypes";
import type { AlertFormType } from "@/types/alert";
import type { QueryState } from "@/types/queryState";
import type { Params } from "@/pages/Explore";
import { DOCS_CREATE_ALERT_LINK } from "@/utils/constants/links";

import styles from "./index.module.less";

const { Title } = Typography;

interface AlertModalProps {
  alert?: AlertFormType;
  query: QueryState;
  isOpen: boolean;
  loading: boolean;
  params?: Params;
  onClose: () => void;
  onChangeStep: (step: number) => void;
  onSendTest: (values: AlertFormType) => void;
  onSubmit: (values: AlertFormType) => void;
  onSelectDelivery: (type: string) => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  alert,
  query,
  isOpen,
  onClose,
  onSendTest,
  onSubmit,
  onChangeStep,
  onSelectDelivery,
  loading,
  params = {} as Params,
}) => {
  const { t } = useTranslation(["alerts", "common"]);
  const { delivery } = params;

  return (
    <Modal
      open={isOpen}
      closable
      onClose={onClose}
      className={styles.modal}
      width={"100%"}
      destroyOnClose
    >
      <div className={styles.modalHeader}>
        <Title className={styles.title} level={3}>
          {alert ? t("alerts:edit_alert") : t("alerts:new_alert")}
        </Title>
        <InfoBlock
          href={DOCS_CREATE_ALERT_LINK}
          text={t("common:words.how_to_create")}
          linkText={t("common:words.alerts") + "?"}
        />
      </div>
      {alert || delivery ? (
        <AlertForm
          query={query}
          onChangeStep={onChangeStep}
          onTest={onSendTest}
          type={alert?.type || delivery}
          onSubmit={onSubmit}
          initialValue={alert}
          isSendTestLoading={loading}
        />
      ) : (
        <AlertTypeSelection
          options={alertTypes}
          onSubmit={(v) => onSelectDelivery(v.value)}
        />
      )}
    </Modal>
  );
};

export default AlertModal;
