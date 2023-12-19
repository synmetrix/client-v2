import { Row, Col } from "antd";
import { useParams } from "@vitjs/runtime";

import DataSourceForm from "@/components/DataSourceForm";
import AppLayout from "@/layouts/AppLayout";
import useAppSettings from "@/hooks/useAppSettings";
import useLocation from "@/hooks/useLocation";
import DataSourceStore from "@/stores/DataSourceStore";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useOnboarding from "@/hooks/useOnboarding";
import type {
  DataSource,
  DataSourceSetupForm,
  DynamicForm,
} from "@/types/dataSource";

import styles from "./index.module.less";

interface OnboardingProps {
  loading: boolean;
  onFinish: () => void;
  onDataSourceSelect: (data: DataSource) => void;
  onTestConnection: (data: DataSourceSetupForm) => void;
  onDataSourceSetupSubmit: (data: DataSourceSetupForm) => void;
  onDataModelGenerationSubmit: (data: DynamicForm) => void;
  onChangeStep: (value: number) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({
  loading = false,
  onFinish = () => {},
  onChangeStep = () => {},
  onTestConnection = () => {},
  onDataSourceSelect = () => {},
  onDataSourceSetupSubmit = () => {},
  onDataModelGenerationSubmit = () => {},
}) => {
  return (
    <AppLayout>
      <Row className={styles.container}>
        <Col xs={24}>
          <DataSourceForm
            onChangeStep={onChangeStep}
            loading={loading}
            onFinish={onFinish}
            onDataSourceSelect={onDataSourceSelect}
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

  const step = useMemo(() => parseInt(pageStep || "0", 10) - 1, [pageStep]);

  const {
    formState: { step0, step1 },
    isOnboarding,
    setIsOnboarding,
    setStep,
    setFormStateData,
  } = DataSourceStore();

  const { onDataModelGenerationSubmit, onDataSourceSetupSubmit } =
    useOnboarding({});

  const onFinish = () => {
    setLocation(withAuthPrefix("/models"));
  };

  const onChangeStep = (value: number) => {
    setLocation(`${basePath}/${value + 1}`);
  };

  const onNextStep = () => {
    setLocation(`${basePath}/${step + 2}`);
  };

  const onDataSourceSelect = (value: DataSource) => {
    setFormStateData(0, value);
    onNextStep();
  };

  const onDatasourceSetup = async (data: DataSourceSetupForm) => {
    await onDataSourceSetupSubmit(data, false, onNextStep);
  };

  const onDataModelGeneration = async (data: DynamicForm) => {
    await onDataModelGenerationSubmit(data, onNextStep);
  };

  const onTestConnection = async (data: DataSourceSetupForm) => {
    await onDataSourceSetupSubmit(data, true, onNextStep);
  };

  useEffect(() => {
    if (step >= 0) {
      setStep(step);
    }
  }, [setStep, step]);

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

  useEffect(() => {
    if (!isOnboarding) {
      setIsOnboarding(true);
    }
  }, [isOnboarding, setIsOnboarding]);

  return (
    <Onboarding
      loading={loading}
      onFinish={onFinish}
      onChangeStep={onChangeStep}
      onDataSourceSelect={onDataSourceSelect}
      onTestConnection={onTestConnection}
      onDataSourceSetupSubmit={onDatasourceSetup}
      onDataModelGenerationSubmit={onDataModelGeneration}
    />
  );
};

export default OnboardingWrapper;
