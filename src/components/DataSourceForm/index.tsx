import { Card } from "antd";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

import StepFormHeader from "@/components/StepFormHeader";
import BouncingDotsLoader from "@/components/BouncingDotsLoader";
import DataSourceFormBody from "@/components/DataSourceFormBody";
import type { DataSourceForm as DataSourceFormType } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

interface DataSourceFormProps {
  onFinish: (data: DataSourceFormType) => void;
  withSteps?: boolean;
}

const DataSourceForm: FC<DataSourceFormProps> = ({
  onFinish,
  withSteps = false,
}) => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const [formData, setFormData] = useState<DataSourceFormType>({});
  const [step, setStep] = useState<number>(0);

  return (
    <Card>
      {withSteps && (
        <div className={styles.header}>
          <StepFormHeader
            currentStep={step}
            steps={[t("step1"), t("step2"), t("step3"), t("step4")]}
            onChange={setStep}
          />
        </div>
      )}
      <Suspense fallback={<BouncingDotsLoader />}>
        <DataSourceFormBody
          step={step}
          setStep={setStep}
          formState={formData}
          setState={setFormData}
          onFinish={onFinish}
        />
      </Suspense>
    </Card>
  );
};

export default DataSourceForm;
