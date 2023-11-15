import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import Modal from "@/components/Modal";
import ReportForm from "@/components/ReportForm";
import InfoBlock from "@/components/InfoBlock";
import AlertTypeSelection from "@/components/AlertTypeSelection";
import { alertTypes } from "@/mocks/alertTypes";
import type { ReportFormType } from "@/types/report";
import type { QueryState } from "@/types/queryState";
import type { Params } from "@/pages/Explore";
import { DOCS_CREATE_REPORT_LINK } from "@/utils/constants/links";

import styles from "./index.module.less";

const { Title } = Typography;

interface ReportModalProps {
  report?: ReportFormType;
  query: QueryState;
  isOpen: boolean;
  loading: boolean;
  params?: Params;
  onClose: () => void;
  onChangeStep: (step: number) => void;
  onSendTest: (values: ReportFormType) => void;
  onSubmit: (values: ReportFormType) => void;
  onSelectDelivery: (type: string) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  report,
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
  const { t } = useTranslation(["reports", "common"]);
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
          {report ? t("reports:edit_report") : t("reports:new_report")}
        </Title>
        <InfoBlock
          href={DOCS_CREATE_REPORT_LINK}
          text={t("common:words.how_to_create")}
          linkText={t("common:words.reports") + "?"}
        />
      </div>
      {report || delivery ? (
        <ReportForm
          query={query}
          onTest={onSendTest}
          onChangeStep={onChangeStep}
          type={report?.type || delivery}
          onSubmit={onSubmit}
          initialValue={report}
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

export default ReportModal;
