import { Space } from "antd";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import ReportModal from "@/components/ReportModal";
import AlertsTable from "@/components/AlertsTable";
import type { Alert } from "@/types/alert";
import type { Report, ReportFormType } from "@/types/report";
import type { QueryState } from "@/types/queryState";
import AppLayout from "@/layouts/AppLayout";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useCheckResponse from "@/hooks/useCheckResponse";
import useReports from "@/hooks/useReports";
import { SAMPLE_EXPLORATION } from "@/mocks/exploration";
import { DOCS_CREATE_REPORT_LINK } from "@/utils/constants/links";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface ReportsProps {
  alerts: Alert[];
  query: QueryState;
}

const Reports: React.FC<ReportsProps> = ({
  alerts: initialReports,
  query: initialQuery,
}) => {
  const { t } = useTranslation(["reports", "pages"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<
    ReportFormType | undefined
  >();

  const {
    mutations: {
      updateMutationData,
      deleteMutationData,
      execDeleteMutation,
      sendTestMutationData,
    },
    updateReport,
    onSendTest,
  } = useReports({
    report: selectedReport,
  });

  const { currentUser } = CurrentUserStore();

  const query = useMemo(() => {
    if (selectedReport) {
      return selectedReport?.exploration?.playground_state;
    }

    return initialQuery || SAMPLE_EXPLORATION.playground_state;
  }, [selectedReport, initialQuery]);

  const reports = useMemo(
    () => (initialReports?.length ? initialReports : currentUser.reports || []),
    [initialReports, currentUser]
  ) as Alert[];

  const onEdit = (report: Report) => {
    setSelectedReport(report);
    setIsOpen(true);
  };

  const onDelete = (report: Report) => {
    execDeleteMutation({ id: report.id });
  };

  const onClose = () => {
    setSelectedReport(undefined);
    setIsOpen(false);
  };

  useCheckResponse(updateMutationData, () => onClose(), {
    successMessage: t("report_updated"),
  });

  useCheckResponse(deleteMutationData, () => {}, {
    successMessage: t("report_deleted"),
  });

  useCheckResponse(sendTestMutationData, () => {}, {
    successMessage: t("test_report_sent"),
  });

  const onSubmit = (values: ReportFormType) => {
    const doesReportExist = Boolean(selectedReport?.id);

    if (doesReportExist) {
      updateReport(values);
      return;
    }
  };

  return (
    <AppLayout divider title={t("pages:reports")}>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={t("list_and_manage_your_reports")}
          action={
            <Space size={10} align="start">
              <span className={styles.actionIcon}>
                <DocsIcon />
              </span>
              {t("how_to_create_report")}
            </Space>
          }
          actionProps={{
            className: styles.action,
          }}
          target="_blank"
          href={DOCS_CREATE_REPORT_LINK}
        />
        <div className={styles.body}>
          <AlertsTable alerts={reports} onEdit={onEdit} onRemove={onDelete} />
        </div>
      </Space>

      <ReportModal
        report={selectedReport}
        isOpen={isOpen}
        onClose={onClose}
        query={query}
        onSendTest={onSendTest}
        onSubmit={onSubmit}
        loading={false}
      />
    </AppLayout>
  );
};

export default Reports;
