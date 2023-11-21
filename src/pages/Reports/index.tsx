import { Col, Row, Space, message } from "antd";
import { useParams } from "@vitjs/runtime";
import { useResponsive } from "ahooks";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import ReportModal from "@/components/ReportModal";
import AlertCard from "@/components/AlertCard";
import type { Alert } from "@/types/alert";
import type { Report, ReportFormType } from "@/types/report";
import type { QueryState } from "@/types/queryState";
import AppLayout from "@/layouts/AppLayout";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useCheckResponse from "@/hooks/useCheckResponse";
import useAlerts from "@/hooks/useAlerts";
import useReports from "@/hooks/useReports";
import useLocation from "@/hooks/useLocation";
import useAppSettings from "@/hooks/useAppSettings";
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
  const responsive = useResponsive();
  const { withAuthPrefix } = useAppSettings();
  const [, setLocation] = useLocation();
  const basePath = withAuthPrefix("/reports");
  const { currentUser } = CurrentUserStore();
  const { reportId } = useParams();

  const reports = useMemo(
    () => (initialReports?.length ? initialReports : currentUser.reports || []),
    [initialReports, currentUser]
  ) as Alert[];

  const curReport = useMemo(
    () => reports.find((r) => r.id === reportId),
    [reportId, reports]
  );

  const {
    mutations: { sendTestMutationData },
    onSendTest,
  } = useAlerts({});

  const {
    mutations: { updateMutationData, deleteMutationData, execDeleteMutation },
    updateReport,
  } = useReports({
    reportId,
  });

  const query = useMemo(() => {
    if (curReport) {
      return curReport?.exploration?.playground_state;
    }

    return initialQuery || SAMPLE_EXPLORATION.playground_state;
  }, [curReport, initialQuery]);

  const onEdit = (report: Report) => {
    setLocation(`${basePath}/${report.id}`);
  };

  const onDelete = (report: Report) => {
    execDeleteMutation({ id: report.id });
  };

  const onClose = () => {
    setLocation(basePath);
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
    const doesReportExist = Boolean(curReport?.id);

    if (doesReportExist) {
      updateReport(values);
      return;
    }
  };

  useEffect(() => {
    if (reports?.length && reportId && !curReport) {
      message.error(t("not_found"));
      setLocation(basePath);
    }
  }, [reportId, reports?.length, basePath, curReport, setLocation, t]);

  return (
    <AppLayout divider title={t("pages:reports")}>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={!responsive.sm ? t("title_mobile") : t("title")}
          action={
            <Space size={!responsive.sm ? 5 : 10} align="start">
              <span className={styles.actionIcon}>
                <DocsIcon />
              </span>
              {!responsive.sm ? t("action_mobile") : t("action")}
            </Space>
          }
          actionProps={{
            className: styles.action,
          }}
          target="_blank"
          href={DOCS_CREATE_REPORT_LINK}
        />
        <div className={styles.body}>
          <Row justify={"start"} gutter={[32, 32]}>
            {reports.map((a) => (
              <Col xs={24} sm={12} xl={8} key={a.id}>
                <AlertCard alert={a} onEdit={onEdit} onRemove={onDelete} />
              </Col>
            ))}
          </Row>
        </div>
      </Space>

      <ReportModal
        report={curReport}
        isOpen={!!curReport}
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
