import { useState } from "react";
import { Row, Col, Alert } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import SignUpForm from "@/components/SignUpForm";
import type { SignUpFormType } from "@/components/SignUpForm";
import useAuth from "@/hooks/useAuth";
import useLocation from "@/hooks/useLocation";
import AuthLinks from "@/components/AuthLinks";

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

    setLocation("/settings/sources");
  };

  return (
    <BasicLayout header={<AuthLinks currentPage="signup" />}>
      <Row className={styles.container} justify="center" align="middle">
        <Col xs={24} style={{ maxWidth: 356 }}>
          <SignUpForm onSubmit={onSubmit} />
          {error && (
            <Alert message={<span>{error.message}</span>} type="error" />
          )}
        </Col>
      </Row>
    </BasicLayout>
  );
};

export default SignUp;
