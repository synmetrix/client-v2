import { Row, Col } from "antd";
import { useParams } from "@vitjs/runtime";

import DataSourceForm from "@/components/DataSourceForm";
import AppLayout from "@/layouts/AppLayout";
import useAppSettings from "@/hooks/useAppSettings";
import useLocation from "@/hooks/useLocation";
import DataSourceStore from "@/stores/DataSourceStore";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useOnboarding from "@/hooks/useOnboarding";

import styles from "./index.module.less";

interface OnboardingProps {
  step: number;
  loading: boolean;
  onFinish: () => void;
  onTestConnection: () => void;
  onDataSourceSetupSubmit: () => void;
  onDataModelGenerationSubmit: () => void;
  onChangeStep: (value: number) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({
  step = 0,
  loading = false,
  onFinish = () => {},
  onChangeStep = () => {},
  onTestConnection = () => {},
  onDataSourceSetupSubmit = () => {},
  onDataModelGenerationSubmit = () => {},
}) => {
  return (
    <AppLayout>
      <Row className={styles.container}>
        <Col xs={24}>
          <DataSourceForm
            step={step}
            onChangeStep={onChangeStep}
            loading={loading}
            onFinish={onFinish}
            onTestConnection={onTestConnection}
            onDataSourceSetupSubmit={onDataSourceSetupSubmit}
            onDataModelGenerationSubmit={onDataModelGenerationSubmit}
          />
        </Col>
      </Row>
    </AppLayout>
  );
};

const OnboardingWrapper = () => {
  const { step: pageStep } = useParams();
  const [, setLocation] = useLocation();
  const { loading } = CurrentUserStore();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix("/onboarding");

  // 0 - 3
  const step = useMemo(() => parseInt(pageStep || "0", 10) - 1, [pageStep]);

  const {
    formState: { step0, step1 },
    step: curStep,
    setStep,
  } = DataSourceStore();

  const { onDataModelGenerationSubmit, onDataSourceSetupSubmit } =
    useOnboarding({});

  const onFinish = () => {
    setLocation(withAuthPrefix("/models"));
  };

  const onChangeStep = (value: number) => {
    setLocation(`${basePath}/${value + 1}`);
  };

  useEffect(() => {
    if (step < 0 || step > 4 || isNaN(step)) {
      setLocation(`${basePath}/1`);
    }
  }, [basePath, setLocation, step]);

  useEffect(() => {
    if (step > 0 && !step0) {
      setLocation(`${basePath}/1`);
    } else if (step > 1 && !step1) {
      setLocation(`${basePath}/2`);
    }
  }, [basePath, setLocation, step, step0, step1]);

  return (
    <Onboarding
      step={pageStep}
      loading={loading}
      onFinish={onFinish}
      onChangeStep={onChangeStep}
      onTestConnection={onDataSourceSetupSubmit}
      onDataSourceSetupSubmit={onDataSourceSetupSubmit}
      onDataModelGenerationSubmit={onDataModelGenerationSubmit}
    />
  );
};

export default OnboardingWrapper;
