import Modal from "@/components/Modal";
import ReportForm from "@/components/ReportForm";
import AlertTypeSelection from "@/components/AlertTypeSelection";
import { alertTypes } from "@/mocks/alertTypes";
import type { ReportFormType } from "@/types/report";
import type { AlertType } from "@/types/alert";
import type { QueryState } from "@/types/queryState";

import styles from "./index.module.less";

interface ReportModalProps {
  report?: ReportFormType;
  query: QueryState;
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onSendTest: (values: ReportFormType) => void;
  onSubmit: (values: ReportFormType) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  report,
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
      {report || selectedType ? (
        <ReportForm
          query={query}
          onTest={onSendTest}
          type={report?.type || selectedType}
          onSubmit={onSubmit}
          initialValue={report}
          isSendTestLoading={loading}
        />
      ) : (
        <AlertTypeSelection
          type="report"
          options={alertTypes}
          onSubmit={(v) => setSelectedType(v.value)}
        />
      )}
    </Modal>
  );
};

export default ReportModal;
