import { Row, Col, Alert } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import SignInForm from "@/components/SignInForm";
import useAuth from "@/hooks/useAuth";
import useLocation from "@/hooks/useLocation";
import type { SignInFormType } from "@/components/SignInForm";
import type { HasuraPlusError } from "@/types/error";
import AuthLinks from "@/components/AuthLinks";

import styles from "./index.module.less";

const SignIn: React.FC = () => {
  const [error, setError] = useState<HasuraPlusError | null>();
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const onSubmit = async (data: SignInFormType) => {
    const res = await login(data);

    if (res?.error) {
      setError({ ...res });
      return;
    }

    setLocation("/settings/sources");
  };

  return (
    <BasicLayout header={<AuthLinks currentPage="signin" />}>
      <Row className={styles.container} justify="center" align="middle">
        <Col xs={24} style={{ maxWidth: 356 }}>
          <SignInForm onSubmit={onSubmit} />
          {error && (
            <Alert message={<span>{error.message}</span>} type="error" />
          )}
        </Col>
      </Row>
    </BasicLayout>
  );
};

export default SignIn;
