import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import Modal from "@/components/Modal";
import AlertForm from "@/components/AlertForm";
import InfoBlock from "@/components/InfoBlock";
import AlertTypeSelection from "@/components/AlertTypeSelection";
import useAlerts from "@/hooks/useAlerts";
import useCheckResponse from "@/hooks/useCheckResponse";
import { alertTypes } from "@/mocks/alertTypes";
import type { AlertFormType } from "@/types/alert";
import type { Params } from "@/pages/Explore";
import type { Exploration } from "@/types/exploration";
import { DOCS_CREATE_ALERT_LINK } from "@/utils/constants/links";

import styles from "./index.module.less";

const { Title } = Typography;

interface AlertModalProps {
  alert?: AlertFormType;
  isOpen: boolean;
  params?: Params;
  exploration?: Exploration;
  onClose: () => void;
  onSelectDelivery?: (type: string) => void;
  onChangeStep?: (step: number) => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  alert,
  isOpen,
  onClose,
  onChangeStep,
  onSelectDelivery,
  exploration,
  params = {} as Params,
}) => {
  const { t } = useTranslation(["alerts", "common"]);
  const { delivery } = params;

  const {
    createAlert,
    onSendTest,
    mutations: { createMutationData, sendTestMutationData },
  } = useAlerts({
    explorationId: exploration?.id,
  });

  useCheckResponse(createMutationData, () => onClose(), {
    successMessage: t("alerts:alert_created"),
  });

  useCheckResponse(sendTestMutationData, () => {}, {
    successMessage: t("alerts:test_alert_sent"),
  });

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
          linkText={t("common:words.how_to_create_alerts")}
        />
      </div>
      {alert || delivery ? (
        <AlertForm
          query={exploration?.playground_state || {}}
          onChangeStep={onChangeStep}
          onTest={onSendTest}
          type={alert?.type || delivery}
          onSubmit={createAlert}
          initialValue={alert}
          isSendTestLoading={sendTestMutationData.fetching}
        />
      ) : (
        <AlertTypeSelection
          options={alertTypes}
          onSubmit={(v) => onSelectDelivery?.(v.value)}
        />
      )}
    </Modal>
  );
};

export default AlertModal;
