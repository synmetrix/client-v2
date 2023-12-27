import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import Modal from "@/components/Modal";
import ReportForm from "@/components/ReportForm";
import InfoBlock from "@/components/InfoBlock";
import AlertTypeSelection from "@/components/AlertTypeSelection";
import useReports from "@/hooks/useReports";
import useCheckResponse from "@/hooks/useCheckResponse";
import useAlerts from "@/hooks/useAlerts";
import { alertTypes } from "@/mocks/alertTypes";
import type { ReportFormType } from "@/types/report";
import type { Params } from "@/pages/Explore";
import type { Exploration } from "@/types/exploration";
import { DOCS_CREATE_REPORT_LINK } from "@/utils/constants/links";

import styles from "./index.module.less";

const { Title } = Typography;

interface ReportModalProps {
  exploration?: Exploration;
  report?: ReportFormType;
  isOpen: boolean;
  params?: Params;
  onClose: () => void;
  onChangeStep?: (step: number) => void;
  onSelectDelivery?: (type: string) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  exploration,
  report,
  isOpen,
  onClose,
  onChangeStep,
  onSelectDelivery,
  params = {} as Params,
}) => {
  const { t } = useTranslation(["reports", "common"]);
  const { delivery } = params;

  const {
    createReport,
    mutations: { createMutationData: createReportMutationData },
  } = useReports({
    explorationId: exploration?.id,
  });

  const {
    onSendTest,
    mutations: { sendTestMutationData },
  } = useAlerts({
    explorationId: exploration?.id,
  });

  useCheckResponse(createReportMutationData, () => onClose(), {
    successMessage: t("reports:report_created"),
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
          {report ? t("reports:edit_report") : t("reports:new_report")}
        </Title>
        <InfoBlock
          href={DOCS_CREATE_REPORT_LINK}
          linkText={t("common:words.how_to_create_reports")}
        />
      </div>
      {report || delivery ? (
        <ReportForm
          query={exploration?.playground_state || {}}
          onTest={onSendTest}
          onChangeStep={onChangeStep}
          type={report?.type || delivery}
          onSubmit={createReport}
          initialValue={report}
          isSendTestLoading={sendTestMutationData.fetching}
        />
      ) : (
        <AlertTypeSelection
          type="report"
          options={alertTypes}
          onSubmit={(v) => onSelectDelivery?.(v.value)}
        />
      )}
    </Modal>
  );
};

export default ReportModal;
