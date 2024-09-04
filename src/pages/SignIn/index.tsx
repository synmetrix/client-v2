import { Row, Col, Alert } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import SignInForm from "@/components/SignInForm";
import useAuth from "@/hooks/useAuth";
import useLocation from "@/hooks/useLocation";
import type { SignInFormType } from "@/components/SignInForm";
import AuthLinks from "@/components/AuthLinks";
import { SOURCES } from "@/utils/constants/paths";

import styles from "./index.module.less";

const SignIn: React.FC = () => {
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const onSubmit = async (data: SignInFormType) => {
    setError(null);
    setLoading(true);
    const res = await login(data);
    setLoading(false);

    if (res?.error) {
      setError(res.message || res.error);
      return;
    }

    setLocation(SOURCES);
  };

  return (
    <BasicLayout header={<AuthLinks currentPage="signin" />}>
      <Row className={styles.container} justify="center" align="middle">
        <Col xs={24} style={{ maxWidth: 356 }}>
          <SignInForm loading={loading} onSubmit={onSubmit} />
          {error && <Alert message={<span>{error}</span>} type="error" />}
        </Col>
      </Row>
    </BasicLayout>
  );
};

export default SignIn;
