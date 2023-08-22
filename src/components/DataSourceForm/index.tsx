import { Card } from "antd";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

import StepFormHeader from "@/components/StepFormHeader";
import BouncingDotsLoader from "@/components/BouncingDotsLoader";
import DataSourceFormBody from "@/components/DataSourceFormBody";
import type {
  DataSourceForm as DataSourceFormType,
  DataSourceInfo,
} from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

interface DataSourceFormProps {
  curDataSource?: DataSourceInfo;
  onFinish: (data: DataSourceFormType) => void;
  withSteps?: boolean;
  bordered?: boolean;
  shadow?: boolean;
}

const DataSourceForm: FC<DataSourceFormProps> = ({
  curDataSource,
  onFinish,
  withSteps = false,
  bordered = true,
  shadow = true,
}) => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const [formData, setFormData] = useState<DataSourceFormType>({});
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (!curDataSource) {
      // form state wont reset
      setFormData({});
      setStep(0);
    }
  }, [curDataSource]);

  useEffect(() => {
    if (curDataSource) {
      setFormData({
        dataSource: curDataSource.type,
        dataSourceSetup: {
          ...curDataSource,
        },
      });
      setStep(1);
    }
  }, [curDataSource]);

  return (
    <Card
      style={shadow === false ? { boxShadow: "0 0 0 0" } : undefined}
      bordered={bordered}
    >
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
          isEditing={!!curDataSource}
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
