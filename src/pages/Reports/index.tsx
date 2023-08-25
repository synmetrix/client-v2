import { Space } from "antd";
import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import PageHeader from "@/components/PageHeader";
import AlertsTable from "@/components/AlertsTable";
import Modal from "@/components/Modal";
import ReportForm from "@/components/ReportForm";
import AlertTypeSelection from "@/components/AlertTypeSelection";
import { alertTypes } from "@/mocks/alertTypes";
import type { Alert, AlertType } from "@/types/alert";
import type { Report, ReportFormType } from "@/types/report";
import type { QueryPreview } from "@/types/queryPreview";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface ReportsProps {
  alerts: Alert[];
  query: QueryPreview;
}

const Reports: React.FC<ReportsProps> = ({ alerts, query }) => {
  const { t } = useTranslation(["reports", "pages"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<AlertType | undefined>();
  const [selectedReport, setSelectedReport] = useState<
    ReportFormType | undefined
  >();

  const onEdit = (report: Report) => {
    setSelectedReport(report);
    setIsOpen(true);
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

  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:reports") }}
    >
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
        {selectedReport || selectedType ? (
          <ReportForm
            query={query}
            type={selectedReport?.type || selectedType}
            onSubmit={console.log}
            onTest={console.log}
            initialValue={selectedReport}
          />
        ) : (
          <AlertTypeSelection
            type="report"
            options={alertTypes}
            onSubmit={(v) => setSelectedType(v.value)}
          />
        )}
      </Modal>
    </BasicLayout>
  );
};

export default Reports;
