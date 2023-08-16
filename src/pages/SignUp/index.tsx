import { useState } from "react";
import { Row, Col, Alert } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import SignUpForm from "@/components/SignUpForm";
import type { SignUpFormType } from "@/components/SignUpForm";
import useAuth from "@/hooks/useAuth";
import useLocation from "@/hooks/useLocation";

import styles from "./index.module.less";

const SignUp: React.FC = () => {
  const [error, setError] = useState<any>();
  const { register } = useAuth();
  const [, setLocation] = useLocation();

  const onSubmit = async (data: SignUpFormType) => {
    delete data.privacy;
    const res = await register(data);

    if (res?.error) {
      setError(res);
      return;
    }

    setLocation("datasources");
  };

  return (
    <BasicLayout headerProps={{ withLogo: true }} page="signup">
      <Row className={styles.container} justify="center" align="middle">
        <Col>
          <SignUpForm onSubmit={onSubmit} />
          {error && (
            <Alert
              message={<span className={styles.error}>{error.message}</span>}
              type="error"
            />
          )}
        </Col>
      </Row>
    </BasicLayout>
  );
};

export default SignUp;
