import { useState } from "react";
import { Row, Col, Alert } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import SignUpForm from "@/components/SignUpForm";
import type { SignUpFormType } from "@/components/SignUpForm";
import useAuth from "@/hooks/useAuth";
import useLocation from "@/hooks/useLocation";
import AuthLinks from "@/components/AuthLinks";
import { ONBOARDING } from "@/utils/constants/paths";

import styles from "./index.module.less";

const SignUp: React.FC = () => {
  const [error, setError] = useState<any>();
  const { register, sendMagicLink } = useAuth();
  const [location, setLocation] = useLocation();
  const { magicLink } = location.query;
  const isMagicLink = magicLink !== undefined;

  const onSubmit = async (data: SignUpFormType) => {
    delete data.privacy;

    let res;
    if (isMagicLink) {
      res = await sendMagicLink(data);
    } else {
      res = await register(data);
    }

    if (res?.error) {
      setError(res.message || res.error);
      return;
    }

    setLocation(ONBOARDING);
  };

  return (
    <BasicLayout header={<AuthLinks currentPage="signup" />}>
      <Row className={styles.container} justify="center" align="middle">
        <Col xs={24} style={{ maxWidth: 356 }}>
          <SignUpForm onSubmit={onSubmit} isMagicLink={isMagicLink} />
          {error && <Alert message={<span>{error}</span>} type="error" />}
        </Col>
      </Row>
    </BasicLayout>
  );
};

export default SignUp;
