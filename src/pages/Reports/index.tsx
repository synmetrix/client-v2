import { Space } from "antd";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import AlertsTable from "@/components/AlertsTable";
import Modal from "@/components/Modal";
import ReportForm from "@/components/ReportForm";
import AlertTypeSelection from "@/components/AlertTypeSelection";
import { alertTypes } from "@/mocks/alertTypes";
import type { Alert, AlertType } from "@/types/alert";
import type { Report, ReportFormType } from "@/types/report";
import type { QueryState } from "@/types/queryState";
import AppLayout from "@/layouts/AppLayout";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type {
  Reports_Pk_Columns_Input,
  Reports_Set_Input,
  SendTestAlertMutationVariables,
} from "@/graphql/generated";
import {
  useCreateReportMutation,
  useDeleteReportMutation,
  useUpdateReportMutation,
  useSendTestAlertMutation,
} from "@/graphql/generated";
import useCheckResponse from "@/hooks/useCheckResponse";
import { SAMPLE_EXPLORATION } from "@/mocks/exploration";

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
  const [selectedType, setSelectedType] = useState<AlertType | undefined>();
  const [selectedReport, setSelectedReport] = useState<
    ReportFormType | undefined
  >();

  const { currentUser, currentTeamId } = CurrentUserStore();

  const query = useMemo(() => {
    if (selectedReport) {
      return selectedReport?.exploration?.playground_state;
    }

    return initialQuery || SAMPLE_EXPLORATION.playground_state;
  }, [selectedReport, initialQuery]);

  const [insertMutationData, execInsertMutation] = useCreateReportMutation();
  const [updateMutationData, execUpdateMutation] = useUpdateReportMutation();
  const [deleteMutationData, execDeleteMutation] = useDeleteReportMutation();
  const [sendTestMutationData, execSendTestMutation] =
    useSendTestAlertMutation();

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

  const onCreate = () => {
    setSelectedReport(undefined);
    setIsOpen(true);
  };

  const onClose = () => {
    setSelectedReport(undefined);
    setSelectedType(undefined);
    setIsOpen(false);
  };

  useCheckResponse(insertMutationData, () => onClose(), {
    successMessage: t("report_created"),
  });

  useCheckResponse(updateMutationData, () => onClose(), {
    successMessage: t("report_updated"),
  });

  useCheckResponse(deleteMutationData, () => {}, {
    successMessage: t("report_deleted"),
  });

  useCheckResponse(sendTestMutationData, () => {}, {
    successMessage: t("test_report_sent"),
  });

  const createReport = useCallback(
    (values: ReportFormType) => {
      const newReportWithExplorationPayload = {
        name: values.name,
        schedule: values.schedule,
        delivery_type: values.type,
        delivery_config: values.deliveryConfig,
        exploration_id: SAMPLE_EXPLORATION.id,
        team_id: currentTeamId,
      };

      execInsertMutation({ object: newReportWithExplorationPayload });
    },
    [execInsertMutation, currentTeamId]
  );

  const updateReport = useCallback(
    (values: ReportFormType) => {
      const updateAlerPayload = {
        name: values.name,
        schedule: values.schedule,
        delivery_type: values.type,
        delivery_config: values.deliveryConfig,
      };

      const payload = {
        pk_columns: { id: selectedReport?.id } as Reports_Pk_Columns_Input,
        _set: updateAlerPayload as Reports_Set_Input,
      };

      execUpdateMutation(payload);
    },
    [execUpdateMutation, selectedReport]
  );

  const onSubmit = (values: ReportFormType) => {
    const doesReportExist = Boolean(selectedReport?.id);

    if (doesReportExist) {
      updateReport(values);
      return;
    }

    createReport(values);
  };

  const onSendTest = (values: ReportFormType) => {
    const { deliveryConfig, exploration, type, name } = values;

    const mutationPayload: SendTestAlertMutationVariables = {
      explorationId: exploration.id,
      deliveryType: type,
      deliveryConfig,
      name,
    };

    execSendTestMutation(mutationPayload);
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
          onClick={onCreate}
        />
        <div className={styles.body}>
          <AlertsTable alerts={reports} onEdit={onEdit} onRemove={onDelete} />
        </div>
      </Space>

      <Modal
        open={isOpen}
        closable
        onClose={onClose}
        className={styles.modal}
        width={"100%"}
      >
        {selectedReport || selectedType ? (
          <ReportForm
            query={query || initialQuery}
            type={selectedReport?.type || selectedType}
            onSubmit={onSubmit}
            onTest={onSendTest}
            initialValue={selectedReport}
            isSendTestLoading={sendTestMutationData.fetching}
          />
        ) : (
          <AlertTypeSelection
            type="report"
            options={alertTypes}
            onSubmit={(v) => setSelectedType(v.value)}
          />
        )}
      </Modal>
    </AppLayout>
  );
};

export default Reports;
