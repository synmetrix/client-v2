import { Card } from "antd";
import { Suspense } from "react";

import DataSourceSelection from "@/components/DataSourceSelection";
import DataSourceSetup from "@/components/DataSourceSetup";
import DataModelGeneration from "@/components/DataModelGeneration";
import ApiSetup from "@/components/ApiSetup";
import StepFormHeader from "@/components/StepFormHeader";
import BouncingDotsLoader from "@/components/BouncingDotsLoader";
import DataSourceFormBody from "@/components/DataSourceFormBody";
import type { DataSourceForm as DataSourceFormType } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

const DataSourceForm: FC = () => {
  const [formData, setFormData] = useState<DataSourceFormType>({});
  const [step, setStep] = useState<number>(0);

  return (
    <Card>
      <div className={styles.header}>
        <StepFormHeader
          currentStep={step}
          steps={[
            "Connect Data Source",
            "Data Source Setup",
            "Generate Data Model Files",
            "SQL API",
          ]}
          onChange={setStep}
        />
      </div>
      <Suspense fallback={<BouncingDotsLoader />}>
        <DataSourceFormBody
          step={step}
          setStep={setStep}
          formState={formData}
          setState={setFormData}
        />
      </Suspense>
    </Card>
  );
};

export default DataSourceForm;
