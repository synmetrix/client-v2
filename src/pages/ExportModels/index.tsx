import { Result } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "@vitjs/runtime";
import { useLocalStorageState } from "ahooks";

import Button from "@/components/Button";
import AppLayout from "@/layouts/AppLayout";
import useUserData from "@/hooks/useUserData";
import useCheckResponse from "@/hooks/useCheckResponse";
import { useExportDataMutation } from "@/graphql/generated";

import s from "./index.module.less";

const ExportModels: React.FC = () => {
  const { t } = useTranslation(["export"]);

  const { currentUser } = useUserData();
  const { dataSourceId } = useParams();

  const [currentBranchId] = useLocalStorageState(
    `${dataSourceId}:currentBranch`
  );

  const [exportMutation, execExportMutation] = useExportDataMutation();

  useEffect(() => {
    execExportMutation({
      branch_id: currentBranchId as string,
    });
  }, [currentBranchId, execExportMutation]);

  useCheckResponse(
    exportMutation,
    (res) => {
      if (res) {
        const url = res?.export_data_models?.download_url;
        window.location.assign(url);
      }
    },
    {
      successMessage: t("alerts.success"),
      errorMessage: t("alerts.fail"),
    }
  );

  return (
    <AppLayout
      title={
        currentUser?.dataSources?.find((d) => d.id === dataSourceId)?.name || ""
      }
    >
      <Result
        className={s.wrapper}
        status="success"
        title={t("title")}
        subTitle={t("subtitle")}
        extra={[
          <Button type="primary" key="back" onClick={() => window.close()}>
            {t("action")}
          </Button>,
        ]}
      />
    </AppLayout>
  );
};

export default ExportModels;
