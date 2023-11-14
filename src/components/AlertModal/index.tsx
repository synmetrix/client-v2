import Modal from "@/components/Modal";
import AlertForm from "@/components/AlertForm";
import AlertTypeSelection from "@/components/AlertTypeSelection";
import { alertTypes } from "@/mocks/alertTypes";
import type { AlertFormType, AlertType } from "@/types/alert";
import type { QueryState } from "@/types/queryState";

import styles from "./index.module.less";

interface AlertModalProps {
  alert?: AlertFormType;
  query: QueryState;
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onSendTest: (values: AlertFormType) => void;
  onSubmit: (values: AlertFormType) => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  alert,
  query,
  isOpen,
  onClose,
  onSendTest,
  onSubmit,
  loading,
}) => {
  const [selectedType, setSelectedType] = useState<AlertType | undefined>();

  const onCloseModal = () => {
    setSelectedType(undefined);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      closable
      onClose={onCloseModal}
      className={styles.modal}
      width={"100%"}
      destroyOnClose
    >
      {alert || selectedType ? (
        <AlertForm
          query={query}
          onTest={onSendTest}
          type={alert?.type || selectedType}
          onSubmit={onSubmit}
          initialValue={alert}
          isSendTestLoading={loading}
        />
      ) : (
        <AlertTypeSelection
          type="alert"
          options={alertTypes}
          onSubmit={(v) => setSelectedType(v.value)}
        />
      )}
    </Modal>
  );
};

export default AlertModal;
